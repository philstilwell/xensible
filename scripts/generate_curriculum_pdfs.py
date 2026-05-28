from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


INK = colors.HexColor("#172b31")
TEAL = colors.HexColor("#1c4c54")
CLAY = colors.HexColor("#bd6656")
BRASS = colors.HexColor("#d3b171")
MIST = colors.HexColor("#eaf2ee")
SURFACE = colors.HexColor("#f7f9f6")


CURRICULA = [
    {
        "slug": "ai-fluency-essentials",
        "title": "AI Fluency Essentials",
        "eyebrow": "90-minute Zoom intro",
        "summary": "A calm, practical introduction for people who want to understand LLMs, use them safely, and build confidence with ordinary work tasks.",
        "format": "One 90-minute Zoom session with guided practice and a follow-up handout.",
        "audience": "Curious professionals, mixed-comfort teams, and organizations that need a shared starting point before deeper tool decisions.",
        "outcomes": [
            "Explain what LLMs are good at, where they fail, and why human review matters.",
            "Use a basic prompting loop for drafting, summarizing, planning, and asking better questions.",
            "Recognize sensitive-data boundaries and safer ways to practice with non-sensitive examples.",
        ],
        "modules": [
            ("The practical mental model", "Participants learn how prompts, context, instructions, examples, and review shape an AI session without needing technical background."),
            ("Prompting as conversation design", "We practice turning vague requests into useful context, constraints, examples, and review questions."),
            ("Safe experimentation", "The session establishes clear boundaries around patient, customer, employee, legal, financial, and proprietary information."),
            ("Confidence routines", "Participants leave with small repeatable habits: draft, critique, revise, verify, and decide what still needs human judgment."),
        ],
        "materials": [
            "AI fluency starter guide",
            "Prompt pattern quick sheet",
            "Sensitive-data boundary checklist",
            "Output review checklist",
        ],
        "diagram_slots": [
            "LLM session loop: prompt, context, output, review, revision",
            "Safe-data boundary map for public AI tools",
        ],
    },
    {
        "slug": "practical-ai-workflows",
        "title": "Practical AI Workflows",
        "eyebrow": "Half-day or two-session workshop",
        "summary": "Hands-on workflow training for writing, planning, research support, meeting preparation, and everyday knowledge work.",
        "format": "Two 90-minute Zoom sessions or one half-day remote workshop.",
        "audience": "Teams and professionals who already understand the basics and want practical routines they can reuse.",
        "outcomes": [
            "Build repeatable workflows for common work without copying sensitive data into public tools.",
            "Use AI to generate first drafts, alternatives, summaries, meeting artifacts, and decision support.",
            "Develop review habits that keep the human responsible for quality, context, and final judgment.",
        ],
        "modules": [
            ("Workflow anatomy", "We break a task into input, constraints, AI assist, review, revision, and final human decision."),
            ("Writing and rewriting", "Participants practice using AI for tone, structure, audience adaptation, and first-pass drafting."),
            ("Research support without overtrust", "We separate brainstorming, query planning, summarization, source checking, and final verification."),
            ("Meetings and decisions", "Participants create safe workflows for agendas, prep notes, follow-up drafts, and option comparison."),
        ],
        "materials": [
            "Workflow recipe cards",
            "Meeting preparation worksheet",
            "Research triage checklist",
            "Before-and-after prompt examples",
        ],
        "diagram_slots": [
            "Human-in-the-loop workflow map",
            "Meeting-to-action pipeline",
        ],
    },
    {
        "slug": "team-ai-readiness-sprint",
        "title": "Team AI Readiness Sprint",
        "eyebrow": "2-3 session discovery sprint",
        "summary": "A structured readiness process for teams that want to identify useful AI opportunities before buying tools or launching policies.",
        "format": "Two or three Zoom sessions with discovery worksheets and a readiness summary.",
        "audience": "Small and midsize companies, nonprofits, health care teams, and institutions that need cautious, practical alignment.",
        "outcomes": [
            "Map current work patterns, friction points, comfort levels, and risk concerns.",
            "Rank possible AI use cases by value, risk, readiness, and training needs.",
            "Clarify what to train, what to pilot, what to postpone, and what not to do.",
        ],
        "modules": [
            ("Team context scan", "We identify where AI curiosity already exists, where anxiety is highest, and where work is repetitive or overloaded."),
            ("Use-case discovery", "Participants collect possible use cases and sort them by task type, data sensitivity, and expected value."),
            ("Risk and readiness scoring", "We use a simple matrix to distinguish low-risk practice from decisions that need stronger review or policy."),
            ("Training path recommendation", "The sprint ends with a practical next-step map for briefings, workshops, office hours, or a limited pilot."),
        ],
        "materials": [
            "Team readiness worksheet",
            "Use-case scoring rubric",
            "AI norms discussion guide",
            "Recommended next-step summary template",
        ],
        "diagram_slots": [
            "Use-case value/risk grid",
            "Team adoption pathway from discovery to practice",
        ],
    },
    {
        "slug": "executive-ai-briefing",
        "title": "Executive AI Briefing",
        "eyebrow": "60-90 minute leadership session",
        "summary": "Plain-spoken AI orientation for leaders who need clarity before making budget, policy, vendor, or training decisions.",
        "format": "One focused Zoom briefing, optionally followed by a Q&A or planning session.",
        "audience": "Executives, founders, board-adjacent leaders, and department heads who need a useful map rather than hype.",
        "outcomes": [
            "Separate AI training needs from software purchasing needs.",
            "Ask better questions about vendors, data, policy, implementation, and organizational readiness.",
            "Identify decisions that need more learning before investment.",
        ],
        "modules": [
            ("What leaders need to know now", "A clear map of current AI capabilities, limitations, tool categories, and common misconceptions."),
            ("Clarity before complexity", "We distinguish fluency, workflow practice, policy, vendor evaluation, and implementation work."),
            ("Responsible decision questions", "Leaders practice asking about data exposure, review requirements, accountability, and expected business value."),
            ("Next-step decision paths", "The briefing ends with a recommendation for training, discovery, a small pilot, or a deliberate wait."),
        ],
        "materials": [
            "Executive briefing deck outline",
            "Vendor question guide",
            "AI investment readiness checklist",
            "Train, pilot, buy, or wait worksheet",
        ],
        "diagram_slots": [
            "Decision gates for AI investment",
            "Build, buy, train, or wait decision tree",
        ],
    },
    {
        "slug": "monthly-ai-office-hours",
        "title": "Monthly AI Office Hours",
        "eyebrow": "Ongoing Zoom support",
        "summary": "A recurring learning forum for questions, tool changes, workflow practice, and steady coaching as AI habits mature.",
        "format": "Monthly 60-minute Zoom sessions with question collection and lightweight follow-up notes.",
        "audience": "Teams that have completed an initial training and want continuity without turning AI into a separate project.",
        "outcomes": [
            "Create a reliable place for practical questions and safe experiments.",
            "Reinforce good review habits as tools, interfaces, and model capabilities change.",
            "Turn scattered individual experiments into shared team learning.",
        ],
        "modules": [
            ("Question intake", "Each session starts with real questions, confusing moments, and examples from the previous month."),
            ("Tool-change translation", "New AI features are explained in plain language, with emphasis on what is actually useful for the group."),
            ("Live workflow coaching", "Participants work through non-sensitive scenarios and see how a workflow can be improved step by step."),
            ("Habit reinforcement", "Each month ends with one or two practical habits the team can try before the next session."),
        ],
        "materials": [
            "Monthly question intake form",
            "Office-hours recap template",
            "Tool-change digest format",
            "Team practice log",
        ],
        "diagram_slots": [
            "Monthly learning loop",
            "Question-to-practice coaching flow",
        ],
    },
    {
        "slug": "advanced-operator-codex-track",
        "title": "Advanced Operator / Codex Track",
        "eyebrow": "Multi-session advanced coaching",
        "summary": "Advanced training for power users who want to supervise Codex and similar local full-control systems with judgment, testing, and rollback habits.",
        "format": "Private coaching or cohort sessions with local practice, repo walkthroughs, and verification labs.",
        "audience": "Technically curious professionals, builders, content-system owners, and advanced AI users ready for local controlled environments.",
        "outcomes": [
            "Understand what local full-control systems can access and why that changes the supervision model.",
            "Use repo inspection, file edits, tests, browser checks, Git commits, and deployment review responsibly.",
            "Develop rollback thinking so AI-assisted work remains reversible, inspectable, and owned by the human.",
        ],
        "modules": [
            ("From chatbot to local operator", "We compare ordinary LLM sessions with local agents that can read files, run commands, inspect browsers, and edit projects."),
            ("Supervising code and content changes", "Participants learn to ask for repo inspection, scoped edits, diffs, tests, and clear summaries before trusting changes."),
            ("Full-control safety boundaries", "We define where local access helps, where it becomes risky, and what should require explicit human approval."),
            ("Deployment and rollback practice", "Participants practice commit hygiene, public-site checks, deployment verification, and recovery paths."),
        ],
        "materials": [
            "Local agent supervision checklist",
            "Git and deployment primer",
            "Verification lab worksheet",
            "Rollback and recovery checklist",
        ],
        "diagram_slots": [
            "Agent control loop: inspect, edit, test, review, commit",
            "Local full-control safety boundary map",
        ],
    },
]


