import type { ComponentType, FormEvent, MouseEvent, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
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
  practiceLabs: Array<{ title: string; body: string }>
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
    title: 'Learning Sprint',
    timebox: '60-75 minutes',
    hook: 'Turn a confusing topic into a private tutor session.',
    outcome:
      'A one-page explainer, a short quiz, a glossary, and a list of what to verify elsewhere.',
    safeInput:
      'Use a public topic, a public article, or a concept you want to understand. Avoid private client, patient, employee, or proprietary material.',
    steps: [
      'Ask for a plain-language explanation at your current level.',
      'Request examples, analogies, common misconceptions, and a five-question quiz.',
      'Ask what claims need source checking before you rely on them.',
    ],
    starterPrompt:
      'Teach me [topic] as a smart beginner. Start with a plain-language explanation, then give examples, common misconceptions, a short glossary, a five-question quiz, and a list of claims I should verify with reliable sources.',
  },
  {
    title: 'Decision Clarity Brief',
    timebox: '75-90 minutes',
    hook: 'Use AI to make a decision easier to think about without outsourcing the decision.',
    outcome:
      'A comparison table, assumptions list, pre-mortem, missing-information checklist, and final decision questions.',
    safeInput:
      'Use a personal, public, fictional, or sanitized decision. Keep confidential finances, contracts, medical, legal, or customer details out of public tools.',
    steps: [
      'Describe the options, constraints, values, and what would count as success.',
      'Ask AI to compare options and surface assumptions instead of choosing for you.',
      'Run a pre-mortem and identify what a human should check before acting.',
    ],
    starterPrompt:
      'Help me think through this decision without deciding for me: [safe decision context]. Create criteria, compare options, name assumptions, run a pre-mortem, list missing information, and end with questions I should answer myself.',
  },
  {
    title: 'Meeting Prep Kit',
    timebox: '60-90 minutes',
    hook: 'Turn a rough meeting idea into a more useful conversation.',
    outcome:
      'A meeting agenda, prep questions, likely tensions, decision points, and a follow-up email template.',
    safeInput:
      'Use fictional or sanitized meeting context. Do not paste private attendee notes, personnel details, patient data, customer records, or proprietary plans into public tools.',
    steps: [
      'Give AI the purpose, audience, desired outcome, and any safe background.',
      'Ask for an agenda, questions, risks, and decisions to clarify.',
      'Revise the agenda for tone, time, and who needs to review it.',
    ],
    starterPrompt:
      'Using this fictional or sanitized meeting context, create a focused agenda, prep questions, likely tensions, decision points, and a follow-up email template. Mark anything that needs human confirmation: [context].',
  },
  {
    title: 'Writing Upgrade Studio',
    timebox: '60 minutes',
    hook: 'See how AI can draft, critique, and revise with you in a loop.',
    outcome:
      'A stronger email, memo, bio, announcement, or short article with a revision history and review checklist.',
    safeInput:
      'Use a rough draft that contains no sensitive personal, client, patient, employee, legal, financial, or proprietary details.',
    steps: [
      'Ask for a first rewrite for a specific audience and tone.',
      'Ask AI to critique its own draft for clarity, claims, tone, and missing context.',
      'Request a final revision and make the last edits yourself.',
    ],
    starterPrompt:
      'Improve this rough draft for [audience] with a [tone] tone. Then critique your revision for clarity, unsupported claims, missing context, and anything a human should verify before sending: [safe draft].',
  },
  {
    title: 'Research Compass',
    timebox: '90-120 minutes',
    hook: 'Use AI to plan research before you read, search, or cite.',
    outcome:
      'A research question map, search terms, source categories, red flags, and verification plan.',
    safeInput:
      'Use a public topic or general business question. Do not ask AI to invent citations or make final claims without sources.',
    steps: [
      'Ask AI to turn a broad topic into better questions and search terms.',
      'Request source categories, possible biases, and missing perspectives.',
      'Use the output as a reading plan, then verify claims in actual sources.',
    ],
    starterPrompt:
      'Help me plan research on [public topic]. Create key questions, search terms, source types to seek, likely blind spots, red flags, and a verification checklist. Do not make final claims without sources.',
  },
  {
    title: 'Workflow Recipe Builder',
    timebox: '90-120 minutes',
    hook: 'Turn one repeated task into a reusable AI-assisted workflow.',
    outcome:
      'A workflow recipe with inputs, prompt sequence, review gates, human owner, and when-not-to-use guidance.',
    safeInput:
      'Choose a recurring task and describe it generally or with fictional examples. Keep sensitive operational data out of public tools.',
    steps: [
      'Map the task into steps, inputs, outputs, review points, and handoffs.',
      'Ask AI where it can help and where human judgment should stay in charge.',
      'Create a repeatable prompt sequence and a review checklist.',
    ],
    starterPrompt:
      'Turn this recurring task into a safe AI-assisted workflow recipe: [task]. Include purpose, safe inputs, prompt sequence, review checkpoints, human decision points, risks, and when not to use AI for this task.',
  },
  {
    title: 'Professional Profile Refresh',
    timebox: '75-90 minutes',
    hook: 'Use AI as a coach for describing your work more clearly.',
    outcome:
      'A refreshed bio, resume bullet options, interview talking points, and confidence-building practice questions.',
    safeInput:
      'Use a sanitized career summary or fictionalized role description. Do not include private employer data, references, compensation, or confidential projects.',
    steps: [
      'Give AI a safe summary of your work, audience, and desired tone.',
      'Ask for clearer positioning, bullet options, and examples of evidence to add.',
      'Roleplay interview questions and revise anything that feels inflated or inaccurate.',
    ],
    starterPrompt:
      'Using this sanitized professional summary, help me describe my work more clearly. Draft a short bio, five resume bullet options, three interview talking points, and questions I should answer to make the claims more accurate: [summary].',
  },
  {
    title: 'Personal Planning Co-Pilot',
    timebox: '60-75 minutes',
    hook: 'Use AI to turn vague goals into a realistic plan you can actually follow.',
    outcome:
      'A one-week plan, prioritized task list, obstacle plan, review ritual, and next-action checklist.',
    safeInput:
      'Use personal goals and constraints that are not private, medical, financial, legal, or deeply sensitive.',
    steps: [
      'Describe the goal, constraints, time available, and what has made it hard.',
      'Ask AI for a practical plan with tradeoffs and small next actions.',
      'Review the plan yourself and remove anything unrealistic or intrusive.',
    ],
    starterPrompt:
      'Help me turn this goal into a realistic one-week plan: [safe goal]. Ask clarifying questions if needed, then create priorities, daily actions, likely obstacles, a review ritual, and a simple checklist.',
  },
]

