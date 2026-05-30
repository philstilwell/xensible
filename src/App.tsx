import type { ComponentType, FormEvent, MouseEvent, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  GraduationCap,
  Handshake,
  Lightbulb,
  Map,
  MessageCircle,
  MonitorPlay,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
} from 'lucide-react'
import heroImage from './assets/xensible-hero.webp'
import founderImage from './assets/phil-stilwell-bio.webp'
import './App.css'

type IconType = ComponentType<LucideProps>

type UtilityProject = {
  title: string
  timebox: string
  hook: string
  outcome: string
  safeInput: string
  steps: string[]
  starterPrompt: string
}

type SectorProjectExample = {
  title: string
  audience: string
  body: string
  safeInput: string
}

type PracticeLab = {
  title: string
  artifact: string
  safeInput: string
  steps: string[]
  review: string
}

type StarterPromptingActivity = {
  title: string
  pattern: string
  skill: string
  artifact: string
  safeInput: string
  starterPrompt: string
}

type CurriculumContent = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  format: string
  audience: string
  level: string
  icon: IconType
  outcomes: string[]
  modules: Array<{ title: string; body: string }>
  guidingQuestions: string[]
  sessionFlow: Array<{ title: string; body: string }>
  practiceLabs: PracticeLab[]
  readinessChecks: string[]
  adoptionPractices: string[]
  materials: string[]
  diagramSlots: string[]
  followUp: string[]
  tangibleCases: Array<{
    title: string
    situation: string
    learnerTask: string
    prompt: string
  }>
  promptLibrary: Array<{ title: string; prompt: string }>
  pdfHref: string
}

const expertPassword = 'xpert'

const audience = [
  'Small and midsize companies that want clear AI literacy before buying tools',
  'Health care, nonprofit, and institutional teams that need a careful learning environment',
  'Leadership groups trying to separate useful AI workflows from hype',
  'Individual professionals who want confidence using AI in everyday work',
]

const fluencyPillars: Array<{
  title: string
  body: string
  icon: IconType
}> = [
  {
    title: 'Understand the landscape',
    body: 'Learn what today\'s AI tools are good at, where they fail, and how to ask better questions.',
    icon: Map,
  },
  {
    title: 'Use better judgment',
    body: 'Develop habits for evaluating outputs, spotting uncertainty, and keeping data boundaries clear.',
    icon: ShieldCheck,
  },
  {
    title: 'Practice real workflows',
    body: 'Move from demos to useful routines for writing, research, planning, meetings, and decisions.',
    icon: ClipboardCheck,
  },
  {
    title: 'Communicate clearly',
    body: 'Build shared language so teams can discuss AI opportunities without panic or overpromising.',
    icon: MessageCircle,
  },
]

const services: Array<{
  title: string
  body: string
  icon: IconType
}> = [
  {
    title: 'AI Fluency Training for Teams',
    body: 'Live Zoom sessions that give teams a shared foundation, practical vocabulary, and safe ways to experiment.',
    icon: UsersRound,
  },
  {
    title: 'One-on-One AI Coaching',
    body: 'Personal guidance for professionals who want to apply AI to writing, planning, research, or daily workflows.',
    icon: GraduationCap,
  },
  {
    title: 'Executive AI Briefings',
    body: 'Plain-spoken briefings for leaders who need clarity before making expensive technology decisions.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Practical AI Workflow Workshops',
    body: 'Hands-on sessions that translate broad curiosity into repeatable workflows for specific roles or departments.',
    icon: BookOpenCheck,
  },
  {
    title: 'AI Readiness and Use-Case Discovery',
    body: 'A guided scan of where AI may help, where it should wait, and what your team needs to learn first.',
    icon: SearchCheck,
  },
  {
    title: 'Monthly AI Office Hours over Zoom',
    body: 'A reliable space for questions, tool updates, prompt practice, and thoughtful next steps as AI keeps changing.',
    icon: Video,
  },
]

const individualUtilityProjects: UtilityProject[] = [
  {
    title: 'Public Article Learning Kit',
    timebox: '60-75 minutes',
    hook: 'Turn one public article into a tutor session and a usable study packet.',
    outcome:
      'A one-page explainer, eight-term glossary, five-question quiz, misconception list, and verification table.',
    safeInput:
      'Use a public article, help page, announcement, or topic summary. Avoid private client, patient, employee, financial, legal, or proprietary material.',
    steps: [
      'Paste or summarize one public source and state your current knowledge level.',
      'Ask for an explainer, glossary, examples, and common misconceptions.',
      'Create a five-question quiz and answer it before looking at the answer key.',
      'Mark every claim that needs source checking before you share or rely on it.',
    ],
    starterPrompt:
      'Use this public source to create a learning kit for a smart beginner: [public source or topic]. Produce a one-page explainer, eight-term glossary, three examples, common misconceptions, a five-question quiz with answer key, and a verification table listing claims I should check in reliable sources.',
  },
  {
    title: 'Decision Brief in a Box',
    timebox: '75-90 minutes',
    hook: 'Use AI to structure a decision without handing the decision away.',
    outcome:
      'A one-page decision brief with criteria, option table, assumption register, pre-mortem, and next-evidence checklist.',
    safeInput:
      'Use a personal, public, fictional, or sanitized decision. Keep confidential finances, contracts, medical, legal, or customer details out of public tools.',
    steps: [
      'Name two or three options, the decision deadline, constraints, and what success would look like.',
      'Ask for a weighted criteria table and force the model to show its assumptions.',
      'Run a pre-mortem for the most tempting option and a second pass for the safest option.',
      'Write three human-only judgment questions you will answer before acting.',
    ],
    starterPrompt:
      'Help me build a decision brief without deciding for me: [safe decision context]. Include weighted criteria, an option comparison table, assumptions, likely failure modes, missing evidence, who should be consulted, and three final human judgment questions.',
  },
  {
    title: 'Meeting-to-Momentum Kit',
    timebox: '60-90 minutes',
    hook: 'Convert a rough meeting idea into a focused agenda and follow-through packet.',
    outcome:
      'A timed agenda, participant prep note, decision log template, action-item table, and follow-up email draft.',
    safeInput:
      'Use fictional or sanitized meeting context. Do not paste private attendee notes, personnel details, patient data, customer records, or proprietary plans into public tools.',
    steps: [
      'Describe the meeting purpose, attendees by role, time available, and desired output.',
      'Ask for a timed agenda with decisions, discussion prompts, and parking-lot items.',
      'Create a follow-up template with owners, due dates, unresolved questions, and confirmation language.',
      'Delete or rewrite anything that sounds like a promise, personnel judgment, or confidential detail.',
    ],
    starterPrompt:
      'Using this fictional or sanitized meeting context, create a meeting kit: timed agenda, prep questions by role, likely tensions, decision log, action-item table, and follow-up email draft. Mark assumptions and anything a human should confirm before sending: [context].',
  },
  {
    title: 'Before-and-After Writing Studio',
    timebox: '60 minutes',
    hook: 'Use AI as an editor, not a ghostwriter, and leave with a cleaner real draft.',
    outcome:
      'A revised email, memo, bio, announcement, or article with a change log, tone rationale, and final review checklist.',
    safeInput:
      'Use a rough draft that contains no sensitive personal, client, patient, employee, legal, financial, or proprietary details.',
    steps: [
      'Paste a safe rough draft and name the audience, purpose, tone, and length limit.',
      'Ask for two alternative revisions: one clearer and one warmer or more concise.',
      'Have AI critique the revision for unsupported claims, missing context, and awkward tone.',
      'Make the final edits yourself and keep a before-and-after note on what improved.',
    ],
    starterPrompt:
      'Revise this safe rough draft for [audience] with a [tone] tone and a [length] limit. Give me two versions, explain the changes, then critique the stronger version for clarity, unsupported claims, missing context, and anything I should verify before sending: [safe draft].',
  },
  {
    title: 'Research Launch Board',
    timebox: '90-120 minutes',
    hook: 'Plan the research before the rabbit hole opens.',
    outcome:
      'A research board with question clusters, search strings, source ladder, opposing views, red flags, and claim-check table.',
    safeInput:
      'Use a public topic or general business question. Do not ask AI to invent citations or make final claims without sources.',
    steps: [
      'Start with one broad public question and ask AI to break it into subquestions.',
      'Generate search strings, source categories, keywords to avoid, and missing perspectives.',
      'Ask for a claim-check table with columns for claim, source needed, confidence, and next action.',
      'Use the board to search actual sources; do not treat the model output as evidence.',
    ],
    starterPrompt:
      'Help me build a research launch board for [public topic]. Create question clusters, search strings, source types, likely blind spots, opposing perspectives, red flags, and a claim-check table. Do not invent citations or make final claims without sources.',
  },
  {
    title: 'Workflow Recipe Card',
    timebox: '90-120 minutes',
    hook: 'Turn one repeated task into a reusable recipe your future self can follow.',
    outcome:
      'A recipe card with trigger, safe inputs, prompt sequence, review gates, owner, time saved estimate, and stop signs.',
    safeInput:
      'Choose a recurring task and describe it generally or with fictional examples. Keep sensitive operational data out of public tools.',
    steps: [
      'Write the current task steps from trigger to final output.',
      'Mark which inputs are safe, which must be generalized, and which should not enter a public tool.',
      'Ask AI to propose a prompt sequence and review checkpoints for the safest useful slice.',
      'Test the recipe with one fictional example and revise the steps until they are repeatable.',
    ],
    starterPrompt:
      'Turn this recurring task into a safe AI-assisted workflow recipe: [task]. Include trigger, user, safe inputs, prompt sequence, expected output, review checkpoints, human owner, estimated time saved, risks, stop signs, and when not to use AI.',
  },
  {
    title: 'Professional Proof Portfolio',
    timebox: '75-90 minutes',
    hook: 'Use AI to turn scattered experience into concrete positioning you can defend.',
    outcome:
      'A 150-word bio, six resume bullets, proof bank, interview answer outlines, and claims-to-evidence checklist.',
    safeInput:
      'Use a sanitized career summary or fictionalized role description. Do not include private employer data, references, compensation, or confidential projects.',
    steps: [
      'Write a sanitized inventory of roles, strengths, projects, and outcomes you can discuss publicly.',
      'Ask AI to draft positioning options and separate claims from evidence.',
      'Create resume bullets and interview outlines, then remove anything inflated or unverifiable.',
      'Practice three interview questions and revise the language until it sounds true in your own voice.',
    ],
    starterPrompt:
      'Using this sanitized professional summary, help me build a proof portfolio. Draft a 150-word bio, six resume bullet options, a proof bank, three interview answer outlines, and a claims-to-evidence checklist. Flag anything that sounds inflated or needs stronger evidence: [summary].',
  },
  {
    title: 'Seven-Day Action Plan',
    timebox: '60-75 minutes',
    hook: 'Turn a vague goal into a week of small, scheduled actions.',
    outcome:
      'A seven-day plan with calendar blocks, next actions, obstacle responses, accountability note, and end-of-week review.',
    safeInput:
      'Use personal goals and constraints that are not private, medical, financial, legal, or deeply sensitive.',
    steps: [
      'Describe the goal, available time, constraints, and what usually derails progress.',
      'Ask for a one-week plan with daily actions no longer than 45 minutes.',
      'Have AI identify likely obstacles and create if-then responses.',
      'Put the first two actions on your calendar and delete anything unrealistic.',
    ],
    starterPrompt:
      'Help me turn this safe goal into a seven-day action plan: [safe goal]. Ask up to five clarifying questions if needed, then create calendar blocks, daily next actions under 45 minutes, obstacle responses, an accountability note, and an end-of-week review checklist.',
  },
]

const starterProjectPdfHref = '/curriculum-pdfs/first-60-minute-ai-utility-project.pdf'

const sectorProjectExamples: SectorProjectExample[] = [
  {
    title: 'Nonprofit donor update packet',
    audience: 'Nonprofits',
    body:
      'Turn public program facts and fictional event notes into a warm one-page update, subject-line options, a verification checklist, and a staff review note.',
    safeInput:
      'Use public facts, fictional event notes, and no donor records or private beneficiary details.',
  },
  {
    title: 'Health care admin FAQ clarity pass',
    audience: 'Health care organizations',
    body:
      'Rewrite a fictional clinic FAQ into plain language, create a questions-for-owner list, and flag anything that requires the appropriate internal review.',
    safeInput:
      'Use fictional FAQ text only. Do not include patient data or ask AI for medical, legal, compliance, or cybersecurity assurances.',
  },
  {
    title: 'Small business meeting follow-through',
    audience: 'Small businesses',
    body:
      'Convert sanitized meeting context into a decision log, owner table, deadline checklist, and follow-up email draft.',
    safeInput:
      'Use sanitized or fictional notes, not customer records, employee issues, contracts, or proprietary plans.',
  },
  {
    title: 'Professional proof portfolio',
    audience: 'Individual professionals',
    body:
      'Use AI as a positioning coach to produce a defensible bio, resume bullets, proof bank, and interview practice cards.',
    safeInput:
      'Use a sanitized career summary with no private employer data, references, compensation, or confidential projects.',
  },
  {
    title: 'Department checklist cleanup',
    audience: 'Teams and departments',
    body:
      'Turn a public or sanitized process description into a checklist, glossary, exception list, and questions for the process owner.',
    safeInput:
      'Use public or sanitized process text. Keep private operational data, credentials, and proprietary details out.',
  },
  {
    title: 'Public article learning kit',
    audience: 'AI-curious beginners',
    body:
      'Transform a confusing public topic into an explainer, quiz, glossary, misconception list, and claim-check table.',
    safeInput:
      'Use public topics or articles and verify important claims with reliable sources before relying on them.',
  },
]

const projectSelectionRubric = [
  {
    title: 'Real work, safe input',
    body:
      'Choose a task learners already recognize, then substitute public, fictional, or sanitized material so the exercise never depends on sensitive data.',
  },
  {
    title: 'Named walk-away artifact',
    body:
      'Every exercise should end with a file, table, checklist, brief, agenda, glossary, recipe card, or other object the learner can inspect and improve.',
  },
  {
    title: 'Visible human judgment',
    body:
      'Build in a required moment where the learner checks claims, rejects weak output, revises tone, names uncertainty, or decides what stays human-led.',
  },
  {
    title: 'Transferable next use',
    body:
      'A strong project teaches a repeatable pattern: add context, request structure, compare alternatives, verify claims, document the recipe, and try it again next week.',
  },
]

const projectReviewQuestions = [
  'What exact artifact did you leave with: document, table, checklist, agenda, brief, or recipe?',
  'What part of the artifact is useful enough to keep, and what should be discarded?',
  'Which prompt detail improved the result most: audience, context, constraints, examples, or output format?',
  'Where did the output sound confident but still need source checking, owner review, or human judgment?',
  'What information did you deliberately keep out of the public tool?',
  'What is the smallest real task where you could reuse this pattern in the next seven days?',
]

const starterPromptingActivities: StarterPromptingActivity[] = [
  {
    title: 'Ask-for-a-prompt warmup',
    pattern: 'Pre-prompting',
    skill: 'Learners discover that prompting can begin by asking the model to help shape the prompt itself.',
    artifact: 'A reusable prompt card with task, audience, context, constraints, output format, and review criteria.',
    safeInput: 'Use a public topic, fictional scenario, or harmless personal learning goal.',
    starterPrompt:
      'I want to use AI for [safe topic or task], but I am not sure how to prompt well. Ask me up to five clarifying questions, then give me three prompt options: quick, structured, and advanced. Include what each prompt is good for and what I should check afterward.',
  },
  {
    title: 'Structured research table',
    pattern: 'Basic research prompting',
    skill: 'Students learn to ask for organized output instead of accepting a long, shapeless answer.',
    artifact: 'A comparison table with columns the learner specified, plus a list of claims to verify.',
    safeInput: 'Use a public topic such as renewable energy, storage devices, local history, or a general product category.',
    starterPrompt:
      'Create a beginner-friendly research table about [public topic]. Use columns for concept, short explanation, practical use, common confusion, and what to verify in reliable sources. After the table, suggest three better follow-up questions.',
  },
  {
    title: 'Timeline builder',
    pattern: 'Chronological organization',
    skill: 'Students see how prompt format changes understanding by turning a topic into sequence, development, and context.',
    artifact: 'A chronological timeline with significance notes and uncertainty flags.',
    safeInput: 'Use public historical, technical, cultural, or organizational topics.',
    starterPrompt:
      'Create a chronological timeline for [public topic]. Include year or period, event, why it mattered, what changed afterward, and confidence level. Mark anything that needs source checking.',
  },
  {
    title: 'Email tone trio',
    pattern: 'Business email drafting',
    skill: 'Learners experience AI as a writing partner while keeping voice, promises, and final judgment human-led.',
    artifact: 'Three email versions, a tone comparison, and a send-before-review checklist.',
    safeInput: 'Use a fictional or sanitized email scenario with no customer, patient, employee, financial, or proprietary details.',
    starterPrompt:
      'Using this fictional email scenario, draft three versions: concise, warm, and more formal. Explain what changed in each version, recommend one, and list facts, promises, names, dates, and tone choices a human should confirm before sending: [scenario].',
  },
  {
    title: 'Image observation drill',
    pattern: 'Image description',
    skill: 'Students distinguish visible evidence from inference, uncertainty, and possible overclaiming.',
    artifact: 'A two-column observation table separating what is visible from what is inferred.',
    safeInput: 'Use a public-domain, stock, classroom, or non-sensitive image. Avoid faces or private settings unless permissions are clear.',
    starterPrompt:
      'Describe this image for a careful learner. Separate visible details from inferences. Add a table with observation, evidence in the image, confidence, and what should not be assumed. Finish with three questions a human reviewer should ask.',
  },
  {
    title: 'Career fit map',
    pattern: 'Career research',
    skill: 'Learners practice giving context, asking for options, and requesting useful decision criteria.',
    artifact: 'A career option table with fit reasons, education paths, tradeoffs, and next questions.',
    safeInput: 'Use a fictional profile or a sanitized personal summary that excludes private employer data, compensation, references, and confidential projects.',
    starterPrompt:
      'Using this safe career profile, suggest career directions in a table with role, why it may fit, skills to build, typical education or training path, tradeoffs, and next research questions. Do not make the decision for me: [profile].',
  },
  {
    title: 'Proof-bank resume drill',
    pattern: 'Resume creation',
    skill: 'Students learn to turn scattered experience into defensible claims and then ask for critique.',
    artifact: 'Six resume bullets, proof bank, critique table, and claims-to-evidence checklist.',
    safeInput: 'Use a fictional or sanitized work history without private employer details, references, compensation, or confidential outcomes.',
    starterPrompt:
      'Turn this sanitized work history into a proof bank and six resume bullet options. For each bullet, list the evidence needed to support it, possible overstatement risk, and one stronger revision. Flag anything that sounds inflated: [work history].',
  },
  {
    title: 'Brand connotation check',
    pattern: 'Branding feedback',
    skill: 'Learners see how AI can brainstorm associations while human judgment still checks audience, culture, and evidence.',
    artifact: 'A naming or messaging table with positive associations, risks, audience fit, and questions to test.',
    safeInput: 'Use fictional brand names, public examples, or early ideas that are not confidential.',
    starterPrompt:
      'Evaluate these fictional brand or project names for connotations. Create a table with name, positive associations, possible drawbacks, audience fit, words to avoid, and questions we should test with real people: [names].',
  },
  {
    title: 'Survey cleanup and format',
    pattern: 'Survey construction',
    skill: 'Students learn to ask for editing, consistency, and application-ready formatting in one clear request.',
    artifact: 'A cleaned survey list plus a format-ready version for a form tool or spreadsheet.',
    safeInput: 'Use fictional survey items or public workshop feedback questions. Avoid private personnel, patient, customer, or sensitive demographic data.',
    starterPrompt:
      'Clean up these fictional survey items. Fix grammar, remove leading language, make the scale consistent, and return two outputs: a numbered review table and a form-ready list in the format [Required] [Question type] Question text: [items].',
  },
  {
    title: 'Chart storyboard',
    pattern: 'Chart creation',
    skill: 'Learners separate the data question, chart type, audience, and caveats before asking for a visual.',
    artifact: 'A chart plan with data needed, recommended chart type, annotation ideas, and cautions.',
    safeInput: 'Use public data, fictional data, or a small hand-written sample. Do not use sensitive spreadsheets in public tools.',
    starterPrompt:
      'Help me plan a chart for [public or fictional data topic]. Recommend chart type, needed columns, sample data structure, title, labels, annotations, caveats, and three checks before presenting the chart.',
  },
  {
    title: 'Cloze quiz maker',
    pattern: 'Quiz generation',
    skill: 'Students practice precise output instructions, distractor quality, and iterative repair.',
    artifact: 'A short cloze quiz in table format with answer key, distractors, and a quality check.',
    safeInput: 'Use a public article, textbook excerpt you have rights to use, or original instructional text.',
    starterPrompt:
      'Create a five-item cloze quiz from this public or original text. Return a table with sentence, missing term, three plausible distractors, correct answer, and explanation. Then critique the quiz for ambiguity and weak distractors: [text].',
  },
  {
    title: 'Lesson or page outline',
    pattern: 'Lesson plans and website pages',
    skill: 'Learners see how AI can structure material into a usable outline before any polished writing begins.',
    artifact: 'A one-hour lesson plan or one-page website outline with sections, examples, activities, and review notes.',
    safeInput: 'Use public topic notes, fictional program descriptions, or sanitized learning goals.',
    starterPrompt:
      'Turn this safe topic into a one-hour lesson plan or one-page website outline. Include audience, learning goals, section sequence, examples, activity ideas, plain-language explanations, and review questions. Mark assumptions and missing information: [topic notes].',
  },
]

const offerFormats: Array<{
  slug: string
  title: string
  eyebrow: string
  summary: string
  icon: IconType
  bestFor: string[]
  outcomes: string[]
  flow: Array<{ step: string; body: string }>
  cta: string
}> = [
  {
    slug: 'ai-briefing',
    title: '60-Minute AI Briefing',
    eyebrow: 'Leadership starting point',
    summary:
      'A focused Zoom session for leaders who need a clear, calm orientation to AI before making decisions about tools, policies, training, or investment.',
    icon: BriefcaseBusiness,
    bestFor: [
      'Executive teams and board-adjacent leadership groups',
      'Organizations that need shared language before deeper planning',
      'Decision makers who want clarity without vendor pressure',
    ],
    outcomes: [
      'A plain-language map of what current AI tools can and cannot do',
      'A practical discussion of data boundaries, review habits, and responsible experimentation',
      'A shortlist of sensible next questions for your organization',
    ],
    flow: [
      {
        step: 'Orient',
        body: 'Start with the current AI landscape and the terms leaders actually need.',
      },
      {
        step: 'Discuss',
        body: 'Connect AI possibilities to your team, sector, and level of readiness.',
      },
      {
        step: 'Decide',
        body: 'Leave with a clearer sense of what to explore, what to avoid, and what to learn next.',
      },
    ],
    cta: 'Book an AI Briefing',
  },
  {
    slug: 'team-workshop',
    title: 'Team AI Workflow Workshop',
    eyebrow: 'Hands-on team practice',
    summary:
      'A practical Zoom workshop where a team learns how to use AI for everyday work such as writing, planning, research, meeting preparation, and idea development.',
    icon: UsersRound,
    bestFor: [
      'Departments that want shared confidence with AI tools',
      'Teams that need practical examples instead of abstract demos',
      'Managers who want safe, repeatable workflows for common work',
    ],
    outcomes: [
      'A shared baseline for prompting, reviewing, and improving AI outputs',
      'Role-relevant workflow examples your team can adapt',
      'Clear reminders about what not to put into public AI tools',
    ],
    flow: [
      {
        step: 'Frame',
        body: 'Choose the work contexts and comfort level that should shape the session.',
      },
      {
        step: 'Practice',
        body: 'Work through guided examples using realistic but non-sensitive scenarios.',
      },
      {
        step: 'Apply',
        body: 'Translate the examples into a small set of workflows your team can keep using.',
      },
    ],
    cta: 'Plan a Team Workshop',
  },
  {
    slug: 'office-hours',
    title: 'Monthly AI Office Hours',
    eyebrow: 'Ongoing fluency support',
    summary:
      'A recurring Zoom forum for questions, new tool changes, workflow practice, and steady coaching as your team builds confidence over time.',
    icon: Video,
    bestFor: [
      'Organizations that want continuity after an initial briefing or workshop',
      'Teams that prefer a low-pressure place to ask practical questions',
      'Professionals who want ongoing support as AI tools change',
    ],
    outcomes: [
      'A regular space for questions, examples, and careful experimentation',
      'Practical updates on AI tool changes without chasing every announcement',
      'Reinforcement of responsible use, review habits, and human judgment',
    ],
    flow: [
      {
        step: 'Gather',
        body: 'Collect questions, confusing moments, and workflow experiments from the month.',
      },
      {
        step: 'Coach',
        body: 'Work through examples live, with attention to judgment and data boundaries.',
      },
      {
        step: 'Refine',
        body: 'Identify what is becoming useful and what still needs clearer team norms.',
      },
    ],
    cta: 'Set Up Office Hours',
  },
]