def styles():
    base = getSampleStyleSheet()
    base.add(
        ParagraphStyle(
            name="Kicker",
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=11,
            textColor=CLAY,
            uppercase=True,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=30,
            leading=34,
            textColor=INK,
            spaceAfter=14,
        )
    )
    base.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=TEAL,
            spaceBefore=18,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            name="BodyTextX",
            fontName="Helvetica",
            fontSize=10.2,
            leading=15,
            textColor=colors.HexColor("#31474d"),
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            name="SmallCenter",
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#65767a"),
            alignment=TA_CENTER,
        )
    )
    return base


def bullet_list(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=10) for item in items],
        bulletType="bullet",
        leftIndent=16,
        bulletFontName="Helvetica-Bold",
        bulletColor=BRASS,
    )


def draw_page(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(SURFACE)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.rect(0, height - 0.18 * inch, width, 0.18 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(TEAL)
    canvas.drawString(0.72 * inch, 0.42 * inch, "Xensible")
    canvas.setFillColor(colors.HexColor("#65767a"))
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - 0.72 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build_pdf(curriculum, out_dir):
    out_path = out_dir / f"{curriculum['slug']}.pdf"
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title=f"{curriculum['title']} | Xensible",
    )
    style = styles()
    story = [
        Paragraph("Xensible curriculum companion", style["Kicker"]),
        Paragraph(curriculum["title"], style["CoverTitle"]),
        Paragraph(curriculum["summary"], style["BodyTextX"]),
        Spacer(1, 0.12 * inch),
        Table(
            [
                [Paragraph("<b>Format</b>", style["BodyTextX"]), Paragraph(curriculum["format"], style["BodyTextX"])],
                [Paragraph("<b>Audience</b>", style["BodyTextX"]), Paragraph(curriculum["audience"], style["BodyTextX"])],
            ],
            colWidths=[1.15 * inch, 4.65 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), MIST),
                    ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#d7e3de")),
                    ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d7e3de")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            ),
        ),
        Paragraph("Learner outcomes", style["SectionTitle"]),
        bullet_list(curriculum["outcomes"], style["BodyTextX"]),
        Paragraph("Curriculum modules", style["SectionTitle"]),
    ]

    for title, body in curriculum["modules"]:
        story.append(Paragraph(f"<b>{title}</b>", style["BodyTextX"]))
        story.append(Paragraph(body, style["BodyTextX"]))

    story.extend(
        [
            Paragraph("Materials to develop", style["SectionTitle"]),
            bullet_list(curriculum["materials"], style["BodyTextX"]),
            Paragraph("Diagram candidates", style["SectionTitle"]),
            Paragraph(
                "These are intentionally left as candidate visuals until diagram parameters are chosen.",
                style["BodyTextX"],
            ),
            bullet_list(curriculum["diagram_slots"], style["BodyTextX"]),
            PageBreak(),
            Paragraph("Facilitator planning notes", style["Kicker"]),
            Paragraph("Session design reminders", style["SectionTitle"]),
            bullet_list(
                [
                    "Keep examples non-sensitive and realistic.",
                    "Emphasize education, judgment, review, and careful experimentation.",
                    "Do not promise legal, medical, compliance, cybersecurity, or automation outcomes.",
                    "Name when a stronger tool, private environment, or policy decision is needed before proceeding.",
                ],
                style["BodyTextX"],
            ),
            Paragraph("API and tool boundary", style["SectionTitle"]),
            Paragraph(
                "This curriculum companion does not require an API call. Any secure password protection, private client portal, or live AI workflow exercise that transmits data to an external model should be reviewed before implementation.",
                style["BodyTextX"],
            ),
        ]
    )
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    return out_path


def main():
    public_dir = Path("public/curriculum-pdfs")
    output_dir = Path("output/pdf")
    public_dir.mkdir(parents=True, exist_ok=True)
    output_dir.mkdir(parents=True, exist_ok=True)

    for curriculum in CURRICULA:
        public_pdf = build_pdf(curriculum, public_dir)
        output_pdf = output_dir / public_pdf.name
        output_pdf.write_bytes(public_pdf.read_bytes())
        print(public_pdf)


if __name__ == "__main__":
    main()