const starterProjectPdfHref = '/curriculum-pdfs/first-60-minute-ai-utility-project.pdf'

const sectorProjectExamples: SectorProjectExample[] = [
  {
    title: 'Nonprofit donor update practice',
    audience: 'Nonprofits',
    body:
      'Turn public program facts and fictional event notes into a warm update, then check claims, tone, and what a staff member must verify.',
    safeInput:
      'Use public facts, fictional event notes, and no donor records or private beneficiary details.',
  },
  {
    title: 'Health care admin FAQ rewrite',
    audience: 'Health care organizations',
    body:
      'Rewrite a fictional clinic FAQ for clarity while flagging anything that belongs with the appropriate internal owner.',
    safeInput:
      'Use fictional FAQ text only. Do not include patient data or ask AI for medical, legal, compliance, or cybersecurity assurances.',
  },
  {
    title: 'Small business meeting follow-up',
    audience: 'Small businesses',
    body:
      'Convert sanitized meeting context into decisions, action items, owner questions, and a follow-up email draft.',
    safeInput:
      'Use sanitized or fictional notes, not customer records, employee issues, contracts, or proprietary plans.',
  },
  {
    title: 'Professional profile refresh',
    audience: 'Individual professionals',
    body:
      'Use AI as a positioning coach for a short bio, resume bullets, interview talking points, and practice questions.',
    safeInput:
      'Use a sanitized career summary with no private employer data, references, compensation, or confidential projects.',
  },
  {
    title: 'Department knowledge cleanup',
    audience: 'Teams and departments',
    body:
      'Turn a public or sanitized process description into a clearer checklist, glossary, and questions for the process owner.',
    safeInput:
      'Use public or sanitized process text. Keep private operational data, credentials, and proprietary details out.',
  },
  {
    title: 'Personal learning sprint',
    audience: 'AI-curious beginners',
    body:
      'Transform a confusing topic into an explainer, examples, quiz, glossary, and verification checklist.',
    safeInput:
      'Use public topics or articles and verify important claims with reliable sources before relying on them.',
  },
]

const projectSelectionRubric = [
  {
    title: 'Real work, low risk',
    body:
      'Choose a task people already recognize, but keep inputs public, fictional, or sanitized so practice does not depend on sensitive data.',
  },
  {
    title: 'Clear walk-away artifact',
    body:
      'The exercise should produce something concrete: a brief, agenda, checklist, glossary, comparison table, or reusable prompt sequence.',
  },
  {
    title: 'Visible judgment step',
    body:
      'Build in a moment where the learner checks claims, names uncertainty, revises tone, or decides what should remain human-led.',
  },
  {
    title: 'Transferable habit',
    body:
      'A strong project teaches a pattern the learner can reuse later: ask better questions, provide context, compare outputs, or verify before relying.',
  },
]