const freeCurriculum: CurriculumContent = {
  slug: 'free-ai-fluency-starter',
  title: 'Free AI Fluency Starter',
  eyebrow: 'Free public tier',
  summary:
    'A public starter path for people who want a clear, non-intimidating first step into LLMs, prompting, safe practice, and practical review habits.',
  format:
    'Self-guided webpage and downloadable PDF companion, designed as a gentle entry point before a team briefing or coached workshop.',
  audience:
    'Individuals, leaders, and teams who are curious about AI but want plain-language basics before committing to training.',
  level: 'Level 0: orientation and first safe practice',
  icon: BookOpenCheck,
  outcomes: [
    'Understand what LLMs do, why they can be useful, and why their answers still need human review.',
    'Use a simple prompt structure for common tasks such as drafting, summarizing, planning, and asking better questions.',
    'Practice with non-sensitive examples while keeping patient, customer, employee, legal, financial, and proprietary data out of public AI tools.',
    'Decide whether the next best step is self-practice, one-on-one coaching, a team briefing, or a structured workshop.',
  ],
  modules: [
    {
      title: 'LLMs in plain language',
      body: 'A beginner-friendly explanation of how large language models respond to prompts, what they are useful for, and where they become unreliable.',
    },
    {
      title: 'The first prompting loop',
      body: 'A reusable pattern for giving context, asking for a draft, checking the result, and requesting a revision without overtrusting the output.',
    },
    {
      title: 'First prompting activity ladder',
      body: 'A sequence of low-pressure exercises introduces pre-prompting, structured tables, timelines, tone revision, image observation, quiz creation, and simple outline building.',
    },
    {
      title: 'Safe public-tool practice',
      body: 'A practical boundary-setting module that keeps sensitive or proprietary details out of public tools while still making room to learn.',
    },
    {
      title: 'Review before use',
      body: 'A lightweight review habit for checking accuracy, tone, assumptions, missing context, and decisions that need a human owner.',
    },
    {
      title: 'Choosing a next step',
      body: 'A closing module that helps learners identify one useful, low-risk task to practice and one question to bring to a trainer or manager.',
    },
  ],
  guidingQuestions: [
    'What can an LLM help me draft, reframe, summarize, or plan?',
    'What information should stay out of public AI tools?',
    'How do I tell whether an AI answer is useful enough to keep working with?',
    'Which everyday task would be a safe first place to practice?',
  ],
  sessionFlow: [
    {
      title: 'Orient',
      body: 'Start with a plain-language explanation of LLMs, prompts, outputs, and why confident-sounding answers still need review.',
    },
    {
      title: 'Try',
      body: 'Use a neutral sample task to practice context, constraints, tone, examples, and follow-up questions.',
    },
    {
      title: 'Review',
      body: 'Check the result for accuracy, usefulness, assumptions, missing context, and whether a human should verify it.',
    },
    {
      title: 'Choose',
      body: 'Name one safe workflow to practice and one boundary the learner will keep in mind.',
    },
  ],
  practiceLabs: [
    {
      title: 'Ask-for-a-prompt warmup',
      artifact:
        'A reusable prompt card with task, context, audience, constraints, format, and review criteria.',
      safeInput:
        'One public topic, fictional scenario, or harmless personal learning goal.',
      steps: [
        'Ask the model to interview you before writing the prompt.',
        'Compare quick, structured, and advanced prompt options.',
        'Choose one, run it, and mark what improved or remained weak.',
      ],
      review:
        'The learner should see that better prompting is often a design conversation, not a single perfect sentence.',
    },
    {
      title: 'Public article learning kit',
      artifact:
        'A one-page explainer, eight-term glossary, five-question quiz, and claim-check table.',
      safeInput:
        'One public article, help page, announcement, or encyclopedia-style topic summary.',
      steps: [
        'Ask for the article in plain language at your current level.',
        'Request examples, analogies, terms, misconceptions, and a quiz.',
        'Build a claim-check table before sharing the summary with anyone else.',
      ],
      review:
        'Check whether the summary preserves the source, labels uncertainty, and separates explanation from evidence.',
    },
    {
      title: 'Email tone workshop',
      artifact:
        'Three versions of the same safe email: concise, warmer, and more formal, plus a change log.',
      safeInput:
        'A fictional or sanitized email scenario with no client, patient, employee, financial, legal, or proprietary details.',
      steps: [
        'Describe the recipient, purpose, tone, and maximum length.',
        'Ask for three versions and a note explaining what changed.',
        'Choose one version and revise it in your own voice.',
      ],
      review:
        'Confirm that the final email makes no unsupported promise and still sounds like a human you would stand behind.',
    },
    {
      title: 'Agenda and next-action plan',
      artifact:
        'A 30-minute agenda, prep questions, owner table, and follow-up email shell.',
      safeInput:
        'A fictional or sanitized meeting goal, attendee roles, and desired decision or output.',
      steps: [
        'Give the meeting purpose, participants by role, timebox, and desired outcome.',
        'Ask for a timed agenda and action table with owners and due dates.',
        'Rewrite any item that assumes facts or commitments not yet confirmed.',
      ],
      review:
        'Look for missing owners, unrealistic timing, hidden assumptions, and language that should be confirmed by a person.',
    },
    {
      title: 'Output red-team pass',
      artifact:
        'A marked-up AI draft with unsupported claims, vague wording, missing context, and next checks highlighted.',
      safeInput:
        'Any AI-generated draft from a public, fictional, or sanitized exercise.',
      steps: [
        'Ask AI to critique its own output against accuracy, tone, completeness, and risk.',
        'Ask a second pass focused only on assumptions and missing context.',
        'Decide what to keep, revise, verify, or discard.',
      ],
      review:
        'The learner should be able to explain why each kept item is useful and what evidence would be needed before use.',
    },
  ],
  readinessChecks: [
    'Can explain what an LLM is without technical jargon.',
    'Can write a prompt with context, task, audience, and constraints.',
    'Can name at least three kinds of data that should not be pasted into public tools.',
    'Can identify when an output needs outside verification or human approval.',
  ],
  adoptionPractices: [
    'Start with public, fictional, or anonymized examples so skill building does not depend on risky data.',
    'Treat AI output as a draft or suggestion until a person has checked facts, assumptions, tone, and missing context.',
    'Keep a small practice log that records what worked, what failed, and what had to be verified elsewhere.',
    'Choose first experiments from ordinary work: drafting, summarizing, planning, learning, or question generation.',
  ],
  materials: [
    'Free AI fluency starter guide',
    'First prompting lab card set',
    'Basic prompting loop worksheet',
    'Public-tool safety checklist',
    'Output review checklist',
    'First safe workflow practice log',
  ],
  diagramSlots: [
    'Beginner LLM session loop: ask, inspect, revise, verify',
    'Safe practice boundary map for public AI tools',
    'First workflow chooser: draft, summarize, plan, or critique',
    'First prompting ladder: ask for a prompt, structure output, revise, verify',
    'Responsible adoption loop: learn, practice, review, apply',
  ],
  followUp: [
    'Complete three starter prompting activities using only public, fictional, or sanitized material.',
    'Keep a one-week practice log using only non-sensitive examples.',
    'Collect three questions that would benefit from coaching or a team discussion.',
    'Choose one recurring task that may become a future workflow workshop candidate.',
  ],
  tangibleCases: [
    {
      title: 'Public article summary',
      situation:
        'A learner wants to understand a public article, newsletter, or announcement without losing the main ideas.',
      learnerTask:
        'Produce a one-page explainer, glossary, quiz, and claim-check table from the public text.',
      prompt:
        'Create a learning kit from the following public text. Give me a one-page explainer, eight-term glossary, five-question quiz with answer key, and a claim-check table with claim, source needed, and next action: [paste public text].',
    },
    {
      title: 'Fictional email draft',
      situation:
        'A professional wants to practice drafting an email without using client, patient, employee, or proprietary details.',
      learnerTask:
        'Draft three versions, choose one, and create a final review checklist before sending.',
      prompt:
        'Using this fictional scenario, draft three versions of a professional email: concise, warmer, and more formal. Recommend one, explain why, and include a checklist of claims, promises, names, dates, and tone choices a human should confirm: [fictional scenario].',
    },
    {
      title: 'First practice plan',
      situation:
        'A curious learner needs a low-pressure way to keep practicing after the starter session.',
      learnerTask:
        'Choose one safe weekly task and create a daily practice log with artifact, review note, and next use.',
      prompt:
        'Help me design a one-week AI practice plan using only public or fictional information. Include one task per day, the exact artifact to produce, a safety reminder, a five-minute review step, and a log table for what worked, what failed, what I checked, and what I will reuse.',
    },
  ],
  promptLibrary: [
    {
      title: 'Plain-language explanation',
      prompt:
        'Explain [AI concept] for a smart beginner. Produce a one-page explainer with an everyday analogy, two practical uses, two limits, three terms to learn, and a short verification checklist.',
    },
    {
      title: 'Starter prompt builder',
      prompt:
        'Turn my rough request into a stronger prompt. Ask me for missing context first. Then produce a reusable prompt card with task, audience, context, constraints, output format, examples to provide, and review criteria.',
    },
    {
      title: 'Output review',
      prompt:
        'Review this AI-generated draft. Return a table with issue, quoted phrase, why it matters, fix, and human verification needed. Check unsupported claims, vague wording, missing context, possible bias, tone problems, and privacy concerns: [draft].',
    },
    {
      title: 'Safe practice chooser',
      prompt:
        'Given these possible practice tasks, sort them into safe public practice, use caution or anonymize, and do not use in a public tool. For each task, explain the reason, suggest a safer substitute input, and name the review owner if one is needed: [task list].',
    },
  ],
  pdfHref: '/curriculum-pdfs/free-ai-fluency-starter.pdf',
}

const curriculumTiers = [
  {
    slug: 'free',
    title: 'Free Tier',
    eyebrow: 'Open starter path',
    summary:
      'A public AI fluency primer with basic LLM concepts, prompting habits, safe-practice boundaries, and a downloadable starter PDF.',
    href: '/curricula/free',
    cta: 'View Free Tier',
    icon: BookOpenCheck,
    access: 'Open access',
  },
  {
    slug: 'expert',
    title: 'Expert Tier',
    eyebrow: 'Password protected',
    summary:
      'The full Xensible curriculum library with six package paths, session modules, client-ready materials, PDF companions, and advanced Codex training.',
    href: '/curricula/expert',
    cta: 'Unlock Expert Tier',
    icon: ShieldCheck,
    access: 'Preview gate',
  },
]

