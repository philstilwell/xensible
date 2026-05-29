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


FREE_CURRICULUM = {
    "slug": "free-ai-fluency-starter",
    "title": "Free AI Fluency Starter",
    "tier_label": "free curriculum companion",
    "summary": "A public starter path for people who want a clear, non-intimidating first step into LLMs, prompting, safe practice, and practical review habits.",
    "format": "Self-guided webpage and downloadable PDF companion, designed as a gentle entry point before a team briefing or coached workshop.",
    "audience": "Individuals, leaders, and teams who are curious about AI but want plain-language basics before committing to training.",
    "level": "Level 0: orientation and first safe practice",
    "outcomes": [
        "Understand what LLMs do, why they can be useful, and why their answers still need human review.",
        "Use a simple prompt structure for common tasks such as drafting, summarizing, planning, and asking better questions.",
        "Practice with non-sensitive examples while keeping patient, customer, employee, legal, financial, and proprietary data out of public AI tools.",
        "Decide whether the next best step is self-practice, one-on-one coaching, a team briefing, or a structured workshop.",
    ],
    "modules": [
        ("LLMs in plain language", "A beginner-friendly explanation of how large language models respond to prompts, what they are useful for, and where they become unreliable."),
        ("The first prompting loop", "A reusable pattern for giving context, asking for a draft, checking the result, and requesting a revision without overtrusting the output."),
        ("Safe public-tool practice", "A practical boundary-setting module that keeps sensitive or proprietary details out of public tools while still making room to learn."),
        ("Review before use", "A lightweight review habit for checking accuracy, tone, assumptions, missing context, and decisions that need a human owner."),
        ("Choosing a next step", "A closing module that helps learners identify one useful, low-risk task to practice and one question to bring to a trainer or manager."),
    ],
    "guiding_questions": [
        "What can an LLM help me draft, reframe, summarize, or plan?",
        "What information should stay out of public AI tools?",
        "How do I tell whether an AI answer is useful enough to keep working with?",
        "Which everyday task would be a safe first place to practice?",
    ],
    "session_flow": [
        ("Orient", "Start with a plain-language explanation of LLMs, prompts, outputs, and why confident-sounding answers still need review."),
        ("Try", "Use a neutral sample task to practice context, constraints, tone, examples, and follow-up questions."),
        ("Review", "Check the result for accuracy, usefulness, assumptions, missing context, and whether a human should verify it."),
        ("Choose", "Name one safe workflow to practice and one boundary the learner will keep in mind."),
    ],
    "practice_labs": [
        ("Rewrite a neutral paragraph", "Practice asking for tone and audience changes using public, non-sensitive text."),
        ("Summarize public information", "Turn a public article or generic meeting note into a summary, then identify what still needs verification."),
        ("Plan a simple task", "Ask AI for a checklist, timeline, or agenda, then revise it to fit real constraints."),
        ("Critique the output", "Use a review prompt to find weak assumptions, vague wording, and missing context."),
    ],
    "readiness_checks": [
        "Can explain what an LLM is without technical jargon.",
        "Can write a prompt with context, task, audience, and constraints.",
        "Can name at least three kinds of data that should not be pasted into public tools.",
        "Can identify when an output needs outside verification or human approval.",
    ],
    "materials": [
        "Free AI fluency starter guide",
        "Basic prompting loop worksheet",
        "Public-tool safety checklist",
        "Output review checklist",
        "First safe workflow practice log",
    ],
    "diagram_slots": [
        "Beginner LLM session loop: ask, inspect, revise, verify",
        "Safe practice boundary map for public AI tools",
        "First workflow chooser: draft, summarize, plan, or critique",
    ],
    "follow_up": [
        "Keep a one-week practice log using only non-sensitive examples.",
        "Collect three questions that would benefit from coaching or a team discussion.",
        "Choose one recurring task that may become a future workflow workshop candidate.",
    ],
}


