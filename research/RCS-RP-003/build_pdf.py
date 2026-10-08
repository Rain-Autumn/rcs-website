from __future__ import annotations

import csv
import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "generated" / "RCS-RP-003_Report_FR_v2.0.pdf"
GREEN = colors.HexColor("#315F45")
PALE = colors.HexColor("#F1F5F1")
MUTED = colors.HexColor("#637269")


def load_rows(filename: str) -> list[dict[str, str]]:
    with (ROOT / "generated" / filename).open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def setup_fonts() -> tuple[str, str]:
    regular = Path(r"C:\Windows\Fonts\arial.ttf")
    bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("RCSArial", str(regular)))
        pdfmetrics.registerFont(TTFont("RCSArial-Bold", str(bold)))
        pdfmetrics.registerFontFamily("RCSArial", normal="RCSArial", bold="RCSArial-Bold", italic="RCSArial", boldItalic="RCSArial-Bold")
        return "RCSArial", "RCSArial-Bold"
    return "Helvetica", "Helvetica-Bold"


def inline_markup(value: str) -> str:
    text = html.escape(value, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r'<font name="Courier" size="8">\1</font>', text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"(https?://[^\s)]+)", lambda m: f'<link href="{html.escape(m.group(1).rstrip(".,"), quote=True)}" color="#315F45">source en ligne</link>', text)
    return text


def styles_for(base: str, bold: str) -> dict[str, ParagraphStyle]:
    sample = getSampleStyleSheet()
    return {
        "body": ParagraphStyle("RCSBody", parent=sample["BodyText"], fontName=base, fontSize=8.8, leading=12.1, textColor=colors.HexColor("#25352D"), spaceAfter=5),
        "h1": ParagraphStyle("RCSH1", parent=sample["Heading1"], fontName=bold, fontSize=16, leading=19, textColor=GREEN, spaceBefore=13, spaceAfter=7, keepWithNext=True),
        "h2": ParagraphStyle("RCSH2", parent=sample["Heading2"], fontName=bold, fontSize=12.5, leading=15, textColor=GREEN, spaceBefore=10, spaceAfter=5, keepWithNext=True),
        "h3": ParagraphStyle("RCSH3", parent=sample["Heading3"], fontName=bold, fontSize=10, leading=12, textColor=GREEN, spaceBefore=7, spaceAfter=4, keepWithNext=True),
        "small": ParagraphStyle("RCSSmall", parent=sample["BodyText"], fontName=base, fontSize=7.3, leading=9, textColor=colors.HexColor("#25352D"), spaceAfter=0),
        "caption": ParagraphStyle("RCSCaption", parent=sample["BodyText"], fontName=base, fontSize=7.7, leading=9.5, textColor=MUTED, spaceBefore=3, spaceAfter=4),
        "cover": ParagraphStyle("RCSCover", parent=sample["Title"], fontName=bold, fontSize=27, leading=33, textColor=GREEN, alignment=TA_LEFT, spaceAfter=10),
        "cover_meta": ParagraphStyle("RCSCoverMeta", parent=sample["BodyText"], fontName=base, fontSize=10, leading=15, textColor=MUTED, spaceAfter=3),
    }