const curriculumPackages: CurriculumContent[] = [
  {
    slug: 'ai-fluency-essentials',
    title: 'AI Fluency Essentials',
    eyebrow: '90-minute Zoom intro',
    summary:
      'A calm, practical introduction for people who want to understand LLMs, use them safely, and build confidence with ordinary work tasks.',
    format: 'One 90-minute Zoom session with guided practice and a follow-up handout.',
    audience:
      'Curious professionals, mixed-comfort teams, and organizations that need a shared starting point before deeper tool decisions.',
    level: 'Level 1: shared team AI fluency',
    icon: GraduationCap,
    outcomes: [
      'Explain what LLMs are good at, where they fail, and why human review matters.',
      'Use a basic prompting loop for drafting, summarizing, planning, and asking better questions.',
      'Recognize sensitive-data boundaries and safer ways to practice with non-sensitive examples.',
      'Leave with shared vocabulary for prompts, context, output quality, uncertainty, and review.',
    ],
    modules: [
      {
        title: 'The practical mental model',
        body: 'Participants learn how prompts, context, instructions, examples, and review shape an AI session without needing technical background.',
      },
      {
        title: 'Prompting as conversation design',
        body: 'We practice turning vague requests into useful context, constraints, examples, and review questions.',
      },
      {
        title: 'Beginner prompting activity set',
        body: 'Participants try short activities such as asking for a better prompt, requesting a structured research table, revising tone, and separating observation from inference.',
      },
      {
        title: 'Safe experimentation',
        body: 'The session establishes clear boundaries around patient, customer, employee, legal, financial, and proprietary information.',
      },
      {
        title: 'Confidence routines',
        body: 'Participants leave with small repeatable habits: draft, critique, revise, verify, and decide what still needs human judgment.',
      },
      {
        title: 'Team language and norms',
        body: 'The group names simple shared expectations for AI use, including what to try, what to avoid, and how to talk about uncertain outputs.',
      },
    ],
    guidingQuestions: [
      'What does our team need to understand before choosing tools or policies?',
      'Which everyday tasks are safe places to build skill?',
      'How should we review AI output before it affects real work?',
      'What shared language will help us discuss AI without hype or fear?',
    ],
    sessionFlow: [
      {
        title: 'Baseline',
        body: 'Surface current comfort levels, hopes, concerns, and common misconceptions.',
      },
      {
        title: 'Model',
        body: 'Teach a practical mental model for context, instructions, examples, model output, and review.',
      },
      {
        title: 'Practice',
        body: 'Run guided prompt exercises using neutral scenarios that resemble the team\'s work without exposing sensitive data.',
      },
      {
        title: 'Review',
        body: 'Apply a quality checklist to outputs and discuss what should be verified, revised, or discarded.',
      },
      {
        title: 'Normalize',
        body: 'Close with team language, safe-use reminders, and a first set of practice habits.',
      },
    ],
    practiceLabs: [
      {
        title: 'Starter activity carousel',
        artifact:
          'Three completed starter cards: one prompt-improvement card, one structured-output card, and one review note.',
        safeInput:
          'Public, fictional, or sanitized topics chosen before the session.',
        steps: [
          'Run an ask-for-a-prompt warmup on a safe topic.',
          'Convert one broad question into a table, timeline, or checklist.',
          'Review the output for assumptions, missing context, and claims to verify.',
        ],
        review:
          'Learners should be able to name which prompt details improved the result and what still required judgment.',
      },
      {
        title: 'Prompt card build',
        artifact:
          'A reusable prompt card with role, task, audience, context, constraints, output format, and success criteria.',
        safeInput:
          'A bland public task such as drafting a welcome note, summarizing a public page, or planning a fictional event.',
        steps: [
          'Start from a deliberately vague request and record the weak first output.',
          'Add context, audience, constraints, examples, and a requested format.',
          'Compare the before-and-after outputs and mark what improved.',
        ],
        review:
          'The prompt card should be specific enough for another learner to reuse without needing private context.',
      },
      {
        title: 'Two-output quality review',
        artifact:
          'A comparison table scoring two outputs for usefulness, accuracy risk, tone, missing context, and next revision.',
        safeInput:
          'Two AI responses to the same public or fictional prompt.',
        steps: [
          'Generate two versions of the same answer with different constraints.',
          'Score them against a simple quality rubric.',
          'Ask for a third version that keeps the strengths and fixes the weaknesses.',
        ],
        review:
          'Learners should name exactly what changed between versions and what still needs human verification.',
      },
      {
        title: 'Data-boundary sorting table',
        artifact:
          'A three-column table: safe public practice, caution or anonymize, and do not paste into a public tool.',
        safeInput:
          'Fictional examples of emails, notes, spreadsheets, policy excerpts, customer scenarios, and public webpages.',
        steps: [
          'Sort each example by sensitivity and explain the reason.',
          'Rewrite two risky examples into safer fictional or generalized versions.',
          'Name the internal owner who should review borderline cases.',
        ],
        review:
          'The final table should make the safety boundary teachable without implying legal, compliance, or cybersecurity guarantees.',
      },
      {
        title: 'Revision ladder',
        artifact:
          'A four-step draft ladder: raw output, clearer version, audience-tuned version, and human-final version.',
        safeInput:
          'A short public or fictional announcement, explainer, or internal note.',
        steps: [
          'Ask for a first draft, then a critique of that draft.',
          'Revise for one audience and one tone constraint.',
          'Make the last edit yourself and write what you changed.',
        ],
        review:
          'The final version should be measurably clearer while preserving claims a person can verify.',
      },
    ],
    readinessChecks: [
      'Participants can describe AI as an assistive drafting and reasoning partner, not an authority.',
      'Participants can use a repeatable prompt structure.',
      'Participants can explain the difference between safe examples and sensitive operational data.',
      'Participants can name a human review habit they will use before applying output.',
    ],
    adoptionPractices: [
      'Build shared vocabulary before asking a team to adopt new tools or policies.',
      'Normalize careful experimentation so people can ask basic questions without embarrassment.',
      'Make quality control and critical thinking explicit parts of AI fluency, not advanced extras.',
      'Give managers and team leads enough fluency to model responsible use and reinforce boundaries.',
    ],
    materials: [
      'AI fluency starter guide',
      'First prompting lab card set',
      'Prompt pattern quick sheet',
      'Sensitive-data boundary checklist',
      'Output review checklist',
      'Team language and norms worksheet',
    ],
    diagramSlots: [
      'LLM session loop: prompt, context, output, review, revision',
      'Safe-data boundary map for public AI tools',
      'Starter prompting activity ladder: prompt, structure, revise, verify',
      'Team fluency ladder from curiosity to useful practice',
    ],
    followUp: [
      'Run one safe prompt experiment before the next meeting.',
      'Collect examples of confusing, useful, or unreliable AI outputs for discussion.',
      'Identify one team workflow that may deserve deeper workshop treatment.',
    ],
    tangibleCases: [
      {
        title: 'Shared vocabulary kickoff',
        situation:
          'A leadership group and frontline staff are using different words for prompts, outputs, hallucinations, and review.',
        learnerTask:
          'Create a shared glossary, example table, and misconception list the team can use during future AI discussions.',
        prompt:
          'Create a plain-language AI glossary for a mixed-comfort team. Define prompt, context, output, hallucination, review, sensitive data, and human judgment. For each term, provide a workplace example, common misconception, and one question a learner can ask in a Zoom session.',
      },
      {
        title: 'Nonprofit communications draft',
        situation:
          'A nonprofit team wants to draft a donor update from public program facts and a fictional event recap.',
        learnerTask:
          'Create a donor update packet with draft, subject lines, verification list, and human review note.',
        prompt:
          'Draft a donor update packet using only the public facts and fictional event notes below. Include a 250-word update, five subject lines, a tone note, a claims-to-verify checklist, and a staff review note. Do not use donor records or private beneficiary details: [public facts and fictional notes].',
      },
      {
        title: 'Healthcare admin FAQ practice',
        situation:
          'A cautious health care admin team wants AI practice that does not involve patient information.',
        learnerTask:
          'Rewrite a fictional FAQ, create a review-owner list, and separate plain-language help from anything requiring internal review.',
        prompt:
          'Using this fictional clinic FAQ, create a plain-language version for a general audience, a jargon glossary, and a review-owner checklist. Do not add medical advice or legal/compliance assurances. Flag anything the appropriate internal owner should review: [fictional FAQ].',
      },
    ],
    promptLibrary: [
      {
        title: 'Team baseline',
        prompt:
          'Create a five-question baseline intake for a mixed-comfort team. For each question, include what the answer reveals, how it might shape training, and one safe follow-up exercise. Keep the questions nontechnical and practical.',
      },
      {
        title: 'Prompt anatomy',
        prompt:
          'Rewrite this vague prompt into a stronger prompt card with role, task, audience, context, constraints, examples, output format, and success criteria. Then explain what changed and provide a review checklist for the output: [rough prompt].',
      },
      {
        title: 'Output comparison',
        prompt:
          'Compare these two AI outputs in a table. Score usefulness, clarity, accuracy risk, tone, missing context, and safety. Recommend what to keep, revise, verify, or discard before either one is applied: [output A] [output B].',
      },
      {
        title: 'Boundary sort',
        prompt:
          'Sort these example inputs into safe public practice, caution or anonymize, and do not paste into public AI tools. Give the reason, a safer substitute if possible, and the human owner who should review borderline cases: [example inputs].',
      },
    ],
    pdfHref: '/curriculum-pdfs/ai-fluency-essentials.pdf',
  },
  {
    slug: 'practical-ai-workflows',
    title: 'Practical AI Workflows',
    eyebrow: 'Half-day or two-session workshop',
    summary:
      'Hands-on workflow training for writing, planning, research support, meeting preparation, and everyday knowledge work.',
    format: 'Two 90-minute Zoom sessions or one half-day remote workshop.',
    audience:
      'Teams and professionals who already understand the basics and want practical routines they can reuse.',
    level: 'Level 2: practical workflow fluency',
    icon: BookOpenCheck,
    outcomes: [
      'Build repeatable workflows for common work without copying sensitive data into public tools.',
      'Use AI to generate first drafts, alternatives, summaries, meeting artifacts, and decision support.',
      'Develop review habits that keep the human responsible for quality, context, and final judgment.',
      'Turn scattered experiments into documented workflow recipes that can be shared inside a team.',
      'Package proven prompt sequences into narrow Gems, custom GPTs, project assistants, or similar specialty helpers.',
    ],
    modules: [
      {
        title: 'Workflow anatomy',
        body: 'We break a task into input, constraints, AI assist, review, revision, and final human decision.',
      },
      {
        title: 'Writing and rewriting',
        body: 'Participants practice using AI for tone, structure, audience adaptation, and first-pass drafting.',
      },
      {
        title: 'Research support without overtrust',
        body: 'We separate brainstorming, query planning, summarization, source checking, and final verification.',
      },
      {
        title: 'Meetings and decisions',
        body: 'Participants create safe workflows for agendas, prep notes, follow-up drafts, and option comparison.',
      },
      {
        title: 'Workflow documentation',
        body: 'Teams capture the steps, prompts, inputs, review points, and human decisions that make a workflow repeatable.',
      },
      {
        title: 'Specialty assistant builder',
        body: 'Learners turn one reliable workflow into a narrow Gem-style helper with operating instructions, safe source material, test cases, and maintenance notes.',
      },
    ],
    guidingQuestions: [
      'Which tasks repeat often enough to deserve a workflow?',
      'Where can AI help without becoming the decision maker?',
      'What inputs are safe to use, and what must be abstracted or withheld?',
      'How will we review, revise, and document the workflow so others can use it?',
      'When should a workflow remain a prompt recipe, and when is it mature enough to become a specialty assistant?',
    ],
    sessionFlow: [
      {
        title: 'Select',
        body: 'Choose one or two common tasks with clear boundaries and enough repetition to justify practice.',
      },
      {
        title: 'Decompose',
        body: 'Break each task into inputs, decisions, drafts, checks, revisions, and final human ownership.',
      },
      {
        title: 'Build',
        body: 'Create prompt sequences and review steps using non-sensitive examples.',
      },
      {
        title: 'Stress test',
        body: 'Try edge cases, poor inputs, missing context, and output-review prompts.',
      },
      {
        title: 'Document',
        body: 'Capture the workflow as a short recipe that names when to use it and when not to.',
      },
    ],
    practiceLabs: [
      {
        title: 'Writing packet workflow',
        artifact:
          'A repeatable writing packet: intake questions, draft prompt, critique prompt, revision prompt, and final review checklist.',
        safeInput:
          'A public, fictional, or sanitized announcement, memo, newsletter item, or FAQ answer.',
        steps: [
          'Define the audience, purpose, voice, length, and claims that must be preserved.',
          'Draft, critique, and revise using separate prompts.',
          'Document the prompt sequence so the workflow can be reused.',
        ],
        review:
          'The packet is complete only when the human owner can verify claims, adjust voice, and approve the final text.',
      },
      {
        title: 'Meeting-to-action workflow',
        artifact:
          'A meeting packet with agenda, prep questions, decision log, action table, and follow-up message.',
        safeInput:
          'Fictional or sanitized meeting context with attendee roles instead of names when needed.',
        steps: [
          'Turn the meeting purpose into a timed agenda.',
          'Generate prep questions and a decision log template.',
          'Draft a follow-up email with open questions and owner placeholders.',
        ],
        review:
          'Check that no action item invents a commitment and every owner, due date, and decision needs human confirmation.',
      },
      {
        title: 'Research triage board',
        artifact:
          'A research board with question clusters, source categories, search strings, blind spots, and a claim-verification table.',
        safeInput:
          'A public topic, market question, policy issue, or general business question.',
        steps: [
          'Break the topic into researchable questions and opposing viewpoints.',
          'Generate search terms and source types before collecting sources.',
          'Move every important claim into a verification table.',
        ],
        review:
          'The board guides research but does not count as evidence; final claims must be checked in actual sources.',
      },
      {
        title: 'Decision-support brief',
        artifact:
          'A decision brief with criteria, option matrix, assumptions, pre-mortem, missing evidence, and human decision questions.',
        safeInput:
          'A fictional, public, personal, or sanitized decision with confidential details removed.',
        steps: [
          'Name options, constraints, success criteria, and the person who owns the decision.',
          'Ask for comparison, assumptions, failure modes, and missing evidence.',
          'Create a final decision checklist that the human owner completes.',
        ],
        review:
          'The workflow should make thinking clearer while leaving the decision, accountability, and risk acceptance with a person.',
      },
      {
        title: 'Gem-style specialty assistant blueprint',
        artifact:
          'A build sheet for one focused helper: job statement, instruction block, required questions, output format, review gates, safe examples, edge tests, and version notes.',
        safeInput:
          'A fictional, public, or sanitized repeated task such as drafting event follow-ups, creating lesson kits, reviewing survey questions, or preparing decision briefs.',
        steps: [
          'Choose one narrow job that repeats often enough to deserve a helper.',
          'Write operating instructions that name role, audience, tone, boundaries, output format, and review behavior.',
          'Test the helper with vague, incomplete, and risky inputs before using it on real work.',
        ],
        review:
          'The assistant is useful only if the team can explain what it does, what it must not do, what inputs are allowed, and how a human approves the output.',
      },
    ],
    readinessChecks: [
      'The workflow has a named owner and a clear final human decision point.',
      'Inputs avoid sensitive or proprietary data unless a suitable private environment is approved.',
      'The workflow includes a review step for accuracy, tone, assumptions, and missing context.',
      'The team can explain when the workflow is useful and when it should not be used.',
      'Any specialty assistant has written boundaries, safe test cases, review requirements, and an owner for updates.',
    ],
    adoptionPractices: [
      'Prioritize recurring tasks that consume real time or create repeated rework, not flashy demos.',
      'Break each workflow into inputs, AI assistance, review checkpoints, handoffs, and final ownership.',
      'Measure usefulness in time saved, quality improved, rework reduced, and review burden created.',
      'Document the workflow recipe so a useful experiment can become a teachable team practice.',
      'Promote only stable, well-reviewed recipes into Gems, custom GPTs, project spaces, or other reusable assistants.',
    ],
    materials: [
      'Workflow recipe cards',
      'Meeting preparation worksheet',
      'Research triage checklist',
      'Before-and-after prompt examples',
      'Workflow documentation template',
      'Human review checkpoint guide',
      'Specialty assistant build sheet',
      'Gem-style instruction template',
    ],
    diagramSlots: [
      'Human-in-the-loop workflow map',
      'Meeting-to-action pipeline',
      'Workflow recipe anatomy: inputs, AI assist, review, apply',
      'Specialty assistant lifecycle: recipe, instructions, safe tests, review, versioning',
    ],
    followUp: [
      'Pilot one documented workflow for two weeks using safe inputs.',
      'Track where the workflow saves time, improves quality, or creates review burden.',
      'Bring one workflow back for refinement before scaling it to a broader team.',
      'Decide whether the workflow should stay as a prompt card or become a maintained specialty assistant.',
    ],
    tangibleCases: [
      {
        title: 'Meeting-to-action workflow',
        situation:
          'A team loses momentum after meetings because notes, decisions, and follow-up messages are inconsistent.',
        learnerTask:
          'Use fictional meeting notes to create a decision summary, action table, unresolved-questions list, and follow-up draft.',
        prompt:
          'Using these fictional meeting notes, create a meeting-to-action packet: decision summary, action-item table with owner and deadline placeholders, unresolved questions, follow-up email draft, and assumptions requiring human confirmation: [fictional notes].',
      },
      {
        title: 'Policy explainer rewrite',
        situation:
          'A department has a dense internal policy that staff struggle to understand.',
        learnerTask:
          'Rewrite a public or sanitized policy excerpt into a staff explainer, glossary, exceptions list, and review note.',
        prompt:
          'Rewrite this public or sanitized policy excerpt for busy staff. Produce a plain-language explainer, glossary, exceptions or edge cases to ask about, change log, and policy-owner review checklist. Keep the meaning intact: [excerpt].',
      },
      {
        title: 'Research question map',
        situation:
          'A professional needs to explore an unfamiliar topic before deciding what sources to read.',
        learnerTask:
          'Use AI to create a research launch board with search strings, source ladder, blind spots, and claim-check table.',
        prompt:
          'Help me plan research on [topic]. Build a research launch board with question clusters, search strings, source types, likely blind spots, opposing perspectives, red flags, and a claim-check table. Do not make final claims without sources.',
      },
      {
        title: 'Specialty assistant for a repeated task',
        situation:
          'A team has a useful prompt sequence for meeting follow-ups, lesson kits, decision briefs, or writing review, but the sequence is too easy to forget or apply inconsistently.',
        learnerTask:
          'Convert the sequence into a Gem-style assistant blueprint with instructions, boundaries, examples, output format, review gates, and safe test cases.',
        prompt:
          'Help me design a narrow specialty assistant for this repeated task: [task]. Create a build sheet with purpose, user, required intake questions, operating instructions, output format, safety boundaries, claims to verify, human approval points, three safe test cases, three edge cases, and version notes. Do not assume private data can be used.',
      },
    ],
    promptLibrary: [
      {
        title: 'Specialty assistant build sheet',
        prompt:
          'Turn this proven prompt workflow into a Gem-style specialty assistant build sheet. Include the assistant purpose, intended user, required intake questions, operating instructions, allowed inputs, prohibited inputs, output format, review gates, edge cases, safe test cases, owner, and version notes: [workflow].',
      },
      {
        title: 'Workflow recipe',
        prompt:
          'Turn this recurring task into an AI-assisted workflow recipe card. Include trigger, user, safe inputs, prompt sequence, expected output, review checkpoints, human decision points, handoffs, risks, stop signs, and when not to use the workflow: [task].',
      },
      {
        title: 'Draft and critique',
        prompt:
          'Create a first draft for [audience] using the safe context below. Then produce a critique table covering clarity, tone, unsupported claims, missing context, audience fit, and review needs. Finish with a revised version and a human-final checklist: [safe context].',
      },
      {
        title: 'Meeting preparation',
        prompt:
          'Using this fictional meeting context, create a timed agenda, prep questions by role, likely tensions, decision log template, action table, and follow-up email shell. Keep assumptions visible and mark what a human must confirm: [fictional context].',
      },
      {
        title: 'Decision support',
        prompt:
          'Compare these options without choosing for me. Create a decision brief with criteria, option matrix, assumptions, missing evidence, pre-mortem, stakeholder questions, and final human decision questions: [options].',
      },
    ],
    pdfHref: '/curriculum-pdfs/practical-ai-workflows.pdf',
  },
  {
    slug: 'team-ai-readiness-sprint',
    title: 'Team AI Readiness Sprint',
    eyebrow: '2-3 session discovery sprint',
    summary:
      'A structured readiness process for teams that want to identify useful AI opportunities before buying tools or launching policies.',
    format: 'Two or three Zoom sessions with discovery worksheets and a readiness summary.',
    audience:
      'Small and midsize companies, nonprofits, health care teams, and institutions that need cautious, practical alignment.',
    level: 'Level 3: organizational readiness and use-case discovery',
    icon: UsersRound,
    outcomes: [
      'Map current work patterns, friction points, comfort levels, and risk concerns.',
      'Rank possible AI use cases by value, risk, readiness, and training needs.',
      'Clarify what to train, what to pilot, what to postpone, and what not to do.',
      'Create a practical readiness map before buying tools or announcing large AI initiatives.',
    ],
    modules: [
      {
        title: 'Team context scan',
        body: 'We identify where AI curiosity already exists, where anxiety is highest, and where work is repetitive or overloaded.',
      },
      {
        title: 'Use-case discovery',
        body: 'Participants collect possible use cases and sort them by task type, data sensitivity, and expected value.',
      },
      {
        title: 'Risk and readiness scoring',
        body: 'We use a simple matrix to distinguish low-risk practice from decisions that need stronger review or policy.',
      },
      {
        title: 'Training path recommendation',
        body: 'The sprint ends with a practical next-step map for briefings, workshops, office hours, or a limited pilot.',
      },
      {
        title: 'Governance questions for later',
        body: 'The sprint names policy, procurement, privacy, and implementation questions that should be handled by the right internal owners.',
      },
    ],
    guidingQuestions: [
      'Where are people already experimenting, and where are they hesitant?',
      'Which tasks create friction, delay, rework, or knowledge bottlenecks?',
      'Which ideas are low-risk training candidates, and which need stronger review before action?',
      'What should we learn before spending money on tools or vendors?',
    ],
    sessionFlow: [
      {
        title: 'Discover',
        body: 'Interview or workshop with leaders and users to surface real work patterns, pain points, and comfort levels.',
      },
      {
        title: 'Inventory',
        body: 'Collect possible use cases and describe each one by task type, data sensitivity, value, and review needs.',
      },
      {
        title: 'Score',
        body: 'Rank ideas with a simple value, risk, readiness, and training-needs rubric.',
      },
      {
        title: 'Sort',
        body: 'Place ideas into train, pilot, wait, or avoid categories.',
      },
      {
        title: 'Recommend',
        body: 'Translate findings into a short next-step roadmap for training, office hours, or a narrow pilot.',
      },
    ],
    practiceLabs: [
      {
        title: '20-task time scan',
        artifact:
          'A ranked list of 20 recurring tasks with time spent, friction, neglected work, data sensitivity, and review owner.',
        safeInput:
          'Workshop notes describing task categories, not confidential records, credentials, contracts, or private operational details.',
        steps: [
          'List tasks people spend time on and tasks they keep postponing.',
          'Score each for frequency, pain, value, data sensitivity, and review burden.',
          'Mark which tasks are training candidates, discovery candidates, or out of scope.',
        ],
        review:
          'The scan should reveal where AI may create value because time is being spent heavily or important work is being ignored.',
      },
      {
        title: 'Use-case card sorting',
        artifact:
          'A deck of use-case cards with user, task, input, output, value, risk, readiness, review owner, and next step.',
        safeInput:
          'Generalized workflow descriptions and fictional examples rather than sensitive internal data.',
        steps: [
          'Convert vague AI ideas into one card each.',
          'Fill every card with the same fields so ideas can be compared fairly.',
          'Sort cards into train, discover, pilot, wait, avoid, or specialist review.',
        ],
        review:
          'A useful card is specific enough to act on and cautious enough to show what must be learned or approved first.',
      },
      {
        title: 'Value-risk board',
        artifact:
          'A 2x2 board placing candidate use cases by practical value and risk or review burden.',
        safeInput:
          'Sanitized use-case cards from the previous exercise.',
        steps: [
          'Plot each use case by likely value and risk.',
          'Discuss what would reduce risk or increase readiness.',
          'Choose two low-risk training examples and one idea to postpone.',
        ],
        review:
          'The board should prevent premature buying by showing what needs training, evidence, policy input, or a smaller test.',
      },
      {
        title: '30-day readiness memo',
        artifact:
          'A one-page memo naming what to train, what to test, what to postpone, and what needs the right internal owner.',
        safeInput:
          'Anonymized workshop findings, use-case scores, and agreed next-step categories.',
        steps: [
          'Summarize the highest-value low-risk training candidates.',
          'Name higher-risk ideas that need policy, privacy, legal, technical, or procurement review.',
          'Draft a 30-day action plan with owners and learning goals.',
        ],
        review:
          'The memo should be clear enough for leaders to explain without promising savings, compliance, or implementation outcomes.',
      },
    ],
    readinessChecks: [
      'The team can distinguish training needs from implementation or procurement needs.',
      'Use cases are ranked by value, risk, readiness, and review burden.',
      'Sensitive-data concerns are named without implying legal or compliance guarantees.',
      'Next steps are limited enough to learn from safely.',
    ],
    adoptionPractices: [
      'Start discovery by asking where the business spends most of its time and what important work is being neglected.',
      'Combine top-down priorities with worker voice so use cases reflect real operations, not only leadership guesses.',
      'Score each idea by value, risk, readiness, data sensitivity, review burden, and learning required.',
      'Separate train, pilot, wait, avoid, and specialist-review decisions before spending money on tools.',
    ],
    materials: [
      'Team readiness worksheet',
      'Use-case scoring rubric',
      'AI norms discussion guide',
      'Recommended next-step summary template',
      'Use-case card deck',
      'Train, pilot, wait, avoid decision sheet',
    ],
    diagramSlots: [
      'Use-case value/risk grid',
      'Team adoption pathway from discovery to practice',
      'Readiness map from friction points to training path',
      'AI adoption value scan: time spent, neglected work, value, risk, next step',
    ],
    followUp: [
      'Choose two low-risk training candidates and one idea to postpone.',
      'Schedule the right briefing or workshop for the highest-priority audience.',
      'Review the map monthly as team fluency and tool options change.',
    ],
    tangibleCases: [
      {
        title: 'Nonprofit intake backlog',
        situation:
          'A nonprofit team spends too much time sorting public inquiries, drafting first responses, and preparing internal handoffs.',
        learnerTask:
          'Build a friction map, use-case cards, and train/pilot/wait/avoid sort without treating intake as an automation project.',
        prompt:
          'Analyze this fictional nonprofit intake workflow. Create a friction map, use-case cards, data sensitivity notes, review-owner list, and train/discover/pilot/wait/avoid recommendation for each idea: [fictional workflow].',
      },
      {
        title: 'Clinic admin documentation',
        situation:
          'A health care organization wants to improve admin templates but is cautious about patient privacy and medical claims.',
        learnerTask:
          'Create a safe-practice list, internal-owner list, and avoid list for admin documentation improvement.',
        prompt:
          'Given this fictional clinic admin workflow, create three tables: low-risk AI training ideas, items requiring private systems or internal owner approval, and items to avoid. Include input, output, review owner, and why. Do not provide medical, legal, compliance, or cybersecurity assurances: [fictional workflow].',
      },
      {
        title: 'Customer support knowledge gaps',
        situation:
          'A small company has scattered public FAQ pages and repeated support questions.',
        learnerTask:
          'Score possible support use cases and create a 30-day training-first next-step map before any tool purchase.',
        prompt:
          'Turn these fictional support pain points into use-case cards. For each card, include task, user, input, output, value, risk, readiness, review owner, recommended next step, and a 30-day training-first experiment if appropriate: [pain points].',
      },
    ],
    promptLibrary: [
      {
        title: 'Friction map',
        prompt:
          'Help a team map workflow friction. Ask for recurring tasks, delays, rework, handoffs, knowledge bottlenecks, tasks being neglected, time spent, data sensitivity, and review owners. Then produce a ranked friction map and likely AI training opportunities.',
      },
      {
        title: 'Use-case card',
        prompt:
          'Create a use-case card for this AI idea with user, task, safe input, expected output, current pain, value, risk, data sensitivity, review owner, readiness, training need, and smallest next experiment: [idea].',
      },
      {
        title: 'Value-risk scoring',
        prompt:
          'Score these AI ideas from 1 to 5 for value, risk, readiness, review burden, and data sensitivity. Explain each score, name missing evidence, and sort the ideas into train, discover, pilot, wait, avoid, or specialist review: [ideas].',
      },
      {
        title: 'Readiness summary',
        prompt:
          'Draft a cautious one-page readiness summary for leaders. Include top time sinks, neglected work worth exploring, training candidates, ideas to postpone, items needing specialist review, owner roles, and the smallest practical next step: [findings].',
      },
    ],
    pdfHref: '/curriculum-pdfs/team-ai-readiness-sprint.pdf',
  },
  {
    slug: 'executive-ai-briefing',
    title: 'Executive AI Briefing',
    eyebrow: '60-90 minute leadership session',
    summary:
      'Plain-spoken AI orientation for leaders who need clarity before making budget, policy, vendor, or training decisions.',
    format: 'One focused Zoom briefing, optionally followed by a Q&A or planning session.',
    audience:
      'Executives, founders, board-adjacent leaders, and department heads who need a useful map rather than hype.',
    level: 'Leadership level: clarity before technology decisions',
    icon: BriefcaseBusiness,
    outcomes: [
      'Separate AI training needs from software purchasing needs.',
      'Ask better questions about vendors, data, policy, implementation, and organizational readiness.',
      'Identify decisions that need more learning before investment.',
      'Leave with a leadership vocabulary for opportunity, uncertainty, human review, and responsible experimentation.',
    ],
    modules: [
      {
        title: 'What leaders need to know now',
        body: 'A clear map of current AI capabilities, limitations, tool categories, and common misconceptions.',
      },
      {
        title: 'Clarity before complexity',
        body: 'We distinguish fluency, workflow practice, policy, vendor evaluation, and implementation work.',
      },
      {
        title: 'Responsible decision questions',
        body: 'Leaders practice asking about data exposure, review requirements, accountability, and expected business value.',
      },
      {
        title: 'Next-step decision paths',
        body: 'The briefing ends with a recommendation for training, discovery, a small pilot, or a deliberate wait.',
      },
      {
        title: 'Internal communication',
        body: 'Leaders practice explaining AI next steps in language that reduces confusion, fear, and unrealistic expectations.',
      },
    ],
    guidingQuestions: [
      'What should leaders understand before authorizing tools, pilots, policies, or budgets?',
      'Where does education need to come before procurement?',
      'Which risks require the right internal owners rather than a training promise?',
      'What small next step would increase clarity without locking the organization into a premature decision?',
    ],
    sessionFlow: [
      {
        title: 'Landscape',
        body: 'Explain current AI capabilities, limitations, and tool categories in plain language.',
      },
      {
        title: 'Separate',
        body: 'Distinguish fluency training, workflow practice, policy, vendor evaluation, implementation, and governance.',
      },
      {
        title: 'Question',
        body: 'Work through leader-level questions about value, data exposure, review burden, and accountability.',
      },
      {
        title: 'Decide',
        body: 'Sort likely next steps into train, discover, pilot, wait, or seek specialist advice.',
      },
      {
        title: 'Communicate',
        body: 'Draft a short internal message that frames AI learning without hype or guarantees.',
      },
    ],
    practiceLabs: [
      {
        title: 'Vendor claim scorecard',
        artifact:
          'A scorecard turning one vendor claim into questions about workflow fit, evidence, data handling, review, and implementation effort.',
        safeInput:
          'A public vendor claim, product page excerpt, or fictional pitch with no confidential procurement material.',
        steps: [
          'Extract each implied promise from the claim.',
          'Write evidence questions, data questions, training questions, and exit questions.',
          'Score what must be learned before a demo, pilot, or purchase.',
        ],
        review:
          'The scorecard should sharpen procurement judgment without making legal, security, or compliance conclusions.',
      },
      {
        title: 'Decision-gate worksheet',
        artifact:
          'A train, discover, pilot, buy, wait, or specialist-review worksheet for one proposed AI idea.',
        safeInput:
          'A fictional or sanitized AI idea described by task, user, data type, desired output, and possible value.',
        steps: [
          'Separate the idea into learning need, workflow need, tool need, and governance need.',
          'Name the evidence required to move to the next gate.',
          'Choose the smallest next step that creates learning without lock-in.',
        ],
        review:
          'The worksheet should prevent a broad AI idea from turning into a purchase before the organization understands the work.',
      },
      {
        title: 'Risk language rewrite',
        artifact:
          'A before-and-after leadership statement that names uncertainty, boundaries, and owner responsibilities clearly.',
        safeInput:
          'A fictional leadership message or sanitized draft about AI exploration.',
        steps: [
          'Identify hype, guarantees, vague risk language, and missing owner roles.',
          'Rewrite the message in calm operational language.',
          'Add a sentence naming what requires policy, privacy, legal, technical, or clinical review when relevant.',
        ],
        review:
          'The final language should be reassuring because it is specific, not because it overpromises safety.',
      },
      {
        title: 'Leadership message draft',
        artifact:
          'A 250-word internal message explaining why the organization is learning first, what is in bounds, and what comes next.',
        safeInput:
          'Public or sanitized context about the organization’s AI learning goals and audience concerns.',
        steps: [
          'Name the audience, current confusion, and the purpose of AI fluency training.',
          'Draft a short message with practical next steps and boundaries.',
          'Revise for warmth, confidence, and absence of hype.',
        ],
        review:
          'The message should reduce anxiety and unrealistic expectations while making the next learning step concrete.',
      },
    ],
    readinessChecks: [
      'Leaders can explain why fluency training may be needed before tool investment.',
      'Leaders can ask practical questions about data boundaries, review, ownership, and expected value.',
      'The organization has named which decisions require internal policy, legal, privacy, or technical owners.',
      'The next step is small enough to learn from and clear enough to communicate.',
    ],
    adoptionPractices: [
      'Treat AI adoption as work redesign and capability building, not simply tool access.',
      'Ask what evidence would justify scaling before approving major spend or vendor lock-in.',
      'Align incentives, manager support, and evaluation habits so experimentation can produce shared learning.',
      'Create a basic evaluation structure: who reviews outputs, who updates workflows, and how lessons are captured.',
    ],
    materials: [
      'Executive briefing deck outline',
      'Vendor question guide',
      'AI investment readiness checklist',
      'Train, pilot, buy, or wait worksheet',
      'Leadership communication template',
      'Decision-gate question bank',
    ],
    diagramSlots: [
      'Decision gates for AI investment',
      'Build, buy, train, or wait decision tree',
      'Leadership clarity map: learn, test, decide, communicate',
      'Responsible adoption operating model: people, process, governance, measurement',
    ],
    followUp: [
      'Select a first audience for training or discovery.',
      'List vendor, policy, or data questions that require specialist review.',
      'Schedule a follow-up briefing or readiness sprint if the organization needs a fuller map.',
    ],
    tangibleCases: [
      {
        title: 'Vendor pitch review',
        situation:
          'A CEO hears a vendor promise broad productivity gains and wants better questions before spending money.',
        learnerTask:
          'Translate the pitch into a vendor scorecard with evidence requests, workflow-fit questions, and training implications.',
        prompt:
          'Turn this vendor claim into a leadership scorecard. Include claimed value, evidence to request, workflow-fit questions, data-handling questions, human-review requirements, implementation burden, training needs, lock-in concerns, and what would justify a pilot: [vendor claim].',
      },
      {
        title: 'Board-level AI stance',
        situation:
          'A board or senior leadership group asks whether the organization has an AI strategy.',
        learnerTask:
          'Draft a board-ready learning stance with boundaries, next-step gates, and owner roles without overpromising outcomes.',
        prompt:
          'Draft a board-level AI learning statement of 250 words or fewer. Include clarity before complexity, staff fluency, safe experimentation, human judgment, owner roles, near-term training steps, and decisions that require specialist review. Avoid hype and guarantees.',
      },
      {
        title: 'Policy before practice tension',
        situation:
          'A department wants to ban, buy, or standardize AI before staff understand practical use.',
        learnerTask:
          'Create a decision table separating training, workflow practice, policy, privacy/legal, technical, procurement, and wait items.',
        prompt:
          'Given this leadership concern, create a decision table with columns for issue, category, owner, risk, evidence needed, and smallest next step. Categories: fluency training, workflow practice, policy, privacy/legal, technical implementation, procurement, specialist review, or wait: [concern].',
      },
    ],
    promptLibrary: [
      {
        title: 'Decision gate',
        prompt:
          'Evaluate this AI idea through decision gates: learn, practice, discover, pilot, buy, wait, or seek specialist review. Produce a table with gate, evidence needed, owner, risk, cost of being wrong, and next action: [AI idea].',
      },
      {
        title: 'Leadership briefing prep',
        prompt:
          'Prepare a plain-language executive briefing on [AI topic]. Include what it is, what it is useful for, where it fails, practical examples, limits, risks, questions leaders should ask, training implications, and a cautious next step.',
      },
      {
        title: 'Vendor question bank',
        prompt:
          'Create a vendor question bank for [tool category]. Organize it by workflow fit, evidence, data use, privacy/security review, human review, admin controls, implementation effort, training, support, lock-in, and exit options.',
      },
      {
        title: 'Internal message',
        prompt:
          'Draft an internal message explaining that we are learning about AI before making major technology decisions. Keep it calm, practical, nontechnical, and clear about responsible use boundaries, safe practice examples, what not to paste into public tools, and where questions should go.',
      },
    ],
    pdfHref: '/curriculum-pdfs/executive-ai-briefing.pdf',
  },
  {
    slug: 'monthly-ai-office-hours',
    title: 'Monthly AI Office Hours',
    eyebrow: 'Ongoing Zoom support',
    summary:
      'A recurring learning forum for questions, tool changes, workflow practice, and steady coaching as AI habits mature.',
    format: 'Monthly 60-minute Zoom sessions with question collection and lightweight follow-up notes.',
    audience:
      'Teams that have completed an initial training and want continuity without turning AI into a separate project.',
    level: 'Ongoing level: sustained fluency and habit support',
    icon: Video,
    outcomes: [
      'Create a reliable place for practical questions and safe experiments.',
      'Reinforce good review habits as tools, interfaces, and model capabilities change.',
      'Turn scattered individual experiments into shared team learning.',
      'Maintain momentum without forcing AI into every workflow or chasing every announcement.',
    ],
    modules: [
      {
        title: 'Question intake',
        body: 'Each session starts with real questions, confusing moments, and examples from the previous month.',
      },
      {
        title: 'Tool-change translation',
        body: 'New AI features are explained in plain language, with emphasis on what is actually useful for the group.',
      },
      {
        title: 'Live workflow coaching',
        body: 'Participants work through non-sensitive scenarios and see how a workflow can be improved step by step.',
      },
      {
        title: 'Habit reinforcement',
        body: 'Each month ends with one or two practical habits the team can try before the next session.',
      },
      {
        title: 'Learning capture',
        body: 'Useful examples, cautions, and workflow refinements are captured so the team builds institutional memory over time.',
      },
    ],
    guidingQuestions: [
      'What did people try this month, and what happened?',
      'Which tool changes matter for this team, and which can be ignored for now?',
      'Where are review habits holding up, and where are outputs being trusted too quickly?',
      'What one practice should the team try before the next office hours session?',
    ],
    sessionFlow: [
      {
        title: 'Collect',
        body: 'Gather questions, examples, confusing moments, and useful experiments from the previous month.',
      },
      {
        title: 'Translate',
        body: 'Explain relevant tool changes in practical language and ignore updates that do not affect the group.',
      },
      {
        title: 'Coach',
        body: 'Work through live non-sensitive examples, improving prompts and review habits together.',
      },
      {
        title: 'Capture',
        body: 'Document useful patterns, cautions, and candidate workflows.',
      },
      {
        title: 'Assign',
        body: 'Choose one small practice experiment for the next month.',
      },
    ],
    practiceLabs: [
      {
        title: 'Question intake board',
        artifact:
          'A board of participant questions sorted by task, data boundary, tool class, review need, and next experiment.',
        safeInput:
          'Real questions rewritten without sensitive names, records, credentials, contracts, or proprietary detail.',
        steps: [
          'Collect questions before the session and rewrite risky details into safe placeholders.',
          'Sort questions into quick answer, live demo, workflow rescue, policy owner, or later research.',
          'Turn two questions into safe practice prompts.',
        ],
        review:
          'The board should make office hours feel useful while reinforcing what should not be handled in a public tool.',
      },
      {
        title: 'Feature-to-work triage',
        artifact:
          'A one-page digest translating one AI feature change into who should care, what to test, and what to ignore.',
        safeInput:
          'A public product announcement, release note, or feature description.',
        steps: [
          'Summarize the feature in plain language.',
          'Map it to team tasks it might affect and tasks it probably does not affect.',
          'Design one safe 15-minute test or decide to ignore it for now.',
        ],
        review:
          'The digest is successful when people know whether the change alters practice rather than simply sounding new.',
      },
      {
        title: 'Failed-prompt rescue',
        artifact:
          'A diagnosis sheet with failure category, missing context, revised prompt, review step, and do-not-use warning if needed.',
        safeInput:
          'A non-sensitive failed prompt and output, or a fictionalized version of one.',
        steps: [
          'Classify the failure as task choice, missing context, unclear constraints, bad source, overtrust, or weak review.',
          'Rewrite the prompt and add one review checkpoint.',
          'Decide whether the task is worth trying again or should remain human-led.',
        ],
        review:
          'The rescue should teach why the attempt failed, not merely produce a nicer prompt.',
      },
      {
        title: 'Monthly habit scorecard',
        artifact:
          'A small scorecard tracking one habit, one safe experiment, one useful output, one failure, and one norm to update.',
        safeInput:
          'Team practice notes stripped of sensitive details.',
        steps: [
          'Choose one monthly habit such as source checking, tone revision, or assumption naming.',
          'Apply it to a safe example during office hours.',
          'Capture what worked, what failed, and what the team will try next month.',
        ],
        review:
          'The scorecard should create institutional memory, not just a satisfying live demo.',
      },
    ],
    readinessChecks: [
      'Participants bring real but non-sensitive questions and examples.',
      'The team can separate useful tool changes from noise.',
      'Repeated questions are converted into shared guidance or workflow notes.',
      'Office hours reinforce boundaries rather than encouraging careless experimentation.',
    ],
    adoptionPractices: [
      'Use recurring office hours as a learning system: collect questions, compare examples, update norms, and share what changed.',
      'Reward useful observations about failures and confusing outputs, not only successful prompts.',
      'Translate tool changes into work implications so people are not forced to chase every announcement.',
      'Revisit boundaries as tools gain new file, memory, browsing, coding, or agent capabilities.',
    ],
    materials: [
      'Monthly question intake form',
      'Office-hours recap template',
      'Tool-change digest format',
      'Team practice log',
      'Workflow refinement log',
      'Reusable question bank',
    ],
    diagramSlots: [
      'Monthly learning loop',
      'Question-to-practice coaching flow',
      'Office-hours knowledge capture cycle',
    ],
    followUp: [
      'Try the monthly practice habit with one safe task.',
      'Submit questions or examples before the next session.',
      'Update shared notes with what worked, what failed, and what needs clearer guidance.',
    ],
    tangibleCases: [
      {
        title: 'Prompt that failed',
        situation:
          'A team member tried AI for a harmless task, but the result was generic, wrong, or too confident.',
        learnerTask:
          'Create a failed-prompt diagnosis sheet, revised prompt, review checkpoint, and reuse-or-stop decision.',
        prompt:
          'Diagnose why this AI attempt failed. Create a table with failure category, evidence from the output, missing context, revised prompt, review checkpoint, and reuse-or-stop recommendation. Categories include task choice, missing context, unclear constraints, weak examples, overtrust, and review failure: [failed prompt and output].',
      },
      {
        title: 'New feature translation',
        situation:
          'A model or product announces a new feature, and the team is unsure whether it matters.',
        learnerTask:
          'Create a feature-to-work digest naming who should care, what to test, what to ignore, and what boundary changed.',
        prompt:
          'Explain this AI tool update for a cautious team. Produce a one-page digest with what changed, who should care, likely work impact, what to ignore, remaining risks or boundaries, and one small safe experiment to try: [update].',
      },
      {
        title: 'Shared learning capture',
        situation:
          'Several staff members are experimenting privately, but the organization is not learning from those experiments.',
        learnerTask:
          'Convert individual examples into a team recap, reusable patterns, caution list, workflow candidates, and next questions.',
        prompt:
          'Turn these monthly AI practice notes into a team learning recap. Include useful patterns, confusing moments, unsafe ideas to avoid, reusable prompts, workflow candidates, owner questions, and a next-month practice habit: [practice notes].',
      },
    ],
    promptLibrary: [
      {
        title: 'Question refinement',
        prompt:
          'Turn this messy AI question into a clearer office-hours question. Identify the real task, safe substitute input, missing context, data boundaries, desired artifact, review need, and whether it belongs in live demo, policy owner, or later research: [question].',
      },
      {
        title: 'Workflow rescue',
        prompt:
          'Rescue this disappointing AI workflow. Identify where it broke down, rewrite the prompt sequence, add safe-input guidance, add review checkpoints, define the desired artifact, and say when the task should stay human-led: [workflow].',
      },
      {
        title: 'Tool-change digest',
        prompt:
          'Summarize this AI tool change for a practical team. Use five sections: what changed, who should care, what work it may affect, what to ignore for now, and one safe test for next month: [announcement].',
      },
      {
        title: 'Monthly recap',
        prompt:
          'Create a one-page office-hours recap from these notes. Include questions answered, artifacts created, examples discussed, practice habit, cautions, owner follow-ups, and items to revisit next month: [notes].',
      },
    ],
    pdfHref: '/curriculum-pdfs/monthly-ai-office-hours.pdf',
  },
  {
    slug: 'advanced-operator-codex-track',
    title: 'Advanced Operator / Codex Track',
    eyebrow: 'Multi-session advanced coaching',
    summary:
      'Advanced training for power users who want to supervise Codex and similar local full-control systems with judgment, testing, and rollback habits.',
    format: 'Private coaching or cohort sessions with local practice, repo walkthroughs, and verification labs.',
    audience:
      'Technically curious professionals, builders, content-system owners, and advanced AI users ready for local controlled environments.',
    level: 'Level 4: advanced operator and local-agent supervision',
    icon: MonitorPlay,
    outcomes: [
      'Understand what local full-control systems can access and why that changes the supervision model.',
      'Use repo inspection, file edits, tests, browser checks, Git commits, and deployment review responsibly.',
      'Develop rollback thinking so AI-assisted work remains reversible, inspectable, and owned by the human.',
      'Operate Codex-style systems with explicit boundaries, verification habits, and human approval points.',
    ],
    modules: [
      {
        title: 'From chatbot to local operator',
        body: 'We compare ordinary LLM sessions with local agents that can read files, run commands, inspect browsers, and edit projects.',
      },
      {
        title: 'Supervising code and content changes',
        body: 'Participants learn to ask for repo inspection, scoped edits, diffs, tests, and clear summaries before trusting changes.',
      },
      {
        title: 'Full-control safety boundaries',
        body: 'We define where local access helps, where it becomes risky, and what should require explicit human approval.',
      },
      {
        title: 'Deployment and rollback practice',
        body: 'Participants practice commit hygiene, public-site checks, deployment verification, and recovery paths.',
      },
      {
        title: 'Operator judgment',
        body: 'Advanced users learn when to let the agent proceed, when to require confirmation, when to inspect manually, and when to stop.',
      },
    ],
    guidingQuestions: [
      'What changes when an AI system can read files, run commands, inspect browsers, and edit projects?',
      'Which actions are safe for an agent to take, and which require explicit human approval?',
      'How will we verify outputs with tests, screenshots, diffs, and deployment checks?',
      'How will we recover if an AI-assisted change is wrong?',
    ],
    sessionFlow: [
      {
        title: 'Orient',
        body: 'Compare chat-based AI with local agent systems that can act inside a project environment.',
      },
      {
        title: 'Inspect',
        body: 'Read project structure, current state, dependencies, and risk before asking for changes.',
      },
      {
        title: 'Constrain',
        body: 'Write scoped instructions that define files, boundaries, verification, and approval points.',
      },
      {
        title: 'Verify',
        body: 'Use linting, tests, screenshots, diffs, and manual review to decide whether work is acceptable.',
      },
      {
        title: 'Recover',
        body: 'Practice commit hygiene, rollback thinking, and post-deployment checks.',
      },
    ],
    practiceLabs: [
      {
        title: 'Repo inspection memo',
        artifact:
          'A pre-edit memo naming the app structure, relevant files, dependencies, current git state, risks, and proposed smallest change.',
        safeInput:
          'A low-risk local practice repo or public project without secrets or private client data.',
        steps: [
          'Ask the agent to inspect files before editing.',
          'Require a concise plan with files likely to change and verification to run.',
          'Compare the plan to the actual repo before approving edits.',
        ],
        review:
          'The memo should prove the operator understands the project surface before allowing the agent to act.',
      },
      {
        title: 'Scoped edit diff',
        artifact:
          'A tiny change set plus a diff review note explaining what changed, what did not change, and why.',
        safeInput:
          'A small public content or UI change in a controlled local project.',
        steps: [
          'Give a narrow instruction with explicit non-goals.',
          'Review the diff for unrelated churn, formatting noise, or hidden behavior changes.',
          'Ask for a cleanup pass if the edit wandered outside scope.',
        ],
        review:
          'The operator should be able to reject a working change if it includes unnecessary or unclear edits.',
      },
      {
        title: 'Verification evidence packet',
        artifact:
          'A verification packet listing commands run, browser routes checked, screenshots or render checks, failures, fixes, and residual risk.',
        safeInput:
          'A completed low-risk local change ready for review.',
        steps: [
          'Run the project’s relevant static checks and build.',
          'Open the affected route at desktop and mobile widths.',
          'Record evidence, not just a claim that it works.',
        ],
        review:
          'The packet should be strong enough for a human to decide whether a commit or deployment is reasonable.',
      },
      {
        title: 'Rollback note',
        artifact:
          'A rollback note naming the commit, changed files, deployment check, reversal path, and evidence to confirm after release.',
        safeInput:
          'A practice commit or low-risk branch with no destructive commands run automatically.',
        steps: [
          'Identify what would need to be reversed if the change failed.',
          'Write the safest rollback path using git history and deployment checks.',
          'Name what a human must verify after rollback.',
        ],
        review:
          'The goal is not to perform a rollback; it is to make reversibility visible before higher-risk work begins.',
      },
      {
        title: 'Approval boundary matrix',
        artifact:
          'A matrix classifying file reads, edits, tests, installs, API calls, credential use, deploys, deletions, and payments by approval level.',
        safeInput:
          'A fictional set of agent actions or an anonymized workflow policy discussion.',
        steps: [
          'List actions a local agent might take inside a project.',
          'Classify each as okay to proceed, ask first, never without explicit approval, or out of bounds.',
          'Add examples of prompts that set those boundaries clearly.',
        ],
        review:
          'The matrix should protect user control while still allowing the agent to be genuinely useful on low-risk work.',
      },
    ],
    readinessChecks: [
      'The operator can explain what local files, commands, browsers, and deployments the agent can affect.',
      'The operator can request scoped changes and inspect diffs before accepting them.',
      'The operator can run appropriate verification before committing or publishing.',
      'The operator has a rollback path and knows when to stop for human review.',
    ],
    adoptionPractices: [
      'Use least-privilege thinking: give local agents only the access, scope, and autonomy the task actually requires.',
      'Assume agent outputs and actions need verification through diffs, tests, screenshots, logs, or independent review.',
      'Treat prompt injection, sensitive information disclosure, and excessive agency as design risks for tool-using systems.',
      'Keep rollback, audit trail, and human approval points visible before using full-control agents on higher-risk work.',
    ],
    materials: [
      'Local agent supervision checklist',
      'Git and deployment primer',
      'Verification lab worksheet',
      'Rollback and recovery checklist',
      'Approval-boundary matrix',
      'Codex prompt patterns for scoped work',
    ],
    diagramSlots: [
      'Agent control loop: inspect, edit, test, review, commit',
      'Local full-control safety boundary map',
      'Approval boundary matrix for local agent actions',
    ],
    followUp: [
      'Run one scoped agent-assisted change on a low-risk project.',
      'Capture the prompt, diff, checks, and final decision in a practice log.',
      'Build a personal checklist for future Codex-style work before using it on higher-risk projects.',
    ],
    tangibleCases: [
      {
        title: 'Website content update',
        situation:
          'A site owner wants to add a new section to a public website while preserving design patterns and avoiding unrelated changes.',
        learnerTask:
          'Ask the agent to inspect the repo, write a pre-edit memo, implement a scoped change, verify it, and produce a diff summary.',
        prompt:
          'Inspect this project first and write a pre-edit memo with relevant files, existing patterns, risks, and verification plan. Then add a new public content section about [topic] using existing design patterns. Do not change unrelated files. After editing, run checks, inspect desktop and mobile layout if relevant, and summarize exact files changed.',
      },
      {
        title: 'PDF companion generation',
        situation:
          'A curriculum owner wants PDF companions regenerated from site content and visually checked.',
        learnerTask:
          'Use the local generator, render representative PDF pages, inspect layout, record evidence, and keep public and output copies synchronized.',
        prompt:
          'Update the PDF companion content for [track]. Regenerate the PDFs, render representative pages to images, check for clipping, awkward spacing, missing sections, and stale content, then report output files, evidence inspected, fixes made, and residual risks.',
      },
      {
        title: 'Low-risk bug fix',
        situation:
          'A local app has a visible layout bug on mobile after new content was added.',
        learnerTask:
          'Have the agent reproduce the issue, inspect CSS, make the smallest targeted fix, run checks, and attach mobile verification evidence.',
        prompt:
          'Reproduce the mobile layout issue at [route]. Identify the smallest CSS change that fixes it, avoid unrelated refactors, run lint and build, verify at 390px and desktop width, and report the before/after evidence and any residual risk.',
      },
    ],
    promptLibrary: [
      {
        title: 'Inspect before editing',
        prompt:
          'Before making changes, inspect the repo structure, relevant files, existing patterns, current git state, dependencies, and likely risks. Produce a pre-edit memo with the smallest implementation plan, expected files, checks to run, and approval triggers for deployment, credentials, deletion, installs, payments, or external API calls.',
      },
      {
        title: 'Scoped edit',
        prompt:
          'Make only the requested change: [change]. Follow existing patterns, avoid unrelated refactors, and list assumptions. After editing, provide a diff summary, files changed, checks run, screenshots or render evidence if relevant, and anything a human should inspect.',
      },
      {
        title: 'Verification plan',
        prompt:
          'Create and run a verification plan for this change. Include static checks, build, affected routes, desktop and mobile browser checks, screenshot or render checks where relevant, known limitations, and residual risks a human should review.',
      },
      {
        title: 'Rollback thinking',
        prompt:
          'Before publishing, write a rollback note. Identify the commit or branch, changed files, deployment checks, safest reversal path, data or content that would need special care, and the exact evidence we should confirm after release.',
      },
    ],
    pdfHref: '/curriculum-pdfs/advanced-operator-codex-track.pdf',
  },
]