const projectReviewQuestions = [
  'What did AI make easier, faster, clearer, or more complete?',
  'Where did the output sound confident but still need verification?',
  'What context improved the result most?',
  'What information should never be pasted into a public tool?',
  'What part of the work should remain owned by a person?',
  'What small workflow would be worth practicing again next week?',
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
      title: 'Rewrite a neutral paragraph',
      body: 'Practice asking for tone and audience changes using public, non-sensitive text.',
    },
    {
      title: 'Summarize public information',
      body: 'Turn a public article or generic meeting note into a summary, then identify what still needs verification.',
    },
    {
      title: 'Plan a simple task',
      body: 'Ask AI for a checklist, timeline, or agenda, then revise it to fit real constraints.',
    },
    {
      title: 'Critique the output',
      body: 'Use a review prompt to find weak assumptions, vague wording, and missing context.',
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
    'Basic prompting loop worksheet',
    'Public-tool safety checklist',
    'Output review checklist',
    'First safe workflow practice log',
  ],
  diagramSlots: [
    'Beginner LLM session loop: ask, inspect, revise, verify',
    'Safe practice boundary map for public AI tools',
    'First workflow chooser: draft, summarize, plan, or critique',
    'Responsible adoption loop: learn, practice, review, apply',
  ],
  followUp: [
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
        'Use AI to summarize the text, then mark which claims still need source checking before sharing.',
      prompt:
        'Summarize the following public text for a beginner. Give me five key points, three terms to define, and a short list of claims I should verify before I rely on the summary: [paste public text].',
    },
    {
      title: 'Fictional email draft',
      situation:
        'A professional wants to practice drafting an email without using client, patient, employee, or proprietary details.',
      learnerTask:
        'Draft from a fictional scenario, revise tone, and decide what a human should edit before sending.',
      prompt:
        'Using this fictional scenario, draft a warm professional email. Keep it concise, avoid promises, and include a checklist of details a human should confirm before sending: [fictional scenario].',
    },
    {
      title: 'First practice plan',
      situation:
        'A curious learner needs a low-pressure way to keep practicing after the starter session.',
      learnerTask:
        'Choose one safe weekly task, define boundaries, and keep a short log of useful and unreliable outputs.',
      prompt:
        'Help me design a one-week AI practice plan using only public or fictional information. Include one task per day, a safety reminder, and a simple log format for what worked, what failed, and what I checked.',
    },
  ],
  promptLibrary: [
    {
      title: 'Plain-language explanation',
      prompt:
        'Explain [AI concept] for a smart beginner. Use an everyday analogy, name two useful applications, and name two reasons I should not overtrust the output.',
    },
    {
      title: 'Starter prompt builder',
      prompt:
        'Turn my rough request into a stronger prompt. Ask me for missing context first. Then produce a prompt with task, audience, context, constraints, and review criteria.',
    },
    {
      title: 'Output review',
      prompt:
        'Review this AI-generated draft. Identify unsupported claims, vague wording, missing context, possible bias, tone problems, and anything that needs human verification: [draft].',
    },
    {
      title: 'Safe practice chooser',
      prompt:
        'Given these possible practice tasks, sort them into safe public practice, use caution, and do not use in a public tool. Explain the reason for each category: [task list].',
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
        title: 'Prompt anatomy lab',
        body: 'Rewrite a weak prompt into a stronger one by adding role, task, context, audience, constraints, and success criteria.',
      },
      {
        title: 'Output comparison',
        body: 'Compare two model responses and identify which is more useful, what is missing, and what should be checked.',
      },
      {
        title: 'Data-boundary sorting',
        body: 'Sort example inputs into safe public practice, caution, and private-data categories.',
      },
      {
        title: 'Revision ladder',
        body: 'Practice moving from first draft to better draft through critique, constraint, and audience-shift prompts.',
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
      'Prompt pattern quick sheet',
      'Sensitive-data boundary checklist',
      'Output review checklist',
      'Team language and norms worksheet',
    ],
    diagramSlots: [
      'LLM session loop: prompt, context, output, review, revision',
      'Safe-data boundary map for public AI tools',
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
          'Create a shared glossary and test it against everyday examples so the group can discuss AI without confusion.',
        prompt:
          'Create a plain-language glossary for a team learning AI. Define prompt, context, output, hallucination, review, sensitive data, and human judgment. For each term, give a workplace example and a common misconception.',
      },
      {
        title: 'Nonprofit communications draft',
        situation:
          'A nonprofit team wants to draft a donor update from public program facts and a fictional event recap.',
        learnerTask:
          'Practice drafting, audience adaptation, and review without using donor records or private beneficiary details.',
        prompt:
          'Draft a donor update using only the public facts and fictional event notes below. Make it warm, specific, and modest. Then list what a staff member should verify before sending: [public facts and fictional notes].',
      },
      {
        title: 'Healthcare admin FAQ practice',
        situation:
          'A cautious health care admin team wants AI practice that does not involve patient information.',
        learnerTask:
          'Use a fictional policy FAQ to practice summarizing, tone adjustment, and boundary setting.',
        prompt:
          'Using this fictional clinic FAQ, rewrite the answer for a general audience. Do not add medical advice. Flag anything that should be reviewed by the appropriate internal owner before publication: [fictional FAQ].',
      },
    ],
    promptLibrary: [
      {
        title: 'Team baseline',
        prompt:
          'Ask five questions that help a mixed-comfort team describe what they know about AI, what worries them, and what they want to learn. Keep the questions nontechnical and practical.',
      },
      {
        title: 'Prompt anatomy',
        prompt:
          'Rewrite this vague prompt into a stronger one with role, task, audience, context, constraints, examples, and success criteria. Explain what changed and why: [rough prompt].',
      },
      {
        title: 'Output comparison',
        prompt:
          'Compare these two AI outputs. Which is more useful, more accurate, clearer, and safer to use? Name what still needs human review before either one is applied: [output A] [output B].',
      },
      {
        title: 'Boundary sort',
        prompt:
          'Sort these example inputs into safe public practice, caution, and do not paste into public AI tools. Give a short reason for each decision: [example inputs].',
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
    ],
    guidingQuestions: [
      'Which tasks repeat often enough to deserve a workflow?',
      'Where can AI help without becoming the decision maker?',
      'What inputs are safe to use, and what must be abstracted or withheld?',
      'How will we review, revise, and document the workflow so others can use it?',
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
        title: 'Writing workflow',
        body: 'Draft, critique, revise, and audience-tune a neutral document while keeping the human responsible for final voice and claims.',
      },
      {
        title: 'Meeting workflow',
        body: 'Generate an agenda, prep questions, follow-up notes, and action-item drafts from fictional or sanitized scenarios.',
      },
      {
        title: 'Research triage workflow',
        body: 'Use AI for question planning and source-triage support, then separate what must be verified elsewhere.',
      },
      {
        title: 'Decision-support workflow',
        body: 'Compare options, surface assumptions, and draft decision criteria without outsourcing the decision itself.',
      },
    ],
    readinessChecks: [
      'The workflow has a named owner and a clear final human decision point.',
      'Inputs avoid sensitive or proprietary data unless a suitable private environment is approved.',
      'The workflow includes a review step for accuracy, tone, assumptions, and missing context.',
      'The team can explain when the workflow is useful and when it should not be used.',
    ],
    adoptionPractices: [
      'Prioritize recurring tasks that consume real time or create repeated rework, not flashy demos.',
      'Break each workflow into inputs, AI assistance, review checkpoints, handoffs, and final ownership.',
      'Measure usefulness in time saved, quality improved, rework reduced, and review burden created.',
      'Document the workflow recipe so a useful experiment can become a teachable team practice.',
    ],
    materials: [
      'Workflow recipe cards',
      'Meeting preparation worksheet',
      'Research triage checklist',
      'Before-and-after prompt examples',
      'Workflow documentation template',
      'Human review checkpoint guide',
    ],
    diagramSlots: [
      'Human-in-the-loop workflow map',
      'Meeting-to-action pipeline',
      'Workflow recipe anatomy: inputs, AI assist, review, apply',
    ],
    followUp: [
      'Pilot one documented workflow for two weeks using safe inputs.',
      'Track where the workflow saves time, improves quality, or creates review burden.',
      'Bring one workflow back for refinement before scaling it to a broader team.',
    ],
    tangibleCases: [
      {
        title: 'Meeting-to-action workflow',
        situation:
          'A team loses momentum after meetings because notes, decisions, and follow-up messages are inconsistent.',
        learnerTask:
          'Use fictional meeting notes to create an agenda, decision summary, action list, and follow-up draft.',
        prompt:
          'Using these fictional meeting notes, create a concise decision summary, action-item table, and follow-up email draft. Mark anything that requires human confirmation before sending: [fictional notes].',
      },
      {
        title: 'Policy explainer rewrite',
        situation:
          'A department has a dense internal policy that staff struggle to understand.',
        learnerTask:
          'Rewrite a public or sanitized policy excerpt into clearer language, then review for missing nuance.',
        prompt:
          'Rewrite this public or sanitized policy excerpt for busy staff. Keep the meaning intact, define jargon, list what changed, and identify any part that should be reviewed by the policy owner: [excerpt].',
      },
      {
        title: 'Research question map',
        situation:
          'A professional needs to explore an unfamiliar topic before deciding what sources to read.',
        learnerTask:
          'Use AI to generate research questions, search terms, source categories, and verification steps.',
        prompt:
          'Help me plan research on [topic]. Give me key questions, useful search terms, source types to look for, likely blind spots, and a verification checklist. Do not make final claims without sources.',
      },
    ],
    promptLibrary: [
      {
        title: 'Workflow recipe',
        prompt:
          'Turn this recurring task into an AI-assisted workflow recipe. Include purpose, safe inputs, prompt sequence, review checkpoints, human decision points, and when not to use the workflow: [task].',
      },
      {
        title: 'Draft and critique',
        prompt:
          'Create a first draft for [audience] using the safe context below. Then critique your own draft for clarity, tone, unsupported claims, missing context, and review needs: [safe context].',
      },
      {
        title: 'Meeting preparation',
        prompt:
          'Using this fictional meeting context, create an agenda, prep questions, risks to discuss, and a follow-up template. Keep all assumptions visible: [fictional context].',
      },
      {
        title: 'Decision support',
        prompt:
          'Compare these options without choosing for me. Create criteria, pros and cons, assumptions, missing information, and questions a human decision maker should answer: [options].',
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
        title: 'Friction mapping',
        body: 'Identify where teams lose time to drafting, summarizing, searching, rework, planning, or coordination.',
      },
      {
        title: 'Use-case card sorting',
        body: 'Turn vague AI ideas into comparable cards with audience, input, output, review, and risk fields.',
      },
      {
        title: 'Value-risk matrix',
        body: 'Place candidate use cases on the grid and discuss what belongs in training, pilot, wait, or avoid.',
      },
      {
        title: 'Readiness narrative',
        body: 'Draft a plain-language summary leaders can use to explain the next step without overpromising.',
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
          'Map the workflow, identify safe practice points, and decide which steps are training candidates rather than automation projects.',
        prompt:
          'Analyze this fictional nonprofit intake workflow. Identify friction points, possible AI training opportunities, data sensitivity concerns, review needs, and whether each idea belongs in train, pilot, wait, or avoid: [fictional workflow].',
      },
      {
        title: 'Clinic admin documentation',
        situation:
          'A health care organization wants to improve admin templates but is cautious about patient privacy and medical claims.',
        learnerTask:
          'Separate generic documentation practice from anything requiring internal privacy, clinical, legal, or compliance owners.',
        prompt:
          'Given this fictional clinic admin workflow, list low-risk AI training ideas, items that require private systems or internal approval, and items to avoid. Do not provide medical, legal, compliance, or cybersecurity assurances: [fictional workflow].',
      },
      {
        title: 'Customer support knowledge gaps',
        situation:
          'A small company has scattered public FAQ pages and repeated support questions.',
        learnerTask:
          'Score possible use cases by value, risk, readiness, and review burden before any tool purchase.',
        prompt:
          'Turn these fictional support pain points into use-case cards. For each card, include task, user, input, output, value, risk, readiness, review owner, and recommended next step: [pain points].',
      },
    ],
    promptLibrary: [
      {
        title: 'Friction map',
        prompt:
          'Help a team map workflow friction. Ask for recurring tasks, delays, rework, handoffs, knowledge bottlenecks, and sensitive-data concerns. Then summarize likely AI training opportunities.',
      },
      {
        title: 'Use-case card',
        prompt:
          'Create a use-case card for this AI idea with user, task, input, output, value, risk, data sensitivity, review owner, readiness, and training need: [idea].',
      },
      {
        title: 'Value-risk scoring',
        prompt:
          'Score these AI ideas from 1 to 5 for value, risk, readiness, and review burden. Explain each score and sort the ideas into train, pilot, wait, or avoid: [ideas].',
      },
      {
        title: 'Readiness summary',
        prompt:
          'Draft a cautious readiness summary for leaders. Include what the team is ready to learn, what should be postponed, what needs specialist review, and the smallest practical next step: [findings].',
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
        title: 'Vendor question drill',
        body: 'Translate broad vendor claims into concrete questions about data handling, review, workflow fit, and training needs.',
      },
      {
        title: 'Decision-gate scenario',
        body: 'Walk through an AI idea and decide whether it belongs in training, discovery, pilot, procurement, or wait.',
      },
      {
        title: 'Risk language rehearsal',
        body: 'Practice naming uncertainty and boundaries without implying legal, medical, compliance, or cybersecurity guarantees.',
      },
      {
        title: 'Leadership message draft',
        body: 'Create a calm message that explains why the organization is learning before buying or implementing.',
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
          'Translate the pitch into concrete questions about workflow fit, data handling, review, ownership, and training.',
        prompt:
          'Turn this vendor claim into practical evaluation questions. Cover workflow fit, data handling, human review, implementation burden, training needs, lock-in, and evidence we should request: [vendor claim].',
      },
      {
        title: 'Board-level AI stance',
        situation:
          'A board or senior leadership group asks whether the organization has an AI strategy.',
        learnerTask:
          'Draft a calm response that frames learning, boundaries, and next steps without overpromising outcomes.',
        prompt:
          'Draft a board-level AI learning statement. Emphasize clarity before complexity, staff fluency, safe experimentation, human judgment, and decisions that need the right internal owners. Avoid hype and guarantees.',
      },
      {
        title: 'Policy before practice tension',
        situation:
          'A department wants to ban, buy, or standardize AI before staff understand practical use.',
        learnerTask:
          'Separate what training can solve from what requires policy, legal, privacy, technical, or procurement decisions.',
        prompt:
          'Given this leadership concern, separate issues into fluency training, workflow practice, policy, procurement, technical implementation, and specialist review. Recommend a small next step for each: [concern].',
      },
    ],
    promptLibrary: [
      {
        title: 'Decision gate',
        prompt:
          'Evaluate this AI idea through decision gates: learn, practice, pilot, buy, wait, or seek specialist review. Explain the evidence needed before moving to the next gate: [AI idea].',
      },
      {
        title: 'Leadership briefing prep',
        prompt:
          'Prepare a plain-language executive briefing on [AI topic]. Include what it is, what it is useful for, limits, risks, good questions to ask, and a cautious next step.',
      },
      {
        title: 'Vendor question bank',
        prompt:
          'Create a vendor question bank for [tool category]. Include questions about data use, privacy, review workflows, admin controls, implementation effort, training, support, and exit options.',
      },
      {
        title: 'Internal message',
        prompt:
          'Draft an internal message explaining that we are learning about AI before making major technology decisions. Keep it calm, practical, nontechnical, and clear about responsible use boundaries.',
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
        title: 'Question clinic',
        body: 'Turn participant questions into better prompts, safer examples, and clearer review steps.',
      },
      {
        title: 'Tool-change translation',
        body: 'Assess one new AI feature and decide whether it changes actual practice for the team.',
      },
      {
        title: 'Workflow rescue',
        body: 'Take an AI experiment that disappointed someone and diagnose whether the issue was prompt, context, task choice, or overtrust.',
      },
      {
        title: 'Monthly habit drill',
        body: 'Practice one review or revision habit until it becomes easy enough to use in ordinary work.',
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
          'Diagnose whether the issue was task choice, missing context, weak constraints, or insufficient review.',
        prompt:
          'Diagnose why this AI attempt failed. Classify the likely issue as task choice, missing context, unclear constraints, weak examples, overtrust, or review failure. Suggest a safer revised prompt: [failed prompt and output].',
      },
      {
        title: 'New feature translation',
        situation:
          'A model or product announces a new feature, and the team is unsure whether it matters.',
        learnerTask:
          'Translate the change into practical implications, ignore the noise, and name any new boundaries.',
        prompt:
          'Explain this AI tool update for a cautious team. What changed, what might be useful, what should we ignore for now, what risks or boundaries remain, and what small safe experiment could we try? [update].',
      },
      {
        title: 'Shared learning capture',
        situation:
          'Several staff members are experimenting privately, but the organization is not learning from those experiments.',
        learnerTask:
          'Convert individual examples into shared guidance, question lists, workflow notes, and follow-up topics.',
        prompt:
          'Turn these monthly AI practice notes into a team learning recap. Include useful patterns, confusing moments, unsafe ideas to avoid, workflows to revisit, and questions for next office hours: [practice notes].',
      },
    ],
    promptLibrary: [
      {
        title: 'Question refinement',
        prompt:
          'Turn this messy AI question into a clearer office-hours question. Identify the real task, missing context, data boundaries, and what kind of answer would be useful: [question].',
      },
      {
        title: 'Workflow rescue',
        prompt:
          'Rescue this disappointing AI workflow. Identify where it broke down, rewrite the prompt sequence, add review checkpoints, and say when the task should stay human-led: [workflow].',
      },
      {
        title: 'Tool-change digest',
        prompt:
          'Summarize this AI tool change for a practical team. Use three sections: what changed, who should care, and what to test safely next month: [announcement].',
      },
      {
        title: 'Monthly recap',
        prompt:
          'Create a one-page office-hours recap from these notes. Include questions answered, examples discussed, practice habit, cautions, and items to revisit next month: [notes].',
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
        title: 'Repo inspection lab',
        body: 'Ask the agent to inspect a project and produce a change plan before editing anything.',
      },
      {
        title: 'Scoped edit lab',
        body: 'Make a small content or UI change, then review the diff and reject unrelated churn.',
      },
      {
        title: 'Verification lab',
        body: 'Run lint, build, browser screenshots, and content checks before deciding whether to commit.',
      },
      {
        title: 'Rollback lab',
        body: 'Use Git history and deployment checks to reason about how to recover from a bad change.',
      },
      {
        title: 'Approval boundary lab',
        body: 'Classify actions such as file edits, package installs, API calls, credential use, deployment, and deletion by approval level.',
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
          'Ask the agent to inspect the repo, propose scoped edits, implement, test, screenshot, and summarize the diff.',
        prompt:
          'Inspect this project first. Then add a new public content section about [topic] using existing design patterns. Do not change unrelated files. After editing, run the appropriate checks, capture any layout concerns, and summarize the exact files changed.',
      },
      {
        title: 'PDF companion generation',
        situation:
          'A curriculum owner wants PDF companions regenerated from site content and visually checked.',
        learnerTask:
          'Use the local generator, render PDFs to images, inspect layout, and keep public and output copies synchronized.',
        prompt:
          'Update the PDF companion content for [track]. Regenerate the PDFs, render representative pages to images, check for clipping or awkward spacing, and report the output files and verification results.',
      },
      {
        title: 'Low-risk bug fix',
        situation:
          'A local app has a visible layout bug on mobile after new content was added.',
        learnerTask:
          'Have the agent reproduce the issue, inspect CSS, make a targeted fix, run lint/build, and verify mobile width.',
        prompt:
          'Reproduce the mobile layout issue at [route]. Identify the smallest CSS change that fixes it, avoid unrelated refactors, run lint and build, then verify there is no horizontal overflow at 390px width.',
      },
    ],
    promptLibrary: [
      {
        title: 'Inspect before editing',
        prompt:
          'Before making changes, inspect the repo structure, relevant files, existing patterns, and likely risks. Then propose the smallest implementation plan and wait for approval if the change touches deployment, credentials, deletion, or external API calls.',
      },
      {
        title: 'Scoped edit',
        prompt:
          'Make only the requested change: [change]. Follow existing patterns, avoid unrelated refactors, and list any assumptions. After editing, show the files changed and the verification you ran.',
      },
      {
        title: 'Verification plan',
        prompt:
          'Create and run a verification plan for this change. Include static checks, build, browser checks, screenshot or render checks where relevant, and any residual risks a human should review.',
      },
      {
        title: 'Rollback thinking',
        prompt:
          'Before publishing, explain how to reverse this change if it is wrong. Identify the commit, changed files, deployment checks, and the exact evidence we should confirm after release.',
      },
    ],
    pdfHref: '/curriculum-pdfs/advanced-operator-codex-track.pdf',
  },
]

