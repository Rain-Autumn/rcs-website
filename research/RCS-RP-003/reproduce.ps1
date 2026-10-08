param(
    [switch]$KeepScratch,
    [string]$FixtureArchivePath
)

$ErrorActionPreference = 'Stop'
$workRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("RCS-RP-003-repro-" + [guid]::NewGuid().ToString('N'))
$inputDir = Join-Path $workRoot 'input'
$zipDir = Join-Path $workRoot 'zip'
$ntfsDir = Join-Path $workRoot 'ntfs'
$null = New-Item -ItemType Directory -Path $inputDir, $zipDir, $ntfsDir

try {
    $driveLetter = ([System.IO.Path]::GetPathRoot($workRoot)).Substring(0, 1)
    $volume = Get-Volume -DriveLetter $driveLetter
    if ($volume.FileSystem -ne 'NTFS') {
        throw "The scratch volume is $($volume.FileSystem), not NTFS. NTFS measurements are skipped; choose an NTFS TEMP location to reproduce the full protocol."
    }

    if ($FixtureArchivePath) {
        if (-not (Test-Path -LiteralPath $FixtureArchivePath -PathType Leaf)) {
            throw "Fixture archive not found: $FixtureArchivePath"
        }
        $bundleDir = Join-Path $inputDir 'fixtures'
        Expand-Archive -LiteralPath $FixtureArchivePath -DestinationPath $bundleDir
        $logZip = Join-Path $bundleDir 'repetitive-log.zip'
        $fixtureRandomZip = Join-Path $bundleDir 'random-binary.zip'
        if (-not (Test-Path -LiteralPath $logZip -PathType Leaf) -or -not (Test-Path -LiteralPath $fixtureRandomZip -PathType Leaf)) {
            throw 'Fixture archive must contain repetitive-log.zip and random-binary.zip.'
        }
        $logExtractDir = Join-Path $inputDir 'fixture-log'
        $randomExtractDir = Join-Path $inputDir 'fixture-random'
        Expand-Archive -LiteralPath $logZip -DestinationPath $logExtractDir
        Expand-Archive -LiteralPath $fixtureRandomZip -DestinationPath $randomExtractDir
        $logPath = (Get-ChildItem -LiteralPath $logExtractDir -File -Recurse | Select-Object -First 1).FullName
        $randomPath = (Get-ChildItem -LiteralPath $randomExtractDir -File -Recurse | Select-Object -First 1).FullName
        $randomZip = Join-Path $inputDir 'already-compressed-random.zip'
        Copy-Item -LiteralPath $fixtureRandomZip -Destination $randomZip
    } else {
        $targetBytes = 8MB
        $line = [System.Text.Encoding]::UTF8.GetBytes("2026-10-08T12:00:00Z level=INFO event=sync status=ok item=sample-0001`r`n")
        $logBytes = [byte[]]::new($targetBytes)
        for ($offset = 0; $offset -lt $targetBytes; $offset += $line.Length) {
            $copyLength = [Math]::Min($line.Length, $targetBytes - $offset)
            [Array]::Copy($line, 0, $logBytes, $offset, $copyLength)
        }
        $logPath = Join-Path $inputDir 'repetitive-log.txt'
        [System.IO.File]::WriteAllBytes($logPath, $logBytes)

        $randomBytes = [byte[]]::new($targetBytes)
        $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
        try { $rng.GetBytes($randomBytes) } finally { $rng.Dispose() }
        $randomPath = Join-Path $inputDir 'random-binary.bin'
        [System.IO.File]::WriteAllBytes($randomPath, $randomBytes)

        $randomZip = Join-Path $inputDir 'random-binary.zip'
        Compress-Archive -LiteralPath $randomPath -DestinationPath $randomZip -CompressionLevel Optimal
    }
    $cases = @(
        @{ Name = 'repetitive-log'; Path = $logPath },
        @{ Name = 'random-binary'; Path = $randomPath },
        @{ Name = 'already-compressed-random-zip'; Path = $randomZip }
    )

    $rows = foreach ($case in $cases) {
        $zipPath = Join-Path $zipDir ($case.Name + '.zip')
        Compress-Archive -LiteralPath $case.Path -DestinationPath $zipPath -CompressionLevel Optimal
        $before = Get-FileHash -LiteralPath $case.Path -Algorithm SHA256
        $extractDir = Join-Path $workRoot ('verify-' + $case.Name)
        Expand-Archive -LiteralPath $zipPath -DestinationPath $extractDir
        $restored = Get-ChildItem -LiteralPath $extractDir -File -Recurse | Select-Object -First 1
        $restoredHash = Get-FileHash -LiteralPath $restored.FullName -Algorithm SHA256
        if ($before.Hash -ne $restoredHash.Hash) { throw "ZIP integrity check failed for $($case.Name)." }

        $ntfsPath = Join-Path $ntfsDir (Split-Path -Leaf $case.Path)
        Copy-Item -LiteralPath $case.Path -Destination $ntfsPath
        $beforeNtfs = Get-FileHash -LiteralPath $ntfsPath -Algorithm SHA256
        & compact.exe /c /q $ntfsPath | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "NTFS compression failed for $($case.Name)." }
        $compactText = (& compact.exe /q /a $ntfsPath | Out-String)
        if ($compactText -notmatch '(?i)(?:stored in|stocké dans)\s+([\d,. ]+)\s+(?:bytes|octets)') {
            # compact.exe is localized; report its raw output instead of guessing a number.
            $stored = 'see compact output'
        } else {
            $stored = ($Matches[1] -replace '[^\d]', '')
        }
        $afterNtfs = Get-FileHash -LiteralPath $ntfsPath -Algorithm SHA256
        if ($beforeNtfs.Hash -ne $afterNtfs.Hash) { throw "NTFS content integrity check failed for $($case.Name)." }

        [pscustomobject]@{
            Case = $case.Name
            InputBytes = (Get-Item -LiteralPath $case.Path).Length
            ZipBytes = (Get-Item -LiteralPath $zipPath).Length
            ZipDeltaPercent = [Math]::Round((((Get-Item -LiteralPath $zipPath).Length / (Get-Item -LiteralPath $case.Path).Length) - 1) * 100, 2)
            NtfsLogicalBytes = (Get-Item -LiteralPath $ntfsPath).Length
            NtfsStoredBytes = $stored
            HashVerified = $true
            InputSHA256 = $before.Hash
            CompactOutput = $compactText.Trim()
        }
    }

    $rows | Format-List
    Write-Output "Scratch directory: $workRoot"
    if (-not $KeepScratch) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
        Write-Output 'Scratch data created by this script was removed.'
    } else {
        Write-Warning 'Scratch data was kept because -KeepScratch was specified.'
    }
}
catch {
    Write-Error $_
    if (-not $KeepScratch -and (Test-Path -LiteralPath $workRoot)) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
        Write-Output 'Scratch data created by this script was removed after the failure.'
    }
    exit 1
}
