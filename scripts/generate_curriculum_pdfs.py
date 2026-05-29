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


INDIVIDUAL_UTILITY_PROJECTS = [
    {
        "title": "Learning Sprint",
        "timebox": "60-75 minutes",
        "hook": "Turn a confusing topic into a private tutor session.",
        "outcome": "A one-page explainer, a short quiz, a glossary, and a list of what to verify elsewhere.",
        "safe_input": "Use a public topic, a public article, or a concept you want to understand. Avoid private client, patient, employee, or proprietary material.",
        "steps": [
            "Ask for a plain-language explanation at your current level.",
            "Request examples, analogies, common misconceptions, and a five-question quiz.",
            "Ask what claims need source checking before you rely on them.",
        ],
        "starter_prompt": "Teach me [topic] as a smart beginner. Start with a plain-language explanation, then give examples, common misconceptions, a short glossary, a five-question quiz, and a list of claims I should verify with reliable sources.",
    },
    {
        "title": "Decision Clarity Brief",
        "timebox": "75-90 minutes",
        "hook": "Use AI to make a decision easier to think about without outsourcing the decision.",
        "outcome": "A comparison table, assumptions list, pre-mortem, missing-information checklist, and final decision questions.",
        "safe_input": "Use a personal, public, fictional, or sanitized decision. Keep confidential finances, contracts, medical, legal, or customer details out of public tools.",
        "steps": [
            "Describe the options, constraints, values, and what would count as success.",
            "Ask AI to compare options and surface assumptions instead of choosing for you.",
            "Run a pre-mortem and identify what a human should check before acting.",
        ],
        "starter_prompt": "Help me think through this decision without deciding for me: [safe decision context]. Create criteria, compare options, name assumptions, run a pre-mortem, list missing information, and end with questions I should answer myself.",
    },
    {
        "title": "Meeting Prep Kit",
        "timebox": "60-90 minutes",
        "hook": "Turn a rough meeting idea into a more useful conversation.",
        "outcome": "A meeting agenda, prep questions, likely tensions, decision points, and a follow-up email template.",
        "safe_input": "Use fictional or sanitized meeting context. Do not paste private attendee notes, personnel details, patient data, customer records, or proprietary plans into public tools.",
        "steps": [
            "Give AI the purpose, audience, desired outcome, and any safe background.",
            "Ask for an agenda, questions, risks, and decisions to clarify.",
            "Revise the agenda for tone, time, and who needs to review it.",
        ],
        "starter_prompt": "Using this fictional or sanitized meeting context, create a focused agenda, prep questions, likely tensions, decision points, and a follow-up email template. Mark anything that needs human confirmation: [context].",
    },
    {
        "title": "Writing Upgrade Studio",
        "timebox": "60 minutes",
        "hook": "See how AI can draft, critique, and revise with you in a loop.",
        "outcome": "A stronger email, memo, bio, announcement, or short article with a revision history and review checklist.",
        "safe_input": "Use a rough draft that contains no sensitive personal, client, patient, employee, legal, financial, or proprietary details.",
        "steps": [
            "Ask for a first rewrite for a specific audience and tone.",
            "Ask AI to critique its own draft for clarity, claims, tone, and missing context.",
            "Request a final revision and make the last edits yourself.",
        ],
        "starter_prompt": "Improve this rough draft for [audience] with a [tone] tone. Then critique your revision for clarity, unsupported claims, missing context, and anything a human should verify before sending: [safe draft].",
    },
    {
        "title": "Research Compass",
        "timebox": "90-120 minutes",
        "hook": "Use AI to plan research before you read, search, or cite.",
        "outcome": "A research question map, search terms, source categories, red flags, and verification plan.",
        "safe_input": "Use a public topic or general business question. Do not ask AI to invent citations or make final claims without sources.",
        "steps": [
            "Ask AI to turn a broad topic into better questions and search terms.",
            "Request source categories, possible biases, and missing perspectives.",
            "Use the output as a reading plan, then verify claims in actual sources.",
        ],
        "starter_prompt": "Help me plan research on [public topic]. Create key questions, search terms, source types to seek, likely blind spots, red flags, and a verification checklist. Do not make final claims without sources.",
    },
    {
        "title": "Workflow Recipe Builder",
        "timebox": "90-120 minutes",
        "hook": "Turn one repeated task into a reusable AI-assisted workflow.",
        "outcome": "A workflow recipe with inputs, prompt sequence, review gates, human owner, and when-not-to-use guidance.",
        "safe_input": "Choose a recurring task and describe it generally or with fictional examples. Keep sensitive operational data out of public tools.",
        "steps": [
            "Map the task into steps, inputs, outputs, review points, and handoffs.",
            "Ask AI where it can help and where human judgment should stay in charge.",
            "Create a repeatable prompt sequence and a review checklist.",
        ],
        "starter_prompt": "Turn this recurring task into a safe AI-assisted workflow recipe: [task]. Include purpose, safe inputs, prompt sequence, review checkpoints, human decision points, risks, and when not to use AI for this task.",
    },
    {
        "title": "Professional Profile Refresh",
        "timebox": "75-90 minutes",
        "hook": "Use AI as a coach for describing your work more clearly.",
        "outcome": "A refreshed bio, resume bullet options, interview talking points, and confidence-building practice questions.",
        "safe_input": "Use a sanitized career summary or fictionalized role description. Do not include private employer data, references, compensation, or confidential projects.",
        "steps": [
            "Give AI a safe summary of your work, audience, and desired tone.",
            "Ask for clearer positioning, bullet options, and examples of evidence to add.",
            "Roleplay interview questions and revise anything that feels inflated or inaccurate.",
        ],
        "starter_prompt": "Using this sanitized professional summary, help me describe my work more clearly. Draft a short bio, five resume bullet options, three interview talking points, and questions I should answer to make the claims more accurate: [summary].",
    },
    {
        "title": "Personal Planning Co-Pilot",
        "timebox": "60-75 minutes",
        "hook": "Use AI to turn vague goals into a realistic plan you can actually follow.",
        "outcome": "A one-week plan, prioritized task list, obstacle plan, review ritual, and next-action checklist.",
        "safe_input": "Use personal goals and constraints that are not private, medical, financial, legal, or deeply sensitive.",
        "steps": [
            "Describe the goal, constraints, time available, and what has made it hard.",
            "Ask AI for a practical plan with tradeoffs and small next actions.",
            "Review the plan yourself and remove anything unrealistic or intrusive.",
        ],
        "starter_prompt": "Help me turn this goal into a realistic one-week plan: [safe goal]. Ask clarifying questions if needed, then create priorities, daily actions, likely obstacles, a review ritual, and a simple checklist.",
    },
]


