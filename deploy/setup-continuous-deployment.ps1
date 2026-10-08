[CmdletBinding()]
param(
    [string]$Repository = 'Rain-Autumn/rcs-website',
    [string]$VpsHost = '57.129.128.52',
    [string]$AdminUser = 'debian',
    [string]$DeployUser = 'rcsdeploy'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Assert-LastExitCode([string]$Step) {
    if ($LASTEXITCODE -ne 0) {
        throw "$Step failed with exit code $LASTEXITCODE."
    }
}

foreach ($commandName in @('gh', 'scp', 'ssh', 'ssh-keygen')) {
    if (-not (Get-Command $commandName -ErrorAction SilentlyContinue)) {
        throw "Required command not found: $commandName"
    }
}

if ($VpsHost -notmatch '^[A-Za-z0-9.-]+$') {
    throw 'The VPS host contains unsupported characters.'
}
if ($AdminUser -notmatch '^[a-z_][a-z0-9_-]*$' -or $DeployUser -notmatch '^[a-z_][a-z0-9_-]*$') {
    throw 'A Linux account name contains unsupported characters.'
}

$deployDirectory = $PSScriptRoot
$bootstrapScript = Join-Path $deployDirectory 'bootstrap-vps.sh'
$deployHelper = Join-Path $deployDirectory 'rcs-deploy'

if (-not (Test-Path -LiteralPath $bootstrapScript -PathType Leaf) -or -not (Test-Path -LiteralPath $deployHelper -PathType Leaf)) {
    throw 'Deployment scripts are incomplete.'
}

$temporaryRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$temporaryDirectory = Join-Path $temporaryRoot ("rcs-cd-" + [Guid]::NewGuid().ToString('N'))
$remoteSuffix = [Guid]::NewGuid().ToString('N')
$remoteBootstrap = "/tmp/rcs-bootstrap-$remoteSuffix.sh"
$remoteDeploy = "/tmp/rcs-deploy-$remoteSuffix"

New-Item -ItemType Directory -Path $temporaryDirectory -Force | Out-Null

try {
    Write-Host '=== GitHub authentication ==='
    & gh auth status
    Assert-LastExitCode 'GitHub authentication check'

    $privateKey = Join-Path $temporaryDirectory 'rcsdeploy_ed25519'
    $publicKeyFile = "$privateKey.pub"

    Write-Host '=== Dedicated deployment key ==='
    & ssh-keygen -q -t ed25519 -N '""' -C "github-actions:$Repository" -f $privateKey
    Assert-LastExitCode 'SSH key generation'

    $publicKey = (Get-Content -Raw -Encoding ascii $publicKeyFile).Trim()
    $publicKeyBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($publicKey))

    $localBootstrap = Join-Path $temporaryDirectory ([IO.Path]::GetFileName($remoteBootstrap))
    $localDeploy = Join-Path $temporaryDirectory ([IO.Path]::GetFileName($remoteDeploy))
    Copy-Item -LiteralPath $bootstrapScript -Destination $localBootstrap
    Copy-Item -LiteralPath $deployHelper -Destination $localDeploy

    Write-Host '=== Restricted VPS account ==='
    & scp -- $localBootstrap $localDeploy "${AdminUser}@${VpsHost}:/tmp/"
    Assert-LastExitCode 'Copying the VPS bootstrap files'

    & ssh -t -- "${AdminUser}@${VpsHost}" "sudo bash '$remoteBootstrap' '$remoteDeploy' '$publicKeyBase64'"
    Assert-LastExitCode 'Configuring the restricted VPS account'

    & ssh -- "${AdminUser}@${VpsHost}" "rm -f -- '$remoteBootstrap' '$remoteDeploy'"
    Assert-LastExitCode 'Removing VPS bootstrap files'

    $knownHostLines = @(
        & ssh-keygen -F $VpsHost 2>$null |
            Where-Object { $_ -and -not $_.StartsWith('#') }
    )
    Assert-LastExitCode 'Reading the trusted VPS host key'
    if ($knownHostLines.Count -eq 0) {
        throw 'No trusted host key was found after the SSH connection.'
    }

    $privateKeyBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($privateKey))
    $knownHosts = $knownHostLines -join "`n"

    Write-Host '=== Encrypted GitHub configuration ==='
    $privateKeyBase64 | gh secret set RCS_DEPLOY_SSH_KEY_B64 --repo $Repository
    Assert-LastExitCode 'Saving the deployment key in GitHub'
    $knownHosts | gh secret set RCS_DEPLOY_KNOWN_HOSTS --repo $Repository
    Assert-LastExitCode 'Saving the trusted host key in GitHub'

    & gh variable set RCS_DEPLOY_HOST --repo $Repository --body $VpsHost
    Assert-LastExitCode 'Saving the deployment host variable'
    & gh variable set RCS_DEPLOY_USER --repo $Repository --body $DeployUser
    Assert-LastExitCode 'Saving the deployment user variable'
    & gh variable set RCS_DEPLOY_ENABLED --repo $Repository --body 'true'
    Assert-LastExitCode 'Enabling continuous deployment'

    Write-Host ''
    Write-Host 'Continuous deployment is configured.' -ForegroundColor Green
    Write-Host 'Every validated push to main will now deploy atomically to the VPS.'
}
finally {
    $resolvedTemporaryDirectory = [IO.Path]::GetFullPath($temporaryDirectory)
    $isTaskTemporaryDirectory =
        $resolvedTemporaryDirectory.StartsWith($temporaryRoot, [StringComparison]::OrdinalIgnoreCase) -and
        ([IO.Path]::GetFileName($resolvedTemporaryDirectory) -match '^rcs-cd-[0-9a-f]{32}$')

    if ($isTaskTemporaryDirectory -and (Test-Path -LiteralPath $resolvedTemporaryDirectory)) {
        Remove-Item -LiteralPath $resolvedTemporaryDirectory -Recurse -Force
    }
}