const visualConcepts = [
  {
    title: 'AI Fluency Loop',
    body: 'A simple way to teach AI as an iterative practice: ask, add context, review the output, revise, and apply only what earns trust.',
    image: '/visuals/gemini-native/ai-fluency-loop.webp',
    fullImage: '/visuals/gemini-native/ai-fluency-loop.png',
    alt: 'Infographic showing an AI fluency loop with Ask, Context, Draft, Review, Revise, Apply, and Human Judgment.',
    walkthrough: [
      {
        label: 'Ask',
        text: 'Start with a real work question, not a vague request for magic.',
      },
      {
        label: 'Context',
        text: 'Add the audience, constraints, examples, tone, and standard of success.',
      },
      {
        label: 'Draft',
        text: 'Let the model produce a first version that can be inspected, challenged, and improved.',
      },
      {
        label: 'Review',
        text: 'Check accuracy, usefulness, uncertainty, missing context, and fit for the situation.',
      },
      {
        label: 'Revise and apply',
        text: 'Iterate until the output earns trust, then use it with human judgment still in charge.',
      },
    ],
  },
  {
    title: 'Safe Experimentation Boundary Map',
    body: 'A visual anchor for separating low-risk practice from sensitive data, with human judgment kept at the boundary.',
    image: '/visuals/gemini-native/safe-experimentation-boundary-map.webp',
    fullImage: '/visuals/gemini-native/safe-experimentation-boundary-map.png',
    alt: 'Infographic showing practice, caution, private data, and human judgment zones.',
    walkthrough: [
      {
        label: 'Practice zone',
        text: 'Use fictional examples, public materials, and low-stakes drafts to build skill safely.',
      },
      {
        label: 'Caution zone',
        text: 'When work starts to resemble internal operations, pause for review before sharing details with a tool.',
      },
      {
        label: 'Private data',
        text: 'Patient, customer, employee, proprietary, financial, credential, or regulated information stays out of public AI tools.',
      },
      {
        label: 'Human review',
        text: 'The team decides what can be tested, which tools are appropriate, and how outputs will be checked.',
      },
    ],
  },
  {
    title: 'Use-Case Discovery Grid',
    body: 'A decision tool for ranking AI ideas by value and risk before teams buy tools, launch pilots, or make workflow changes.',
    image: '/visuals/gemini-native/use-case-discovery-grid.webp',
    fullImage: '/visuals/gemini-native/use-case-discovery-grid.png',
    alt: 'Infographic showing an AI use-case grid with value and risk axes.',
    walkthrough: [
      {
        label: 'Quick wins',
        text: 'Low-risk, high-value tasks are the best early practice targets because they can show usefulness quickly.',
      },
      {
        label: 'Strategic pilots',
        text: 'High-value, higher-risk ideas may be worth exploring, but only with scope, ownership, and review standards.',
      },
      {
        label: 'Govern first',
        text: 'High-risk ideas need boundaries, policy discussion, and human oversight before experimentation.',
      },
      {
        label: 'Defer',
        text: 'Low-value ideas should wait so attention stays on workflows that actually matter.',
      },
    ],
  },
  {
    title: 'AI Adoption Value Scan',
    body: 'A practical discovery model that starts with where the business spends time and which important work keeps slipping out of reach.',
    image: '/visuals/gemini-native/ai-adoption-value-scan.webp',
    fullImage: '/visuals/gemini-native/ai-adoption-value-scan.png',
    alt: 'Infographic showing an AI adoption value scan from time sinks and neglected work through scoring and next-step selection.',
    walkthrough: [
      {
        label: 'Time spent',
        text: 'Look first at where work hours actually go: meetings, email, drafts, reports, searching, rework, and handoffs.',
      },
      {
        label: 'Neglected work',
        text: 'Name the valuable tasks that keep getting postponed, such as documentation, follow-up, analysis, training, or client education.',
      },
      {
        label: 'Pattern map',
        text: 'Group the work by frequency, friction, value, sensitivity, and who would review the output.',
      },
      {
        label: 'Low-risk experiments',
        text: 'Try small workflows that use safe inputs, clear success criteria, and visible human review.',
      },
      {
        label: 'Value shortlist',
        text: 'Choose the best next steps before buying tools or redesigning processes.',
      },
    ],
  },
  {
    title: 'Responsible AI Adoption Loop',
    body: 'A visual teaching model for moving from fluency to bounded practice, evaluation, learning capture, and shared team norms.',
    image: '/visuals/gemini-native/responsible-ai-adoption-loop.webp',
    fullImage: '/visuals/gemini-native/responsible-ai-adoption-loop.png',
    alt: 'Infographic showing a responsible AI adoption loop with learn, bound, practice, evaluate, capture, and normalize around human judgment.',
    walkthrough: [
      {
        label: 'Learn',
        text: 'Build shared vocabulary so people understand what AI tools can and cannot do.',
      },
      {
        label: 'Bound',
        text: 'Set data boundaries, tool boundaries, and review expectations before normal use begins.',
      },
      {
        label: 'Practice',
        text: 'Use guided exercises and low-risk workflows so confidence grows through direct experience.',
      },
      {
        label: 'Evaluate',
        text: 'Check outputs for accuracy, uncertainty, missing context, and practical fit.',
      },
      {
        label: 'Capture and normalize',
        text: 'Save lessons, prompts, review habits, and decision rules so good practice becomes team culture.',
      },
    ],
  },
  {
    title: 'Local Operator Control Loop',
    body: 'A teaching model for advanced Codex-style work: inspect, edit, test, review, commit, and keep rollback thinking visible.',
    image: '/visuals/gemini-native/local-operator-control-loop.webp',
    fullImage: '/visuals/gemini-native/local-operator-control-loop.png',
    alt: 'Infographic showing an operator workflow with Inspect, Edit, Test, Review, Commit, and Roll Back.',
    walkthrough: [
      {
        label: 'Inspect',
        text: 'Read the repo, relevant files, local conventions, dependencies, and risks before changing anything.',
      },
      {
        label: 'Plan and edit',
        text: 'Choose a small reversible change, then modify only what the task requires.',
      },
      {
        label: 'Test',
        text: 'Run builds, automated checks, browser checks, and visual review when the surface is user-facing.',
      },
      {
        label: 'Review and commit',
        text: 'Read the diff, verify behavior, record the change clearly, and keep rollback options visible.',
      },
      {
        label: 'Human control',
        text: 'The local operator remains responsible for judgment, secrets, file scope, deployment, and final approval.',
      },
    ],
  },
]

