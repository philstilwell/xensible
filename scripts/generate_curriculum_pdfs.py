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
        "title": "Public Article Learning Kit",
        "timebox": "60-75 minutes",
        "hook": "Turn one public article into a tutor session and a usable study packet.",
        "outcome": "A one-page explainer, eight-term glossary, five-question quiz, misconception list, and verification table.",
        "safe_input": "Use a public article, help page, announcement, or topic summary. Avoid private client, patient, employee, financial, legal, or proprietary material.",
        "steps": [
            "Paste or summarize one public source and state your current knowledge level.",
            "Ask for an explainer, glossary, examples, and common misconceptions.",
            "Create a five-question quiz and answer it before looking at the answer key.",
            "Mark every claim that needs source checking before you share or rely on it.",
        ],
        "starter_prompt": "Use this public source to create a learning kit for a smart beginner: [public source or topic]. Produce a one-page explainer, eight-term glossary, three examples, common misconceptions, a five-question quiz with answer key, and a verification table listing claims I should check in reliable sources.",
    },
    {
        "title": "Decision Brief in a Box",
        "timebox": "75-90 minutes",
        "hook": "Use AI to structure a decision without handing the decision away.",
        "outcome": "A one-page decision brief with criteria, option table, assumption register, pre-mortem, and next-evidence checklist.",
        "safe_input": "Use a personal, public, fictional, or sanitized decision. Keep confidential finances, contracts, medical, legal, or customer details out of public tools.",
        "steps": [
            "Name two or three options, the decision deadline, constraints, and what success would look like.",
            "Ask for a weighted criteria table and force the model to show its assumptions.",
            "Run a pre-mortem for the most tempting option and a second pass for the safest option.",
            "Write three human-only judgment questions you will answer before acting.",
        ],
        "starter_prompt": "Help me build a decision brief without deciding for me: [safe decision context]. Include weighted criteria, an option comparison table, assumptions, likely failure modes, missing evidence, who should be consulted, and three final human judgment questions.",
    },
    {
        "title": "Meeting-to-Momentum Kit",
        "timebox": "60-90 minutes",
        "hook": "Convert a rough meeting idea into a focused agenda and follow-through packet.",
        "outcome": "A timed agenda, participant prep note, decision log template, action-item table, and follow-up email draft.",
        "safe_input": "Use fictional or sanitized meeting context. Do not paste private attendee notes, personnel details, patient data, customer records, or proprietary plans into public tools.",
        "steps": [
            "Describe the meeting purpose, attendees by role, time available, and desired output.",
            "Ask for a timed agenda with decisions, discussion prompts, and parking-lot items.",
            "Create a follow-up template with owners, due dates, unresolved questions, and confirmation language.",
            "Delete or rewrite anything that sounds like a promise, personnel judgment, or confidential detail.",
        ],
        "starter_prompt": "Using this fictional or sanitized meeting context, create a meeting kit: timed agenda, prep questions by role, likely tensions, decision log, action-item table, and follow-up email draft. Mark assumptions and anything a human should confirm before sending: [context].",
    },
    {
        "title": "Before-and-After Writing Studio",
        "timebox": "60 minutes",
        "hook": "Use AI as an editor, not a ghostwriter, and leave with a cleaner real draft.",
        "outcome": "A revised email, memo, bio, announcement, or article with a change log, tone rationale, and final review checklist.",
        "safe_input": "Use a rough draft that contains no sensitive personal, client, patient, employee, legal, financial, or proprietary details.",
        "steps": [
            "Paste a safe rough draft and name the audience, purpose, tone, and length limit.",
            "Ask for two alternative revisions: one clearer and one warmer or more concise.",
            "Have AI critique the revision for unsupported claims, missing context, and awkward tone.",
            "Make the final edits yourself and keep a before-and-after note on what improved.",
        ],
        "starter_prompt": "Revise this safe rough draft for [audience] with a [tone] tone and a [length] limit. Give me two versions, explain the changes, then critique the stronger version for clarity, unsupported claims, missing context, and anything I should verify before sending: [safe draft].",
    },
    {
        "title": "Research Launch Board",
        "timebox": "90-120 minutes",
        "hook": "Plan the research before the rabbit hole opens.",
        "outcome": "A research board with question clusters, search strings, source ladder, opposing views, red flags, and claim-check table.",
        "safe_input": "Use a public topic or general business question. Do not ask AI to invent citations or make final claims without sources.",
        "steps": [
            "Start with one broad public question and ask AI to break it into subquestions.",
            "Generate search strings, source categories, keywords to avoid, and missing perspectives.",
            "Ask for a claim-check table with columns for claim, source needed, confidence, and next action.",
            "Use the board to search actual sources; do not treat the model output as evidence.",
        ],
        "starter_prompt": "Help me build a research launch board for [public topic]. Create question clusters, search strings, source types, likely blind spots, opposing perspectives, red flags, and a claim-check table. Do not invent citations or make final claims without sources.",
    },
    {
        "title": "Workflow Recipe Card",
        "timebox": "90-120 minutes",
        "hook": "Turn one repeated task into a reusable recipe your future self can follow.",
        "outcome": "A recipe card with trigger, safe inputs, prompt sequence, review gates, owner, time saved estimate, and stop signs.",
        "safe_input": "Choose a recurring task and describe it generally or with fictional examples. Keep sensitive operational data out of public tools.",
        "steps": [
            "Write the current task steps from trigger to final output.",
            "Mark which inputs are safe, which must be generalized, and which should not enter a public tool.",
            "Ask AI to propose a prompt sequence and review checkpoints for the safest useful slice.",
            "Test the recipe with one fictional example and revise the steps until they are repeatable.",
        ],
        "starter_prompt": "Turn this recurring task into a safe AI-assisted workflow recipe: [task]. Include trigger, user, safe inputs, prompt sequence, expected output, review checkpoints, human owner, estimated time saved, risks, stop signs, and when not to use AI.",
    },
    {
        "title": "Professional Proof Portfolio",
        "timebox": "75-90 minutes",
        "hook": "Use AI to turn scattered experience into concrete positioning you can defend.",
        "outcome": "A 150-word bio, six resume bullets, proof bank, interview answer outlines, and claims-to-evidence checklist.",
        "safe_input": "Use a sanitized career summary or fictionalized role description. Do not include private employer data, references, compensation, or confidential projects.",
        "steps": [
            "Write a sanitized inventory of roles, strengths, projects, and outcomes you can discuss publicly.",
            "Ask AI to draft positioning options and separate claims from evidence.",
            "Create resume bullets and interview outlines, then remove anything inflated or unverifiable.",
            "Practice three interview questions and revise the language until it sounds true in your own voice.",
        ],
        "starter_prompt": "Using this sanitized professional summary, help me build a proof portfolio. Draft a 150-word bio, six resume bullet options, a proof bank, three interview answer outlines, and a claims-to-evidence checklist. Flag anything that sounds inflated or needs stronger evidence: [summary].",
    },
    {
        "title": "Seven-Day Action Plan",
        "timebox": "60-75 minutes",
        "hook": "Turn a vague goal into a week of small, scheduled actions.",
        "outcome": "A seven-day plan with calendar blocks, next actions, obstacle responses, accountability note, and end-of-week review.",
        "safe_input": "Use personal goals and constraints that are not private, medical, financial, legal, or deeply sensitive.",
        "steps": [
            "Describe the goal, available time, constraints, and what usually derails progress.",
            "Ask for a one-week plan with daily actions no longer than 45 minutes.",
            "Have AI identify likely obstacles and create if-then responses.",
            "Put the first two actions on your calendar and delete anything unrealistic.",
        ],
        "starter_prompt": "Help me turn this safe goal into a seven-day action plan: [safe goal]. Ask up to five clarifying questions if needed, then create calendar blocks, daily next actions under 45 minutes, obstacle responses, an accountability note, and an end-of-week review checklist.",
    },
]