def result_table(rows: list[dict[str, str]], title: str, styles: dict[str, ParagraphStyle]) -> list:
    items = [Paragraph(title, styles["caption"])]
    headings = ["Jeu / échantillon", "Méthode", "Entrée logique<br/>(octets)", "Référence<br/>(octets)", "Sortie médiane<br/>(octets)", "Variation<br/>médiane", "Essais"]
    data = [[Paragraph(f"<b>{h}</b>", styles["small"]) for h in headings]]
    for item in rows:
        label = item["Sample"]
        if item["Dataset"] != "Synthetic":
            label = f"{item['Dataset']} · {label}"
        values = [
            label,
            item["Method"],
            f"{int(item['InputLogicalBytes']):,}".replace(",", " "),
            f"{float(item['ReferenceAllocatedBytesMean']):,.0f}".replace(",", " "),
            f"{float(item['OutputBytesMedian']):,.0f}".replace(",", " "),
            f"{float(item['ChangePercentMedian']):+.2f}%",
            item["RepeatCount"],
        ]
        data.append([Paragraph(inline_markup(value), styles["small"]) for value in values])
    table = Table(data, colWidths=[42 * mm, 24 * mm, 28 * mm, 28 * mm, 29 * mm, 24 * mm, 12 * mm], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#CAD4CC")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PALE]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    items.append(table)
    return items


def header_footer(canvas, doc) -> None:
    canvas.saveState()
    w, h = A4
    if doc.page > 1:
        canvas.setStrokeColor(colors.HexColor("#D6DED8")); canvas.setLineWidth(0.45)
        canvas.line(16 * mm, h - 13 * mm, w - 16 * mm, h - 13 * mm)
        canvas.setFont("RCSArial", 7)
        canvas.setFillColor(MUTED)
        canvas.drawString(16 * mm, h - 10.5 * mm, "RAIJU CLOUD SYSTEM  /  RESEARCH PROGRAM  /  RCS-RP-003")
        canvas.line(16 * mm, 12 * mm, w - 16 * mm, 12 * mm)
        canvas.drawString(16 * mm, 8 * mm, "Version 2.0 · 8 octobre 2026")
        canvas.drawRightString(w - 16 * mm, 8 * mm, f"{doc.page}")
    canvas.restoreState()


def build() -> None:
    base, bold = setup_fonts()
    styles = styles_for(base, bold)
    cases = load_rows("summary-by-case.csv")
    source = (ROOT / "study-manuscript.md").read_text(encoding="utf-8")
    story = [Spacer(1, 47 * mm), Paragraph("RAIJU CLOUD SYSTEM&nbsp;&nbsp; / &nbsp;&nbsp;RESEARCH", styles["h3"]), Spacer(1, 8 * mm),
             Paragraph("Libérer de l’espace disque<br/>sans perdre ses données", styles["cover"]),
             Paragraph("Rapport de recherche · RCS-RP-003 · Version 2.0", styles["cover_meta"]), Spacer(1, 4 * mm)]
    for line in ("8 octobre 2026", "Contributeur : Hugues Henrotte", "DOI réservé : 10.5281/zenodo.23233639 — dépôt non publié"):
        story.append(Paragraph(line, styles["cover_meta"]))
    story.extend([Spacer(1, 49 * mm), Paragraph("Terminal personnel Windows · Volume NTFS<br/>Aucune donnée personnelle analysée", styles["body"]), PageBreak()])

    in_body = False
    inserted = set()
    bullets: list[str] = []

    def flush_bullets():
        nonlocal bullets
        for text in bullets:
            story.append(Paragraph("•&nbsp;&nbsp;" + inline_markup(text), ParagraphStyle("bullet", parent=styles["body"], leftIndent=10, firstLineIndent=-9, spaceAfter=2)))
        bullets = []

    for raw in source.splitlines():
        line = raw.strip()
        if line == "## Résumé":
            in_body = True
        if not in_body or not line:
            if not line:
                flush_bullets()
            continue
        if line.startswith("# "):
            continue
        if line.startswith("### Résumé global par corpus"):
            flush_bullets(); story.append(Paragraph("Résumé global par corpus", styles["h3"]))
            aggregate = [r for r in cases if r["Sample"] == "Complete corpus folder"]
            story.extend(result_table(aggregate, "Tableau 1 — Essais agrégés par corpus; référence propre à chaque méthode.", styles)); inserted.add("aggregate"); continue
        if line.startswith("### Cas synthétiques"):
            flush_bullets(); story.append(Paragraph("Cas synthétiques", styles["h3"]))
            story.extend(result_table([r for r in cases if r["Dataset"] == "Synthetic"], "Tableau 2 — Cinq motifs générés de façon déterministe.", styles)); inserted.add("synthetic"); continue
        if line.startswith("## Annexe A"):
            flush_bullets(); story.append(PageBreak()); story.append(Paragraph("Annexe A — Résultats détaillés par fichier", styles["h1"]))
            public = [r for r in cases if r["Dataset"] != "Synthetic" and r["Sample"] != "Complete corpus folder"]
            story.extend(result_table(public, "Tableau A1 — Médianes par entrée publique et méthode (3 répétitions chacune).", styles))
            story.append(Paragraph("La variation compare chaque sortie à la référence de sa méthode. Pour les répétitions brutes, écarts-types et empreintes, consulter le classeur et les CSV.", styles["body"]))
            inserted.add("appendix"); continue
        if line.startswith("Les tableaux exhaustifs sont produits") or line.startswith(("Le générateur de rapport insère ici", "Le générateur insère ici", "Les résultats par fichier sont générés")):
            continue
        if line.startswith("### "):
            flush_bullets(); story.append(Paragraph(inline_markup(line[4:]), styles["h3"])); continue
        if line.startswith("## "):
            flush_bullets(); story.append(Paragraph(inline_markup(line[3:]), styles["h1"])); continue
        if line.startswith("- "):
            bullets.append(line[2:]); continue
        if re.match(r"^\d+\. ", line):
            flush_bullets()
            number, text = line.split(". ", 1)
            story.append(Paragraph(f"{number}.&nbsp;&nbsp;{inline_markup(text)}", ParagraphStyle("numbered", parent=styles["body"], leftIndent=12, firstLineIndent=-12, spaceAfter=3))); continue
        flush_bullets()
        story.append(Paragraph(inline_markup(line), styles["body"]))
    flush_bullets()
    if inserted != {"aggregate", "synthetic", "appendix"}:
        raise RuntimeError(f"Missing generated result tables: {inserted}")

    figure = ROOT / "generated" / "figures" / "RCS-RP-003-Silesia-ratio.png"
    if figure.exists():
        story.extend([PageBreak(), Paragraph("Figure A1 — Corpus Silesia", styles["h1"]), Paragraph("Médiane de trois essais par fichier; un ratio supérieur à 1 indique une sortie plus petite.", styles["body"]), Spacer(1, 3 * mm)])
        image = Image(str(figure), width=175 * mm, height=92 * mm)
        story.append(image)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=16 * mm, leftMargin=16 * mm, topMargin=18 * mm, bottomMargin=17 * mm,
                            title="RCS-RP-003 — Libérer de l’espace disque sans perdre ses données", author="Raiju Cloud System")
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUT)


if __name__ == "__main__":
    build()