const publicInfoVisuals = [
  {
    title: 'AI Uses You May Not Have Considered',
    body:
      'A public-facing map of practical AI experiments for curious professionals who want useful ideas before committing to expensive tools.',
    image: '/visuals/ai-uses-you-may-not-have-considered.webp?v=gemini-20260529',
    fullImage: '/visuals/ai-uses-you-may-not-have-considered.png?v=gemini-20260529',
    alt: 'Infographic mapping practical AI uses such as decision rehearsal, meeting momentum, learning acceleration, research support, writing, workflows, roleplay, and pattern finding.',
    elements: [
      {
        label: 'Decide',
        text: 'Rehearse choices before they become expensive: compare options, surface assumptions, name tradeoffs, and run a pre-mortem before a meeting or purchase.',
      },
      {
        label: 'Meet',
        text: 'Turn meeting friction into useful momentum with agenda drafts, prep questions, action summaries, follow-up notes, and clearer handoffs.',
      },
      {
        label: 'Learn',
        text: 'Use AI as a patient explainer that can generate analogies, quizzes, examples, practice questions, and level-appropriate explanations.',
      },
      {
        label: 'Research',
        text: 'Use AI as a research compass: generate search terms, compare source categories, clarify claims, and prepare verification questions before trusting an answer.',
      },
      {
        label: 'Write',
        text: 'Move from rough notes to usable drafts by shaping structure, adjusting tone, rewriting for an audience, and creating versions for review.',
      },
      {
        label: 'Workflow',
        text: 'Sketch repeatable processes, identify inputs and outputs, clarify decision points, and make human review steps visible before changing real operations.',
      },
      {
        label: 'Roleplay',
        text: 'Practice interviews, client conversations, sales questions, coaching moments, and difficult discussions in a low-stakes environment.',
      },
      {
        label: 'Patterns',
        text: 'Turn safe notes or public examples into themes, risks, categories, questions, and next actions that would be hard to see one item at a time.',
      },
    ],
  },
  {
    title: 'AI Tools by Utility Class',
    body:
      'A current tool-class map that helps visitors think in categories rather than chasing product names.',
    image: '/visuals/ai-tools-utility-classes.webp?v=gemini-20260529',
    fullImage: '/visuals/ai-tools-utility-classes.png?v=gemini-20260529',
    alt: 'Symbolic infographic mapping AI tool classes through conversation, research, workplace documents, creative design, video and audio, coding, automation, and data visuals.',
    elements: [
      {
        label: 'Conversation',
        text: 'General assistants help with brainstorming, explanation, summarizing, drafting, roleplay, and first-pass thinking across many everyday tasks.',
      },
      {
        label: 'Research',
        text: 'Research tools help compare sources, organize claims, generate better questions, and keep uncertainty visible while a human checks the result.',
      },
      {
        label: 'Workplace documents',
        text: 'Workplace copilots support email, documents, spreadsheets, slide decks, meeting notes, calendars, and internal knowledge workflows.',
      },
      {
        label: 'Creative',
        text: 'Creative tools help explore visual directions, campaign assets, layouts, presentation imagery, brand variations, and quick design alternatives.',
      },
      {
        label: 'Video and audio',
        text: 'Media tools support voice, video, editing, cleanup, narration, translation, storyboarding, and fast prototype content.',
      },
      {
        label: 'Code',
        text: 'Coding agents can inspect repositories, explain code, draft changes, run tests, review diffs, and support careful local development workflows.',
      },
      {
        label: 'Automation flow',
        text: 'Automation tools connect apps, route information, draft handoffs, trigger repeatable steps, and coordinate routine work with clear boundaries.',
      },
      {
        label: 'Data chart',
        text: 'Data tools help clean tables, find patterns, summarize trends, generate questions, and prepare charts or dashboards for human review.',
      },
    ],
  },
]

const aiUseIdeas = [
  {
    title: 'Decision rehearsal',
    body: 'Compare options, surface assumptions, and run a pre-mortem before a meeting.',
  },
  {
    title: 'Meeting momentum',
    body: 'Draft agendas, prep questions, action summaries, and follow-up notes from fictional or sanitized inputs.',
  },
  {
    title: 'Learning accelerator',
    body: 'Ask for analogies, quizzes, examples, and explanations at your current knowledge level.',
  },
  {
    title: 'Research compass',
    body: 'Generate better questions, search terms, source categories, and verification checklists.',
  },
  {
    title: 'Writing studio',
    body: 'Shape first drafts, rewrite for audience, tighten structure, and check tone.',
  },
  {
    title: 'Workflow sketching',
    body: 'Turn a repeated task into steps, inputs, review points, and human decision gates.',
  },
  {
    title: 'Roleplay practice',
    body: 'Rehearse a difficult conversation, interview, sales call, or coaching exchange.',
  },
  {
    title: 'Pattern finding',
    body: 'Sort public or anonymized notes into themes, risks, questions, and next actions.',
  },
]

const toolUtilityClasses = [
  {
    title: 'General assistants',
    examples: 'ChatGPT, Claude, Gemini',
    body: 'Draft, explain, reason, summarize, brainstorm, and work across text, images, files, and conversation.',
  },
  {
    title: 'Research and source tools',
    examples: 'Perplexity, NotebookLM, Deep Research',
    body: 'Explore questions, synthesize source material, compare claims, and keep verification visible.',
  },
  {
    title: 'Workplace copilots',
    examples: 'Microsoft Copilot, Gemini Workspace',
    body: 'Bring AI into email, docs, spreadsheets, meetings, calendars, and internal knowledge work.',
  },
  {
    title: 'Creative design',
    examples: 'Canva, Adobe Firefly, Midjourney',
    body: 'Create and revise images, layouts, brand assets, presentation visuals, and campaign concepts.',
  },
  {
    title: 'Video and voice',
    examples: 'Runway, Descript, ElevenLabs',
    body: 'Generate or edit video, clean up audio, create voiceovers, dub, and prototype media.',
  },
  {
    title: 'Coding agents',
    examples: 'Codex, Cursor, GitHub Copilot',
    body: 'Inspect repositories, write code, edit files, run tests, explain diffs, and support review.',
  },
  {
    title: 'Automation agents',
    examples: 'Zapier, Make, workflow agents',
    body: 'Connect apps, route information, draft handoffs, and coordinate repeatable steps.',
  },
  {
    title: 'Data sensemaking',
    examples: 'Spreadsheets, BI copilots, notebooks',
    body: 'Clean tables, find patterns, summarize trends, and generate questions for human review.',
  },
]

const toolMapSources = [
  { label: 'OpenAI ChatGPT', href: 'https://openai.com/chatgpt/' },
  { label: 'Google Gemini', href: 'https://gemini.google.com/' },
  { label: 'Anthropic Claude', href: 'https://www.anthropic.com/claude' },
  { label: 'NotebookLM', href: 'https://notebooklm.google.com/' },
  { label: 'GitHub Copilot', href: 'https://github.com/features/copilot' },
  { label: 'Canva Magic Studio', href: 'https://www.canva.com/magic-studio/' },
  { label: 'Adobe Firefly', href: 'https://www.adobe.com/products/firefly.html' },
  { label: 'Zapier AI', href: 'https://zapier.com/ai' },
]

const resourceCategories = [
  {
    title: 'Prompting Mindset',
    body: 'How to think clearly with AI: context, curiosity, iteration, review, and boundaries.',
    href: '#mindset',
  },
  {
    title: 'Prompting Practice Cards',
    body: 'Short beginner activities that help learners try useful prompt patterns safely.',
    href: '#practice-cards',
  },
  {
    title: 'Specialty AI Builders',
    body: 'How to design Gems, custom GPTs, project assistants, and similar focused helpers across many skills.',
    href: '#specialty-builders',
  },
  {
    title: 'Use Domains Map',
    body: 'Where AI can help before a business starts comparing tools or vendors.',
    href: '#use-domains',
  },
  {
    title: 'Practice Challenges',
    body: 'Challenge-style prompts for teams, leaders, and individuals to use in workshops.',
    href: '#practice-challenges',
  },
  {
    title: 'Landscape Notes',
    body: 'A calm prompt-scape: durable tool classes and questions to watch over time.',
    href: '#landscape-notes',
  },
  {
    title: 'Monthly Fluency Notes',
    body: 'A sustainable rhythm for tracking useful AI changes without chasing weekly news.',
    href: '#monthly-notes',
  },
  {
    title: 'Resource Shelf',
    body: 'Curated links for prompt practice, tool literacy, and responsible AI judgment.',
    href: '#resource-shelf',
  },
]

const promptingMindsetPrinciples = [
  {
    title: 'Begin with the job, not the tool',
    body: 'Name the work you are trying to improve: a draft, decision, meeting, research plan, explanation, or workflow. The tool choice comes later.',
  },
  {
    title: 'Give context generously',
    body: 'Useful prompts include audience, purpose, constraints, examples, format, and what success should look like. Context is how you teach the model the shape of the task.',
  },
  {
    title: 'Iterate in public view',
    body: 'Good prompting is a visible loop: ask, inspect, revise, compare, and explain what changed. Learners should see the process, not only the polished result.',
  },
  {
    title: 'Treat output as material',
    body: 'AI output is not a verdict. It is draft material to inspect, reshape, verify, discard, or combine with human knowledge.',
  },
  {
    title: 'Keep boundaries active',
    body: 'Use public, fictional, or sanitized inputs for practice. Keep patient, customer, employee, legal, financial, security, and proprietary material out of public tools.',
  },
  {
    title: 'Review before relying',
    body: 'Every useful workflow needs a final human pass for accuracy, tone, assumptions, missing context, and responsibility.',
  },
]

const specialtyBuilderSteps = [
  {
    title: 'Choose one repeatable job',
    body: 'A strong Gem or specialty assistant starts with a narrow job: revise emails, create meeting kits, coach interview answers, draft lesson plans, or inspect code diffs.',
  },
  {
    title: 'Write operating instructions',
    body: 'Define the role, audience, tone, required questions, output format, review criteria, and what the assistant must not do.',
  },
  {
    title: 'Add examples and source material carefully',
    body: 'Use public, fictional, or approved material. If the tool supports project knowledge, add only material that belongs in that environment.',
  },
  {
    title: 'Build review gates into the behavior',
    body: 'Tell the assistant to label assumptions, list missing facts, flag claims to verify, and ask for human approval before high-impact output.',
  },
  {
    title: 'Test with safe edge cases',
    body: 'Try vague inputs, conflicting instructions, risky requests, and poor examples so learners see where the assistant helps and where it fails.',
  },
  {
    title: 'Version and maintain it',
    body: 'Treat specialty assistants like living teaching tools. Keep notes on what changed, what failed, and when instructions or source material need refreshing.',
  },
]

const specialtySkillBuilders = [
  {
    title: 'Writing coach',
    purpose: 'Revises drafts for audience, tone, clarity, structure, and claims that need checking.',
    instruction:
      'Ask for audience, purpose, tone, length, and non-negotiable facts before revising. Return a change log and send-before-review checklist.',
    safeTest:
      'Use a fictional announcement or sanitized email and ask for concise, warm, and formal versions.',
  },
  {
    title: 'Research compass',
    purpose: 'Turns broad topics into question clusters, search terms, source ladders, and claim-check tables.',
    instruction:
      'Do not treat model output as evidence. Separate research planning from verified claims and ask for source categories before conclusions.',
    safeTest:
      'Use a public topic and build a research launch board with missing perspectives and red flags.',
  },
  {
    title: 'Meeting facilitator',
    purpose: 'Creates agendas, prep questions, decision logs, action-item tables, and follow-up shells.',
    instruction:
      'Use role placeholders rather than private names when needed. Mark every owner, deadline, and decision as requiring human confirmation.',
    safeTest:
      'Use a fictional cross-team meeting goal and ask for a 30-minute agenda plus follow-up packet.',
  },
  {
    title: 'Decision brief coach',
    purpose: 'Helps compare options, surface assumptions, run pre-mortems, and name missing evidence.',
    instruction:
      'Never decide for the user. End with human-only decision questions, evidence gaps, and assumptions that should be tested.',
    safeTest:
      'Use a public, personal, or fictional decision with low stakes and no confidential data.',
  },
  {
    title: 'Learning tutor',
    purpose: 'Explains unfamiliar material with analogies, examples, glossaries, quizzes, and misconception checks.',
    instruction:
      'Ask for the learner’s level first. Separate explanation from evidence and include a verification table for important claims.',
    safeTest:
      'Use one public article and create a one-page learning kit.',
  },
  {
    title: 'Career proof coach',
    purpose: 'Turns scattered experience into bios, resume bullets, proof banks, and interview answer outlines.',
    instruction:
      'Flag inflated claims, ask for evidence, and avoid inventing credentials, employers, dates, metrics, or confidential project details.',
    safeTest:
      'Use a fictional or sanitized work history and ask for a claims-to-evidence checklist.',
  },
  {
    title: 'Survey and form helper',
    purpose: 'Cleans question wording, standardizes response scales, and formats items for forms or spreadsheets.',
    instruction:
      'Check for leading language, double-barreled questions, inconsistent scales, and sensitive data collection concerns.',
    safeTest:
      'Use fictional workshop feedback questions and request a form-ready version.',
  },
  {
    title: 'Chart storyboarder',
    purpose: 'Plans charts by defining the data question, columns, audience, chart type, labels, caveats, and checks.',
    instruction:
      'Ask what decision or explanation the chart should support before recommending a visual form.',
    safeTest:
      'Use public or fictional data and ask for a chart plan instead of a finished chart.',
  },
  {
    title: 'Brand and naming reviewer',
    purpose: 'Explores connotations, audience fit, risks, wording alternatives, and questions to test with humans.',
    instruction:
      'Treat brand ideas as hypotheses. Include cultural, tone, and clarity questions without claiming market certainty.',
    safeTest:
      'Use fictional product names and ask for positive associations, drawbacks, and test questions.',
  },
  {
    title: 'Workflow recipe designer',
    purpose: 'Turns repeated tasks into safe inputs, prompt sequences, outputs, review gates, owners, and stop signs.',
    instruction:
      'Keep workflow design separate from automation. Name when a human, private environment, or internal owner is needed.',
    safeTest:
      'Use a fictional administrative task and create a recipe card with review checkpoints.',
  },
  {
    title: 'Code review companion',
    purpose: 'Supports repo inspection, change summaries, test plans, diff review, documentation, and rollback thinking.',
    instruction:
      'Require file scope, tests, human review, and rollback notes. Never expose secrets or make destructive changes without explicit approval.',
    safeTest:
      'Use a public or low-risk practice repo and ask for a pre-edit memo before any change.',
  },
  {
    title: 'Creative director',
    purpose: 'Generates creative briefs, visual directions, image prompts, campaign variants, and critique rubrics.',
    instruction:
      'Ask for audience, medium, constraints, brand traits, and review criteria. Keep final selection and brand judgment human-led.',
    safeTest:
      'Use a fictional campaign and request three visual directions with critique criteria.',
  },
]

const useDomainGroups = [
  {
    title: 'Learning and explanation',
    body: 'Turn a public source or unfamiliar topic into examples, analogies, glossaries, quizzes, and misconception checks.',
    firstExperiment: 'Create a one-page learning kit from a public article.',
    watchFor: 'Unsupported claims, invented citations, and explanations that sound clearer than they are.',
  },
  {
    title: 'Writing and communication',
    body: 'Draft, rewrite, tighten, change tone, produce subject lines, or create before-and-after writing comparisons.',
    firstExperiment: 'Rewrite one fictional email in concise, warm, and formal versions.',
    watchFor: 'Overpromising, generic voice, missing facts, and language that no longer sounds like the sender.',
  },
  {
    title: 'Meetings and follow-through',
    body: 'Create agendas, prep questions, decision logs, action-item tables, and follow-up drafts from sanitized scenarios.',
    firstExperiment: 'Build a 30-minute agenda and follow-up shell from a fictional meeting goal.',
    watchFor: 'Invented commitments, unclear owners, unrealistic timing, and private notes.',
  },
  {
    title: 'Decision support',
    body: 'Compare options, surface assumptions, run pre-mortems, list missing evidence, and clarify human decision questions.',
    firstExperiment: 'Create a decision brief for a public, personal, or fictional decision.',
    watchFor: 'The model choosing for the person, hidden assumptions, and risk language that needs specialist review.',
  },
  {
    title: 'Research planning',
    body: 'Generate question clusters, search terms, source categories, opposing views, and claim-check tables before searching.',
    firstExperiment: 'Build a research launch board for a public topic.',
    watchFor: 'Treating model output as evidence instead of a plan for finding evidence.',
  },
  {
    title: 'Data and pattern finding',
    body: 'Sort public or anonymized notes into categories, themes, risks, questions, and next actions.',
    firstExperiment: 'Cluster a fictional feedback list into themes and follow-up questions.',
    watchFor: 'Privacy leakage, weak categories, and conclusions from incomplete or biased samples.',
  },
  {
    title: 'Creative and content planning',
    body: 'Brainstorm angles, titles, outlines, images, campaign concepts, teaching examples, and content variations.',
    firstExperiment: 'Generate three lesson or webpage outlines from public topic notes.',
    watchFor: 'Style without substance, invented facts, and outputs that need brand or audience review.',
  },
  {
    title: 'Workflow and operations',
    body: 'Map repeated tasks into safe inputs, prompt sequences, review gates, owners, stop signs, and reusable recipe cards.',
    firstExperiment: 'Write a workflow recipe for one repeated administrative task using fictional inputs.',
    watchFor: 'Accidental automation thinking before the team understands the work and the review burden.',
  },
]

const practiceChallenges = [
  {
    title: 'Beginner: Repair a vague prompt',
    brief: 'Start with “Help me write this better” and turn it into a prompt with audience, purpose, tone, constraints, and review criteria.',
    output: 'A before-and-after prompt card plus a note explaining what changed.',
  },
  {
    title: 'Individual: Build a learning kit',
    brief: 'Use one public article to create an explainer, glossary, quiz, misconception list, and claim-check table.',
    output: 'A compact study packet and a list of claims to verify.',
  },
  {
    title: 'Team: Meeting momentum',
    brief: 'Use a fictional meeting scenario to produce a timed agenda, prep questions, decision log, action table, and follow-up draft.',
    output: 'A meeting kit with owner placeholders and human confirmation points.',
  },
  {
    title: 'Leader: Vendor claim scorecard',
    brief: 'Take a public or fictional AI vendor claim and turn it into questions about evidence, workflow fit, data, review, and implementation burden.',
    output: 'A vendor-question scorecard that supports clarity before buying.',
  },
  {
    title: 'Workflow: Recipe card',
    brief: 'Choose one repeated task and describe the safest AI-assisted slice with inputs, prompt sequence, output, review gates, and stop signs.',
    output: 'A reusable workflow recipe that can be tested with fictional data.',
  },
  {
    title: 'Review: Red-team an output',
    brief: 'Ask AI to critique an AI-generated draft for unsupported claims, vague wording, missing context, assumptions, and safety concerns.',
    output: 'A marked-up draft with keep, revise, verify, and discard decisions.',
  },
]

const landscapeNotes = [
  {
    title: 'Assistants are becoming multimodal',
    body: 'General assistants increasingly handle text, images, files, voice, and browsing. The durable skill is knowing what evidence the output rests on.',
  },
  {
    title: 'Workplace AI is moving into existing tools',
    body: 'Email, documents, spreadsheets, meetings, and calendars are natural surfaces for AI. Teams need shared norms before convenience becomes careless practice.',
  },
  {
    title: 'Research tools are useful but not final authority',
    body: 'Source-aware tools can speed up exploration, but learners still need source judgment, citation checks, and confidence boundaries.',
  },
  {
    title: 'Agents raise the supervision bar',
    body: 'Coding and workflow agents can act across files or apps. The human operator needs scope, review, approval, and rollback habits.',
  },
  {
    title: 'Private data changes the question',
    body: 'Once sensitive or proprietary data is involved, the issue is no longer basic prompting. The right internal owners and approved environments matter.',
  },
]

const monthlyFluencyNotes = [
  {
    title: 'What changed?',
    body: 'Name the tool or capability change in plain language. Ignore announcements that do not affect the team’s actual work.',
  },
  {
    title: 'What did we try?',
    body: 'Capture one safe experiment, the artifact it produced, what worked, and what failed.',
  },
  {
    title: 'What needs review?',
    body: 'Update boundaries around data, source checking, approvals, human ownership, and tasks that should stay out of public tools.',
  },
  {
    title: 'What is next month’s practice?',
    body: 'Choose one narrow practice habit: better context, output comparison, claim checking, meeting follow-up, or workflow documentation.',
  },
]

const resourceShelfLinks = [
  {
    label: 'Everybody Prompts',
    category: 'Starter activities',
    href: 'https://everybodyprompts.wordpress.com/',
    body: 'A practical archive of beginner prompting activities and examples.',
  },
  {
    label: 'OpenAI prompt engineering guide',
    category: 'Prompting guides',
    href: 'https://developers.openai.com/api/docs/guides/prompt-engineering',
    body: 'Official OpenAI guidance on improving prompts and working with model outputs.',
  },
  {
    label: 'Anthropic prompt engineering overview',
    category: 'Prompting guides',
    href: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
    body: 'Official Claude documentation on prompt engineering practices.',
  },
  {
    label: 'Gemini prompt design strategies',
    category: 'Prompting guides',
    href: 'https://ai.google.dev/gemini-api/docs/prompting-strategies',
    body: 'Google AI guidance for prompt design and iterative refinement.',
  },
  {
    label: 'Google Gemini Gems',
    category: 'Specialty assistants',
    href: 'https://gemini.google/overview/gems/',
    body: 'Google’s overview of Gems as customized AI experts for recurring tasks.',
  },
  {
    label: 'OpenAI: Create a GPT',
    category: 'Specialty assistants',
    href: 'https://help.openai.com/en/articles/8554397-create-a-gpt',
    body: 'OpenAI help guidance for creating custom GPTs with instructions and knowledge.',
  },
  {
    label: 'Anthropic Claude Projects',
    category: 'Specialty assistants',
    href: 'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects',
    body: 'Anthropic help guidance for organizing chats, project knowledge, and custom instructions.',
  },
  {
    label: 'Microsoft Copilot agents',
    category: 'Specialty assistants',
    href: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder',
    body: 'Microsoft documentation for creating agents that extend Copilot for specific work contexts.',
  },
  {
    label: 'Microsoft 365 Copilot Prompts Gallery',
    category: 'Workplace examples',
    href: 'https://m365.cloud.microsoft/copilot-prompts',
    body: 'Prompt examples organized around Microsoft 365 work scenarios.',
  },
  {
    label: 'NIST AI Risk Management Framework',
    category: 'Responsible AI',
    href: 'https://www.nist.gov/itl/ai-risk-management-framework',
    body: 'A useful reference for organizations thinking about AI risk, governance, and review.',
  },
]

const process = [
  {
    step: 'Discover',
    body: 'Map your team\'s questions, comfort level, and real work contexts.',
    detail:
      'Discovery starts with the actual shape of work: where time goes, which tasks feel repetitive or neglected, what people are curious about, and what makes them cautious. The goal is not to force AI into every corner of the organization. It is to identify low-risk learning opportunities, hidden efficiency gains, and business questions worth exploring before anyone buys tools or rewrites policies.',
  },
  {
    step: 'Train',
    body: 'Build a shared foundation with clear examples and plain language.',
    detail:
      'Training gives teams a shared vocabulary for prompts, context, review, uncertainty, data boundaries, and useful AI roles. Participants learn what current tools can do well, where they are unreliable, and how to ask better questions. The emphasis is on confidence without overtrust: people should leave able to explain AI clearly, use it deliberately, and recognize when human judgment or specialist review still matters.',
  },
  {
    step: 'Practice',
    body: 'Try practical workflows together in a safe, guided Zoom setting.',
    detail:
      'Practice turns concepts into lived experience. In guided Zoom exercises, participants work with realistic but non-sensitive scenarios: drafting, summarizing, meeting prep, research planning, decision support, and workflow design. They compare outputs, revise prompts, spot weak claims, and build review habits. This is where AI stops feeling abstract and starts becoming a practical thinking partner.',
  },
  {
    step: 'Apply',
    body: 'Choose sensible next steps your team can use with better judgment.',
    detail:
      'Application converts learning into a next-step map. Some ideas become repeatable prompt patterns or workflow recipes. Some need a pilot, a private environment, leadership discussion, or policy input. Some should wait. The aim is disciplined progress: choose the use cases with real value, clear review points, safe inputs, and enough team understanding to move forward wisely.',
  },
]