PROJECT_SELECTION_RUBRIC = [
    "Real work, low risk: choose a task people already recognize, but keep inputs public, fictional, or sanitized.",
    "Clear walk-away artifact: produce a brief, agenda, checklist, glossary, comparison table, or reusable prompt sequence.",
    "Visible judgment step: check claims, name uncertainty, revise tone, or decide what should remain human-led.",
    "Transferable habit: practice a pattern the learner can reuse later, such as giving context, comparing outputs, or verifying before relying.",
]


PROJECT_REVIEW_QUESTIONS = [
    "What did AI make easier, faster, clearer, or more complete?",
    "Where did the output sound confident but still need verification?",
    "What context improved the result most?",
    "What information should never be pasted into a public tool?",
    "What part of the work should remain owned by a person?",
    "What small workflow would be worth practicing again next week?",
]


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
    "adoption_practices": [
        "Start with public, fictional, or anonymized examples so skill building does not depend on risky data.",
        "Treat AI output as a draft or suggestion until a person has checked facts, assumptions, tone, and missing context.",
        "Keep a small practice log that records what worked, what failed, and what had to be verified elsewhere.",
        "Choose first experiments from ordinary work: drafting, summarizing, planning, learning, or question generation.",
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
        "Responsible adoption loop: learn, practice, review, apply",
    ],
    "follow_up": [
        "Keep a one-week practice log using only non-sensitive examples.",
        "Collect three questions that would benefit from coaching or a team discussion.",
        "Choose one recurring task that may become a future workflow workshop candidate.",
    ],
    "tangible_cases": [
        {
            "title": "Public article summary",
            "situation": "A learner wants to understand a public article, newsletter, or announcement without losing the main ideas.",
            "learner_task": "Use AI to summarize the text, then mark which claims still need source checking before sharing.",
            "prompt": "Summarize the following public text for a beginner. Give me five key points, three terms to define, and a short list of claims I should verify before I rely on the summary: [paste public text].",
        },
        {
            "title": "Fictional email draft",
            "situation": "A professional wants to practice drafting an email without using client, patient, employee, or proprietary details.",
            "learner_task": "Draft from a fictional scenario, revise tone, and decide what a human should edit before sending.",
            "prompt": "Using this fictional scenario, draft a warm professional email. Keep it concise, avoid promises, and include a checklist of details a human should confirm before sending: [fictional scenario].",
        },
        {
            "title": "First practice plan",
            "situation": "A curious learner needs a low-pressure way to keep practicing after the starter session.",
            "learner_task": "Choose one safe weekly task, define boundaries, and keep a short log of useful and unreliable outputs.",
            "prompt": "Help me design a one-week AI practice plan using only public or fictional information. Include one task per day, a safety reminder, and a simple log format for what worked, what failed, and what I checked.",
        },
    ],
    "prompt_library": [
        ("Plain-language explanation", "Explain [AI concept] for a smart beginner. Use an everyday analogy, name two useful applications, and name two reasons I should not overtrust the output."),
        ("Starter prompt builder", "Turn my rough request into a stronger prompt. Ask me for missing context first. Then produce a prompt with task, audience, context, constraints, and review criteria."),
        ("Output review", "Review this AI-generated draft. Identify unsupported claims, vague wording, missing context, possible bias, tone problems, and anything that needs human verification: [draft]."),
        ("Safe practice chooser", "Given these possible practice tasks, sort them into safe public practice, use caution, and do not use in a public tool. Explain the reason for each category: [task list]."),
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
        "adoption_practices": [
            "Build shared vocabulary before asking a team to adopt new tools or policies.",
            "Normalize careful experimentation so people can ask basic questions without embarrassment.",
            "Make quality control and critical thinking explicit parts of AI fluency, not advanced extras.",
            "Give managers and team leads enough fluency to model responsible use and reinforce boundaries.",
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
        "tangible_cases": [
            {
                "title": "Shared vocabulary kickoff",
                "situation": "A leadership group and frontline staff are using different words for prompts, outputs, hallucinations, and review.",
                "learner_task": "Create a shared glossary and test it against everyday examples so the group can discuss AI without confusion.",
                "prompt": "Create a plain-language glossary for a team learning AI. Define prompt, context, output, hallucination, review, sensitive data, and human judgment. For each term, give a workplace example and a common misconception.",
            },
            {
                "title": "Nonprofit communications draft",
                "situation": "A nonprofit team wants to draft a donor update from public program facts and a fictional event recap.",
                "learner_task": "Practice drafting, audience adaptation, and review without using donor records or private beneficiary details.",
                "prompt": "Draft a donor update using only the public facts and fictional event notes below. Make it warm, specific, and modest. Then list what a staff member should verify before sending: [public facts and fictional notes].",
            },
            {
                "title": "Healthcare admin FAQ practice",
                "situation": "A cautious health care admin team wants AI practice that does not involve patient information.",
                "learner_task": "Use a fictional policy FAQ to practice summarizing, tone adjustment, and boundary setting.",
                "prompt": "Using this fictional clinic FAQ, rewrite the answer for a general audience. Do not add medical advice. Flag anything that should be reviewed by the appropriate internal owner before publication: [fictional FAQ].",
            },
        ],
        "prompt_library": [
            ("Team baseline", "Ask five questions that help a mixed-comfort team describe what they know about AI, what worries them, and what they want to learn. Keep the questions nontechnical and practical."),
            ("Prompt anatomy", "Rewrite this vague prompt into a stronger one with role, task, audience, context, constraints, examples, and success criteria. Explain what changed and why: [rough prompt]."),
            ("Output comparison", "Compare these two AI outputs. Which is more useful, more accurate, clearer, and safer to use? Name what still needs human review before either one is applied: [output A] [output B]."),
            ("Boundary sort", "Sort these example inputs into safe public practice, caution, and do not paste into public AI tools. Give a short reason for each decision: [example inputs]."),
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
        "adoption_practices": [
            "Prioritize recurring tasks that consume real time or create repeated rework, not flashy demos.",
            "Break each workflow into inputs, AI assistance, review checkpoints, handoffs, and final ownership.",
            "Measure usefulness in time saved, quality improved, rework reduced, and review burden created.",
            "Document the workflow recipe so a useful experiment can become a teachable team practice.",
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
        "tangible_cases": [
            {
                "title": "Meeting-to-action workflow",
                "situation": "A team loses momentum after meetings because notes, decisions, and follow-up messages are inconsistent.",
                "learner_task": "Use fictional meeting notes to create an agenda, decision summary, action list, and follow-up draft.",
                "prompt": "Using these fictional meeting notes, create a concise decision summary, action-item table, and follow-up email draft. Mark anything that requires human confirmation before sending: [fictional notes].",
            },
            {
                "title": "Policy explainer rewrite",
                "situation": "A department has a dense internal policy that staff struggle to understand.",
                "learner_task": "Rewrite a public or sanitized policy excerpt into clearer language, then review for missing nuance.",
                "prompt": "Rewrite this public or sanitized policy excerpt for busy staff. Keep the meaning intact, define jargon, list what changed, and identify any part that should be reviewed by the policy owner: [excerpt].",
            },
            {
                "title": "Research question map",
                "situation": "A professional needs to explore an unfamiliar topic before deciding what sources to read.",
                "learner_task": "Use AI to generate research questions, search terms, source categories, and verification steps.",
                "prompt": "Help me plan research on [topic]. Give me key questions, useful search terms, source types to look for, likely blind spots, and a verification checklist. Do not make final claims without sources.",
            },
        ],
        "prompt_library": [
            ("Workflow recipe", "Turn this recurring task into an AI-assisted workflow recipe. Include purpose, safe inputs, prompt sequence, review checkpoints, human decision points, and when not to use the workflow: [task]."),
            ("Draft and critique", "Create a first draft for [audience] using the safe context below. Then critique your own draft for clarity, tone, unsupported claims, missing context, and review needs: [safe context]."),
            ("Meeting preparation", "Using this fictional meeting context, create an agenda, prep questions, risks to discuss, and a follow-up template. Keep all assumptions visible: [fictional context]."),
            ("Decision support", "Compare these options without choosing for me. Create criteria, pros and cons, assumptions, missing information, and questions a human decision maker should answer: [options]."),
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
        "adoption_practices": [
            "Start discovery by asking where the business spends most of its time and what important work is being neglected.",
            "Combine top-down priorities with worker voice so use cases reflect real operations, not only leadership guesses.",
            "Score each idea by value, risk, readiness, data sensitivity, review burden, and learning required.",
            "Separate train, pilot, wait, avoid, and specialist-review decisions before spending money on tools.",
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
            "AI adoption value scan: time spent, neglected work, value, risk, next step",
        ],
        "follow_up": [
            "Choose two low-risk training candidates and one idea to postpone.",
            "Schedule the right briefing or workshop for the highest-priority audience.",
            "Review the map monthly as team fluency and tool options change.",
        ],
        "tangible_cases": [
            {
                "title": "Nonprofit intake backlog",
                "situation": "A nonprofit team spends too much time sorting public inquiries, drafting first responses, and preparing internal handoffs.",
                "learner_task": "Map the workflow, identify safe practice points, and decide which steps are training candidates rather than automation projects.",
                "prompt": "Analyze this fictional nonprofit intake workflow. Identify friction points, possible AI training opportunities, data sensitivity concerns, review needs, and whether each idea belongs in train, pilot, wait, or avoid: [fictional workflow].",
            },
            {
                "title": "Clinic admin documentation",
                "situation": "A health care organization wants to improve admin templates but is cautious about patient privacy and medical claims.",
                "learner_task": "Separate generic documentation practice from anything requiring internal privacy, clinical, legal, or compliance owners.",
                "prompt": "Given this fictional clinic admin workflow, list low-risk AI training ideas, items that require private systems or internal approval, and items to avoid. Do not provide medical, legal, compliance, or cybersecurity assurances: [fictional workflow].",
            },
            {
                "title": "Customer support knowledge gaps",
                "situation": "A small company has scattered public FAQ pages and repeated support questions.",
                "learner_task": "Score possible use cases by value, risk, readiness, and review burden before any tool purchase.",
                "prompt": "Turn these fictional support pain points into use-case cards. For each card, include task, user, input, output, value, risk, readiness, review owner, and recommended next step: [pain points].",
            },
        ],
        "prompt_library": [
            ("Friction map", "Help a team map workflow friction. Ask for recurring tasks, delays, rework, handoffs, knowledge bottlenecks, and sensitive-data concerns. Then summarize likely AI training opportunities."),
            ("Use-case card", "Create a use-case card for this AI idea with user, task, input, output, value, risk, data sensitivity, review owner, readiness, and training need: [idea]."),
            ("Value-risk scoring", "Score these AI ideas from 1 to 5 for value, risk, readiness, and review burden. Explain each score and sort the ideas into train, pilot, wait, or avoid: [ideas]."),
            ("Readiness summary", "Draft a cautious readiness summary for leaders. Include what the team is ready to learn, what should be postponed, what needs specialist review, and the smallest practical next step: [findings]."),
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
        "adoption_practices": [
            "Treat AI adoption as work redesign and capability building, not simply tool access.",
            "Ask what evidence would justify scaling before approving major spend or vendor lock-in.",
            "Align incentives, manager support, and evaluation habits so experimentation can produce shared learning.",
            "Create a basic evaluation structure: who reviews outputs, who updates workflows, and how lessons are captured.",
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
            "Responsible adoption operating model: people, process, governance, measurement",
        ],
        "follow_up": [
            "Select a first audience for training or discovery.",
            "List vendor, policy, or data questions that require specialist review.",
            "Schedule a follow-up briefing or readiness sprint if the organization needs a fuller map.",
        ],
        "tangible_cases": [
            {
                "title": "Vendor pitch review",
                "situation": "A CEO hears a vendor promise broad productivity gains and wants better questions before spending money.",
                "learner_task": "Translate the pitch into concrete questions about workflow fit, data handling, review, ownership, and training.",
                "prompt": "Turn this vendor claim into practical evaluation questions. Cover workflow fit, data handling, human review, implementation burden, training needs, lock-in, and evidence we should request: [vendor claim].",
            },
            {
                "title": "Board-level AI stance",
                "situation": "A board or senior leadership group asks whether the organization has an AI strategy.",
                "learner_task": "Draft a calm response that frames learning, boundaries, and next steps without overpromising outcomes.",
                "prompt": "Draft a board-level AI learning statement. Emphasize clarity before complexity, staff fluency, safe experimentation, human judgment, and decisions that need the right internal owners. Avoid hype and guarantees.",
            },
            {
                "title": "Policy before practice tension",
                "situation": "A department wants to ban, buy, or standardize AI before staff understand practical use.",
                "learner_task": "Separate what training can solve from what requires policy, legal, privacy, technical, or procurement decisions.",
                "prompt": "Given this leadership concern, separate issues into fluency training, workflow practice, policy, procurement, technical implementation, and specialist review. Recommend a small next step for each: [concern].",
            },
        ],
        "prompt_library": [
            ("Decision gate", "Evaluate this AI idea through decision gates: learn, practice, pilot, buy, wait, or seek specialist review. Explain the evidence needed before moving to the next gate: [AI idea]."),
            ("Leadership briefing prep", "Prepare a plain-language executive briefing on [AI topic]. Include what it is, what it is useful for, limits, risks, good questions to ask, and a cautious next step."),
            ("Vendor question bank", "Create a vendor question bank for [tool category]. Include questions about data use, privacy, review workflows, admin controls, implementation effort, training, support, and exit options."),
            ("Internal message", "Draft an internal message explaining that we are learning about AI before making major technology decisions. Keep it calm, practical, nontechnical, and clear about responsible use boundaries."),
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
        "adoption_practices": [
            "Use recurring office hours as a learning system: collect questions, compare examples, update norms, and share what changed.",
            "Reward useful observations about failures and confusing outputs, not only successful prompts.",
            "Translate tool changes into work implications so people are not forced to chase every announcement.",
            "Revisit boundaries as tools gain new file, memory, browsing, coding, or agent capabilities.",
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
        "tangible_cases": [
            {
                "title": "Prompt that failed",
                "situation": "A team member tried AI for a harmless task, but the result was generic, wrong, or too confident.",
                "learner_task": "Diagnose whether the issue was task choice, missing context, weak constraints, or insufficient review.",
                "prompt": "Diagnose why this AI attempt failed. Classify the likely issue as task choice, missing context, unclear constraints, weak examples, overtrust, or review failure. Suggest a safer revised prompt: [failed prompt and output].",
            },
            {
                "title": "New feature translation",
                "situation": "A model or product announces a new feature, and the team is unsure whether it matters.",
                "learner_task": "Translate the change into practical implications, ignore the noise, and name any new boundaries.",
                "prompt": "Explain this AI tool update for a cautious team. What changed, what might be useful, what should we ignore for now, what risks or boundaries remain, and what small safe experiment could we try? [update].",
            },
            {
                "title": "Shared learning capture",
                "situation": "Several staff members are experimenting privately, but the organization is not learning from those experiments.",
                "learner_task": "Convert individual examples into shared guidance, question lists, workflow notes, and follow-up topics.",
                "prompt": "Turn these monthly AI practice notes into a team learning recap. Include useful patterns, confusing moments, unsafe ideas to avoid, workflows to revisit, and questions for next office hours: [practice notes].",
            },
        ],
        "prompt_library": [
            ("Question refinement", "Turn this messy AI question into a clearer office-hours question. Identify the real task, missing context, data boundaries, and what kind of answer would be useful: [question]."),
            ("Workflow rescue", "Rescue this disappointing AI workflow. Identify where it broke down, rewrite the prompt sequence, add review checkpoints, and say when the task should stay human-led: [workflow]."),
            ("Tool-change digest", "Summarize this AI tool change for a practical team. Use three sections: what changed, who should care, and what to test safely next month: [announcement]."),
            ("Monthly recap", "Create a one-page office-hours recap from these notes. Include questions answered, examples discussed, practice habit, cautions, and items to revisit next month: [notes]."),
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
        "adoption_practices": [
            "Use least-privilege thinking: give local agents only the access, scope, and autonomy the task actually requires.",
            "Assume agent outputs and actions need verification through diffs, tests, screenshots, logs, or independent review.",
            "Treat prompt injection, sensitive information disclosure, and excessive agency as design risks for tool-using systems.",
            "Keep rollback, audit trail, and human approval points visible before using full-control agents on higher-risk work.",
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
        "tangible_cases": [
            {
                "title": "Website content update",
                "situation": "A site owner wants to add a new section to a public website while preserving design patterns and avoiding unrelated changes.",
                "learner_task": "Ask the agent to inspect the repo, propose scoped edits, implement, test, screenshot, and summarize the diff.",
                "prompt": "Inspect this project first. Then add a new public content section about [topic] using existing design patterns. Do not change unrelated files. After editing, run the appropriate checks, capture any layout concerns, and summarize the exact files changed.",
            },
            {
                "title": "PDF companion generation",
                "situation": "A curriculum owner wants PDF companions regenerated from site content and visually checked.",
                "learner_task": "Use the local generator, render PDFs to images, inspect layout, and keep public and output copies synchronized.",
                "prompt": "Update the PDF companion content for [track]. Regenerate the PDFs, render representative pages to images, check for clipping or awkward spacing, and report the output files and verification results.",
            },
            {
                "title": "Low-risk bug fix",
                "situation": "A local app has a visible layout bug on mobile after new content was added.",
                "learner_task": "Have the agent reproduce the issue, inspect CSS, make a targeted fix, run lint/build, and verify mobile width.",
                "prompt": "Reproduce the mobile layout issue at [route]. Identify the smallest CSS change that fixes it, avoid unrelated refactors, run lint and build, then verify there is no horizontal overflow at 390px width.",
            },
        ],
        "prompt_library": [
            ("Inspect before editing", "Before making changes, inspect the repo structure, relevant files, existing patterns, and likely risks. Then propose the smallest implementation plan and wait for approval if the change touches deployment, credentials, deletion, or external API calls."),
            ("Scoped edit", "Make only the requested change: [change]. Follow existing patterns, avoid unrelated refactors, and list any assumptions. After editing, show the files changed and the verification you ran."),
            ("Verification plan", "Create and run a verification plan for this change. Include static checks, build, browser checks, screenshot or render checks where relevant, and any residual risks a human should review."),
            ("Rollback thinking", "Before publishing, explain how to reverse this change if it is wrong. Identify the commit, changed files, deployment checks, and the exact evidence we should confirm after release."),
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
        Paragraph("Research-backed adoption practices", style["SectionTitle"]),
        bullet_list(curriculum["adoption_practices"], style["BodyTextX"]),
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

    story.append(Paragraph("1-2 hour utility projects", style["SectionTitle"]))
    story.append(
        Paragraph(
            "These short projects are designed to help individuals experience practical AI utility while keeping inputs safe and human review visible.",
            style["BodyTextX"],
        )
    )
    story.append(Paragraph("How to choose a strong first project", style["SectionTitle"]))
    story.append(bullet_list(PROJECT_SELECTION_RUBRIC, style["BodyTextX"]))
    for project in INDIVIDUAL_UTILITY_PROJECTS:
        story.append(Paragraph(f"<b>{project['title']} ({project['timebox']})</b>", style["BodyTextX"]))
        story.append(Paragraph(project["hook"], style["BodyTextX"]))
        story.append(Paragraph(f"<b>Walk-away artifact:</b> {project['outcome']}", style["BodyTextX"]))
        story.append(Paragraph(f"<b>Safe input:</b> {project['safe_input']}", style["BodyTextX"]))
        story.append(bullet_list(project["steps"], style["BodyTextX"]))
        story.append(Paragraph(f"<b>Starter prompt:</b> {project['starter_prompt']}", style["BodyTextX"]))

    story.append(Paragraph("Tangible cases", style["SectionTitle"]))
    for case in curriculum["tangible_cases"]:
        story.append(Paragraph(f"<b>{case['title']}</b>", style["BodyTextX"]))
        story.append(Paragraph(f"<b>Situation:</b> {case['situation']}", style["BodyTextX"]))
        story.append(Paragraph(f"<b>Learner task:</b> {case['learner_task']}", style["BodyTextX"]))
        story.append(Paragraph(f"<b>Starter prompt:</b> {case['prompt']}", style["BodyTextX"]))

    story.append(Paragraph("Prompt library", style["SectionTitle"]))
    for title, prompt in curriculum["prompt_library"]:
        story.append(Paragraph(f"<b>{title}</b>", style["BodyTextX"]))
        story.append(Paragraph(prompt, style["BodyTextX"]))

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


def build_starter_project_pdf(out_dir):
    out_path = out_dir / "first-60-minute-ai-utility-project.pdf"
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="First 60-Minute AI Utility Project | Xensible",
    )
    style = styles()
    starter = INDIVIDUAL_UTILITY_PROJECTS[0]
    story = [
        Paragraph("Xensible free practice worksheet", style["Kicker"]),
        Paragraph("First 60-Minute AI Utility Project", style["CoverTitle"]),
        Paragraph(
            "A short, practical exercise for AI-curious individuals who want to feel real utility before choosing tools, buying software, or joining a longer training path.",
            style["BodyTextX"],
        ),
        Spacer(1, 0.12 * inch),
        Table(
            [
                [Paragraph("<b>Project</b>", style["BodyTextX"]), Paragraph(starter["title"], style["BodyTextX"])],
                [Paragraph("<b>Timebox</b>", style["BodyTextX"]), Paragraph(starter["timebox"], style["BodyTextX"])],
                [Paragraph("<b>Artifact</b>", style["BodyTextX"]), Paragraph(starter["outcome"], style["BodyTextX"])],
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
        Paragraph("Why this project works", style["SectionTitle"]),
        Paragraph(
            "Learning sprints are often the easiest way to experience AI's practical value. The learner starts with curiosity, gets a usable artifact, and immediately practices the judgment habit of checking what still needs verification.",
            style["BodyTextX"],
        ),
        Paragraph("Safe input rule", style["SectionTitle"]),
        Paragraph(starter["safe_input"], style["BodyTextX"]),
        Paragraph("Steps", style["SectionTitle"]),
        bullet_list(starter["steps"], style["BodyTextX"]),
        Paragraph("Starter prompt", style["SectionTitle"]),
        Paragraph(starter["starter_prompt"], style["BodyTextX"]),
        PageBreak(),
        Paragraph("Review before relying", style["SectionTitle"]),
        bullet_list(PROJECT_REVIEW_QUESTIONS, style["BodyTextX"]),
        Paragraph("How to choose the next project", style["SectionTitle"]),
        bullet_list(PROJECT_SELECTION_RUBRIC, style["BodyTextX"]),
        Paragraph("Other 1-2 hour projects to try", style["SectionTitle"]),
    ]

    for project in INDIVIDUAL_UTILITY_PROJECTS[1:]:
        story.append(Paragraph(f"<b>{project['title']} ({project['timebox']})</b>", style["BodyTextX"]))
        story.append(Paragraph(project["hook"], style["BodyTextX"]))
        story.append(Paragraph(f"<b>Walk-away artifact:</b> {project['outcome']}", style["BodyTextX"]))

    story.extend(
        [
            Paragraph("Guided Zoom option", style["SectionTitle"]),
            Paragraph(
                "These projects can be run as individual coaching assignments or as team workshops. A guided session helps learners choose safe inputs, improve prompts, review outputs, and connect the exercise to real work without overtrusting the tool.",
                style["BodyTextX"],
            ),
            Paragraph("Contact", style["SectionTitle"]),
            Paragraph("contact@xensible.com", style["BodyTextX"]),
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

    starter_pdf = build_starter_project_pdf(public_dir)
    starter_output_pdf = output_dir / starter_pdf.name
    starter_output_pdf.write_bytes(starter_pdf.read_bytes())
    print(starter_pdf)


if __name__ == "__main__":
    main()