PROJECT_SELECTION_RUBRIC = [
    "Real work, safe input: choose a task learners recognize, then substitute public, fictional, or sanitized material.",
    "Named walk-away artifact: produce a file, table, checklist, brief, agenda, glossary, recipe card, or other object.",
    "Visible human judgment: require the learner to check claims, reject weak output, revise tone, name uncertainty, or decide what stays human-led.",
    "Transferable next use: teach a repeatable pattern such as adding context, requesting structure, comparing alternatives, verifying claims, documenting the recipe, and trying it again.",
]


PROJECT_REVIEW_QUESTIONS = [
    "What exact artifact did you leave with: document, table, checklist, agenda, brief, or recipe?",
    "What part of the artifact is useful enough to keep, and what should be discarded?",
    "Which prompt detail improved the result most: audience, context, constraints, examples, or output format?",
    "Where did the output sound confident but still need source checking, owner review, or human judgment?",
    "What information did you deliberately keep out of the public tool?",
    "What is the smallest real task where you could reuse this pattern in the next seven days?",
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
        ("Public article learning kit", "Build: one-page explainer, eight-term glossary, five-question quiz, and claim-check table. Use: one public article or help page. Do: ask for explanation, examples, misconceptions, and quiz. Check: source fidelity, uncertainty, and claims needing verification."),
        ("Email tone workshop", "Build: three versions of the same safe email plus a change log. Use: a fictional or sanitized email scenario. Do: request concise, warmer, and formal versions, then revise one in your own voice. Check: unsupported promises, missing facts, and tone."),
        ("Agenda and next-action plan", "Build: 30-minute agenda, prep questions, owner table, and follow-up email shell. Use: a fictional or sanitized meeting goal. Do: generate agenda, actions, and follow-up. Check: owners, timing, assumptions, and human confirmation needs."),
        ("Output red-team pass", "Build: a marked-up AI draft with unsupported claims, vague wording, missing context, and next checks highlighted. Use: a safe AI-generated draft. Do: critique twice, once broadly and once for assumptions. Check: what to keep, revise, verify, or discard."),
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
            "learner_task": "Produce a one-page explainer, glossary, quiz, and claim-check table from the public text.",
            "prompt": "Create a learning kit from the following public text. Give me a one-page explainer, eight-term glossary, five-question quiz with answer key, and a claim-check table with claim, source needed, and next action: [paste public text].",
        },
        {
            "title": "Fictional email draft",
            "situation": "A professional wants to practice drafting an email without using client, patient, employee, or proprietary details.",
            "learner_task": "Draft three versions, choose one, and create a final review checklist before sending.",
            "prompt": "Using this fictional scenario, draft three versions of a professional email: concise, warmer, and more formal. Recommend one, explain why, and include a checklist of claims, promises, names, dates, and tone choices a human should confirm: [fictional scenario].",
        },
        {
            "title": "First practice plan",
            "situation": "A curious learner needs a low-pressure way to keep practicing after the starter session.",
            "learner_task": "Choose one safe weekly task and create a daily practice log with artifact, review note, and next use.",
            "prompt": "Help me design a one-week AI practice plan using only public or fictional information. Include one task per day, the exact artifact to produce, a safety reminder, a five-minute review step, and a log table for what worked, what failed, what I checked, and what I will reuse.",
        },
    ],
    "prompt_library": [
        ("Plain-language explanation", "Explain [AI concept] for a smart beginner. Produce a one-page explainer with an everyday analogy, two practical uses, two limits, three terms to learn, and a short verification checklist."),
        ("Starter prompt builder", "Turn my rough request into a stronger prompt. Ask me for missing context first. Then produce a reusable prompt card with task, audience, context, constraints, output format, examples to provide, and review criteria."),
        ("Output review", "Review this AI-generated draft. Return a table with issue, quoted phrase, why it matters, fix, and human verification needed. Check unsupported claims, vague wording, missing context, possible bias, tone problems, and privacy concerns: [draft]."),
        ("Safe practice chooser", "Given these possible practice tasks, sort them into safe public practice, use caution or anonymize, and do not use in a public tool. For each task, explain the reason, suggest a safer substitute input, and name the review owner if one is needed: [task list]."),
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
            ("Prompt card build", "Build: a reusable prompt card with role, task, audience, context, constraints, output format, and success criteria. Use: a bland public or fictional task. Do: compare vague and improved prompts. Check: whether another learner can reuse it safely."),
            ("Two-output quality review", "Build: a comparison table scoring two outputs for usefulness, accuracy risk, tone, missing context, and next revision. Use: two responses to the same safe prompt. Do: score and combine strengths. Check: what still needs human verification."),
            ("Data-boundary sorting table", "Build: safe public practice, caution or anonymize, and do-not-paste columns. Use: fictional examples of emails, notes, spreadsheets, policies, and webpages. Do: sort and rewrite risky examples. Check: whether the boundary is teachable."),
            ("Revision ladder", "Build: raw output, clearer version, audience-tuned version, and human-final version. Use: a public or fictional announcement or note. Do: draft, critique, revise, and self-edit. Check: clarity gains and verifiable claims."),
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
                "learner_task": "Create a shared glossary, example table, and misconception list the team can use during future AI discussions.",
                "prompt": "Create a plain-language AI glossary for a mixed-comfort team. Define prompt, context, output, hallucination, review, sensitive data, and human judgment. For each term, provide a workplace example, common misconception, and one question a learner can ask in a Zoom session.",
            },
            {
                "title": "Nonprofit communications draft",
                "situation": "A nonprofit team wants to draft a donor update from public program facts and a fictional event recap.",
                "learner_task": "Create a donor update packet with draft, subject lines, verification list, and human review note.",
                "prompt": "Draft a donor update packet using only the public facts and fictional event notes below. Include a 250-word update, five subject lines, a tone note, a claims-to-verify checklist, and a staff review note. Do not use donor records or private beneficiary details: [public facts and fictional notes].",
            },
            {
                "title": "Healthcare admin FAQ practice",
                "situation": "A cautious health care admin team wants AI practice that does not involve patient information.",
                "learner_task": "Rewrite a fictional FAQ, create a review-owner list, and separate plain-language help from anything requiring internal review.",
                "prompt": "Using this fictional clinic FAQ, create a plain-language version for a general audience, a jargon glossary, and a review-owner checklist. Do not add medical advice or legal/compliance assurances. Flag anything the appropriate internal owner should review: [fictional FAQ].",
            },
        ],
        "prompt_library": [
            ("Team baseline", "Create a five-question baseline intake for a mixed-comfort team. For each question, include what the answer reveals, how it might shape training, and one safe follow-up exercise. Keep the questions nontechnical and practical."),
            ("Prompt anatomy", "Rewrite this vague prompt into a stronger prompt card with role, task, audience, context, constraints, examples, output format, and success criteria. Then explain what changed and provide a review checklist for the output: [rough prompt]."),
            ("Output comparison", "Compare these two AI outputs in a table. Score usefulness, clarity, accuracy risk, tone, missing context, and safety. Recommend what to keep, revise, verify, or discard before either one is applied: [output A] [output B]."),
            ("Boundary sort", "Sort these example inputs into safe public practice, caution or anonymize, and do not paste into public AI tools. Give the reason, a safer substitute if possible, and the human owner who should review borderline cases: [example inputs]."),
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
            ("Writing packet workflow", "Build: intake questions, draft prompt, critique prompt, revision prompt, and final review checklist. Use: a public, fictional, or sanitized memo or FAQ. Do: draft, critique, revise, and document the sequence. Check: claims, voice, and final human approval."),
            ("Meeting-to-action workflow", "Build: agenda, prep questions, decision log, action table, and follow-up message. Use: fictional or sanitized meeting context. Do: generate the packet and mark confirmations. Check: invented commitments, owner placeholders, and due dates."),
            ("Research triage board", "Build: question clusters, source categories, search strings, blind spots, and claim-verification table. Use: a public topic or general business question. Do: plan research before collecting sources. Check: model output is not treated as evidence."),
            ("Decision-support brief", "Build: criteria, option matrix, assumptions, pre-mortem, missing evidence, and human decision questions. Use: a fictional, public, or sanitized decision. Do: compare without choosing. Check: accountability remains with a person."),
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
                "learner_task": "Use fictional meeting notes to create a decision summary, action table, unresolved-questions list, and follow-up draft.",
                "prompt": "Using these fictional meeting notes, create a meeting-to-action packet: decision summary, action-item table with owner and deadline placeholders, unresolved questions, follow-up email draft, and assumptions requiring human confirmation: [fictional notes].",
            },
            {
                "title": "Policy explainer rewrite",
                "situation": "A department has a dense internal policy that staff struggle to understand.",
                "learner_task": "Rewrite a public or sanitized policy excerpt into a staff explainer, glossary, exceptions list, and review note.",
                "prompt": "Rewrite this public or sanitized policy excerpt for busy staff. Produce a plain-language explainer, glossary, exceptions or edge cases to ask about, change log, and policy-owner review checklist. Keep the meaning intact: [excerpt].",
            },
            {
                "title": "Research question map",
                "situation": "A professional needs to explore an unfamiliar topic before deciding what sources to read.",
                "learner_task": "Use AI to create a research launch board with search strings, source ladder, blind spots, and claim-check table.",
                "prompt": "Help me plan research on [topic]. Build a research launch board with question clusters, search strings, source types, likely blind spots, opposing perspectives, red flags, and a claim-check table. Do not make final claims without sources.",
            },
        ],
        "prompt_library": [
            ("Workflow recipe", "Turn this recurring task into an AI-assisted workflow recipe card. Include trigger, user, safe inputs, prompt sequence, expected output, review checkpoints, human decision points, handoffs, risks, stop signs, and when not to use the workflow: [task]."),
            ("Draft and critique", "Create a first draft for [audience] using the safe context below. Then produce a critique table covering clarity, tone, unsupported claims, missing context, audience fit, and review needs. Finish with a revised version and a human-final checklist: [safe context]."),
            ("Meeting preparation", "Using this fictional meeting context, create a timed agenda, prep questions by role, likely tensions, decision log template, action table, and follow-up email shell. Keep assumptions visible and mark what a human must confirm: [fictional context]."),
            ("Decision support", "Compare these options without choosing for me. Create a decision brief with criteria, option matrix, assumptions, missing evidence, pre-mortem, stakeholder questions, and final human decision questions: [options]."),
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
            ("20-task time scan", "Build: a ranked list of recurring tasks with time spent, friction, neglected work, data sensitivity, and review owner. Use: generalized workshop notes. Do: score frequency, pain, value, sensitivity, and burden. Check: value opportunities come from real time sinks or neglected work."),
            ("Use-case card sorting", "Build: use-case cards with user, task, input, output, value, risk, readiness, review owner, and next step. Use: generalized workflow descriptions. Do: sort into train, discover, pilot, wait, avoid, or specialist review. Check: specificity and caution."),
            ("Value-risk board", "Build: a 2x2 board by practical value and risk or review burden. Use: sanitized use-case cards. Do: plot, discuss risk reduction, and pick two low-risk training examples. Check: the board slows premature buying."),
            ("30-day readiness memo", "Build: a one-page memo naming what to train, test, postpone, and assign to internal owners. Use: anonymized findings. Do: summarize candidates and higher-risk items. Check: no promised savings or implementation outcomes."),
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
                "learner_task": "Build a friction map, use-case cards, and train/pilot/wait/avoid sort without treating intake as an automation project.",
                "prompt": "Analyze this fictional nonprofit intake workflow. Create a friction map, use-case cards, data sensitivity notes, review-owner list, and train/discover/pilot/wait/avoid recommendation for each idea: [fictional workflow].",
            },
            {
                "title": "Clinic admin documentation",
                "situation": "A health care organization wants to improve admin templates but is cautious about patient privacy and medical claims.",
                "learner_task": "Create a safe-practice list, internal-owner list, and avoid list for admin documentation improvement.",
                "prompt": "Given this fictional clinic admin workflow, create three tables: low-risk AI training ideas, items requiring private systems or internal owner approval, and items to avoid. Include input, output, review owner, and why. Do not provide medical, legal, compliance, or cybersecurity assurances: [fictional workflow].",
            },
            {
                "title": "Customer support knowledge gaps",
                "situation": "A small company has scattered public FAQ pages and repeated support questions.",
                "learner_task": "Score possible support use cases and create a 30-day training-first next-step map before any tool purchase.",
                "prompt": "Turn these fictional support pain points into use-case cards. For each card, include task, user, input, output, value, risk, readiness, review owner, recommended next step, and a 30-day training-first experiment if appropriate: [pain points].",
            },
        ],
        "prompt_library": [
            ("Friction map", "Help a team map workflow friction. Ask for recurring tasks, delays, rework, handoffs, knowledge bottlenecks, tasks being neglected, time spent, data sensitivity, and review owners. Then produce a ranked friction map and likely AI training opportunities."),
            ("Use-case card", "Create a use-case card for this AI idea with user, task, safe input, expected output, current pain, value, risk, data sensitivity, review owner, readiness, training need, and smallest next experiment: [idea]."),
            ("Value-risk scoring", "Score these AI ideas from 1 to 5 for value, risk, readiness, review burden, and data sensitivity. Explain each score, name missing evidence, and sort the ideas into train, discover, pilot, wait, avoid, or specialist review: [ideas]."),
            ("Readiness summary", "Draft a cautious one-page readiness summary for leaders. Include top time sinks, neglected work worth exploring, training candidates, ideas to postpone, items needing specialist review, owner roles, and the smallest practical next step: [findings]."),
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
            ("Vendor claim scorecard", "Build: a scorecard turning one vendor claim into workflow-fit, evidence, data, review, and implementation questions. Use: a public claim or fictional pitch. Do: extract implied promises and evidence requests. Check: no legal, security, or compliance conclusions."),
            ("Decision-gate worksheet", "Build: a train, discover, pilot, buy, wait, or specialist-review worksheet for one AI idea. Use: a fictional or sanitized idea. Do: separate learning, workflow, tool, and governance needs. Check: smallest next step avoids lock-in."),
            ("Risk language rewrite", "Build: before-and-after leadership language naming uncertainty, boundaries, and owner responsibilities. Use: a fictional or sanitized AI message. Do: remove hype and vague risk language. Check: reassurance comes from specificity, not guarantees."),
            ("Leadership message draft", "Build: a 250-word internal message explaining why the organization is learning first, what is in bounds, and what comes next. Use: sanitized organizational context. Do: draft and revise for warmth and clarity. Check: anxiety and hype both go down."),
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
                "learner_task": "Translate the pitch into a vendor scorecard with evidence requests, workflow-fit questions, and training implications.",
                "prompt": "Turn this vendor claim into a leadership scorecard. Include claimed value, evidence to request, workflow-fit questions, data-handling questions, human-review requirements, implementation burden, training needs, lock-in concerns, and what would justify a pilot: [vendor claim].",
            },
            {
                "title": "Board-level AI stance",
                "situation": "A board or senior leadership group asks whether the organization has an AI strategy.",
                "learner_task": "Draft a board-ready learning stance with boundaries, next-step gates, and owner roles without overpromising outcomes.",
                "prompt": "Draft a board-level AI learning statement of 250 words or fewer. Include clarity before complexity, staff fluency, safe experimentation, human judgment, owner roles, near-term training steps, and decisions that require specialist review. Avoid hype and guarantees.",
            },
            {
                "title": "Policy before practice tension",
                "situation": "A department wants to ban, buy, or standardize AI before staff understand practical use.",
                "learner_task": "Create a decision table separating training, workflow practice, policy, privacy/legal, technical, procurement, and wait items.",
                "prompt": "Given this leadership concern, create a decision table with columns for issue, category, owner, risk, evidence needed, and smallest next step. Categories: fluency training, workflow practice, policy, privacy/legal, technical implementation, procurement, specialist review, or wait: [concern].",
            },
        ],
        "prompt_library": [
            ("Decision gate", "Evaluate this AI idea through decision gates: learn, practice, discover, pilot, buy, wait, or seek specialist review. Produce a table with gate, evidence needed, owner, risk, cost of being wrong, and next action: [AI idea]."),
            ("Leadership briefing prep", "Prepare a plain-language executive briefing on [AI topic]. Include what it is, what it is useful for, where it fails, practical examples, limits, risks, questions leaders should ask, training implications, and a cautious next step."),
            ("Vendor question bank", "Create a vendor question bank for [tool category]. Organize it by workflow fit, evidence, data use, privacy/security review, human review, admin controls, implementation effort, training, support, lock-in, and exit options."),
            ("Internal message", "Draft an internal message explaining that we are learning about AI before making major technology decisions. Keep it calm, practical, nontechnical, and clear about responsible use boundaries, safe practice examples, what not to paste into public tools, and where questions should go."),
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
            ("Question intake board", "Build: participant questions sorted by task, data boundary, tool class, review need, and next experiment. Use: real questions rewritten safely. Do: sort and turn two into practice prompts. Check: office hours stays practical and boundary-aware."),
            ("Feature-to-work triage", "Build: a one-page digest translating one AI feature into who should care, what to test, and what to ignore. Use: a public product announcement. Do: map to tasks and design one safe test. Check: practice changes only when useful."),
            ("Failed-prompt rescue", "Build: diagnosis sheet with failure category, missing context, revised prompt, review step, and reuse-or-stop decision. Use: a non-sensitive failed prompt or fictionalized version. Do: classify and revise. Check: the lesson explains the failure."),
            ("Monthly habit scorecard", "Build: a scorecard tracking one habit, one safe experiment, one useful output, one failure, and one norm to update. Use: sanitized team practice notes. Do: apply the habit live and capture learning. Check: institutional memory grows."),
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
                "learner_task": "Create a failed-prompt diagnosis sheet, revised prompt, review checkpoint, and reuse-or-stop decision.",
                "prompt": "Diagnose why this AI attempt failed. Create a table with failure category, evidence from the output, missing context, revised prompt, review checkpoint, and reuse-or-stop recommendation. Categories include task choice, missing context, unclear constraints, weak examples, overtrust, and review failure: [failed prompt and output].",
            },
            {
                "title": "New feature translation",
                "situation": "A model or product announces a new feature, and the team is unsure whether it matters.",
                "learner_task": "Create a feature-to-work digest naming who should care, what to test, what to ignore, and what boundary changed.",
                "prompt": "Explain this AI tool update for a cautious team. Produce a one-page digest with what changed, who should care, likely work impact, what to ignore, remaining risks or boundaries, and one small safe experiment to try: [update].",
            },
            {
                "title": "Shared learning capture",
                "situation": "Several staff members are experimenting privately, but the organization is not learning from those experiments.",
                "learner_task": "Convert individual examples into a team recap, reusable patterns, caution list, workflow candidates, and next questions.",
                "prompt": "Turn these monthly AI practice notes into a team learning recap. Include useful patterns, confusing moments, unsafe ideas to avoid, reusable prompts, workflow candidates, owner questions, and a next-month practice habit: [practice notes].",
            },
        ],
        "prompt_library": [
            ("Question refinement", "Turn this messy AI question into a clearer office-hours question. Identify the real task, safe substitute input, missing context, data boundaries, desired artifact, review need, and whether it belongs in live demo, policy owner, or later research: [question]."),
            ("Workflow rescue", "Rescue this disappointing AI workflow. Identify where it broke down, rewrite the prompt sequence, add safe-input guidance, add review checkpoints, define the desired artifact, and say when the task should stay human-led: [workflow]."),
            ("Tool-change digest", "Summarize this AI tool change for a practical team. Use five sections: what changed, who should care, what work it may affect, what to ignore for now, and one safe test for next month: [announcement]."),
            ("Monthly recap", "Create a one-page office-hours recap from these notes. Include questions answered, artifacts created, examples discussed, practice habit, cautions, owner follow-ups, and items to revisit next month: [notes]."),
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
            ("Repo inspection memo", "Build: a pre-edit memo naming app structure, relevant files, dependencies, git state, risks, and proposed smallest change. Use: a low-risk local practice repo. Do: inspect before editing. Check: the operator understands the project surface."),
            ("Scoped edit diff", "Build: a tiny change set plus a diff review note explaining what changed, what did not, and why. Use: a small public content or UI change. Do: enforce non-goals and reject unrelated churn. Check: scope stayed tight."),
            ("Verification evidence packet", "Build: commands run, routes checked, screenshots or render checks, failures, fixes, and residual risk. Use: a completed low-risk change. Do: run checks and inspect affected routes. Check: evidence supports a commit decision."),
            ("Rollback note", "Build: a note naming commit, changed files, deployment check, reversal path, and confirmation evidence. Use: a practice commit or low-risk branch. Do: reason about rollback before higher-risk work. Check: reversibility is visible."),
            ("Approval boundary matrix", "Build: a matrix classifying reads, edits, tests, installs, API calls, credentials, deploys, deletions, and payments by approval level. Use: fictional agent actions. Do: classify and write boundary prompts. Check: user control remains clear."),
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
                "learner_task": "Ask the agent to inspect the repo, write a pre-edit memo, implement a scoped change, verify it, and produce a diff summary.",
                "prompt": "Inspect this project first and write a pre-edit memo with relevant files, existing patterns, risks, and verification plan. Then add a new public content section about [topic] using existing design patterns. Do not change unrelated files. After editing, run checks, inspect desktop and mobile layout if relevant, and summarize exact files changed.",
            },
            {
                "title": "PDF companion generation",
                "situation": "A curriculum owner wants PDF companions regenerated from site content and visually checked.",
                "learner_task": "Use the local generator, render representative PDF pages, inspect layout, record evidence, and keep public and output copies synchronized.",
                "prompt": "Update the PDF companion content for [track]. Regenerate the PDFs, render representative pages to images, check for clipping, awkward spacing, missing sections, and stale content, then report output files, evidence inspected, fixes made, and residual risks.",
            },
            {
                "title": "Low-risk bug fix",
                "situation": "A local app has a visible layout bug on mobile after new content was added.",
                "learner_task": "Have the agent reproduce the issue, inspect CSS, make the smallest targeted fix, run checks, and attach mobile verification evidence.",
                "prompt": "Reproduce the mobile layout issue at [route]. Identify the smallest CSS change that fixes it, avoid unrelated refactors, run lint and build, verify at 390px and desktop width, and report the before/after evidence and any residual risk.",
            },
        ],
        "prompt_library": [
            ("Inspect before editing", "Before making changes, inspect the repo structure, relevant files, existing patterns, current git state, dependencies, and likely risks. Produce a pre-edit memo with the smallest implementation plan, expected files, checks to run, and approval triggers for deployment, credentials, deletion, installs, payments, or external API calls."),
            ("Scoped edit", "Make only the requested change: [change]. Follow existing patterns, avoid unrelated refactors, and list assumptions. After editing, provide a diff summary, files changed, checks run, screenshots or render evidence if relevant, and anything a human should inspect."),
            ("Verification plan", "Create and run a verification plan for this change. Include static checks, build, affected routes, desktop and mobile browser checks, screenshot or render checks where relevant, known limitations, and residual risks a human should review."),
            ("Rollback thinking", "Before publishing, write a rollback note. Identify the commit or branch, changed files, deployment checks, safest reversal path, data or content that would need special care, and the exact evidence we should confirm after release."),
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
            "A public article learning kit is often the easiest way to experience AI's practical value. The learner starts with curiosity, leaves with a concrete study packet, and immediately practices the judgment habit of checking what still needs verification.",
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