const reasons = [
  {
    title:
      'Education comes first, so people understand the tools before committing to them.',
    detail:
      'Xensible starts with fluency because better understanding leads to better decisions. Teams learn what current AI tools can and cannot do, how prompts and context shape results, and why output still needs review. That foundation helps organizations avoid both panic and overbuying. Before a team pays for software, hires vendors, or changes policy, people should know enough to ask sharper questions and recognize what kind of value is actually possible.',
  },
  {
    title:
      'Sessions are warm, practical, and designed for people who are curious but not yet confident.',
    detail:
      'Many professionals are interested in AI but quietly unsure where to begin, what is safe to try, or whether they are already behind. Xensible sessions are designed to lower that pressure. The training uses plain language, real examples, and guided practice so participants can ask basic questions without embarrassment. The goal is not to impress people with technical jargon. It is to help them leave with confidence, vocabulary, and a few useful habits they can repeat.',
  },
  {
    title:
      'The work is remote-first and easy to tailor for teams, departments, leaders, or individuals.',
    detail:
      'Because the training is built for Zoom, it can meet people where they already work. A leadership group may need a strategic briefing. A department may need workflow practice. An individual may need coaching on writing, research, planning, or local AI tools. Each session can be shaped around the audience, comfort level, sector concerns, and real tasks, while still keeping a consistent structure for safe experimentation and practical follow-through.',
  },
  {
    title:
      'Responsible use is built in: data boundaries, uncertainty, review habits, and human judgment stay central.',
    detail:
      'Responsible AI practice is treated as a normal part of fluency, not a warning added at the end. Participants learn to avoid pasting sensitive patient, customer, employee, legal, financial, or proprietary data into public tools. They also practice checking claims, noticing uncertainty, revising outputs, and deciding what should remain human-led. Xensible does not promise legal, medical, compliance, or cybersecurity guarantees. It teaches people to use AI with clearer boundaries and better judgment.',
  },
]

const aiBuiltSites = [
  {
    name: 'LogFall',
    url: 'https://logfall.com/',
    domain: 'logfall.com',
    image: '/showcase/logfall.webp',
    alt: 'Screenshot of the LogFall landing page.',
    description:
      'A logical-fallacies reference with definitions, examples, teaching paths, case studies, and practice tools.',
  },
  {
    name: 'CogBias',
    url: 'https://cogbias.site/',
    domain: 'cogbias.site',
    image: '/showcase/cogbias.webp',
    alt: 'Screenshot of the CogBias landing page.',
    description:
      'A cognitive-bias learning site with clear entries, comparison guides, assessments, self-audits, and debiasing tools.',
  },
  {
    name: 'Byteseismic Philosophy',
    url: 'https://byteseismic.com/',
    domain: 'byteseismic.com',
    image: '/showcase/byteseismic.webp',
    alt: 'Screenshot of the Byteseismic Philosophy landing page.',
    description:
      'A guided philosophy inquiry network organized by questions, routes, concepts, dialogues, maps, and quizzes.',
  },
  {
    name: 'DOING.TOKYO',
    url: 'https://doing.tokyo/',
    domain: 'doing.tokyo',
    image: '/showcase/doing-tokyo.webp',
    alt: 'Screenshot of the DOING.TOKYO landing page.',
    description:
      'A practical one-day Tokyo itinerary planner that adapts route style, budget, pace, weather, food, and logistics.',
  },
  {
    name: 'Credencing',
    url: 'https://credencing.com/',
    domain: 'credencing.com',
    image: '/showcase/credencing.webp',
    alt: 'Screenshot of the Credencing landing page.',
    description:
      'An interactive model for thinking about evidence, perception, confidence, rationality, and irrationality.',
  },
  {
    name: 'Slugfester',
    url: 'https://slugfester.com/',
    domain: 'slugfester.com',
    image: '/showcase/slugfester.webp',
    alt: 'Screenshot of the Slugfester landing page.',
    description:
      'A debate-analysis tool for tracking argument strength, rebuttals, fallacies, and cognitive biases in transcripts.',
  },
]

const faqs = [
  {
    question: 'Is Xensible an AI implementation firm?',
    answer:
      'No. Xensible focuses on AI fluency, training, coaching, and readiness. The goal is to help people understand and use AI thoughtfully before making bigger technology decisions.',
  },
  {
    question: 'Are sessions remote?',
    answer:
      'Yes. Services are remote-first and usually delivered over Zoom. Sessions can be customized for teams, leadership groups, departments, or individual professionals.',
  },
  {
    question: 'Do participants need technical experience?',
    answer:
      'No. The training is built for people who are smart, capable, and busy but may not have spent much time with AI tools yet.',
  },
  {
    question: 'Can you train cautious or regulated organizations?',
    answer:
      'Yes. The emphasis is education, careful judgment, and safe experimentation. Xensible does not promise legal, medical, compliance, or cybersecurity outcomes.',
  },
  {
    question: 'Will we use private data in public AI tools?',
    answer:
      'No. Training reinforces clear data boundaries and does not ask participants to paste sensitive patient, customer, employee, or proprietary information into public AI systems.',
  },
  {
    question: 'What is the best way to start?',
    answer:
      'A short Zoom consultation or team briefing is usually enough to understand your goals, audience, and the right level of training.',
  },
  {
    question: 'What does the first consultation cost?',
    answer:
      'The first 30-minute consultation is free. It is a risk-free way to clarify your actual needs before any paid work begins. After that, billing is transparent and moves forward only with client approval. Typical fees range from $40-$50 per hour for individual coaching and $50-$70 per hour for Zoom classroom coaching, with generous preparation, examples, and practical guidance built into the work.',
  },
]

const emailHref =
  'mailto:contact@xensible.com?subject=AI%20Fluency%20Call%20for%20Xensible'
const defaultCalendlyHref = 'https://calendly.com/contact-xensible/30min'
const calendlyWidgetSrc = 'https://assets.calendly.com/assets/external/widget.js'
const onsiteBookingHref = '/#contact'
const bookingHref =
  import.meta.env.VITE_CALENDLY_URL?.trim() || defaultCalendlyHref
const calendlyEmbedHref = (() => {
  try {
    const embedUrl = new URL(bookingHref)
    embedUrl.searchParams.set('hide_gdpr_banner', '1')
    embedUrl.searchParams.set('background_color', 'f7f9f6')
    embedUrl.searchParams.set('text_color', '172b31')
    embedUrl.searchParams.set('primary_color', '1c4c54')
    embedUrl.searchParams.set('embed_domain', window.location.host)
    embedUrl.searchParams.set('embed_type', 'Inline')
    return embedUrl.toString()
  } catch {
    return bookingHref
  }
})()

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        parentElement: HTMLElement
        resize?: boolean
        url: string
      }) => void
    }
  }
}

type PageMetadata = {
  title: string
  description: string
  path: string
  robots?: string
  schemaType?: string
}

const siteOrigin = 'https://xensible.com'
const siteName = 'Xensible'
const organizationId = `${siteOrigin}/#organization`
const websiteId = `${siteOrigin}/#website`
const founderId = `${siteOrigin}/#phil-stilwell`
const defaultSocialImagePath = '/og-image.jpg'
const defaultPageDescription =
  'Practical AI fluency training, coaching, and Zoom workshops for teams, leaders, and professionals who want responsible AI workflows without hype.'
const offerSeoDescriptions: Record<string, string> = {
  'ai-briefing':
    'Book a focused AI briefing for leaders who need plain-language clarity on AI tools, data boundaries, readiness, and next steps.',
  'team-workshop':
    'Plan a hands-on Zoom workshop that helps teams use AI for writing, research, planning, meetings, and safer repeatable workflows.',
  'office-hours':
    'Set up monthly AI office hours for practical questions, tool changes, workflow coaching, and steady team fluency support over Zoom.',
}

const absoluteSiteUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteOrigin).toString()
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const setMetaByAttribute = (
  attribute: 'name' | 'property',
  key: string,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.content = content
}

const setCanonicalUrl = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }

  element.href = href
}

const setStructuredData = (structuredData: Record<string, unknown>) => {
  let script = document.getElementById(
    'xensible-structured-data',
  ) as HTMLScriptElement | null

  if (!script) {
    script = document.createElement('script')
    script.id = 'xensible-structured-data'
    script.type = 'application/ld+json'
    document.head.append(script)
  }

  script.textContent = JSON.stringify(structuredData)
}

const applyPageMetadata = (
  metadata: PageMetadata,
  structuredData: Record<string, unknown>,
) => {
  const canonicalUrl = absoluteSiteUrl(metadata.path)
  const socialImageUrl = absoluteSiteUrl(defaultSocialImagePath)
  const robots = metadata.robots ?? 'index,follow'

  document.title = metadata.title
  setCanonicalUrl(canonicalUrl)
  setMetaByAttribute('name', 'description', metadata.description)
  setMetaByAttribute('name', 'robots', robots)
  setMetaByAttribute('name', 'author', siteName)
  setMetaByAttribute('property', 'og:site_name', siteName)
  setMetaByAttribute('property', 'og:locale', 'en_US')
  setMetaByAttribute('property', 'og:type', 'website')
  setMetaByAttribute('property', 'og:title', metadata.title)
  setMetaByAttribute('property', 'og:description', metadata.description)
  setMetaByAttribute('property', 'og:url', canonicalUrl)
  setMetaByAttribute('property', 'og:image', socialImageUrl)
  setMetaByAttribute(
    'property',
    'og:image:alt',
    'Xensible AI fluency training visual',
  )
  setMetaByAttribute('property', 'og:image:width', '1200')
  setMetaByAttribute('property', 'og:image:height', '630')
  setMetaByAttribute('name', 'twitter:card', 'summary_large_image')
  setMetaByAttribute('name', 'twitter:title', metadata.title)
  setMetaByAttribute('name', 'twitter:description', metadata.description)
  setMetaByAttribute('name', 'twitter:image', socialImageUrl)
  setMetaByAttribute(
    'name',
    'twitter:image:alt',
    'Xensible AI fluency training visual',
  )
  setStructuredData(structuredData)
}

const getPageMetadata = ({
  activeCurriculum,
  activeOffer,
  currentPath,
  isCurriculumHub,
  isExpertCurriculumLibrary,
  isFreeCurriculum,
  isAiUsesToolsPage,
  isPracticeProjectsPage,
  isResourcesPage,
  isThanksPage,
}: {
  activeCurriculum?: CurriculumContent
  activeOffer?: (typeof offerFormats)[number]
  currentPath: string
  isCurriculumHub: boolean
  isExpertCurriculumLibrary: boolean
  isFreeCurriculum: boolean
  isAiUsesToolsPage: boolean
  isPracticeProjectsPage: boolean
  isResourcesPage: boolean
  isThanksPage: boolean
}): PageMetadata => {
  if (activeOffer) {
    return {
      title: `${activeOffer.title} | Xensible AI Training`,
      description: offerSeoDescriptions[activeOffer.slug] ?? activeOffer.summary,
      path: `/offers/${activeOffer.slug}`,
    }
  }

  if (activeCurriculum) {
    return {
      title: `${activeCurriculum.title} | Xensible Expert Curriculum`,
      description: `${activeCurriculum.summary} Includes modules, practice labs, realistic cases, and prompt libraries for guided AI training.`,
      path: `/curricula/expert/${activeCurriculum.slug}`,
      robots: 'noindex,follow',
    }
  }

  if (isFreeCurriculum) {
    return {
      title: 'Free AI Fluency Starter | Xensible',
      description:
        'Start learning AI fluency with a free Xensible starter curriculum covering LLM basics, prompt structure, safe practice, and human review habits.',
      path: '/curricula/free',
    }
  }

  if (isExpertCurriculumLibrary) {
    return {
      title: 'Expert Curriculum Library | Xensible',
      description:
        'Preview-gated Xensible expert curriculum library for AI fluency workshops, office hours, readiness sprints, and advanced operator coaching.',
      path: '/curricula/expert',
      robots: 'noindex,follow',
    }
  }

  if (isCurriculumHub) {
    return {
      title: 'AI Fluency Curriculum Tiers | Xensible',
      description:
        'Compare Xensible\'s free AI fluency starter path with the expert curriculum library for team workshops, office hours, and advanced operator coaching.',
      path: '/curricula',
      schemaType: 'CollectionPage',
    }
  }

  if (isAiUsesToolsPage) {
    return {
      title: 'AI Uses and Tool Classes | Xensible',
      description:
        'Explore practical AI use cases and a current map of AI tool utility classes for AI-curious professionals, teams, and leaders.',
      path: '/ai-uses-tools',
      schemaType: 'CollectionPage',
    }
  }

  if (isPracticeProjectsPage) {
    return {
      title: '1-Hour AI Practice Projects | Xensible',
      description:
        'Try practical one- to two-hour AI exercises that help individuals experience useful AI workflows through safe inputs, review habits, and real walk-away artifacts.',
      path: '/practice-projects',
      schemaType: 'CollectionPage',
    }
  }

  if (isResourcesPage) {
    return {
      title: 'AI Fluency Resources | Xensible',
      description:
        'Explore Xensible AI fluency resources: prompting mindset, practice cards, use domains, practice challenges, landscape notes, monthly fluency notes, and curated links.',
      path: '/resources',
      schemaType: 'CollectionPage',
    }
  }

  if (isThanksPage) {
    return {
      title: 'Booking Confirmed | Xensible',
      description:
        'Your Xensible AI fluency call has been scheduled. Review next steps and continue exploring AI training resources.',
      path: '/thanks',
      robots: 'noindex,follow',
    }
  }

  if (currentPath !== '/') {
    return {
      title: 'Page Not Found | Xensible',
      description:
        'The Xensible page you requested could not be found. Return to AI fluency training services, curricula, or consultation details.',
      path: currentPath,
      robots: 'noindex,follow',
    }
  }

  return {
    title: 'Xensible | AI Fluency Training, Coaching, and Workshops',
    description: defaultPageDescription,
    path: '/',
  }
}

const getBaseSchemaGraph = (
  metadata: PageMetadata,
): Array<Record<string, unknown>> => {
  const canonicalUrl = absoluteSiteUrl(metadata.path)

  return [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: siteName,
      url: absoluteSiteUrl('/'),
      logo: absoluteSiteUrl('/favicon.svg'),
      email: 'contact@xensible.com',
      description: defaultPageDescription,
      founder: { '@id': founderId },
    },
    {
      '@type': 'Person',
      '@id': founderId,
      name: 'Phil Stilwell',
      jobTitle: 'AI fluency coach and educator',
      worksFor: { '@id': organizationId },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: absoluteSiteUrl('/'),
      inLanguage: 'en-US',
      publisher: { '@id': organizationId },
    },
    {
      '@type': metadata.schemaType ?? 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': websiteId },
      inLanguage: 'en-US',
      publisher: { '@id': organizationId },
    },
  ]
}

const getServiceListSchema = () => ({
  '@type': 'ItemList',
  '@id': `${absoluteSiteUrl('/')}#services`,
  name: 'Xensible AI fluency services',
  itemListElement: services.map(({ title, body }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      '@id': `${absoluteSiteUrl('/')}#service-${slugify(title)}`,
      name: title,
      description: body,
      provider: { '@id': organizationId },
      serviceType: 'AI fluency training',
      areaServed: { '@type': 'Country', name: 'United States' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: bookingHref,
        availableLanguage: 'en-US',
      },
    },
  })),
})

const getFaqSchema = () => ({
  '@type': 'FAQPage',
  '@id': `${absoluteSiteUrl('/')}#faq-schema`,
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

const getOfferSchema = (offer: (typeof offerFormats)[number]) => ({
  '@type': 'Service',
  '@id': `${absoluteSiteUrl(`/offers/${offer.slug}`)}#service`,
  name: offer.title,
  description: offer.summary,
  provider: { '@id': organizationId },
  serviceType: 'AI fluency training',
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: offer.bestFor.map((item) => ({
    '@type': 'Audience',
    audienceType: item,
  })),
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: bookingHref,
    availableLanguage: 'en-US',
  },
})

const getCourseSchema = (curriculum: CurriculumContent, path: string) => ({
  '@type': 'Course',
  '@id': `${absoluteSiteUrl(path)}#course`,
  name: curriculum.title,
  description: curriculum.summary,
  provider: { '@id': organizationId },
  educationalLevel: curriculum.level,
  audience: {
    '@type': 'Audience',
    audienceType: curriculum.audience,
  },
  teaches: curriculum.outcomes,
})

const getCurriculumTierListSchema = () => ({
  '@type': 'ItemList',
  '@id': `${absoluteSiteUrl('/curricula')}#curriculum-tiers`,
  name: 'Xensible AI fluency curriculum tiers',
  itemListElement: curriculumTiers.map(({ title, summary, href }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteSiteUrl(href),
    name: title,
    description: summary,
  })),
})

const getPracticeProjectListSchema = () => ({
  '@type': 'ItemList',
  '@id': `${absoluteSiteUrl('/practice-projects')}#practice-projects`,
  name: 'Xensible practical AI utility projects',
  itemListElement: individualUtilityProjects.map(({ title, hook, outcome, timebox }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: title,
    description: `${hook} ${outcome}`,
    additionalType: 'LearningResource',
    timeRequired: timebox,
  })),
})

const getResourceListSchema = () => ({
  '@type': 'ItemList',
  '@id': `${absoluteSiteUrl('/resources')}#resource-categories`,
  name: 'Xensible AI fluency resources',
  itemListElement: resourceCategories.map(({ title, body, href }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteSiteUrl(`/resources${href}`),
    name: title,
    description: body,
  })),
})

