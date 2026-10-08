from __future__ import annotations

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parent
DEFAULT_OUTPUT = ROOT / "generated" / "RCS-RP-003-Package_v2.0.zip"


def package_files() -> dict[str, Path]:
    generated = ROOT / "generated"
    return {
        "PACKAGE-CONTENTS.md": ROOT / "PACKAGE-CONTENTS.md",
        "README.md": ROOT / "README.md",
        "study-manuscript.md": ROOT / "study-manuscript.md",
        "RCS-RP-003_Report_FR_v2.0.pdf": generated / "RCS-RP-003_Report_FR_v2.0.pdf",
        "RCS-RP-003_Report_FR_v2.0.docx": generated / "RCS-RP-003_Report_FR_v2.0.docx",
        "RCS-RP-003-data.xlsx": generated / "RCS-RP-003-data.xlsx",
        "results.csv": generated / "results.csv",
        "summary-by-case.csv": generated / "summary-by-case.csv",
        "results-summary.md": generated / "results-summary.md",
        "source-checks.csv": generated / "source-checks.csv",
        "experiment-metadata.json": generated / "experiment-metadata.json",
        "corpus-manifest.csv": ROOT / "corpus-manifest.csv",
        "sources.csv": ROOT / "sources.csv",
        "reproduce.ps1": ROOT / "reproduce.ps1",
        "analyze_results.py": ROOT / "analyze_results.py",
        "build_report.py": ROOT / "build_report.py",
        "build_pdf.py": ROOT / "build_pdf.py",
        "figures/RCS-RP-003-Silesia-ratio.png": generated / "figures" / "RCS-RP-003-Silesia-ratio.png",
        "figures/RCS-RP-003-Silesia-change.png": generated / "figures" / "RCS-RP-003-Silesia-change.png",
    }


def create_package(output: Path) -> None:
    files = package_files()
    missing = [str(path) for path in files.values() if not path.is_file()]
    if missing:
        raise FileNotFoundError("Required package files are missing:\n" + "\n".join(missing))
    output.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(output, "w", compression=ZIP_DEFLATED, compresslevel=6) as archive:
        for archive_name, source in files.items():
            archive.write(source, arcname=f"RCS-RP-003/{archive_name}")
    with ZipFile(output, "r") as archive:
        corrupt = archive.testzip()
        if corrupt is not None:
            raise ValueError(f"Archive integrity check failed at {corrupt}")
        actual = set(archive.namelist())
        expected = {f"RCS-RP-003/{name}" for name in files}
        if actual != expected:
            raise ValueError("Archive members do not match the declared study package.")
    print(f"Created {output} ({len(files)} files)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the reproducible RCS-RP-003 release package.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    create_package(args.output)


if __name__ == "__main__":
    main()
