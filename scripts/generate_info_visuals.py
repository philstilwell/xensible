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


def adoption_value_scan():
    img = Image.new("RGB", (WIDTH, HEIGHT), SURFACE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, WIDTH, 24), fill=TEAL)
    draw_header(
        draw,
        "adoption guide",
        "AI adoption value scan",
        "The best starting point is not a tool demo. It is a map of where work really goes and which valuable tasks keep getting ignored.",
    )

    steps = [
        (
            "Map time sinks",
            "Where do people spend repeated hours drafting, summarizing, searching, coordinating, or reworking?",
        ),
        (
            "Name neglected work",
            "What important tasks are delayed because no one has enough attention, time, or confidence?",
        ),
        (
            "Find AI-fit tasks",
            "Which candidates involve language, structure, comparison, planning, learning, or first drafts?",
        ),
        (
            "Score responsibly",
            "Rate value, risk, readiness, data sensitivity, review burden, and human ownership.",
        ),
        (
            "Choose next step",
            "Train, pilot, wait, avoid, or send to the right specialist owner before moving further.",
        ),
    ]

    card_w = 400
    card_h = 430
    top = 440
    gap = 52
    start = 110
    for i, (title, body) in enumerate(steps, start=1):
        x = start + (i - 1) * (card_w + gap)
        accent = [TEAL, CLAY, BRASS, TEAL, CLAY][i - 1]
        rounded(draw, (x, top, x + card_w, top + card_h), 26, PAPER, LINE, width=2)
        rounded(draw, (x + 28, top + 28, x + 96, top + 96), 18, MIST)
        draw.text((x + 52, top + 45), str(i), font=font(32, bold=True), fill=accent)
        wrapped(draw, title, (x + 30, top + 130), card_w - 60, font(38, bold=True), INK, line_gap=6)
        wrapped(draw, body, (x + 30, top + 230), card_w - 60, font(25), MUTED, line_gap=8)
        if i < len(steps):
            mid_y = top + card_h // 2
            draw.line((x + card_w + 10, mid_y, x + card_w + gap - 12, mid_y), fill=LINE, width=5)
            draw.polygon(
                [
                    (x + card_w + gap - 12, mid_y),
                    (x + card_w + gap - 32, mid_y - 14),
                    (x + card_w + gap - 32, mid_y + 14),
                ],
                fill=BRASS,
            )

    rounded(draw, (165, 930, 2235, 1125), 26, TEAL)
    draw.text((205, 970), "Xensible framing question", font=font(30, bold=True), fill=BRASS_LIGHT)
    wrapped(
        draw,
        "Where is the organization losing time, and what useful work is being left undone? AI fluency helps teams explore those gaps safely before making expensive technology decisions.",
        (205, 1018),
        1930,
        font(28),
        SURFACE,
        line_gap=9,
    )

    rounded(draw, (600, 1188, 1800, 1278), 18, WARM, LINE, width=2)
    draw.text((640, 1218), "Output:", font=font(28, bold=True), fill=INK)
    wrapped(
        draw,
        "a ranked list of training candidates, pilot ideas, wait items, and specialist-review questions.",
        (752, 1208),
        980,
        font(27),
        INK_SOFT,
        line_gap=6,
    )
    return img


def responsible_adoption_loop():
    img = Image.new("RGB", (WIDTH, HEIGHT), SURFACE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, WIDTH, 24), fill=TEAL)
    draw_header(
        draw,
        "practice model",
        "Responsible AI adoption loop",
        "A learning cycle for building fluency, bounded workflows, review habits, and shared team norms.",
    )

    center = (1200, 735)
    nodes = [
        ("Learn", "Build shared language and basic AI fluency.", (280, 460, 700, 630), CLAY),
        ("Bound", "Set data, review, and approval boundaries.", (850, 385, 1270, 555), TEAL),
        ("Practice", "Use realistic, non-sensitive scenarios.", (1700, 460, 2120, 630), BRASS),
        ("Evaluate", "Check quality, usefulness, risk, and review burden.", (1700, 820, 2120, 990), TEAL),
        ("Capture", "Document prompts, lessons, mistakes, and examples.", (850, 895, 1270, 1065), CLAY),
        ("Normalize", "Share what works and update team habits.", (280, 820, 700, 990), BRASS),
    ]

    for title, body, box, accent in nodes:
        x1, y1, x2, y2 = box
        connector(draw, center, ((x1 + x2) / 2, (y1 + y2) / 2), LINE)
        rounded(draw, box, 24, PAPER, LINE, width=2)
        rounded(draw, (x1 + 26, y1 + 28, x1 + 78, y1 + 80), 15, MIST)
        draw.ellipse((x1 + 42, y1 + 44, x1 + 62, y1 + 64), fill=accent)
        draw.text((x1 + 104, y1 + 28), title, font=font(34, bold=True), fill=INK)
        wrapped(draw, body, (x1 + 104, y1 + 82), x2 - x1 - 132, font(23), MUTED, line_gap=6)

    rounded(draw, (930, 580, 1470, 890), 42, TEAL)
    centered(draw, "Human judgment", 655, font(44, bold=True), SURFACE)
    centered(draw, "+", 717, font(46, bold=True), BRASS_LIGHT)
    centered(draw, "business context", 770, font(44, bold=True), SURFACE)

    rounded(draw, (110, 1190, 2290, 1285), 18, WARM, LINE, width=2)
    draw.text((146, 1223), "Adoption rule:", font=font(28, bold=True), fill=INK)
    draw.text(
        (350, 1223),
        "Do not scale a workflow until its value, data boundaries, review owner, and failure modes are understood.",
        font=font(28),
        fill=INK_SOFT,
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
    save_asset(adoption_value_scan(), "ai-adoption-value-scan")
    save_asset(responsible_adoption_loop(), "responsible-ai-adoption-loop")


if __name__ == "__main__":
    main()