const getStructuredData = (
  metadata: PageMetadata,
  {
    activeOffer,
    isCurriculumHub,
    isFreeCurriculum,
    isPracticeProjectsPage,
    isResourcesPage,
  }: {
    activeOffer?: (typeof offerFormats)[number]
    isCurriculumHub: boolean
    isFreeCurriculum: boolean
    isPracticeProjectsPage: boolean
    isResourcesPage: boolean
  },
) => {
  const graph = getBaseSchemaGraph(metadata)

  if (metadata.path === '/') {
    graph.push(getServiceListSchema(), getFaqSchema())
  }

  if (activeOffer) {
    graph.push(getOfferSchema(activeOffer))
  }

  if (isCurriculumHub) {
    graph.push(getCurriculumTierListSchema())
  }

  if (isFreeCurriculum) {
    graph.push(getCourseSchema(freeCurriculum, '/curricula/free'))
  }

  if (isPracticeProjectsPage) {
    graph.push(getPracticeProjectListSchema())
  }

  if (isResourcesPage) {
    graph.push(getResourceListSchema())
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

const basePath = import.meta.env.BASE_URL
const basePathWithoutSlash =
  basePath === '/' ? '' : basePath.replace(/\/$/, '')

const stripBasePath = (path: string) => {
  if (!basePathWithoutSlash || !path.startsWith(basePathWithoutSlash)) {
    return path || '/'
  }

  return path.slice(basePathWithoutSlash.length) || '/'
}

const siteHref = (path: string) => {
  if (path.startsWith('mailto:') || path.startsWith('http')) {
    return path
  }

  if (path === '/') {
    return basePath
  }

  if (path.startsWith('/')) {
    return `${basePathWithoutSlash}${path}`
  }

  return path
}

const getInitialPath = () => {
  const redirectedPath = window.sessionStorage.getItem('xensible-redirect')

  if (redirectedPath) {
    window.sessionStorage.removeItem('xensible-redirect')
    const redirectedUrl = new URL(redirectedPath, window.location.origin)
    const routePath = stripBasePath(redirectedUrl.pathname)

    window.history.replaceState(
      null,
      '',
      `${siteHref(routePath)}${redirectedUrl.search}${redirectedUrl.hash}`,
    )

    return routePath
  }

  return stripBasePath(window.location.pathname)
}

const scrollToCurrentHash = () => {
  const hashId = window.location.hash.slice(1)

  if (!hashId) {
    return
  }

  const target = document.getElementById(decodeURIComponent(hashId))
  target?.scrollIntoView({ block: 'start' })
}

function App() {
  const [currentPath, setCurrentPath] = useState(getInitialPath)
  const activeOffer = offerFormats.find(
    (offer) => currentPath === `/offers/${offer.slug}`,
  )
  const activeCurriculum = curriculumPackages.find(
    (curriculum) =>
      currentPath === `/curricula/expert/${curriculum.slug}` ||
      currentPath === `/curricula/${curriculum.slug}`,
  )
  const isCurriculumHub = currentPath === '/curricula'
  const isFreeCurriculum = currentPath === '/curricula/free'
  const isExpertCurriculumLibrary = currentPath === '/curricula/expert'
  const isAiUsesToolsPage = currentPath === '/ai-uses-tools'
  const isPracticeProjectsPage = currentPath === '/practice-projects'
  const isResourcesPage = currentPath === '/resources'
  const isThanksPage = currentPath === '/thanks'
  const isUnknownRoute =
    currentPath !== '/' &&
    !activeOffer &&
    !activeCurriculum &&
    !isCurriculumHub &&
    !isFreeCurriculum &&
    !isExpertCurriculumLibrary &&
    !isAiUsesToolsPage &&
    !isPracticeProjectsPage &&
    !isResourcesPage &&
    !isThanksPage
  const pageMetadata = useMemo(
    () =>
      getPageMetadata({
        activeCurriculum,
        activeOffer,
        currentPath,
        isCurriculumHub,
        isExpertCurriculumLibrary,
        isFreeCurriculum,
        isAiUsesToolsPage,
        isPracticeProjectsPage,
        isResourcesPage,
        isThanksPage,
      }),
    [
      activeCurriculum,
      activeOffer,
      currentPath,
      isCurriculumHub,
      isExpertCurriculumLibrary,
      isFreeCurriculum,
      isAiUsesToolsPage,
      isPracticeProjectsPage,
      isResourcesPage,
      isThanksPage,
    ],
  )
  const structuredData = useMemo(
    () =>
      getStructuredData(pageMetadata, {
        activeOffer,
        isCurriculumHub,
        isFreeCurriculum,
        isPracticeProjectsPage,
        isResourcesPage,
      }),
    [activeOffer, isCurriculumHub, isFreeCurriculum, isPracticeProjectsPage, isResourcesPage, pageMetadata],
  )

  useEffect(() => {
    const handlePopState = () => setCurrentPath(stripBasePath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    applyPageMetadata(pageMetadata, structuredData)
  }, [pageMetadata, structuredData])

  useEffect(() => {
    if (currentPath === '/') {
      window.requestAnimationFrame(scrollToCurrentHash)
    }

    const handleHashChange = () => {
      if (stripBasePath(window.location.pathname) === '/') {
        window.requestAnimationFrame(scrollToCurrentHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [currentPath])

  const navigateToRoute = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault()
    window.history.pushState(null, '', siteHref(href))
    setCurrentPath(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href={siteHref('/')} aria-label="Xensible home">
          <span className="brand-mark">X</span>
          <span>Xensible</span>
        </a>
        <div className="header-actions">
          <nav className="nav-links" aria-label="Main navigation">
            <a href={siteHref('/#services')}>Services</a>
            <a href={siteHref('/practice-projects')}>Projects</a>
            <a href={siteHref('/#curriculum-packages')}>Curricula</a>
            <a href={siteHref('/resources')}>Resources</a>
            <a href={siteHref('/#guide')}>About</a>
            <a href={siteHref(onsiteBookingHref)}>Contact</a>
          </nav>
          <a className="button button-primary nav-cta" href={siteHref(onsiteBookingHref)}>
            <CalendarDays aria-hidden="true" />
            Schedule
          </a>
        </div>
      </header>

      {activeOffer ? (
        <OfferPage offer={activeOffer} />
      ) : isPracticeProjectsPage ? (
        <PracticeProjectsPage navigateToRoute={navigateToRoute} />
      ) : isAiUsesToolsPage ? (
        <AiUsesToolsPage navigateToRoute={navigateToRoute} />
      ) : isResourcesPage ? (
        <ResourcesPage navigateToRoute={navigateToRoute} />
      ) : activeCurriculum || isCurriculumHub || isFreeCurriculum || isExpertCurriculumLibrary ? (
        <CurriculumPage
          curriculum={activeCurriculum}
          isFreeCurriculum={isFreeCurriculum}
          isHub={isCurriculumHub}
          navigateToRoute={navigateToRoute}
        />
      ) : isThanksPage ? (
        <ThanksPage navigateToRoute={navigateToRoute} />
      ) : isUnknownRoute ? (
        <NotFoundPage />
      ) : (
        <HomePage navigateToRoute={navigateToRoute} />
      )}

      <footer className="site-footer">
        <p>Xensible</p>
        <p>AI fluency training, coaching, and practical guidance over Zoom.</p>
      </footer>
    </div>
  )
}

function HomePage({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  const [openVisualTitle, setOpenVisualTitle] = useState<string | null>(null)

  return (
    <main id="top">
        <section
          className="hero-section"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(247, 249, 246, 0.97) 0%, rgba(247, 249, 246, 0.9) 35%, rgba(247, 249, 246, 0.2) 68%, rgba(247, 249, 246, 0.08) 100%), url(${heroImage})` }}
        >
          <div className="hero-content">
            <p className="eyebrow">Xensible AI fluency coaching</p>
            <h1>AI Fluency Training for Teams and Individuals</h1>
            <p className="hero-copy">
              Practical, human-first AI training for organizations and
              professionals who want clarity, confidence, and better judgment
              before they make expensive technology decisions.
            </p>
            <div className="hero-actions" aria-label="Primary calls to action">
              <a className="button button-primary" href={siteHref(onsiteBookingHref)}>
                <CalendarDays aria-hidden="true" />
                Schedule an AI Fluency Call
              </a>
              <a
                className="button button-secondary"
                href={siteHref('/practice-projects')}
                onClick={(event) => navigateToRoute(event, '/practice-projects')}
              >
                Try a 1-Hour AI Project
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="hero-notes" aria-label="Delivery highlights">
              <span>
                <MonitorPlay aria-hidden="true" />
                Remote-first over Zoom
              </span>
              <span>
                <ShieldCheck aria-hidden="true" />
                Safe experimentation
              </span>
              <span>
                <Lightbulb aria-hidden="true" />
                Plain-language guidance
              </span>
            </div>
            <div className="hero-proof-strip" aria-label="Training emphasis">
              <span>Training before tools</span>
              <span>Safe practice inputs</span>
              <span>Review before reliance</span>
            </div>
          </div>
          <aside className="hero-signal-panel" aria-label="Xensible learning path">
            <p className="hero-signal-kicker">Guided learning path</p>
            <h2>From AI curiosity to usable judgment.</h2>
            <div className="hero-step-list">
              <div>
                <span>01</span>
                <strong>Discover</strong>
                <p>Surface questions, time sinks, and work that keeps getting postponed.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Train</strong>
                <p>Build shared language for prompts, limits, data boundaries, and review.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Practice</strong>
                <p>Try realistic Zoom exercises with public, fictional, or sanitized inputs.</p>
              </div>
              <div>
                <span>04</span>
                <strong>Apply</strong>
                <p>Choose sensible workflows before investing in larger technology decisions.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="section section-intro audience-section" aria-labelledby="who-title">
          <div className="section-heading">
            <p className="eyebrow">Who this is for</p>
            <h2 id="who-title">
              For teams that are ready to understand what AI can actually do.
            </h2>
            <p>
              Xensible is built for people who need clear examples, careful
              boundaries, and practical confidence before making expensive AI
              decisions.
            </p>
          </div>
          <div className="audience-grid">
            {audience.map((item) => (
              <article className="audience-item" key={item}>
                <CheckCircle2 aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-band" aria-labelledby="fluency-title">
          <div className="section-heading centered">
            <p className="eyebrow">What AI fluency means</p>
            <h2 id="fluency-title">
              Fluency is not about chasing every new tool. It is knowing how to
              think with AI responsibly.
            </h2>
            <p>
              Xensible helps participants build enough understanding to use AI
              practically, ask sharper questions, and know when human review is
              essential.
            </p>
          </div>
          <div className="pillar-grid">
            {fluencyPillars.map(({ title, body, icon: Icon }) => (
              <article className="info-card" key={title}>
                <span className="info-card-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section utility-project-section"
          id="practice-projects"
          aria-labelledby="practice-projects-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Practical individual projects</p>
            <h2 id="practice-projects-title">
              One or two hours is enough to feel what AI can actually do.
            </h2>
            <p>
              These short exercises give AI-curious learners a real artifact:
              a clearer decision, a stronger draft, a research plan, a meeting
              kit, or a reusable workflow. Each project uses safe inputs and
              keeps the human responsible for the final judgment.
            </p>
          </div>
          <div className="utility-project-grid">
            {individualUtilityProjects.map(({ title, timebox, hook, outcome, steps }) => (
              <article className="utility-project-card" key={title}>
                <span className="project-time">{timebox}</span>
                <h3>{title}</h3>
                <p>{hook}</p>
                <div className="project-outcome">
                  <span>Walk-away artifact</span>
                  <p>{outcome}</p>
                </div>
                <ol>
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <div className="project-note-strip">
            <p>
              The rule for every exercise: use public, fictional, sanitized, or
              personal-but-not-sensitive material. The goal is to experience AI
              utility without handing a public tool information it should not
              have.
            </p>
            <a
              className="button button-secondary"
              href={siteHref('/practice-projects')}
              onClick={(event) => navigateToRoute(event, '/practice-projects')}
            >
              Open All Practice Projects
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2 id="services-title">
              Flexible AI learning experiences for teams, leaders, and
              individual professionals.
            </h2>
          </div>
          <div className="service-grid">
            {services.map(({ title, body, icon: Icon }) => (
              <article className="service-card" key={title}>
                <div className="service-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section offer-format-section"
          id="offer-formats"
          aria-labelledby="offer-formats-title"
        >
          <div className="section-heading centered">
            <p className="eyebrow">Ways to start</p>
            <h2 id="offer-formats-title">
              Simple formats that make the first step easier to choose.
            </h2>
            <p>
              Start with a focused briefing, a practical team workshop, or
              recurring office hours over Zoom.
            </p>
          </div>
          <div className="offer-format-grid">
            {offerFormats.map(({ slug, title, summary, icon: Icon }) => (
              <a
                className="offer-card"
                href={siteHref(`/offers/${slug}`)}
                key={slug}
                onClick={(event) => navigateToRoute(event, `/offers/${slug}`)}
              >
                <span className="service-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{summary}</p>
                <span className="text-link">
                  View details
                  <ArrowRight aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="section curriculum-packages-section"
          id="curriculum-packages"
          aria-labelledby="curriculum-packages-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Curriculum packages</p>
            <h2 id="curriculum-packages-title">
              Two curriculum tiers: an open starter path and a protected
              expert library.
            </h2>
            <p>
              Start with the free AI fluency primer, then unlock the expert
              tier when you want the full six-package curriculum, advanced
              operator training, and PDF companions.
            </p>
          </div>
          <div className="tier-grid">
            {curriculumTiers.map(({ slug, title, eyebrow, summary, href, cta, access, icon: Icon }) => (
              <a
                className={`tier-card tier-card-${slug}`}
                href={siteHref(href)}
                key={slug}
                onClick={(event) => navigateToRoute(event, href)}
              >
                <span className="service-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="curriculum-kicker">{eyebrow}</span>
                <h3>{title}</h3>
                <p>{summary}</p>
                <span className="tier-access">{access}</span>
                <span className="text-link">
                  {cta}
                  <ArrowRight aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <div className="section-heading compact-heading">
            <p className="eyebrow">Expert package ladder</p>
            <h3>Six deeper paths available after unlocking the expert tier.</h3>
          </div>
          <div className="curriculum-card-grid">
            {curriculumPackages.map(({ slug, title, eyebrow, summary, icon: Icon }) => (
              <a
                className="curriculum-card"
                href={siteHref(`/curricula/expert/${slug}`)}
                key={slug}
                onClick={(event) => navigateToRoute(event, `/curricula/expert/${slug}`)}
              >
                <span className="service-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="curriculum-kicker">{eyebrow}</span>
                <h3>{title}</h3>
                <p>{summary}</p>
                <span className="tier-access">Expert tier</span>
                <span className="text-link">
                  Unlock full content
                  <ArrowRight aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="section visuals-section"
          id="visuals"
          aria-labelledby="visuals-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Visual curriculum anchors</p>
            <h2 id="visuals-title">
              Diagrams that make AI judgment easier to see and discuss.
            </h2>
            <p>
              These infographics support the Xensible curriculum by turning
              abstract AI habits into memorable teaching models for teams,
              leaders, and advanced learners.
            </p>
          </div>
          <div className="visual-grid">
            {visualConcepts.map(({ title, body, image, fullImage, alt, walkthrough }) => {
              const isOpen = openVisualTitle === title
              const visualPanelId = `visual-panel-${title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}`

              return (
                <article className={`visual-card${isOpen ? ' is-open' : ''}`} key={title}>
                  <button
                    type="button"
                    className="visual-summary"
                    aria-expanded={isOpen}
                    aria-controls={visualPanelId}
                    onClick={() => setOpenVisualTitle(isOpen ? null : title)}
                  >
                    <span className="visual-summary-copy">
                      <span className="visual-summary-title">{title}</span>
                      <span className="visual-summary-body">{body}</span>
                    </span>
                    <span className="visual-summary-thumb" aria-hidden="true">
                      <picture>
                        <source srcSet={siteHref(image)} type="image/webp" />
                        <img src={siteHref(fullImage)} alt="" loading="eager" decoding="async" />
                      </picture>
                    </span>
                    <ChevronDown className="visual-summary-icon" aria-hidden="true" />
                  </button>

                  {isOpen ? (
                    <div className="visual-panel" id={visualPanelId}>
                      <div className="visual-panel-media">
                        <picture>
                          <source srcSet={siteHref(image)} type="image/webp" />
                          <img src={siteHref(fullImage)} alt={alt} loading="eager" decoding="async" />
                        </picture>
                      </div>
                      <div className="visual-panel-copy">
                        <h3>{title} notes</h3>
                        <p>{body}</p>
                        <ul className="visual-walkthrough" aria-label={`${title} walkthrough`}>
                          {walkthrough.map(({ label, text }) => (
                            <li key={label}>
                              <strong>{label}</strong>
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
          <div className="info-resource-strip">
            <div>
              <p className="eyebrow">Public resource</p>
              <h3>AI uses and tool classes for the AI-curious.</h3>
              <p>
                A nontechnical map visitors can use to see practical uses they
                may not have considered and understand tool categories before
                choosing what to try.
              </p>
            </div>
            <a
              className="button button-primary"
              href={siteHref('/resources')}
              onClick={(event) => navigateToRoute(event, '/resources')}
            >
              Open Resources
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="section founder-section" id="guide" aria-labelledby="guide-title">
          <div className="founder-visual">
            <figure className="founder-photo-card">
              <img src={founderImage} alt="Phil Stilwell, founder of Xensible" />
            </figure>
            <div className="guide-lines">
              <span>3 years teaching AI over Zoom</span>
              <span>25+ years in education</span>
              <span>100+ corporate training clients</span>
              <span>1 year of hands-on coding</span>
            </div>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">Founder and guide</p>
            <h2 id="guide-title">
              Learn AI with an educator who has spent decades making complex
              ideas teachable.
            </h2>
            <p>
              Phil Stilwell is an early AI adopter, educator, and AI fluency
              coach. For the past three years, he has been teaching AI skills
              over Zoom, helping people move from curiosity to practical
              confidence. He has also spent a year coding and has long been an
              early adopter of demonstrably useful technology, which helps him
              translate emerging tools into everyday work without the hype.
            </p>
            <p>
              His background includes more than 25 years in education,
              customized corporate training at over 100 companies, global
              leadership coaching for Accenture Japan, and university-level
              teaching in critical thinking, negotiation, academic and technical
              writing, macroeconomics, and instructional technology.
            </p>
            <div className="founder-proof-grid" aria-label="Founder experience highlights">
              <div>
                <span>Zoom-first</span>
                <p>Three years teaching practical AI skills remotely.</p>
              </div>
              <div>
                <span>Teaching depth</span>
                <p>Courses and coaching for universities, government, and professionals.</p>
              </div>
              <div>
                <span>Practical technology judgment</span>
                <p>Early adoption, hands-on coding, and careful attention to what actually helps.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section examples-section"
          id="examples"
          aria-labelledby="examples-title"
        >
          <div className="examples-intro-grid">
            <div className="section-heading">
              <p className="eyebrow">Built by Phil with AI</p>
              <h2 id="examples-title">
                Featured sites created by Xensible's lead trainer using
                AI-assisted thinking, writing, and development.
              </h2>
              <p>
                Phil created each of these public projects as practical
                examples of the fluency Xensible teaches: using AI to structure
                complex material, build useful interfaces, and turn ideas into
                working resources without losing human judgment.
              </p>
            </div>
            <p className="example-origin-story">
              For decades, Phil kept notebooks and stray files full of book
              outlines, paper arguments, and website ideas, each one quietly
              filed under someday: maybe, with a clear six-month stretch, one
              or two could become real. AI changed the scale of that
              imagination. The same kind of idea that once waited in the drawer
              can now be shaped, tested, written, designed, and put together in
              about six focused hours, with human judgment still steering the
              work. The business lesson is just as important: inside most
              organizations, there are overlooked processes, dormant offerings,
              neglected client questions, training gaps, and possible new
              revenue channels that even experienced leaders may not see
              because everyone is already moving at full speed. Today's
              tireless AIs make those hidden possibilities easier to
              brainstorm, compare, prototype, and refine, helping teams
              discover where work can be done more efficiently and where new
              value may be waiting.
            </p>
          </div>
          <div className="example-grid">
            {aiBuiltSites.map(({ name, url, domain, image, alt, description }) => (
              <a
                className="example-card"
                href={url}
                key={domain}
                rel="noreferrer"
                target="_blank"
              >
                <span className="example-shot">
                  <img src={siteHref(image)} alt={alt} loading="lazy" />
                </span>
                <span className="example-card-content">
                  <span className="example-domain">{domain}</span>
                  <span className="example-creator">Created by Phil Stilwell</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <span className="text-link">
                    Visit site
                    <ExternalLink aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="section section-band" aria-labelledby="process-title">
          <div className="section-heading centered">
            <p className="eyebrow">Simple process</p>
            <h2 id="process-title">Discover, train, practice, apply.</h2>
          </div>
          <div className="process-grid">
            {process.map(({ step, body, detail }, index) => (
              <article
                aria-describedby={`process-detail-${index + 1}`}
                className="process-step process-step-interactive"
                key={step}
                tabIndex={0}
              >
                <div className="process-step-front">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                  <p>{body}</p>
                </div>
                <div className="process-hover-panel" id={`process-detail-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section why-section" aria-labelledby="why-title">
          <div className="why-copy">
            <p className="eyebrow">Why Xensible</p>
            <h2 id="why-title">
              A calmer path from AI curiosity to useful practice.
            </h2>
            <p>
              Xensible is built for cautious organizations that want smart,
              clear training before complexity. No hype loop. No pressure to
              install enterprise systems. Just fluency, judgment, and practical
              next steps.
            </p>
          </div>
          <div className="reason-list">
            {reasons.map(({ title, detail }, index) => (
              <div
                aria-describedby={`reason-detail-${index + 1}`}
                className="reason-item reason-item-interactive"
                key={title}
                tabIndex={0}
              >
                <div className="reason-item-front">
                  <Sparkles aria-hidden="true" />
                  <p>{title}</p>
                </div>
                <div className="reason-hover-panel" id={`reason-detail-${index + 1}`}>
                  <Sparkles aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="section-heading centered">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Clear answers for thoughtful teams.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section contact-booking-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-booking-copy">
            <p className="eyebrow">Start with a conversation</p>
            <h2 id="contact-title">Schedule an AI Fluency Call</h2>
            <p>
              Bring your questions, your team context, and the places where AI
              feels confusing. We will use a short Zoom conversation to identify
              the right first step.
            </p>
            <p className="contact-pricing-note">
              The first 30-minute consultation is free, so we can clarify your
              actual needs before any paid work begins. After that, billing is
              transparent and based on your approval. Typical rates are $40-$50
              per hour for individual coaching and $50-$70 per hour for Zoom
              classroom coaching, with generous preparation, examples, and
              practical guidance included in the work.
            </p>
            <p className="contact-insight">
              Best first question: what does your business spend most of its
              time doing, and what important work keeps getting ignored because
              no one has enough capacity? That is often where AI fluency reveals
              its most practical value before a costly technology decision.
            </p>
            <p className="contact-email">
              Direct email: <a href={emailHref}>contact@xensible.com</a>
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href={bookingHref}>
                <Handshake aria-hidden="true" />
                Book on Calendly
              </a>
              <a className="button button-secondary" href={emailHref}>
                Email Instead
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </div>
          <aside className="contact-booking-panel" aria-label="Calendly booking calendar">
            <CalendlyInlineEmbed url={calendlyEmbedHref} />
          </aside>
        </section>
      </main>
  )
}

function CalendlyInlineEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const initWidget = () => {
      if (!window.Calendly?.initInlineWidget || !containerRef.current) {
        return
      }

      containerRef.current.innerHTML = ''
      window.Calendly.initInlineWidget({
        parentElement: containerRef.current,
        resize: true,
        url,
      })
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${calendlyWidgetSrc}"]`,
    )

    const script = existingScript ?? document.createElement('script')

    if (window.Calendly?.initInlineWidget) {
      initWidget()
    } else {
      script.src = calendlyWidgetSrc
      script.async = true
      script.addEventListener('load', initWidget)

      if (!existingScript) {
        document.body.appendChild(script)
      }
    }

    return () => {
      script.removeEventListener('load', initWidget)
      container.innerHTML = ''
    }
  }, [url])

  return <div className="calendly-embed" ref={containerRef} />
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="curriculum-hero curriculum-tier-hero">
        <div>
          <p className="eyebrow">Page not found</p>
          <h1>This Xensible page is not available.</h1>
          <p className="hero-copy">
            Return to the AI fluency training overview, browse the public
            curriculum starter, or start a conversation about the right next
            step.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteHref('/')}>
              <ArrowLeft aria-hidden="true" />
              Xensible Home
            </a>
            <a className="button button-secondary" href={siteHref('/curricula/free')}>
              Free AI Fluency Starter
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function ThanksPage({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="info-page thank-you-page">
      <section className="info-hero thank-you-hero" aria-labelledby="thanks-title">
        <div>
          <a
            className="back-link"
            href={siteHref('/')}
            onClick={(event) => navigateToRoute(event, '/')}
          >
            <ArrowLeft aria-hidden="true" />
            Back to home
          </a>
          <p className="eyebrow">Booking confirmed</p>
          <h1 id="thanks-title">Your AI fluency call is on the calendar.</h1>
          <p className="hero-copy">
            Thanks for scheduling with Xensible. You should receive a Calendly
            confirmation with the meeting details and conferencing link.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={siteHref('/practice-projects')}
              onClick={(event) => navigateToRoute(event, '/practice-projects')}
            >
              Try a 1-Hour AI Project
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href={siteHref('/#services')}
            >
              Review Services
            </a>
          </div>
        </div>
        <div className="info-hero-panel">
          <p className="eyebrow">Before we meet</p>
          <h2>Bring one practical question.</h2>
          <p>
            A good starting point is one repeated task, decision, draft, or
            team workflow where AI might save attention without replacing
            human judgment.
          </p>
        </div>
      </section>
    </main>
  )
}

function PromptingStarterLabSection() {
  return (
    <section className="section prompting-starter-section" id="practice-cards" aria-labelledby="prompting-starter-title">
      <div className="section-heading">
        <p className="eyebrow">First prompting lab</p>
        <h2 id="prompting-starter-title">Small activities for a learner's first useful prompts.</h2>
        <p>
          Adapted from the beginner-friendly activity patterns on{' '}
          <a href="https://everybodyprompts.wordpress.com/" target="_blank" rel="noreferrer">
            Everybody Prompts
          </a>
          , this lab gives students low-risk ways to experience prompting:
          ask for a better prompt, request structure, revise tone, describe
          an image carefully, build a quiz, and review the result before use.
        </p>
      </div>
      <div className="prompting-activity-grid">
        {starterPromptingActivities.map(({ title, pattern, skill, artifact, safeInput, starterPrompt }, index) => (
          <article className="prompting-activity-card" key={title}>
            <div className="activity-card-header">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{pattern}</p>
            </div>
            <h3>{title}</h3>
            <p>{skill}</p>
            <div className="activity-detail">
              <span>Build</span>
              <p>{artifact}</p>
            </div>
            <div className="activity-detail activity-safe-input">
              <span>Use</span>
              <p>{safeInput}</p>
            </div>
            <div className="prompt-box">
              <span>Starter prompt</span>
              <p>{starterPrompt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ResourcesPage({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="resources-page">
      <section className="info-hero resource-hero">
        <div>
          <a
            className="back-link"
            href={siteHref('/')}
            onClick={(event) => navigateToRoute(event, '/')}
          >
            <ArrowLeft aria-hidden="true" />
            Back to home
          </a>
          <p className="eyebrow">AI fluency resources</p>
          <h1>Clear categories for learning, practicing, and evaluating AI.</h1>
          <p className="hero-copy">
            This library keeps Xensible's public resources easy to navigate:
            mindset first, safe practice next, then use domains, challenges,
            landscape notes, monthly review habits, and curated links.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#practice-cards">
              Start With Practice Cards
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href={siteHref('/ai-uses-tools')}
              onClick={(event) => navigateToRoute(event, '/ai-uses-tools')}
            >
              Open AI Map
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="info-hero-panel">
          <p className="eyebrow">Site structure</p>
          <h2>Where things live</h2>
          <ul className="resource-structure-list">
            <li>Home: who Xensible helps and why</li>
            <li>Projects: one- to two-hour exercises</li>
            <li>Curricula: free and expert training paths</li>
            <li>Resources: maps, cards, notes, and links</li>
          </ul>
        </div>
      </section>

      <section className="section resource-directory-section" aria-labelledby="resource-directory-title">
        <div className="section-heading">
          <p className="eyebrow">Resource directory</p>
          <h2 id="resource-directory-title">Choose the category that matches your question.</h2>
          <p>
            The categories below are intentionally plain. They help visitors
            decide whether they need a mindset shift, a practice exercise, a
            business use map, a challenge, a landscape update, or outside
            reading.
          </p>
        </div>
        <div className="resource-directory-grid">
          {resourceCategories.map(({ title, body, href }) => (
            <a className="resource-directory-card" href={href} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="text-link">
                Jump to section
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section-band resource-mindset-section" id="mindset" aria-labelledby="mindset-title">
        <div className="section-heading centered">
          <p className="eyebrow">The prompting mindset</p>
          <h2 id="mindset-title">Prompting is less about clever wording than clear thinking.</h2>
          <p>
            Xensible teaches prompting as a practical disposition: curious,
            specific, iterative, cautious with data, and willing to review
            before relying.
          </p>
        </div>
        <div className="resource-principle-grid">
          {promptingMindsetPrinciples.map(({ title, body }, index) => (
            <article className="resource-principle-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <PromptingStarterLabSection />

      <section className="section specialty-builder-section" id="specialty-builders" aria-labelledby="specialty-builders-title">
        <div className="section-heading">
          <p className="eyebrow">Specialty AI builders</p>
          <h2 id="specialty-builders-title">Build Gems and similar specialty assistants around repeatable skills.</h2>
          <p>
            Gemini Gems, custom GPTs, Claude Projects-style spaces, Copilot
            agents, and reusable prompt assistants all work best when they are
            narrow, well-instructed, tested with safe examples, and reviewed by
            humans. The point is not to create an all-purpose bot. It is to
            give learners a focused helper for one kind of work.
          </p>
        </div>
        <div className="specialty-builder-grid">
          {specialtyBuilderSteps.map(({ title, body }, index) => (
            <article className="specialty-builder-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="specialty-skill-panel">
          <div className="section-heading">
            <p className="eyebrow">Across many skills</p>
            <h3>Examples of specialty assistants Xensible can teach learners to design.</h3>
            <p>
              Each example below includes the job, the instruction pattern,
              and a safe first test. This keeps the emphasis on fluency,
              judgment, and reusable practice rather than vendor-specific
              magic.
            </p>
          </div>
          <div className="specialty-skill-grid">
            {specialtySkillBuilders.map(({ title, purpose, instruction, safeTest }) => (
              <article className="specialty-skill-card" key={title}>
                <h3>{title}</h3>
                <p>{purpose}</p>
                <div className="activity-detail">
                  <span>Instructions should</span>
                  <p>{instruction}</p>
                </div>
                <div className="activity-detail activity-safe-input">
                  <span>Safe first test</span>
                  <p>{safeTest}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section use-domain-section" id="use-domains" aria-labelledby="use-domains-title">
        <div className="section-heading">
          <p className="eyebrow">Use domains map</p>
          <h2 id="use-domains-title">Where AI can become useful before tool buying begins.</h2>
          <p>
            The best AI value assessment starts with time, attention, and
            neglected work: what people do repeatedly, what they avoid, and
            what would be valuable if it were easier to start.
          </p>
        </div>
        <div className="use-domain-grid">
          {useDomainGroups.map(({ title, body, firstExperiment, watchFor }) => (
            <article className="use-domain-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="activity-detail">
                <span>First experiment</span>
                <p>{firstExperiment}</p>
              </div>
              <div className="activity-detail activity-safe-input">
                <span>Watch for</span>
                <p>{watchFor}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-band practice-challenge-section" id="practice-challenges" aria-labelledby="practice-challenges-title">
        <div className="section-heading centered">
          <p className="eyebrow">Practice challenges</p>
          <h2 id="practice-challenges-title">Challenge-style exercises without the contest pressure.</h2>
          <p>
            These can be used in workshops, office hours, or solo practice.
            Each one has a concrete output and a review moment.
          </p>
        </div>
        <div className="practice-challenge-grid">
          {practiceChallenges.map(({ title, brief, output }) => (
            <article className="practice-challenge-card" key={title}>
              <Sparkles aria-hidden="true" />
              <h3>{title}</h3>
              <p>{brief}</p>
              <div className="activity-detail">
                <span>Output</span>
                <p>{output}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section landscape-note-section" id="landscape-notes" aria-labelledby="landscape-notes-title">
        <div className="section-heading">
          <p className="eyebrow">The prompt-scape</p>
          <h2 id="landscape-notes-title">A calm way to track the AI landscape.</h2>
          <p>
            Tool names change quickly, but the categories below help learners
            notice what matters without chasing every announcement.
          </p>
        </div>
        <div className="landscape-note-grid">
          {landscapeNotes.map(({ title, body }) => (
            <article className="landscape-note-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section monthly-notes-section" id="monthly-notes" aria-labelledby="monthly-notes-title">
        <div className="section-heading centered">
          <p className="eyebrow">Monthly AI fluency notes</p>
          <h2 id="monthly-notes-title">A sustainable alternative to chasing weekly AI news.</h2>
          <p>
            Xensible can use this rhythm in office hours or public updates:
            summarize what changed, what was tried, what needs review, and
            what to practice next.
          </p>
        </div>
        <div className="monthly-note-grid">
          {monthlyFluencyNotes.map(({ title, body }, index) => (
            <article className="monthly-note-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section resource-shelf-section" id="resource-shelf" aria-labelledby="resource-shelf-title">
        <div className="section-heading">
          <p className="eyebrow">Resource shelf</p>
          <h2 id="resource-shelf-title">Curated links for practical AI fluency.</h2>
          <p>
            These links are starting points for learners and teams. Xensible
            emphasizes that outside resources still require human judgment,
            current-source checking, and attention to data boundaries.
          </p>
        </div>
        <div className="resource-shelf-grid">
          {resourceShelfLinks.map(({ label, category, href, body }) => (
            <a className="resource-shelf-card" href={href} key={href} rel="noreferrer" target="_blank">
              <span>{category}</span>
              <h3>{label}</h3>
              <p>{body}</p>
              <span className="text-link">
                Open resource
                <ExternalLink aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function PracticeProjectsPage({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="project-page">
      <section className="info-hero project-hero">
        <div>
          <a
            className="back-link"
            href={siteHref('/')}
            onClick={(event) => navigateToRoute(event, '/')}
          >
            <ArrowLeft aria-hidden="true" />
            Back to home
          </a>
          <p className="eyebrow">Practical AI projects</p>
          <h1>Try a useful AI project before you choose a tool.</h1>
          <p className="hero-copy">
            These one- to two-hour exercises are designed for AI-curious
            individuals who need to feel the utility of AI through real work:
            a clearer decision, a stronger draft, a meeting kit, a research
            plan, or a workflow recipe.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteHref(starterProjectPdfHref)}>
              Download Starter PDF
            </a>
            <a className="button button-secondary" href={bookingHref}>
              Want This Guided Over Zoom?
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="info-hero-panel starter-pdf-panel">
          <p className="eyebrow">Best first project</p>
          <h2>Public Article Learning Kit</h2>
          <p>
            Start with one topic you genuinely want to understand. In about an
            hour, AI can help you produce an explainer, examples, a quiz, a
            glossary, a misconception list, and a claim-check table.
          </p>
          <a className="text-link" href={siteHref(starterProjectPdfHref)}>
            Download the 60-minute worksheet
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <PromptingStarterLabSection />

      <section className="section utility-project-detail-section" aria-labelledby="project-list-title">
        <div className="section-heading">
          <p className="eyebrow">Project menu</p>
          <h2 id="project-list-title">Eight short projects with real walk-away artifacts.</h2>
          <p>
            Pick the project that matches the work a learner already recognizes.
            Each project keeps public-tool safety, review, and human ownership
            built into the exercise.
          </p>
        </div>
        <div className="utility-project-grid utility-project-detail-grid">
          {individualUtilityProjects.map(({ title, timebox, hook, outcome, safeInput, steps, starterPrompt }) => (
            <article className="utility-project-card utility-project-card-detailed" key={title}>
              <span className="project-time">{timebox}</span>
              <h3>{title}</h3>
              <p>{hook}</p>
              <div className="project-outcome">
                <span>Walk-away artifact</span>
                <p>{outcome}</p>
              </div>
              <div className="project-outcome project-safe-input">
                <span>Safe input</span>
                <p>{safeInput}</p>
              </div>
              <ol>
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="prompt-box">
                <span>Starter prompt</span>
                <p>{starterPrompt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section project-rigor-section" aria-labelledby="project-rigor-title">
        <div className="section-heading">
          <p className="eyebrow">How to choose well</p>
          <h2 id="project-rigor-title">A good first AI project is useful, bounded, and reviewable.</h2>
          <p>
            The strongest beginner exercises are not impressive demos. They are
            small pieces of real work where learners can see value, keep safe
            boundaries, and practice judgment before relying on an output.
          </p>
        </div>
        <div className="project-rigor-grid">
          {projectSelectionRubric.map(({ title, body }) => (
            <article className="project-rigor-card" key={title}>
              <CheckCircle2 aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="project-reflection-panel">
          <div>
            <p className="eyebrow">Debrief questions</p>
            <h3>Turn a useful exercise into durable fluency.</h3>
          </div>
          <ul className="project-reflection-list">
            {projectReviewQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-band" aria-labelledby="sector-projects-title">
        <div className="section-heading centered">
          <p className="eyebrow">Sector examples</p>
          <h2 id="sector-projects-title">Concrete first projects for cautious organizations.</h2>
          <p>
            These examples show how the same short-project format can meet
            different learners where they are without asking them to expose
            sensitive information.
          </p>
        </div>
        <div className="sector-example-grid">
          {sectorProjectExamples.map(({ title, audience, body, safeInput }) => (
            <article className="sector-example-card" key={title}>
              <span>{audience}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="project-outcome project-safe-input">
                <span>Safe input</span>
                <p>{safeInput}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section project-conversion-section" aria-labelledby="project-conversion-title">
        <div>
          <p className="eyebrow">Guided version</p>
          <h2 id="project-conversion-title">Want this guided over Zoom for your team?</h2>
          <p>
            A Xensible session can turn these short projects into a warm,
            practical workshop where participants finish with useful artifacts
            and shared habits for safer AI practice.
          </p>
          <p className="contact-insight">
            Good workshop candidates are tasks people already spend time on:
            drafting, planning, meeting prep, research, knowledge cleanup, or
            work they keep postponing because attention is scarce.
          </p>
        </div>
        <a className="button button-primary" href={bookingHref}>
          <Handshake aria-hidden="true" />
          Schedule a Guided Project Session
        </a>
      </section>
    </main>
  )
}

function CurriculumGate({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(
    () => window.sessionStorage.getItem('xensible-curriculum-access') === 'true',
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.trim() === expertPassword) {
      window.sessionStorage.setItem('xensible-curriculum-access', 'true')
      setIsUnlocked(true)
      setError('')
      return
    }

    setError('That password did not work.')
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <main className="protected-page">
      <section className="protected-gate" aria-labelledby="protected-title">
        <div>
          <p className="eyebrow">Expert curriculum tier</p>
          <h1 id="protected-title">Enter the expert access password.</h1>
          <p className="hero-copy">
            The expert tier contains the full curriculum pages, advanced
            package paths, planning notes, and PDF companions. This is a
            lightweight preview gate, not a private client portal, so sensitive
            or paid-exclusive client materials should not live here.
          </p>
        </div>
        <form className="password-panel" onSubmit={handleSubmit}>
          <label htmlFor="curriculum-password">Password</label>
          <input
            id="curriculum-password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
          {error && <p className="form-error">{error}</p>}
          <button className="button button-primary" type="submit">
            <ShieldCheck aria-hidden="true" />
            Unlock Expert Tier
          </button>
        </form>
      </section>
    </main>
  )
}

function AiUsesToolsPage({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="info-page">
      <section className="info-hero">
        <div>
          <a
            className="back-link"
            href={siteHref('/')}
            onClick={(event) => navigateToRoute(event, '/')}
          >
            <ArrowLeft aria-hidden="true" />
            Back to home
          </a>
          <p className="eyebrow">Public AI map</p>
          <h1>AI uses and tool classes for the AI-curious.</h1>
          <p className="hero-copy">
            These public infographics help visitors see practical AI uses they
            may not have considered and understand the current tool landscape
            by utility class rather than hype.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={bookingHref}>
              <CalendarDays aria-hidden="true" />
              Discuss Team Training
            </a>
            <a
              className="button button-secondary"
              href={siteHref('/curricula/free')}
              onClick={(event) => navigateToRoute(event, '/curricula/free')}
            >
              Free Starter Curriculum
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="info-hero-panel">
          <p className="eyebrow">How to use this page</p>
          <p>
            Start with a work need, choose a low-risk experiment, and keep
            human review visible. Tool names change quickly; judgment and
            workflow fit matter more than the newest announcement.
          </p>
        </div>
      </section>

      <section className="section info-visual-section" aria-labelledby="public-visuals-title">
        <div className="section-heading">
          <p className="eyebrow">Public infographics</p>
          <h2 id="public-visuals-title">Two maps for practical AI curiosity.</h2>
          <p>
            The images are designed for quick public sharing, while the HTML
            lists below keep the same ideas accessible and easy to scan.
          </p>
        </div>
        <div className="info-visual-grid">
          {publicInfoVisuals.map(({ title, body, image, fullImage, alt, elements }) => (
            <article className="info-image-card" key={title}>
              <div className="info-image-frame">
                <picture>
                  <source srcSet={siteHref(image)} type="image/webp" />
                  <img src={siteHref(fullImage)} alt={alt} />
                </picture>
              </div>
              <details className="info-image-details">
                <summary>What this image is showing</summary>
                <ul className="info-image-details-list">
                  {elements.map(({ label, text }) => (
                    <li key={label}>
                      <strong>{label}</strong>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="info-image-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-band" aria-labelledby="uses-list-title">
        <div className="section-heading centered">
          <p className="eyebrow">Use domains map</p>
          <h2 id="uses-list-title">Start with the work before choosing the tool.</h2>
          <p>
            These domains help teams look for practical value in the work
            they already do, the work they postpone, and the questions they
            need to understand before buying technology.
          </p>
        </div>
        <div className="use-domain-grid">
          {useDomainGroups.map(({ title, body, firstExperiment, watchFor }) => (
            <article className="use-domain-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="activity-detail">
                <span>First experiment</span>
                <p>{firstExperiment}</p>
              </div>
              <div className="activity-detail activity-safe-input">
                <span>Watch for</span>
                <p>{watchFor}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="starter-uses-title">
        <div className="section-heading">
          <p className="eyebrow">Starter uses to consider</p>
          <h2 id="starter-uses-title">Safe places to begin with public, fictional, or anonymized examples.</h2>
        </div>
        <div className="info-list-grid">
          {aiUseIdeas.map(({ title, body }, index) => (
            <article className="info-mini-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="tool-classes-title">
        <div className="section-heading">
          <p className="eyebrow">Tool utility classes</p>
          <h2 id="tool-classes-title">Think in classes before choosing products.</h2>
          <p>
            Examples reflect the current public AI landscape, but the durable
            habit is matching the tool class to the work, the data boundary,
            and the review burden.
          </p>
        </div>
        <div className="tool-class-grid">
          {toolUtilityClasses.map(({ title, examples, body }) => (
            <article className="tool-class-card" key={title}>
              <h3>{title}</h3>
              <span>{examples}</span>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section info-sources-section" aria-labelledby="sources-title">
        <div className="section-heading">
          <p className="eyebrow">Source check</p>
          <h2 id="sources-title">Tool examples should be refreshed over time.</h2>
          <p>
            The categories are intentionally more important than the product
            list. These public product pages are useful starting points for a
            periodic refresh.
          </p>
        </div>
        <div className="source-link-grid">
          {toolMapSources.map(({ label, href }) => (
            <a className="source-link-card" href={href} key={href} rel="noreferrer" target="_blank">
              <ExternalLink aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function CurriculumPage({
  curriculum,
  isFreeCurriculum,
  isHub,
  navigateToRoute,
}: {
  curriculum?: CurriculumContent
  isFreeCurriculum: boolean
  isHub: boolean
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  if (isHub) {
    return <CurriculumTierHub navigateToRoute={navigateToRoute} />
  }

  if (isFreeCurriculum) {
    return (
      <CurriculumDetail
        backHref="/curricula"
        backLabel="Back to curriculum tiers"
        curriculum={freeCurriculum}
        tierLabel="Free tier"
        navigateToRoute={navigateToRoute}
      />
    )
  }

  return (
    <CurriculumGate>
      {curriculum ? (
        <CurriculumDetail
          backHref="/curricula/expert"
          backLabel="Back to expert library"
          curriculum={curriculum}
          tierLabel="Expert tier"
          navigateToRoute={navigateToRoute}
        />
      ) : (
        <ExpertCurriculumLibrary navigateToRoute={navigateToRoute} />
      )}
    </CurriculumGate>
  )
}

function CurriculumTierHub({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="curriculum-page">
      <section className="curriculum-hero curriculum-tier-hero">
        <div>
          <p className="eyebrow">Curriculum tiers</p>
          <h1>Choose the right level of AI fluency support.</h1>
          <p className="hero-copy">
            The free tier gives learners a clear public starting point. The
            expert tier contains the deeper Xensible curriculum library for
            workshops, coaching, PDF companions, and advanced operator training.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="tier-grid">
          {curriculumTiers.map(({ slug, title, eyebrow, summary, href, cta, access, icon: Icon }) => (
            <a
              className={`tier-card tier-card-${slug}`}
              href={siteHref(href)}
              key={slug}
              onClick={(event) => navigateToRoute(event, href)}
            >
              <span className="service-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="curriculum-kicker">{eyebrow}</span>
              <h2>{title}</h2>
              <p>{summary}</p>
              <span className="tier-access">{access}</span>
              <span className="text-link">
                {cta}
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function ExpertCurriculumLibrary({
  navigateToRoute,
}: {
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  return (
    <main className="curriculum-page">
      <section className="curriculum-hero">
        <div>
          <a
            className="back-link"
            href={siteHref('/curricula')}
            onClick={(event) => navigateToRoute(event, '/curricula')}
          >
            <ArrowLeft aria-hidden="true" />
            Back to curriculum tiers
          </a>
          <p className="eyebrow">Expert curriculum library</p>
          <h1>Six deeper paths for AI fluency training.</h1>
          <p className="hero-copy">
            These expert outlines are the working curriculum base for
            Xensible web pages, Zoom sessions, worksheets, advanced coaching,
            and PDF companions. The password gate is for preview access only;
            it is not a secure repository for sensitive client material.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="curriculum-library-grid">
          {curriculumPackages.map(({ slug, title, eyebrow, summary, icon: Icon, pdfHref }) => (
            <article className="curriculum-library-card" key={slug}>
              <span className="service-icon">
                <Icon aria-hidden="true" />
              </span>
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{summary}</p>
              <div className="curriculum-actions">
                <a
                  className="button button-primary"
                  href={siteHref(`/curricula/expert/${slug}`)}
                  onClick={(event) => navigateToRoute(event, `/curricula/expert/${slug}`)}
                >
                  View Webpage
                </a>
                <a className="button button-secondary" href={siteHref(pdfHref)}>
                  PDF Companion
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function CurriculumDetail({
  backHref,
  backLabel,
  curriculum,
  tierLabel,
  navigateToRoute,
}: {
  backHref: string
  backLabel: string
  curriculum: CurriculumContent
  tierLabel: string
  navigateToRoute: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void
}) {
  const Icon = curriculum.icon

  return (
    <main className="curriculum-page">
      <section className="curriculum-hero">
        <div>
          <a
            className="back-link"
            href={siteHref(backHref)}
            onClick={(event) => navigateToRoute(event, backHref)}
          >
            <ArrowLeft aria-hidden="true" />
            {backLabel}
          </a>
          <p className="eyebrow">{tierLabel} / {curriculum.eyebrow}</p>
          <h1>{curriculum.title}</h1>
          <p className="hero-copy">{curriculum.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={bookingHref}>
              <CalendarDays aria-hidden="true" />
              Discuss This Curriculum
            </a>
            <a className="button button-secondary" href={siteHref(curriculum.pdfHref)}>
              PDF Companion
            </a>
          </div>
        </div>
        <div className="curriculum-hero-panel">
          <span className="service-icon">
            <Icon aria-hidden="true" />
          </span>
          <h2>Format</h2>
          <p>{curriculum.format}</p>
          <h2>Level</h2>
          <p>{curriculum.level}</p>
          <h2>Audience</h2>
          <p>{curriculum.audience}</p>
        </div>
      </section>

      <section className="section curriculum-detail-grid">
        <div className="detail-panel">
          <p className="eyebrow">Learner outcomes</p>
          <ul className="offer-list">
            {curriculum.outcomes.map((outcome) => (
              <li key={outcome}>
                <CheckCircle2 aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-panel">
          <p className="eyebrow">Materials to develop</p>
          <ul className="offer-list">
            {curriculum.materials.map((material) => (
              <li key={material}>
                <ClipboardCheck aria-hidden="true" />
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section curriculum-detail-grid curriculum-questions-section">
        <div className="detail-panel">
          <p className="eyebrow">Guiding questions</p>
          <ul className="offer-list">
            {curriculum.guidingQuestions.map((question) => (
              <li key={question}>
                <MessageCircle aria-hidden="true" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-panel">
          <p className="eyebrow">Readiness checks</p>
          <ul className="offer-list">
            {curriculum.readinessChecks.map((check) => (
              <li key={check}>
                <SearchCheck aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-band">
        <div className="section-heading centered">
          <p className="eyebrow">Curriculum modules</p>
          <h2>Session blocks that can become webpages, workshops, and PDFs.</h2>
        </div>
        <div className="module-grid">
          {curriculum.modules.map(({ title, body }, index) => (
            <article className="module-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <PromptingStarterLabSection />

      <section className="section adoption-practices-section">
        <div className="section-heading centered">
          <p className="eyebrow">Adoption practices</p>
          <h2>Research-backed habits for applying AI without skipping judgment.</h2>
        </div>
        <div className="adoption-practice-grid">
          {curriculum.adoptionPractices.map((practice, index) => (
            <article className="adoption-practice-card" key={practice}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{practice}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section curriculum-flow-section">
        <div className="section-heading">
          <p className="eyebrow">Session flow</p>
          <h2>How this level moves from understanding to practice.</h2>
        </div>
        <div className="curriculum-flow-grid">
          {curriculum.sessionFlow.map(({ title, body }, index) => (
            <article className="flow-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-band">
        <div className="section-heading centered">
          <p className="eyebrow">Practice labs</p>
          <h2>Exercises that produce artifacts, review habits, and reusable patterns.</h2>
        </div>
        <div className="practice-lab-grid">
          {curriculum.practiceLabs.map(({ title, artifact, safeInput, steps, review }) => (
            <article className="practice-lab-card" key={title}>
              <ClipboardCheck aria-hidden="true" />
              <h3>{title}</h3>
              <div className="lab-detail">
                <span>Build</span>
                <p>{artifact}</p>
              </div>
              <div className="lab-detail lab-safe-input">
                <span>Use</span>
                <p>{safeInput}</p>
              </div>
              <ol className="lab-step-list">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="lab-detail lab-review">
                <span>Check</span>
                <p>{review}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section utility-project-detail-section">
        <div className="section-heading">
          <p className="eyebrow">1-2 hour utility projects</p>
          <h2>Short projects that let individuals feel AI's practical power.</h2>
          <p>
            These projects are designed for a Zoom session, homework sprint, or
            individual coaching assignment. Each one produces a usable artifact
            while reinforcing safe inputs, review habits, and human ownership.
          </p>
        </div>
        <div className="utility-project-grid utility-project-detail-grid">
          {individualUtilityProjects.map(({ title, timebox, hook, outcome, safeInput, steps, starterPrompt }) => (
            <article className="utility-project-card utility-project-card-detailed" key={title}>
              <span className="project-time">{timebox}</span>
              <h3>{title}</h3>
              <p>{hook}</p>
              <div className="project-outcome">
                <span>Walk-away artifact</span>
                <p>{outcome}</p>
              </div>
              <div className="project-outcome project-safe-input">
                <span>Safe input</span>
                <p>{safeInput}</p>
              </div>
              <ol>
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="prompt-box">
                <span>Starter prompt</span>
                <p>{starterPrompt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section curriculum-case-section">
        <div className="section-heading">
          <p className="eyebrow">Tangible cases</p>
          <h2>Realistic scenarios for practice without risky data.</h2>
        </div>
        <div className="case-grid">
          {curriculum.tangibleCases.map(({ title, situation, learnerTask, prompt }) => (
            <article className="case-card" key={title}>
              <Lightbulb aria-hidden="true" />
              <h3>{title}</h3>
              <p>{situation}</p>
              <div className="case-task">
                <span>Learner task</span>
                <p>{learnerTask}</p>
              </div>
              <div className="prompt-box">
                <span>Starter prompt</span>
                <p>{prompt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-band prompt-library-section">
        <div className="section-heading centered">
          <p className="eyebrow">Prompt library</p>
          <h2>Reusable prompts connected to this level.</h2>
        </div>
        <div className="prompt-grid">
          {curriculum.promptLibrary.map(({ title, prompt }) => (
            <article className="prompt-card" key={title}>
              <Sparkles aria-hidden="true" />
              <h3>{title}</h3>
              <p>{prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section diagram-planning-section">
        <div className="section-heading">
          <p className="eyebrow">Diagram candidates</p>
          <h2>Visuals to define before production.</h2>
          <p>
            These are the first strong diagram locations. The final diagrams
            should be parameterized before they are drawn so the visuals match
            your teaching style and the audience level.
          </p>
        </div>
        <div className="diagram-slot-list">
          {curriculum.diagramSlots.map((slot) => (
            <article className="diagram-slot" key={slot}>
              <Map aria-hidden="true" />
              <p>{slot}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section curriculum-follow-up-section">
        <div className="section-heading">
          <p className="eyebrow">Follow-up work</p>
          <h2>What learners do after the session.</h2>
        </div>
        <div className="reason-list">
          {curriculum.followUp.map((item) => (
            <div className="reason-item" key={item}>
              <ArrowRight aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function OfferPage({
  offer,
}: {
  offer: (typeof offerFormats)[number]
}) {
  const Icon = offer.icon

  return (
    <main id="top" className="offer-page">
      <section className="offer-hero">
        <div className="offer-hero-copy">
          <a className="back-link" href={siteHref('/#offer-formats')}>
            <ArrowLeft aria-hidden="true" />
            Back to ways to start
          </a>
          <p className="eyebrow">{offer.eyebrow}</p>
          <h1>{offer.title}</h1>
          <p className="hero-copy">{offer.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={bookingHref}>
              <CalendarDays aria-hidden="true" />
              {offer.cta}
            </a>
            <a className="button button-secondary" href={siteHref('/#services')}>
              See all services
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="offer-hero-panel" aria-hidden="true">
          <div className="guide-compass">
            <Icon />
          </div>
          <p>Remote-first Zoom session</p>
          <p>Customized to your team, leaders, or professional context</p>
        </div>
      </section>

      <section className="section offer-detail-section">
        <div className="detail-panel">
          <p className="eyebrow">Best for</p>
          <ul className="offer-list">
            {offer.bestFor.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-panel">
          <p className="eyebrow">Outcomes</p>
          <ul className="offer-list">
            {offer.outcomes.map((item) => (
              <li key={item}>
                <ClipboardCheck aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-band">
        <div className="section-heading centered">
          <p className="eyebrow">Session flow</p>
          <h2>A clear Zoom format with room for real questions.</h2>
        </div>
        <div className="process-grid">
          {offer.flow.map(({ step, body }, index) => (
            <article className="process-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Start with a short Zoom consultation.</h2>
          <p>
            We will clarify your goals, audience, and comfort level, then choose
            the right training format.
          </p>
          <p className="contact-insight">
            The most useful starting point is a map of where your workday
            actually goes and which valuable tasks keep slipping out of reach.
            From there, AI training can focus on practical value instead of
            abstract possibility.
          </p>
        </div>
        <a className="button button-primary" href={bookingHref}>
          <Handshake aria-hidden="true" />
          Schedule an AI Fluency Call
        </a>
      </section>
    </main>
  )
}

export default App