const visualConcepts = [
  {
    title: 'AI Fluency Loop',
    body: 'A simple way to teach AI as an iterative practice: ask, add context, review the output, revise, and apply only what earns trust.',
    image: '/visuals/ai-fluency-loop.webp',
    fullImage: '/visuals/ai-fluency-loop.png',
    alt: 'Infographic showing an AI fluency loop with Ask, Context, Output, Review, Revise, and Apply.',
  },
  {
    title: 'Safe Experimentation Boundary Map',
    body: 'A visual anchor for separating low-risk practice from sensitive data, with human judgment kept at the boundary.',
    image: '/visuals/safe-experimentation-boundary-map.webp',
    fullImage: '/visuals/safe-experimentation-boundary-map.png',
    alt: 'Infographic showing practice, caution, private data, and human judgment zones.',
  },
  {
    title: 'Use-Case Discovery Grid',
    body: 'A decision tool for ranking AI ideas by value and risk before teams buy tools, launch pilots, or make workflow changes.',
    image: '/visuals/use-case-discovery-grid.webp',
    fullImage: '/visuals/use-case-discovery-grid.png',
    alt: 'Infographic showing an AI use-case grid with value and risk axes.',
  },
  {
    title: 'AI Adoption Value Scan',
    body: 'A practical discovery model that starts with where the business spends time and which important work keeps slipping out of reach.',
    image: '/visuals/ai-adoption-value-scan.webp',
    fullImage: '/visuals/ai-adoption-value-scan.png',
    alt: 'Infographic showing an AI adoption value scan from time sinks and neglected work through scoring and next-step selection.',
  },
  {
    title: 'Responsible AI Adoption Loop',
    body: 'A visual teaching model for moving from fluency to bounded practice, evaluation, learning capture, and shared team norms.',
    image: '/visuals/responsible-ai-adoption-loop.webp',
    fullImage: '/visuals/responsible-ai-adoption-loop.png',
    alt: 'Infographic showing a responsible AI adoption loop with learn, bound, practice, evaluate, capture, and normalize around human judgment.',
  },
  {
    title: 'Local Operator Control Loop',
    body: 'A teaching model for advanced Codex-style work: inspect, edit, test, review, commit, and keep rollback thinking visible.',
    image: '/visuals/local-operator-control-loop.webp',
    fullImage: '/visuals/local-operator-control-loop.png',
    alt: 'Infographic showing an operator workflow with Inspect, Edit, Test, Review, Commit, and Roll Back.',
  },
]

