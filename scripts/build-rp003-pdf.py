from __future__ import annotations

import argparse
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "research" / "RCS-RP-003" / "README.md"
DEFAULT_OUTPUT = ROOT / "output" / "pdf" / "RCS-RP-003.pdf"
FONT_DIR = Path(r"C:\Windows\Fonts")


def register_fonts() -> None:
    regular = FONT_DIR / "arial.ttf"
    bold = FONT_DIR / "arialbd.ttf"
    italic = FONT_DIR / "ariali.ttf"
    bold_italic = FONT_DIR / "arialbi.ttf"
    for font in (regular, bold, italic, bold_italic):
        if not font.exists():
            raise FileNotFoundError(f"Required font not found: {font}")
    pdfmetrics.registerFont(TTFont("RPArial", str(regular)))
    pdfmetrics.registerFont(TTFont("RPArial-Bold", str(bold)))
    pdfmetrics.registerFont(TTFont("RPArial-Italic", str(italic)))
    pdfmetrics.registerFont(TTFont("RPArial-BoldItalic", str(bold_italic)))
    pdfmetrics.registerFontFamily(
        "RPArial",
        normal="RPArial",
        bold="RPArial-Bold",
        italic="RPArial-Italic",
        boldItalic="RPArial-BoldItalic",
    )
    pdfmetrics.registerFont(TTFont("RPMono", str(Path(r"C:\Windows\Fonts\consola.ttf"))))


def inline_markup(text: str) -> str:
    text = escape(text)
    text = re.sub(
        r"\[([^\]]+)\]\((https?://[^ )]+)\)",
        lambda match: f'<link href="{match.group(2)}" color="#315f45">{match.group(1)}</link>',
        text,
    )
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"`([^`]+)`", r'<font name="RPMono" size="8">\1</font>', text)
    return text


def page_footer(canvas, doc) -> None:
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(colors.HexColor("#d2c8b8"))
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.setFont("RPArial", 8)
    canvas.setFillColor(colors.HexColor("#53665a"))
    canvas.drawString(18 * mm, 9 * mm, "RCS-RP-003 · Méthodes, données et limites")
    canvas.drawRightString(width - 18 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "RPTitle", parent=base["Title"], fontName="RPArial-Bold", fontSize=23,
            leading=27, textColor=colors.HexColor("#23392f"), alignment=TA_LEFT,
            spaceBefore=7, spaceAfter=15,
        ),
        "h2": ParagraphStyle(
            "RPH2", parent=base["Heading2"], fontName="RPArial-Bold", fontSize=15,
            leading=19, textColor=colors.HexColor("#315f45"), spaceBefore=14, spaceAfter=7,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "RPH3", parent=base["Heading3"], fontName="RPArial-Bold", fontSize=11,
            leading=14, textColor=colors.HexColor("#79583e"), spaceBefore=10, spaceAfter=5,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "RPBody", parent=base["BodyText"], fontName="RPArial", fontSize=9.3,
            leading=13.5, textColor=colors.HexColor("#273b32"), spaceAfter=7,
            splitLongWords=True,
        ),
        "bullet": ParagraphStyle(
            "RPBullet", parent=base["BodyText"], fontName="RPArial", fontSize=9.1,
            leading=13, leftIndent=12, firstLineIndent=-8,
            textColor=colors.HexColor("#273b32"), spaceAfter=5,
            splitLongWords=True,
        ),
        "table": ParagraphStyle(
            "RPTable", parent=base["BodyText"], fontName="RPArial", fontSize=7.2,
            leading=9.2, textColor=colors.HexColor("#273b32"), spaceAfter=0,
            splitLongWords=True,
        ),
        "table_head": ParagraphStyle(
            "RPTableHead", parent=base["BodyText"], fontName="RPArial-Bold", fontSize=7.1,
            leading=9.1, textColor=colors.white, spaceAfter=0,
            splitLongWords=True,
        ),
        "meta": ParagraphStyle(
            "RPMeta", parent=base["BodyText"], fontName="RPArial", fontSize=8.5,
            leading=11.5, textColor=colors.HexColor("#58685e"), spaceAfter=4,
        ),
    }


def parse_markdown(source: Path, styles) -> list:
    lines = source.read_text(encoding="utf-8").splitlines()
    story = []
    index = 0

    def make_table(table_lines: list[str]):
        rows = []
        for row_number, line in enumerate(table_lines):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in cells):
                continue
            style = styles["table_head"] if row_number == 0 else styles["table"]
            rows.append([Paragraph(inline_markup(cell), style) for cell in cells])
        if not rows:
            return None
        widths = [39 * mm, 25 * mm, 24 * mm, 20 * mm, 32 * mm, 24 * mm]
        table = Table(rows, colWidths=widths, repeatRows=1, hAlign="LEFT")
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#315f45")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d2c8b8")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f1e8")]),
        ]))
        return table

    while index < len(lines):
        line = lines[index].strip()
        if not line or line == "---":
            index += 1
            continue
        if line.startswith("|"):
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            table = make_table(table_lines)
            if table:
                story.extend([Spacer(1, 4), table, Spacer(1, 8)])
            continue
        if line.startswith("### "):
            story.append(Paragraph(inline_markup(line[4:]), styles["h3"]))
            index += 1
            continue
        if line.startswith("## "):
            story.append(Paragraph(inline_markup(line[3:]), styles["h2"]))
            index += 1
            continue
        if line.startswith("# "):
            story.append(Paragraph(inline_markup(line[2:]), styles["title"]))
            index += 1
            continue
        if line.startswith("- "):
            story.append(Paragraph("• " + inline_markup(line[2:]), styles["bullet"]))
            index += 1
            continue
        numbered = re.match(r"^(\d+)\.\s+(.*)$", line)
        if numbered:
            story.append(Paragraph(f"<b>{numbered.group(1)}.</b> " + inline_markup(numbered.group(2)), styles["bullet"]))
            index += 1
            continue
        if line.startswith("**") and line.endswith("**"):
            story.append(Paragraph(inline_markup(line), styles["meta"]))
            index += 1
            continue

        paragraph_lines = [line]
        index += 1
        while index < len(lines):
            next_line = lines[index].strip()
            if (
                not next_line or next_line == "---" or next_line.startswith(("#", "|", "- "))
                or re.match(r"^\d+\.\s+", next_line)
            ):
                break
            paragraph_lines.append(next_line)
            index += 1
        story.append(Paragraph(inline_markup(" ".join(paragraph_lines)), styles["body"]))
    return story


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    styles = build_styles()
    story = parse_markdown(SOURCE, styles)
    doc = SimpleDocTemplate(
        str(args.output), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm,
        topMargin=17 * mm, bottomMargin=20 * mm,
        title="RCS-RP-003 — Reprendre le contrôle de l’espace disque d’un PC Windows",
        author="Raiju Cloud System",
        subject="Étude pratique sur le diagnostic, le tri et la compression du stockage local",
        keywords="RCS-RP-003, Windows, disque, stockage, NTFS, WizTree, compression, Zenodo 10.5281/zenodo.23233639",
    )
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    print(f"Created {args.output} ({args.output.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