CURRICULA = [
    {
        "slug": "ai-fluency-essentials",
        "title": "AI Fluency Essentials",
        "eyebrow": "90-minute Zoom intro",
        "summary": "A calm, practical introduction for people who want to understand LLMs, use them safely, and build confidence with ordinary work tasks.",
        "format": "One 90-minute Zoom session with guided practice and a follow-up handout.",
        "audience": "Curious professionals, mixed-comfort teams, and organizations that need a shared starting point before deeper tool decisions.",
        "level": "Level 1: shared team AI fluency",
        "outcomes": [
            "Explain what LLMs are good at, where they fail, and why human review matters.",
            "Use a basic prompting loop for drafting, summarizing, planning, and asking better questions.",
            "Recognize sensitive-data boundaries and safer ways to practice with non-sensitive examples.",
            "Leave with shared vocabulary for prompts, context, output quality, uncertainty, and review.",
        ],
        "modules": [
            ("The practical mental model", "Participants learn how prompts, context, instructions, examples, and review shape an AI session without needing technical background."),
            ("Prompting as conversation design", "We practice turning vague requests into useful context, constraints, examples, and review questions."),
            ("Safe experimentation", "The session establishes clear boundaries around patient, customer, employee, legal, financial, and proprietary information."),
            ("Confidence routines", "Participants leave with small repeatable habits: draft, critique, revise, verify, and decide what still needs human judgment."),
            ("Team language and norms", "The group names simple shared expectations for AI use, including what to try, what to avoid, and how to talk about uncertain outputs."),
        ],
        "guiding_questions": [
            "What does our team need to understand before choosing tools or policies?",
            "Which everyday tasks are safe places to build skill?",
            "How should we review AI output before it affects real work?",
            "What shared language will help us discuss AI without hype or fear?",
        ],
        "session_flow": [
            ("Baseline", "Surface current comfort levels, hopes, concerns, and common misconceptions."),
            ("Model", "Teach a practical mental model for context, instructions, examples, model output, and review."),
            ("Practice", "Run guided prompt exercises using neutral scenarios that resemble the team's work without exposing sensitive data."),
            ("Review", "Apply a quality checklist to outputs and discuss what should be verified, revised, or discarded."),
            ("Normalize", "Close with team language, safe-use reminders, and a first set of practice habits."),
        ],
        "practice_labs": [
            ("Prompt anatomy lab", "Rewrite a weak prompt into a stronger one by adding role, task, context, audience, constraints, and success criteria."),
            ("Output comparison", "Compare two model responses and identify which is more useful, what is missing, and what should be checked."),
            ("Data-boundary sorting", "Sort example inputs into safe public practice, caution, and private-data categories."),
            ("Revision ladder", "Practice moving from first draft to better draft through critique, constraint, and audience-shift prompts."),
        ],
        "readiness_checks": [
            "Participants can describe AI as an assistive drafting and reasoning partner, not an authority.",
            "Participants can use a repeatable prompt structure.",
            "Participants can explain the difference between safe examples and sensitive operational data.",
            "Participants can name a human review habit they will use before applying output.",
        ],
        "materials": [
            "AI fluency starter guide",
            "Prompt pattern quick sheet",
            "Sensitive-data boundary checklist",
            "Output review checklist",
            "Team language and norms worksheet",
        ],
        "diagram_slots": [
            "LLM session loop: prompt, context, output, review, revision",
            "Safe-data boundary map for public AI tools",
            "Team fluency ladder from curiosity to useful practice",
        ],
        "follow_up": [
            "Run one safe prompt experiment before the next meeting.",
            "Collect examples of confusing, useful, or unreliable AI outputs for discussion.",
            "Identify one team workflow that may deserve deeper workshop treatment.",
        ],
    },
    {
        "slug": "practical-ai-workflows",
        "title": "Practical AI Workflows",
        "eyebrow": "Half-day or two-session workshop",
        "summary": "Hands-on workflow training for writing, planning, research support, meeting preparation, and everyday knowledge work.",
        "format": "Two 90-minute Zoom sessions or one half-day remote workshop.",
        "audience": "Teams and professionals who already understand the basics and want practical routines they can reuse.",
        "level": "Level 2: practical workflow fluency",
        "outcomes": [
            "Build repeatable workflows for common work without copying sensitive data into public tools.",
            "Use AI to generate first drafts, alternatives, summaries, meeting artifacts, and decision support.",
            "Develop review habits that keep the human responsible for quality, context, and final judgment.",
            "Turn scattered experiments into documented workflow recipes that can be shared inside a team.",
        ],
        "modules": [
            ("Workflow anatomy", "We break a task into input, constraints, AI assist, review, revision, and final human decision."),
            ("Writing and rewriting", "Participants practice using AI for tone, structure, audience adaptation, and first-pass drafting."),
            ("Research support without overtrust", "We separate brainstorming, query planning, summarization, source checking, and final verification."),
            ("Meetings and decisions", "Participants create safe workflows for agendas, prep notes, follow-up drafts, and option comparison."),
            ("Workflow documentation", "Teams capture the steps, prompts, inputs, review points, and human decisions that make a workflow repeatable."),
        ],
        "guiding_questions": [
            "Which tasks repeat often enough to deserve a workflow?",
            "Where can AI help without becoming the decision maker?",
            "What inputs are safe to use, and what must be abstracted or withheld?",
            "How will we review, revise, and document the workflow so others can use it?",
        ],
        "session_flow": [
            ("Select", "Choose one or two common tasks with clear boundaries and enough repetition to justify practice."),
            ("Decompose", "Break each task into inputs, decisions, drafts, checks, revisions, and final human ownership."),
            ("Build", "Create prompt sequences and review steps using non-sensitive examples."),
            ("Stress test", "Try edge cases, poor inputs, missing context, and output-review prompts."),
            ("Document", "Capture the workflow as a short recipe that names when to use it and when not to."),
        ],
        "practice_labs": [
            ("Writing workflow", "Draft, critique, revise, and audience-tune a neutral document while keeping the human responsible for final voice and claims."),
            ("Meeting workflow", "Generate an agenda, prep questions, follow-up notes, and action-item drafts from fictional or sanitized scenarios."),
            ("Research triage workflow", "Use AI for question planning and source-triage support, then separate what must be verified elsewhere."),
            ("Decision-support workflow", "Compare options, surface assumptions, and draft decision criteria without outsourcing the decision itself."),
        ],
        "readiness_checks": [
            "The workflow has a named owner and a clear final human decision point.",
            "Inputs avoid sensitive or proprietary data unless a suitable private environment is approved.",
            "The workflow includes a review step for accuracy, tone, assumptions, and missing context.",
            "The team can explain when the workflow is useful and when it should not be used.",
        ],
        "materials": [
            "Workflow recipe cards",
            "Meeting preparation worksheet",
            "Research triage checklist",
            "Before-and-after prompt examples",
            "Workflow documentation template",
            "Human review checkpoint guide",
        ],
        "diagram_slots": [
            "Human-in-the-loop workflow map",
            "Meeting-to-action pipeline",
            "Workflow recipe anatomy: inputs, AI assist, review, apply",
        ],
        "follow_up": [
            "Pilot one documented workflow for two weeks using safe inputs.",
            "Track where the workflow saves time, improves quality, or creates review burden.",
            "Bring one workflow back for refinement before scaling it to a broader team.",
        ],
    },
    {
        "slug": "team-ai-readiness-sprint",
        "title": "Team AI Readiness Sprint",
        "eyebrow": "2-3 session discovery sprint",
        "summary": "A structured readiness process for teams that want to identify useful AI opportunities before buying tools or launching policies.",
        "format": "Two or three Zoom sessions with discovery worksheets and a readiness summary.",
        "audience": "Small and midsize companies, nonprofits, health care teams, and institutions that need cautious, practical alignment.",
        "level": "Level 3: organizational readiness and use-case discovery",
        "outcomes": [
            "Map current work patterns, friction points, comfort levels, and risk concerns.",
            "Rank possible AI use cases by value, risk, readiness, and training needs.",
            "Clarify what to train, what to pilot, what to postpone, and what not to do.",
            "Create a practical readiness map before buying tools or announcing large AI initiatives.",
        ],
        "modules": [
            ("Team context scan", "We identify where AI curiosity already exists, where anxiety is highest, and where work is repetitive or overloaded."),
            ("Use-case discovery", "Participants collect possible use cases and sort them by task type, data sensitivity, and expected value."),
            ("Risk and readiness scoring", "We use a simple matrix to distinguish low-risk practice from decisions that need stronger review or policy."),
            ("Training path recommendation", "The sprint ends with a practical next-step map for briefings, workshops, office hours, or a limited pilot."),
            ("Governance questions for later", "The sprint names policy, procurement, privacy, and implementation questions that should be handled by the right internal owners."),
        ],
        "guiding_questions": [
            "Where are people already experimenting, and where are they hesitant?",
            "Which tasks create friction, delay, rework, or knowledge bottlenecks?",
            "Which ideas are low-risk training candidates, and which need stronger review before action?",
            "What should we learn before spending money on tools or vendors?",
        ],
        "session_flow": [
            ("Discover", "Interview or workshop with leaders and users to surface real work patterns, pain points, and comfort levels."),
            ("Inventory", "Collect possible use cases and describe each one by task type, data sensitivity, value, and review needs."),
            ("Score", "Rank ideas with a simple value, risk, readiness, and training-needs rubric."),
            ("Sort", "Place ideas into train, pilot, wait, or avoid categories."),
            ("Recommend", "Translate findings into a short next-step roadmap for training, office hours, or a narrow pilot."),
        ],
        "practice_labs": [
            ("Friction mapping", "Identify where teams lose time to drafting, summarizing, searching, rework, planning, or coordination."),
            ("Use-case card sorting", "Turn vague AI ideas into comparable cards with audience, input, output, review, and risk fields."),
            ("Value-risk matrix", "Place candidate use cases on the grid and discuss what belongs in training, pilot, wait, or avoid."),
            ("Readiness narrative", "Draft a plain-language summary leaders can use to explain the next step without overpromising."),
        ],
        "readiness_checks": [
            "The team can distinguish training needs from implementation or procurement needs.",
            "Use cases are ranked by value, risk, readiness, and review burden.",
            "Sensitive-data concerns are named without implying legal or compliance guarantees.",
            "Next steps are limited enough to learn from safely.",
        ],
        "materials": [
            "Team readiness worksheet",
            "Use-case scoring rubric",
            "AI norms discussion guide",
            "Recommended next-step summary template",
            "Use-case card deck",
            "Train, pilot, wait, avoid decision sheet",
        ],
        "diagram_slots": [
            "Use-case value/risk grid",
            "Team adoption pathway from discovery to practice",
            "Readiness map from friction points to training path",
        ],
        "follow_up": [
            "Choose two low-risk training candidates and one idea to postpone.",
            "Schedule the right briefing or workshop for the highest-priority audience.",
            "Review the map monthly as team fluency and tool options change.",
        ],
    },
    {
        "slug": "executive-ai-briefing",
        "title": "Executive AI Briefing",
        "eyebrow": "60-90 minute leadership session",
        "summary": "Plain-spoken AI orientation for leaders who need clarity before making budget, policy, vendor, or training decisions.",
        "format": "One focused Zoom briefing, optionally followed by a Q&A or planning session.",
        "audience": "Executives, founders, board-adjacent leaders, and department heads who need a useful map rather than hype.",
        "level": "Leadership level: clarity before technology decisions",
        "outcomes": [
            "Separate AI training needs from software purchasing needs.",
            "Ask better questions about vendors, data, policy, implementation, and organizational readiness.",
            "Identify decisions that need more learning before investment.",
            "Leave with a leadership vocabulary for opportunity, uncertainty, human review, and responsible experimentation.",
        ],
        "modules": [
            ("What leaders need to know now", "A clear map of current AI capabilities, limitations, tool categories, and common misconceptions."),
            ("Clarity before complexity", "We distinguish fluency, workflow practice, policy, vendor evaluation, and implementation work."),
            ("Responsible decision questions", "Leaders practice asking about data exposure, review requirements, accountability, and expected business value."),
            ("Next-step decision paths", "The briefing ends with a recommendation for training, discovery, a small pilot, or a deliberate wait."),
            ("Internal communication", "Leaders practice explaining AI next steps in language that reduces confusion, fear, and unrealistic expectations."),
        ],
        "guiding_questions": [
            "What should leaders understand before authorizing tools, pilots, policies, or budgets?",
            "Where does education need to come before procurement?",
            "Which risks require the right internal owners rather than a training promise?",
            "What small next step would increase clarity without locking the organization into a premature decision?",
        ],
        "session_flow": [
            ("Landscape", "Explain current AI capabilities, limitations, and tool categories in plain language."),
            ("Separate", "Distinguish fluency training, workflow practice, policy, vendor evaluation, implementation, and governance."),
            ("Question", "Work through leader-level questions about value, data exposure, review burden, and accountability."),
            ("Decide", "Sort likely next steps into train, discover, pilot, wait, or seek specialist advice."),
            ("Communicate", "Draft a short internal message that frames AI learning without hype or guarantees."),
        ],
        "practice_labs": [
            ("Vendor question drill", "Translate broad vendor claims into concrete questions about data handling, review, workflow fit, and training needs."),
            ("Decision-gate scenario", "Walk through an AI idea and decide whether it belongs in training, discovery, pilot, procurement, or wait."),
            ("Risk language rehearsal", "Practice naming uncertainty and boundaries without implying legal, medical, compliance, or cybersecurity guarantees."),
            ("Leadership message draft", "Create a calm message that explains why the organization is learning before buying or implementing."),
        ],
        "readiness_checks": [
            "Leaders can explain why fluency training may be needed before tool investment.",
            "Leaders can ask practical questions about data boundaries, review, ownership, and expected value.",
            "The organization has named which decisions require internal policy, legal, privacy, or technical owners.",
            "The next step is small enough to learn from and clear enough to communicate.",
        ],
        "materials": [
            "Executive briefing deck outline",
            "Vendor question guide",
            "AI investment readiness checklist",
            "Train, pilot, buy, or wait worksheet",
            "Leadership communication template",
            "Decision-gate question bank",
        ],
        "diagram_slots": [
            "Decision gates for AI investment",
            "Build, buy, train, or wait decision tree",
            "Leadership clarity map: learn, test, decide, communicate",
        ],
        "follow_up": [
            "Select a first audience for training or discovery.",
            "List vendor, policy, or data questions that require specialist review.",
            "Schedule a follow-up briefing or readiness sprint if the organization needs a fuller map.",
        ],
    },
    {
        "slug": "monthly-ai-office-hours",
        "title": "Monthly AI Office Hours",
        "eyebrow": "Ongoing Zoom support",
        "summary": "A recurring learning forum for questions, tool changes, workflow practice, and steady coaching as AI habits mature.",
        "format": "Monthly 60-minute Zoom sessions with question collection and lightweight follow-up notes.",
        "audience": "Teams that have completed an initial training and want continuity without turning AI into a separate project.",
        "level": "Ongoing level: sustained fluency and habit support",
        "outcomes": [
            "Create a reliable place for practical questions and safe experiments.",
            "Reinforce good review habits as tools, interfaces, and model capabilities change.",
            "Turn scattered individual experiments into shared team learning.",
            "Maintain momentum without forcing AI into every workflow or chasing every announcement.",
        ],
        "modules": [
            ("Question intake", "Each session starts with real questions, confusing moments, and examples from the previous month."),
            ("Tool-change translation", "New AI features are explained in plain language, with emphasis on what is actually useful for the group."),
            ("Live workflow coaching", "Participants work through non-sensitive scenarios and see how a workflow can be improved step by step."),
            ("Habit reinforcement", "Each month ends with one or two practical habits the team can try before the next session."),
            ("Learning capture", "Useful examples, cautions, and workflow refinements are captured so the team builds institutional memory over time."),
        ],
        "guiding_questions": [
            "What did people try this month, and what happened?",
            "Which tool changes matter for this team, and which can be ignored for now?",
            "Where are review habits holding up, and where are outputs being trusted too quickly?",
            "What one practice should the team try before the next office hours session?",
        ],
        "session_flow": [
            ("Collect", "Gather questions, examples, confusing moments, and useful experiments from the previous month."),
            ("Translate", "Explain relevant tool changes in practical language and ignore updates that do not affect the group."),
            ("Coach", "Work through live non-sensitive examples, improving prompts and review habits together."),
            ("Capture", "Document useful patterns, cautions, and candidate workflows."),
            ("Assign", "Choose one small practice experiment for the next month."),
        ],
        "practice_labs": [
            ("Question clinic", "Turn participant questions into better prompts, safer examples, and clearer review steps."),
            ("Tool-change translation", "Assess one new AI feature and decide whether it changes actual practice for the team."),
            ("Workflow rescue", "Take an AI experiment that disappointed someone and diagnose whether the issue was prompt, context, task choice, or overtrust."),
            ("Monthly habit drill", "Practice one review or revision habit until it becomes easy enough to use in ordinary work."),
        ],
        "readiness_checks": [
            "Participants bring real but non-sensitive questions and examples.",
            "The team can separate useful tool changes from noise.",
            "Repeated questions are converted into shared guidance or workflow notes.",
            "Office hours reinforce boundaries rather than encouraging careless experimentation.",
        ],
        "materials": [
            "Monthly question intake form",
            "Office-hours recap template",
            "Tool-change digest format",
            "Team practice log",
            "Workflow refinement log",
            "Reusable question bank",
        ],
        "diagram_slots": [
            "Monthly learning loop",
            "Question-to-practice coaching flow",
            "Office-hours knowledge capture cycle",
        ],
        "follow_up": [
            "Try the monthly practice habit with one safe task.",
            "Submit questions or examples before the next session.",
            "Update shared notes with what worked, what failed, and what needs clearer guidance.",
        ],
    },
    {
        "slug": "advanced-operator-codex-track",
        "title": "Advanced Operator / Codex Track",
        "eyebrow": "Multi-session advanced coaching",
        "summary": "Advanced training for power users who want to supervise Codex and similar local full-control systems with judgment, testing, and rollback habits.",
        "format": "Private coaching or cohort sessions with local practice, repo walkthroughs, and verification labs.",
        "audience": "Technically curious professionals, builders, content-system owners, and advanced AI users ready for local controlled environments.",
        "level": "Level 4: advanced operator and local-agent supervision",
        "outcomes": [
            "Understand what local full-control systems can access and why that changes the supervision model.",
            "Use repo inspection, file edits, tests, browser checks, Git commits, and deployment review responsibly.",
            "Develop rollback thinking so AI-assisted work remains reversible, inspectable, and owned by the human.",
            "Operate Codex-style systems with explicit boundaries, verification habits, and human approval points.",
        ],
        "modules": [
            ("From chatbot to local operator", "We compare ordinary LLM sessions with local agents that can read files, run commands, inspect browsers, and edit projects."),
            ("Supervising code and content changes", "Participants learn to ask for repo inspection, scoped edits, diffs, tests, and clear summaries before trusting changes."),
            ("Full-control safety boundaries", "We define where local access helps, where it becomes risky, and what should require explicit human approval."),
            ("Deployment and rollback practice", "Participants practice commit hygiene, public-site checks, deployment verification, and recovery paths."),
            ("Operator judgment", "Advanced users learn when to let the agent proceed, when to require confirmation, when to inspect manually, and when to stop."),
        ],
        "guiding_questions": [
            "What changes when an AI system can read files, run commands, inspect browsers, and edit projects?",
            "Which actions are safe for an agent to take, and which require explicit human approval?",
            "How will we verify outputs with tests, screenshots, diffs, and deployment checks?",
            "How will we recover if an AI-assisted change is wrong?",
        ],
        "session_flow": [
            ("Orient", "Compare chat-based AI with local agent systems that can act inside a project environment."),
            ("Inspect", "Read project structure, current state, dependencies, and risk before asking for changes."),
            ("Constrain", "Write scoped instructions that define files, boundaries, verification, and approval points."),
            ("Verify", "Use linting, tests, screenshots, diffs, and manual review to decide whether work is acceptable."),
            ("Recover", "Practice commit hygiene, rollback thinking, and post-deployment checks."),
        ],
        "practice_labs": [
            ("Repo inspection lab", "Ask the agent to inspect a project and produce a change plan before editing anything."),
            ("Scoped edit lab", "Make a small content or UI change, then review the diff and reject unrelated churn."),
            ("Verification lab", "Run lint, build, browser screenshots, and content checks before deciding whether to commit."),
            ("Rollback lab", "Use Git history and deployment checks to reason about how to recover from a bad change."),
            ("Approval boundary lab", "Classify actions such as file edits, package installs, API calls, credential use, deployment, and deletion by approval level."),
        ],
        "readiness_checks": [
            "The operator can explain what local files, commands, browsers, and deployments the agent can affect.",
            "The operator can request scoped changes and inspect diffs before accepting them.",
            "The operator can run appropriate verification before committing or publishing.",
            "The operator has a rollback path and knows when to stop for human review.",
        ],
        "materials": [
            "Local agent supervision checklist",
            "Git and deployment primer",
            "Verification lab worksheet",
            "Rollback and recovery checklist",
            "Approval-boundary matrix",
            "Codex prompt patterns for scoped work",
        ],
        "diagram_slots": [
            "Agent control loop: inspect, edit, test, review, commit",
            "Local full-control safety boundary map",
            "Approval boundary matrix for local agent actions",
        ],
        "follow_up": [
            "Run one scoped agent-assisted change on a low-risk project.",
            "Capture the prompt, diff, checks, and final decision in a practice log.",
            "Build a personal checklist for future Codex-style work before using it on higher-risk projects.",
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
        Paragraph(f"Xensible {curriculum.get('tier_label', 'expert curriculum companion')}", style["Kicker"]),
        Paragraph(curriculum["title"], style["CoverTitle"]),
        Paragraph(curriculum["summary"], style["BodyTextX"]),
        Spacer(1, 0.12 * inch),
        Table(
            [
                [Paragraph("<b>Format</b>", style["BodyTextX"]), Paragraph(curriculum["format"], style["BodyTextX"])],
                [Paragraph("<b>Level</b>", style["BodyTextX"]), Paragraph(curriculum["level"], style["BodyTextX"])],
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
        Paragraph("Guiding questions", style["SectionTitle"]),
        bullet_list(curriculum["guiding_questions"], style["BodyTextX"]),
        Paragraph("Readiness checks", style["SectionTitle"]),
        bullet_list(curriculum["readiness_checks"], style["BodyTextX"]),
        Paragraph("Curriculum modules", style["SectionTitle"]),
    ]

    for title, body in curriculum["modules"]:
        story.append(Paragraph(f"<b>{title}</b>", style["BodyTextX"]))
        story.append(Paragraph(body, style["BodyTextX"]))

    story.append(Paragraph("Session flow", style["SectionTitle"]))
    for title, body in curriculum["session_flow"]:
        story.append(Paragraph(f"<b>{title}</b>", style["BodyTextX"]))
        story.append(Paragraph(body, style["BodyTextX"]))

    story.append(Paragraph("Practice labs", style["SectionTitle"]))
    for title, body in curriculum["practice_labs"]:
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
            Paragraph("Follow-up work", style["SectionTitle"]),
            bullet_list(curriculum["follow_up"], style["BodyTextX"]),
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

    for curriculum in [FREE_CURRICULUM, *CURRICULA]:
        public_pdf = build_pdf(curriculum, public_dir)
        output_pdf = output_dir / public_pdf.name
        output_pdf.write_bytes(public_pdf.read_bytes())
        print(public_pdf)


if __name__ == "__main__":
    main()