const publicInfoVisuals = [
  {
    title: 'AI Uses You May Not Have Considered',
    body:
      'A public-facing map of practical AI experiments for curious professionals who want useful ideas before committing to expensive tools.',
    image: '/visuals/ai-uses-you-may-not-have-considered.webp',
    fullImage: '/visuals/ai-uses-you-may-not-have-considered.png',
    alt: 'Infographic mapping practical AI uses such as decision rehearsal, meeting momentum, learning acceleration, research support, writing, workflows, roleplay, and pattern finding.',
  },
  {
    title: 'AI Tools by Utility Class',
    body:
      'A current tool-class map that helps visitors think in categories rather than chasing product names.',
    image: '/visuals/ai-tools-utility-classes.webp',
    fullImage: '/visuals/ai-tools-utility-classes.png',
    alt: 'Infographic grouping AI tools into utility classes including general assistants, research tools, workplace copilots, creative design, video and voice, coding agents, automation agents, and data sensemaking.',
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
]

const emailHref =
  'mailto:contact@xensible.com?subject=AI%20Fluency%20Call%20for%20Xensible'
const defaultCalendlyHref = 'https://calendly.com/contact-xensible/30min'
const calendlyWidgetSrc = 'https://assets.calendly.com/assets/external/widget.js'
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
}: {
  activeCurriculum?: CurriculumContent
  activeOffer?: (typeof offerFormats)[number]
  currentPath: string
  isCurriculumHub: boolean
  isExpertCurriculumLibrary: boolean
  isFreeCurriculum: boolean
  isAiUsesToolsPage: boolean
  isPracticeProjectsPage: boolean
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

const getStructuredData = (
  metadata: PageMetadata,
  {
    activeOffer,
    isCurriculumHub,
    isFreeCurriculum,
    isPracticeProjectsPage,
  }: {
    activeOffer?: (typeof offerFormats)[number]
    isCurriculumHub: boolean
    isFreeCurriculum: boolean
    isPracticeProjectsPage: boolean
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
  const isUnknownRoute =
    currentPath !== '/' &&
    !activeOffer &&
    !activeCurriculum &&
    !isCurriculumHub &&
    !isFreeCurriculum &&
    !isExpertCurriculumLibrary &&
    !isAiUsesToolsPage &&
    !isPracticeProjectsPage
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
    ],
  )
  const structuredData = useMemo(
    () =>
      getStructuredData(pageMetadata, {
        activeOffer,
        isCurriculumHub,
        isFreeCurriculum,
        isPracticeProjectsPage,
      }),
    [activeOffer, isCurriculumHub, isFreeCurriculum, isPracticeProjectsPage, pageMetadata],
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
            <a href={siteHref('/ai-uses-tools')}>AI Map</a>
            <a href={siteHref('/#guide')}>About</a>
            <a href={siteHref('/#contact')}>Contact</a>
          </nav>
          <a className="button button-primary nav-cta" href={bookingHref}>
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
      ) : activeCurriculum || isCurriculumHub || isFreeCurriculum || isExpertCurriculumLibrary ? (
        <CurriculumPage
          curriculum={activeCurriculum}
          isFreeCurriculum={isFreeCurriculum}
          isHub={isCurriculumHub}
          navigateToRoute={navigateToRoute}
        />
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
              <a className="button button-primary" href={bookingHref}>
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
          </div>
        </section>

        <section className="section section-intro" aria-labelledby="who-title">
          <div className="section-heading">
            <p className="eyebrow">Who this is for</p>
            <h2 id="who-title">
              For teams that are ready to understand what AI can actually do.
            </h2>
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
                <Icon aria-hidden="true" />
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
            {visualConcepts.map(({ title, body, image, fullImage, alt }) => (
              <article className="visual-card" key={title}>
                <a
                  className="visual-media"
                  href={siteHref(fullImage)}
                  aria-label={`Open full-size ${title} visual`}
                >
                  <picture>
                    <source srcSet={siteHref(image)} type="image/webp" />
                    <img src={siteHref(fullImage)} alt={alt} loading="lazy" />
                  </picture>
                </a>
                <div className="visual-card-copy">
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a className="text-link" href={siteHref(fullImage)}>
                    Open full-size visual
                    <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
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
              href={siteHref('/ai-uses-tools')}
              onClick={(event) => navigateToRoute(event, '/ai-uses-tools')}
            >
              Open AI Map
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
          <h2>Learning Sprint</h2>
          <p>
            Start with one topic you genuinely want to understand. In about an
            hour, AI can help you produce an explainer, examples, a quiz, a
            glossary, and a verification checklist.
          </p>
          <a className="text-link" href={siteHref(starterProjectPdfHref)}>
            Download the 60-minute worksheet
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

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
          {publicInfoVisuals.map(({ title, body, image, fullImage, alt }) => (
            <article className="info-image-card" key={title}>
              <a
                className="info-image-link"
                href={siteHref(fullImage)}
                aria-label={`Open full-size ${title} infographic`}
              >
                <picture>
                  <source srcSet={siteHref(image)} type="image/webp" />
                  <img src={siteHref(fullImage)} alt={alt} />
                </picture>
              </a>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a className="text-link" href={siteHref(fullImage)}>
                  Open full-size image
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-band" aria-labelledby="uses-list-title">
        <div className="section-heading centered">
          <p className="eyebrow">Uses to consider</p>
          <h2 id="uses-list-title">AI can help before it becomes a technology decision.</h2>
          <p>
            These are safe places to begin with public, fictional, or
            anonymized examples.
          </p>
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
          <h2>Exercises that turn concepts into repeatable habits.</h2>
        </div>
        <div className="practice-lab-grid">
          {curriculum.practiceLabs.map(({ title, body }) => (
            <article className="practice-lab-card" key={title}>
              <ClipboardCheck aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
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
