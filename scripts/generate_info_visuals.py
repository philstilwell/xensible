from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont


OUT_DIR = Path("public/visuals")
WIDTH = 2400
HEIGHT = 1350

SURFACE = "#f7f9f6"
MIST = "#eaf2ee"
PAPER = "#ffffff"
WARM = "#f4f1eb"
INK = "#172b31"
INK_SOFT = "#31474d"
MUTED = "#65767a"
TEAL = "#1c4c54"
CLAY = "#bd6656"
BRASS = "#d3b171"
BRASS_LIGHT = "#ecd294"
LINE = "#d7e3de"


FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    path = FONT_BOLD if bold else FONT_REGULAR
    return ImageFont.truetype(path, size)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrapped(draw, text, xy, max_width, typeface, fill, line_gap=8):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=typeface)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    x, y = xy
    line_height = typeface.size + line_gap
    for line in lines:
        draw.text((x, y), line, font=typeface, fill=fill)
        y += line_height
    return y


def centered(draw, text, y, typeface, fill):
    bbox = draw.textbbox((0, 0), text, font=typeface)
    x = (WIDTH - (bbox[2] - bbox[0])) / 2
    draw.text((x, y), text, font=typeface, fill=fill)


def badge(draw, xy, label, fill=TEAL):
    x, y = xy
    label_font = font(28, bold=True)
    bbox = draw.textbbox((0, 0), label, font=label_font)
    w = bbox[2] - bbox[0] + 42
    rounded(draw, (x, y, x + w, y + 54), 12, fill)
    draw.text((x + 21, y + 12), label, font=label_font, fill=SURFACE)
    return w


def draw_header(draw, eyebrow, title, subtitle):
    badge(draw, (110, 88), eyebrow, CLAY)
    draw.text((110, 172), title, font=font(76, bold=True), fill=INK)
    wrapped(draw, subtitle, (112, 274), 1260, font(34), MUTED, line_gap=10)
    rounded(draw, (1980, 92, 2290, 210), 22, TEAL)
    draw.text((2040, 120), "Xensible", font=font(34, bold=True), fill=SURFACE)
    draw.text((2040, 164), "AI fluency", font=font(28), fill=BRASS_LIGHT)


def card(draw, box, title, body, accent=TEAL, number=None):
    x1, y1, x2, y2 = box
    rounded(draw, box, 22, PAPER, LINE, width=2)
    rounded(draw, (x1 + 26, y1 + 28, x1 + 74, y1 + 76), 14, MIST)
    if number is None:
        draw.ellipse((x1 + 41, y1 + 43, x1 + 59, y1 + 61), fill=accent)
    else:
        draw.text((x1 + 39, y1 + 36), str(number).zfill(2), font=font(22, bold=True), fill=accent)
    draw.text((x1 + 96, y1 + 28), title, font=font(32, bold=True), fill=INK)
    wrapped(draw, body, (x1 + 96, y1 + 82), x2 - x1 - 130, font(22), MUTED, line_gap=6)


def connector(draw, start, end, color=LINE):
    draw.line((start[0], start[1], end[0], end[1]), fill=color, width=4)
    r = 7
    draw.ellipse((end[0] - r, end[1] - r, end[0] + r, end[1] + r), fill=BRASS)


def ai_uses():
    img = Image.new("RGB", (WIDTH, HEIGHT), SURFACE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, WIDTH, 24), fill=TEAL)
    draw_header(
        draw,
        "public guide",
        "AI uses you may not have considered",
        "A map for AI-curious professionals: practical places to experiment before making expensive technology decisions.",
    )

    hub = (1050, 515, 1350, 835)
    rounded(draw, hub, 42, TEAL)
    centered(draw, "Start with", 578, font(34, bold=True), BRASS_LIGHT)
    centered(draw, "a safe", 630, font(52, bold=True), SURFACE)
    centered(draw, "practice task", 690, font(52, bold=True), SURFACE)
    centered(draw, "then review", 762, font(30), BRASS_LIGHT)

    items = [
        ("Decision rehearsal", "Compare options, surface assumptions, and run a pre-mortem before a meeting."),
        ("Meeting momentum", "Build agendas, prep questions, action summaries, and follow-up notes."),
        ("Learning accelerator", "Ask for analogies, quizzes, examples, and explanations at your level."),
        ("Research compass", "Generate better questions, search terms, source categories, and verification steps."),
        ("Writing studio", "Shape first drafts, rewrite for audience, tighten structure, and check tone."),
        ("Workflow sketching", "Turn a repeated task into steps, inputs, review points, and human decision gates."),
        ("Roleplay practice", "Practice interviews and difficult conversations."),
        ("Pattern finding", "Sort public or anonymized notes into themes, risks, questions, and next actions."),
    ]

    boxes = [
        (110, 390, 680, 575),
        (110, 630, 680, 815),
        (110, 870, 680, 1055),
        (760, 990, 1320, 1175),
        (1720, 390, 2290, 575),
        (1720, 630, 2290, 815),
        (1720, 870, 2290, 1055),
        (1380, 990, 1940, 1175),
    ]
    hub_points = [
        (1050, 570),
        (1050, 662),
        (1050, 754),
        (1180, 835),
        (1350, 570),
        (1350, 662),
        (1350, 754),
        (1250, 835),
    ]
    accents = [CLAY, TEAL, BRASS, CLAY, TEAL, CLAY, BRASS, TEAL]

    for i, (item, box) in enumerate(zip(items, boxes), start=1):
        x1, y1, x2, y2 = box
        connector(draw, hub_points[i - 1], ((x1 + x2) / 2, y1 if y1 > 835 else y2), LINE)
        title, body = item
        card(draw, box, title, body, accent=accents[i - 1], number=i)

    rounded(draw, (110, 1226, 2290, 1300), 18, WARM, LINE, width=2)
    draw.text((146, 1248), "Safe practice rule:", font=font(26, bold=True), fill=INK)
    draw.text(
        (386, 1248),
        "Use public, fictional, or anonymized material. Keep patient, customer, employee, legal, financial, and proprietary data out of public tools.",
        font=font(26),
        fill=INK_SOFT,
    )
    return img


