# RCS-RP-003 — Disk-space management for a Windows PC

**Version 2.0 · 8 October 2026 · Raiju Cloud System · Contributor: Hugues Henrotte**
**Reserved DOI:** `10.5281/zenodo.23233639` (Zenodo record not yet published).

## Study at a glance

This is a storage-management study for a personal Windows computer, not a server compression benchmark. It compares PowerShell ZIP archives with NTFS compression on 26 publicly sourced files across Canterbury, Canterbury Large, and Silesia (225,908,846 logical bytes total), plus five deterministic synthetic cases.

The full run comprised 110 paired case executions and 220 method measurements. Each public file was run three times; synthetic cases five times; the Canterbury and Canterbury-Large aggregates three times each; the Silesia aggregate once. All 26 source-file checks and all 220 transformation-integrity checks passed.

Aggregate ZIP reductions against logical bytes were 73.96% (Canterbury), 70.80% (Canterbury Large), and 67.81% (Silesia). NTFS allocated-byte reductions were 49.74%, 37.46%, and 42.88%, respectively. These historical, text-rich corpora and one NTFS system cannot predict savings on a personal file collection. In synthetic controls, ZIP reduced a repetitive log by 99.66% and structured JSONL by 97.80%, but increased a 1,000-small-file archive by 68.75%; NTFS saved no allocated bytes for that small-file case. No personal files were inspected and no pre-existing data were changed or deleted.

## Files

- `study-manuscript.md` — full research report source.
- `generated/RCS-RP-003_Report_FR_v2.0.pdf` and `.docx` — formatted full report.
- `generated/results.csv` — 220 raw measurement rows.
- `generated/summary-by-case.csv` — descriptive summaries by input and method.
- `generated/RCS-RP-003-data.xlsx` — workbook with a results overview, numeric observations, source checks and source register.
- `generated/source-checks.csv` and `experiment-metadata.json` — input verification and run metadata.
- `corpus-manifest.csv` — 26 pinned inputs, expected lengths and hashes; corpus files are not redistributed.
- `sources.csv` — online source register, use, and limitations.
- `reproduce.ps1` — creates/validates corpus inputs, runs ZIP and NTFS cases on copies, verifies content.
- `analyze_results.py` — creates summaries, plots and workbook from raw results.
- `build_report.py`, `build_pdf.py` — create the editable DOCX and the PDF report from the manuscript and data.
- `package_study.py` and `PACKAGE-CONTENTS.md` — build the integrity-checked release ZIP without redistributing the corpus files.

## Reproduction

Use Windows on NTFS. To let the runner download the pinned public corpora, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\reproduce.ps1 -ScratchRoot $env:TEMP
```

The runner creates a unique output folder in the current working directory and a unique scratch folder below `ScratchRoot`; its cleanup targets only its own run folder. `-InputRoot` can instead point to a prepared directory containing `Canterbury`, `Canterbury-Large`, and `Silesia` subfolders. `-OutputDirectory` selects a specific output path; choose a new empty path to avoid overwriting anything. The process-scoped execution-policy option does not change the machine policy; do not weaken a broader security policy. Inspect the script before running it.

To analyze a completed output folder:

```powershell
python .\analyze_results.py --input-dir <results-folder> --output-dir <results-folder>
```

The tests create and transform only copies of corpus files and generated synthetic fixtures. They do not scan user folders, install software, clean a disk, or modify existing personal files. The study does not benchmark CPU time, latency, power, or the WizTree product. See the full report for definitions, limits, cited documentation and practical guidance.
