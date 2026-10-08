param(
    [string]$InputRoot,
    [string]$OutputDirectory,
    [string]$ScratchRoot = [System.IO.Path]::GetTempPath(),
    [int]$PublicRepeats = 3,
    [int]$SyntheticRepeats = 5,
    [switch]$SkipAggregateCases
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[System.Threading.Thread]::CurrentThread.CurrentCulture = [System.Globalization.CultureInfo]::InvariantCulture
[System.Threading.Thread]::CurrentThread.CurrentUICulture = [System.Globalization.CultureInfo]::InvariantCulture

if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path (Get-Location).Path ('RCS-RP-003-results-' + [guid]::NewGuid().ToString('N'))
}

if ($PublicRepeats -lt 1 -or $SyntheticRepeats -lt 1) {
    throw 'Repeat counts must be positive integers.'
}

$manifestPath = Join-Path $PSScriptRoot 'corpus-manifest.csv'
if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    $manifestPath = Join-Path $PSScriptRoot 'RCS-RP-003-corpus-manifest.csv'
}
if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    throw "Corpus manifest not found: $manifestPath"
}
$corpusManifest = Import-Csv -LiteralPath $manifestPath

$scratchRootFull = [System.IO.Path]::GetFullPath($ScratchRoot)
New-Item -ItemType Directory -Path $scratchRootFull -Force | Out-Null
$workRoot = Join-Path $scratchRootFull ('RCS-RP-003-run-' + [guid]::NewGuid().ToString('N'))
$downloadRoot = Join-Path $workRoot 'download'
$dataRoot = $InputRoot
$outputFull = [System.IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Path $outputFull -Force | Out-Null
New-Item -ItemType Directory -Path $workRoot -Force | Out-Null

$native = @'
using System;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;

public static class Rp003DiskTools {
    [DllImport("kernel32.dll", EntryPoint="GetCompressedFileSizeW", SetLastError=true, CharSet=CharSet.Unicode)]
    private static extern uint GetCompressedFileSize(string fileName, out uint high);

    public static ulong AllocatedBytes(string path) {
        uint high;
        uint low = GetCompressedFileSize(path, out high);
        int error = Marshal.GetLastWin32Error();
        if (low == 0xFFFFFFFF && error != 0) throw new System.ComponentModel.Win32Exception(error);
        return ((ulong)high << 32) | low;
    }

    public static byte[] Repeated(byte[] pattern, int size) {
        byte[] result = new byte[size];
        for (int offset = 0; offset < size; offset += pattern.Length) {
            int count = Math.Min(pattern.Length, size - offset);
            Buffer.BlockCopy(pattern, 0, result, offset, count);
        }
        return result;
    }

    public static byte[] DeterministicBytes(int size) {
        byte[] result = new byte[size];
        byte[] seed = Encoding.UTF8.GetBytes("RCS-RP-003 synthetic binary v1");
        byte[] counterBytes = new byte[4];
        using (SHA256 sha = SHA256.Create()) {
            int written = 0;
            uint counter = 0;
            while (written < size) {
                Buffer.BlockCopy(BitConverter.GetBytes(counter++), 0, counterBytes, 0, 4);
                byte[] blockInput = new byte[seed.Length + counterBytes.Length];
                Buffer.BlockCopy(seed, 0, blockInput, 0, seed.Length);
                Buffer.BlockCopy(counterBytes, 0, blockInput, seed.Length, counterBytes.Length);
                byte[] block = sha.ComputeHash(blockInput);
                int count = Math.Min(block.Length, size - written);
                Buffer.BlockCopy(block, 0, result, written, count);
                written += count;
            }
        }
        return result;
    }

    public static byte[] JsonLines(int rows) {
        StringBuilder text = new StringBuilder(rows * 90);
        for (int i = 0; i < rows; i++) {
            text.Append("{\"event\":\"cache_scan\",\"level\":\"info\",\"machine\":\"workstation\",\"item\":");
            text.Append(i.ToString("D7"));
            text.Append(",\"status\":\"complete\",\"source\":\"local\",\"retry\":false}\n");
        }
        return Encoding.UTF8.GetBytes(text.ToString());
    }
}
'@
Add-Type -TypeDefinition $native

function Get-FileManifest {
    param([Parameter(Mandatory = $true)][string]$Path)
    $item = Get-Item -LiteralPath $Path
    if ($item.PSIsContainer) {
        $base = $item.FullName.TrimEnd([char[]]@('\', '/')) + [System.IO.Path]::DirectorySeparatorChar
        $files = @(Get-ChildItem -LiteralPath $item.FullName -File -Recurse | Sort-Object FullName)
        if ($files.Count -eq 0) { throw "Test case contains no files: $Path" }
        foreach ($file in $files) {
            $relative = $file.FullName.Substring($base.Length).Replace('\', '/')
            [pscustomobject]@{
                RelativePath = $relative
                Bytes = [long]$file.Length
                SHA256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
            }
        }
    } else {
        [pscustomobject]@{
            RelativePath = $item.Name
            Bytes = [long]$item.Length
            SHA256 = (Get-FileHash -LiteralPath $item.FullName -Algorithm SHA256).Hash
        }
    }
}

function Get-ManifestDigest {
    param([Parameter(Mandatory = $true)][object[]]$Rows)
    $builder = [System.Text.StringBuilder]::new()
    foreach ($row in ($Rows | Sort-Object RelativePath)) {
        [void]$builder.Append($row.RelativePath).Append('|').Append($row.SHA256).Append("`n")
    }
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($builder.ToString())
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        return ([System.BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '')
    } finally { $sha.Dispose() }
}

function Get-TreeStatistics {
    param([Parameter(Mandatory = $true)][string]$Path)
    $rows = @(Get-FileManifest -Path $Path)
    $item = Get-Item -LiteralPath $Path
    if ($item.PSIsContainer) {
        $files = @(Get-ChildItem -LiteralPath $item.FullName -File -Recurse)
    } else {
        $files = @($item)
    }
    [long]$logical = ($rows | Measure-Object -Property Bytes -Sum).Sum
    [long]$allocated = 0
    foreach ($file in $files) { $allocated += [long][Rp003DiskTools]::AllocatedBytes($file.FullName) }
    [pscustomobject]@{
        Files = $files.Count
        LogicalBytes = $logical
        AllocatedBytes = $allocated
        Manifest = $rows
        Digest = Get-ManifestDigest -Rows $rows
    }
}

function Copy-CaseTree {
    param([string]$Source, [string]$Destination)
    $sourceItem = Get-Item -LiteralPath $Source
    New-Item -ItemType Directory -Path $Destination -Force | Out-Null
    if ($sourceItem.PSIsContainer) {
        foreach ($file in (Get-ChildItem -LiteralPath $Source -File -Recurse)) {
            $relative = $file.FullName.Substring(($sourceItem.FullName.TrimEnd([char[]]@('\', '/')) + [System.IO.Path]::DirectorySeparatorChar).Length)
            $target = Join-Path $Destination $relative
            $targetParent = Split-Path -Parent $target
            New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
            Copy-Item -LiteralPath $file.FullName -Destination $target
        }
    } else {
        Copy-Item -LiteralPath $Source -Destination (Join-Path $Destination $sourceItem.Name)
    }
}

function Add-DownloadedCorpus {
    param([string]$Destination)
    $headers = @{ 'User-Agent' = 'RCS-RP-003-research' }
    $canterburyCommit = '110a81a54fd74b66c74ce836e44d8ca70ed346ea'
    $largeCommit = 'c291826f1b15664543e37c193c3768c43535ee14'
    $silesiaCommit = '3f3fa2cdbbb3795c903b74e774acb309e1360337'
    $canterburyZip = Join-Path $downloadRoot 'canterbury.zip'
    $silesiaZip = Join-Path $downloadRoot 'silesia.zip'
    $canterburyExtract = Join-Path $downloadRoot 'canterbury-extract'
    $silesiaExtract = Join-Path $downloadRoot 'silesia-extract'
    New-Item -ItemType Directory -Path $downloadRoot,$canterburyExtract,$silesiaExtract,(Join-Path $Destination 'Canterbury'),(Join-Path $Destination 'Canterbury-Large'),(Join-Path $Destination 'Silesia') -Force | Out-Null

    Invoke-WebRequest -Uri "https://api.github.com/repos/nabcouwer/cantrbry/zipball/$canterburyCommit" -Headers $headers -OutFile $canterburyZip -MaximumRedirection 10
    Expand-Archive -LiteralPath $canterburyZip -DestinationPath $canterburyExtract
    $canterburySource = Get-ChildItem -LiteralPath $canterburyExtract -Directory -Recurse | Select-Object -First 1
    foreach ($row in ($corpusManifest | Where-Object Dataset -eq 'Canterbury')) {
        $candidate = Join-Path $canterburySource.FullName $row.FileName
        Copy-Item -LiteralPath $candidate -Destination (Join-Path (Join-Path $Destination 'Canterbury') $row.FileName)
    }

    foreach ($row in ($corpusManifest | Where-Object Dataset -eq 'Canterbury-Large')) {
        $uriName = [System.Uri]::EscapeDataString($row.FileName)
        $uri = "https://raw.githubusercontent.com/BeauJoh/HuffmanDecoderOnGPUs/$largeCommit/files/$uriName"
        Invoke-WebRequest -Uri $uri -OutFile (Join-Path (Join-Path $Destination 'Canterbury-Large') $row.FileName) -UserAgent 'Mozilla/5.0'
    }

    Invoke-WebRequest -Uri "https://api.github.com/repos/MiloszKrajewski/SilesiaCorpus/zipball/$silesiaCommit" -Headers $headers -OutFile $silesiaZip -MaximumRedirection 10
    Expand-Archive -LiteralPath $silesiaZip -DestinationPath $silesiaExtract
    foreach ($row in ($corpusManifest | Where-Object Dataset -eq 'Silesia')) {
        $innerZip = Get-ChildItem -LiteralPath $silesiaExtract -Filter ($row.FileName + '.zip') -File -Recurse | Select-Object -First 1
        if (-not $innerZip) { throw "Silesia archive missing $($row.FileName).zip" }
        $inner = Join-Path $downloadRoot ('inner-' + $row.FileName)
        New-Item -ItemType Directory -Path $inner -Force | Out-Null
        Expand-Archive -LiteralPath $innerZip.FullName -DestinationPath $inner
        $payload = @(Get-ChildItem -LiteralPath $inner -File -Recurse)
        if ($payload.Count -ne 1) { throw "Expected one data file in $($row.FileName).zip; found $($payload.Count)." }
        Copy-Item -LiteralPath $payload[0].FullName -Destination (Join-Path (Join-Path $Destination 'Silesia') $row.FileName)
    }
}

function New-SyntheticCorpus {
    param([string]$Destination)
    $syntheticRoot = Join-Path $Destination 'Synthetic'
    New-Item -ItemType Directory -Path $syntheticRoot -Force | Out-Null

    $logPattern = [System.Text.Encoding]::UTF8.GetBytes("2026-10-08T12:00:00Z level=INFO event=scan status=complete item=cache-000001 source=local`r`n")
    [System.IO.File]::WriteAllBytes((Join-Path $syntheticRoot 'repetitive-log-8MiB.txt'), [Rp003DiskTools]::Repeated($logPattern, 8MB))

    $jsonBytes = [Rp003DiskTools]::JsonLines(65536)
    [System.IO.File]::WriteAllBytes((Join-Path $syntheticRoot 'structured-jsonl.txt'), $jsonBytes)

    $randomPath = Join-Path $syntheticRoot 'deterministic-binary-8MiB.bin'
    [System.IO.File]::WriteAllBytes($randomPath, [Rp003DiskTools]::DeterministicBytes(8MB))
    $randomZip = Join-Path $syntheticRoot 'already-compressed-zip.zip'
    Compress-Archive -LiteralPath $randomPath -DestinationPath $randomZip -CompressionLevel Optimal

    $smallRoot = Join-Path $syntheticRoot 'small-files-1000'
    New-Item -ItemType Directory -Path $smallRoot | Out-Null
    for ($i = 0; $i -lt 1000; $i++) {
        $record = ('id={0:D4};status=complete;source=local;retained=true;' -f $i).PadRight(96, 'x')
        [System.IO.File]::WriteAllText((Join-Path $smallRoot ('record-{0:D4}.txt' -f $i)), $record, [System.Text.Encoding]::ASCII)
    }

    @(
        [pscustomobject]@{ Dataset = 'Synthetic'; Sample = 'repetitive-log-8MiB'; Category = 'Synthetic repetitive text'; Path = Join-Path $syntheticRoot 'repetitive-log-8MiB.txt'; Repeats = $SyntheticRepeats },
        [pscustomobject]@{ Dataset = 'Synthetic'; Sample = 'structured-jsonl'; Category = 'Synthetic structured text'; Path = Join-Path $syntheticRoot 'structured-jsonl.txt'; Repeats = $SyntheticRepeats },
        [pscustomobject]@{ Dataset = 'Synthetic'; Sample = 'deterministic-binary-8MiB'; Category = 'Synthetic high-entropy binary'; Path = $randomPath; Repeats = $SyntheticRepeats },
        [pscustomobject]@{ Dataset = 'Synthetic'; Sample = 'already-compressed-zip'; Category = 'Already compressed archive'; Path = $randomZip; Repeats = $SyntheticRepeats },
        [pscustomobject]@{ Dataset = 'Synthetic'; Sample = 'small-files-1000'; Category = 'Many small files'; Path = $smallRoot; Repeats = $SyntheticRepeats }
    )
}

$rows = [System.Collections.Generic.List[object]]::new()
$sourceChecks = [System.Collections.Generic.List[object]]::new()
$cleanupSucceeded = $false

try {
    if (-not $dataRoot) {
        $dataRoot = Join-Path $workRoot 'datasets'
        Add-DownloadedCorpus -Destination $dataRoot
    }

    $volumeRoot = [System.IO.Path]::GetPathRoot([System.IO.Path]::GetFullPath($dataRoot))
    $volumeLetter = $volumeRoot.Substring(0, 1)
    $volume = Get-Volume -DriveLetter $volumeLetter
    if ($volume.FileSystem -ne 'NTFS') {
        throw "The experiment requires NTFS for the compact arm; $volumeLetter`: is $($volume.FileSystem)."
    }

    foreach ($entry in $corpusManifest) {
        $sourcePath = Join-Path (Join-Path $dataRoot $entry.Dataset) $entry.FileName
        if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) { throw "Corpus file missing: $($entry.Dataset)/$($entry.FileName)" }
        $file = Get-Item -LiteralPath $sourcePath
        $actualSha = (Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash
        $actualMd5 = (Get-FileHash -LiteralPath $sourcePath -Algorithm MD5).Hash
        $verified = ($file.Length -eq [long]$entry.Bytes -and $actualSha -eq $entry.SHA256 -and $actualMd5 -eq $entry.MD5)
        $sourceChecks.Add([pscustomobject]@{
            Dataset = $entry.Dataset; FileName = $entry.FileName; Category = $entry.Category
            ExpectedBytes = [long]$entry.Bytes; ActualBytes = [long]$file.Length
            ExpectedSHA256 = $entry.SHA256; ActualSHA256 = $actualSha
            ExpectedMD5 = $entry.MD5; ActualMD5 = $actualMd5; IntegrityPassed = $verified
        })
        if (-not $verified) { throw "Corpus integrity check failed: $($entry.Dataset)/$($entry.FileName)" }
    }

    $cases = [System.Collections.Generic.List[object]]::new()
    foreach ($entry in $corpusManifest) {
        $samplePath = Join-Path (Join-Path $dataRoot $entry.Dataset) $entry.FileName
        $cases.Add([pscustomobject]@{ Dataset = $entry.Dataset; Sample = $entry.FileName; Category = $entry.Category; Path = $samplePath; Repeats = $PublicRepeats })
    }

    if (-not $SkipAggregateCases) {
        foreach ($dataset in @('Canterbury', 'Canterbury-Large', 'Silesia')) {
            $repeats = if ($dataset -eq 'Silesia') { 1 } else { $PublicRepeats }
            $cases.Add([pscustomobject]@{ Dataset = $dataset; Sample = 'Complete corpus folder'; Category = 'Corpus aggregate'; Path = Join-Path $dataRoot $dataset; Repeats = $repeats })
        }
    }
    foreach ($case in (New-SyntheticCorpus -Destination $workRoot)) { $cases.Add($case) }

    foreach ($case in $cases) {
        $sourceStats = Get-TreeStatistics -Path $case.Path
        for ($repeat = 1; $repeat -le $case.Repeats; $repeat++) {
            $trialId = ([guid]::NewGuid().ToString('N'))
            $trialRoot = Join-Path $workRoot ('trial-' + $trialId)
            New-Item -ItemType Directory -Path $trialRoot -Force | Out-Null

            $zipInput = Join-Path $trialRoot 'zip-input'
            Copy-CaseTree -Source $case.Path -Destination $zipInput
            $sourceItem = Get-Item -LiteralPath $case.Path
            $zipTarget = if ($sourceItem.PSIsContainer) { $zipInput } else { Join-Path $zipInput $sourceItem.Name }
            $zipOutput = Join-Path $trialRoot 'result.zip'
            $watch = [System.Diagnostics.Stopwatch]::StartNew()
            if ((Get-Item -LiteralPath $zipTarget).PSIsContainer) {
                Compress-Archive -Path (Join-Path $zipTarget '*') -DestinationPath $zipOutput -CompressionLevel Optimal
            } else {
                Compress-Archive -LiteralPath $zipTarget -DestinationPath $zipOutput -CompressionLevel Optimal
            }
            $watch.Stop()
            $zipBytes = [long](Get-Item -LiteralPath $zipOutput).Length
            $zipExtract = Join-Path $trialRoot 'zip-extracted'
            Expand-Archive -LiteralPath $zipOutput -DestinationPath $zipExtract
            $zipRoundTrip = Get-TreeStatistics -Path $zipExtract
            $zipOk = ($zipRoundTrip.Digest -eq $sourceStats.Digest -and $zipRoundTrip.LogicalBytes -eq $sourceStats.LogicalBytes)
            if (-not $zipOk) { throw "ZIP round-trip integrity failed: $($case.Dataset)/$($case.Sample), run $repeat" }

            [double]$zipPct = (($zipBytes / [double]$sourceStats.LogicalBytes) - 1.0) * 100.0
            $rows.Add([pscustomobject]@{
                Dataset = $case.Dataset; Sample = $case.Sample; Category = $case.Category
                Method = 'ZIP Optimal'; Repeat = $repeat; Files = $sourceStats.Files
                InputLogicalBytes = $sourceStats.LogicalBytes; ReferenceAllocatedBytes = $sourceStats.LogicalBytes
                OutputBytes = $zipBytes; ChangeBytes = ($zipBytes - $sourceStats.LogicalBytes)
                ChangePercent = [Math]::Round($zipPct, 6); RatioInputOverOutput = [Math]::Round($sourceStats.LogicalBytes / [double]$zipBytes, 6)
                DurationMilliseconds = $watch.Elapsed.TotalMilliseconds
                InputManifestSHA256 = $sourceStats.Digest; RoundTripManifestSHA256 = $zipRoundTrip.Digest
                IntegrityPassed = $zipOk
            })

            $ntfsRoot = Join-Path $trialRoot 'ntfs-input'
            Copy-CaseTree -Source $case.Path -Destination $ntfsRoot
            $ntfsBefore = Get-TreeStatistics -Path $ntfsRoot
            if ($ntfsBefore.Digest -ne $sourceStats.Digest) { throw "NTFS test copy differs before compression: $($case.Dataset)/$($case.Sample), run $repeat" }
            $watch = [System.Diagnostics.Stopwatch]::StartNew()
            & compact.exe /c /q "/s:$ntfsRoot" | Out-Null
            $compactExit = $LASTEXITCODE
            $watch.Stop()
            if ($compactExit -ne 0) { throw "compact.exe failed with exit code $compactExit for $($case.Dataset)/$($case.Sample), run $repeat" }
            $ntfsAfter = Get-TreeStatistics -Path $ntfsRoot
            $ntfsOk = ($ntfsAfter.Digest -eq $sourceStats.Digest -and $ntfsAfter.LogicalBytes -eq $sourceStats.LogicalBytes)
            if (-not $ntfsOk) { throw "NTFS compression changed content: $($case.Dataset)/$($case.Sample), run $repeat" }

            [double]$ntfsPct = (($ntfsAfter.AllocatedBytes / [double]$ntfsBefore.AllocatedBytes) - 1.0) * 100.0
            $rows.Add([pscustomobject]@{
                Dataset = $case.Dataset; Sample = $case.Sample; Category = $case.Category
                Method = 'NTFS compact'; Repeat = $repeat; Files = $ntfsAfter.Files
                InputLogicalBytes = $ntfsAfter.LogicalBytes; ReferenceAllocatedBytes = $ntfsBefore.AllocatedBytes
                OutputBytes = $ntfsAfter.AllocatedBytes; ChangeBytes = ($ntfsAfter.AllocatedBytes - $ntfsBefore.AllocatedBytes)
                ChangePercent = [Math]::Round($ntfsPct, 6); RatioInputOverOutput = [Math]::Round($ntfsBefore.AllocatedBytes / [double]$ntfsAfter.AllocatedBytes, 6)
                DurationMilliseconds = $watch.Elapsed.TotalMilliseconds
                InputManifestSHA256 = $sourceStats.Digest; RoundTripManifestSHA256 = $ntfsAfter.Digest
                IntegrityPassed = $ntfsOk
            })

            Remove-Item -LiteralPath $trialRoot -Recurse -Force
        }
    }

    $resultsPath = Join-Path $outputFull 'results.csv'
    $checksPath = Join-Path $outputFull 'source-checks.csv'
    $metadataPath = Join-Path $outputFull 'experiment-metadata.json'
    $rows | Export-Csv -LiteralPath $resultsPath -NoTypeInformation -Encoding UTF8
    $sourceChecks | Export-Csv -LiteralPath $checksPath -NoTypeInformation -Encoding UTF8
    $metadata = [ordered]@{
        study = 'RCS-RP-003'
        executionDateLocal = (Get-Date).ToString('yyyy-MM-dd')
        operatingSystem = 'Windows desktop'
        filesystem = 'NTFS'
        archiveMethod = 'PowerShell Compress-Archive -CompressionLevel Optimal'
        nativeCompression = 'compact.exe /c /q; GetCompressedFileSizeW for allocated-byte measurement'
        publicCorpusRepeats = $PublicRepeats
        syntheticRepeats = $SyntheticRepeats
        sourceFiles = $sourceChecks.Count
        testCases = $cases.Count
        resultRows = $rows.Count
        allIntegrityChecksPassed = (($sourceChecks | Where-Object { -not $_.IntegrityPassed }).Count -eq 0 -and ($rows | Where-Object { -not $_.IntegrityPassed }).Count -eq 0)
        timings = 'Descriptive end-to-end wall time only; not used as a general performance comparison.'
    }
    $metadata | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $metadataPath -Encoding UTF8

    [pscustomobject]@{
        Cases = $cases.Count; SourceFiles = $sourceChecks.Count; Measurements = $rows.Count
        IntegrityPassed = $metadata.allIntegrityChecksPassed; Results = $resultsPath; Metadata = $metadataPath
    }
} finally {
    if (Test-Path -LiteralPath $workRoot -PathType Container) {
        try {
            $resolvedWork = [System.IO.Path]::GetFullPath($workRoot)
            if (-not $resolvedWork.StartsWith($scratchRootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
                throw 'Refusing to remove a work folder outside the chosen scratch root.'
            }
            Remove-Item -LiteralPath $resolvedWork -Recurse -Force
            $cleanupSucceeded = $true
        } catch {
            Write-Warning "Study scratch cleanup did not complete: $($_.Exception.Message)"
        }
    }
}