def tool_classes():
    img = Image.new("RGB", (WIDTH, HEIGHT), SURFACE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, WIDTH, 24), fill=TEAL)
    draw_header(
        draw,
        "tool map",
        "AI tools by utility class",
        "Names change quickly. The durable skill is recognizing what kind of work each tool class is meant to support.",
    )

    classes = [
        ("General assistants", "ChatGPT, Claude, Gemini", "Draft, explain, reason, summarize, brainstorm, and work across text, images, files, and conversation."),
        ("Research & sources", "Perplexity, NotebookLM, Deep Research", "Explore questions, synthesize source material, compare claims, and keep verification visible."),
        ("Workplace copilots", "Microsoft Copilot, Gemini Workspace", "Bring AI into email, docs, spreadsheets, meetings, calendars, and internal knowledge work."),
        ("Creative design", "Canva, Adobe Firefly, Midjourney", "Create and revise images, layouts, brand assets, presentation visuals, and campaign concepts."),
        ("Video & voice", "Runway, Descript, ElevenLabs", "Generate or edit video, clean up audio, create voiceovers, dub, and prototype media."),
        ("Coding agents", "Codex, Cursor, GitHub Copilot", "Inspect repositories, write code, edit files, run tests, explain diffs, and support review."),
        ("Automation agents", "Zapier, Make, workflow agents", "Connect apps, route information, draft handoffs, and coordinate repeatable steps."),
        ("Data sensemaking", "Spreadsheets, BI copilots, notebooks", "Clean tables, find patterns, summarize trends, and generate questions for human review."),
    ]

    left_x = 110
    right_x = 1260
    top_y = 350
    card_w = 1030
    card_h = 166
    gap = 34
    for i, (title, examples, body) in enumerate(classes):
        col = left_x if i % 2 == 0 else right_x
        row = i // 2
        y = top_y + row * (card_h + gap)
        accent = [TEAL, CLAY, BRASS, TEAL][row % 4]
        rounded(draw, (col, y, col + card_w, y + card_h), 22, PAPER, LINE, width=2)
        rounded(draw, (col + 28, y + 30, col + 92, y + 94), 18, MIST)
        draw.text((col + 48, y + 46), str(i + 1), font=font(28, bold=True), fill=accent)
        draw.text((col + 120, y + 26), title, font=font(36, bold=True), fill=INK)
        draw.text((col + 120, y + 72), examples, font=font(26, bold=True), fill=accent)
        wrapped(draw, body, (col + 120, y + 106), card_w - 150, font(22), MUTED, line_gap=6)

    rounded(draw, (110, 1200, 2290, 1290), 18, TEAL)
    draw.text((146, 1230), "Choosing cue:", font=font(28, bold=True), fill=BRASS_LIGHT)
    draw.text(
        (360, 1230),
        "Start with the job-to-be-done, then choose the smallest tool class that supports it with clear review and data boundaries.",
        font=font(28),
        fill=SURFACE,
    )
    return img


def save_asset(img, stem):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    png = OUT_DIR / f"{stem}.png"
    webp = OUT_DIR / f"{stem}.webp"
    img.save(png, optimize=True)
    img.save(webp, quality=88, method=6)
    print(png)
    print(webp)


def main():
    save_asset(ai_uses(), "ai-uses-you-may-not-have-considered")
    save_asset(tool_classes(), "ai-tools-utility-classes")


if __name__ == "__main__":
    main()
