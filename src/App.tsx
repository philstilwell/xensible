import type { ComponentType, FormEvent, MouseEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
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
  materials: string[]
  diagramSlots: string[]
  followUp: string[]
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
  ],
  followUp: [
    'Keep a one-week practice log using only non-sensitive examples.',
    'Collect three questions that would benefit from coaching or a team discussion.',
    'Choose one recurring task that may become a future workflow workshop candidate.',
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
    access: 'Password: xpert',
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
    ],
    followUp: [
      'Choose two low-risk training candidates and one idea to postpone.',
      'Schedule the right briefing or workshop for the highest-priority audience.',
      'Review the map monthly as team fluency and tool options change.',
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
    ],
    followUp: [
      'Select a first audience for training or discovery.',
      'List vendor, policy, or data questions that require specialist review.',
      'Schedule a follow-up briefing or readiness sprint if the organization needs a fuller map.',
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
    title: 'Local Operator Control Loop',
    body: 'A teaching model for advanced Codex-style work: inspect, edit, test, review, commit, and keep rollback thinking visible.',
    image: '/visuals/local-operator-control-loop.webp',
    fullImage: '/visuals/local-operator-control-loop.png',
    alt: 'Infographic showing an operator workflow with Inspect, Edit, Test, Review, Commit, and Roll Back.',
  },
]

const process = [
  {
    step: 'Discover',
    body: 'Map your team\'s questions, comfort level, and real work contexts.',
  },
  {
    step: 'Train',
    body: 'Build a shared foundation with clear examples and plain language.',
  },
  {
    step: 'Practice',
    body: 'Try practical workflows together in a safe, guided Zoom setting.',
  },
  {
    step: 'Apply',
    body: 'Choose sensible next steps your team can use with better judgment.',
  },
]

const reasons = [
  'Education comes first, so people understand the tools before committing to them.',
  'Sessions are warm, practical, and designed for people who are curious but not yet confident.',
  'The work is remote-first and easy to tailor for teams, departments, leaders, or individuals.',
  'Responsible use is built in: data boundaries, uncertainty, review habits, and human judgment stay central.',
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

const contactHref =
  'mailto:contact@xensible.com?subject=AI%20Fluency%20Call%20for%20Xensible'

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
  const pageTitle = activeOffer
    ? `${activeOffer.title} | Xensible`
    : activeCurriculum
      ? `${activeCurriculum.title} | Xensible Expert Curriculum`
      : isFreeCurriculum
        ? 'Free AI Fluency Starter | Xensible'
        : isExpertCurriculumLibrary
          ? 'Expert Curriculum Library | Xensible'
          : isCurriculumHub
            ? 'Curriculum Tiers | Xensible'
            : 'Xensible | AI Fluency Training'

  useEffect(() => {
    const handlePopState = () => setCurrentPath(stripBasePath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

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
            <a href={siteHref('/#curriculum-packages')}>Curricula</a>
            <a href={siteHref('/#visuals')}>Visuals</a>
            <a href={siteHref('/#guide')}>Guide</a>
            <a href={siteHref('/#faq')}>FAQ</a>
            <a href={siteHref('/#contact')}>Contact</a>
          </nav>
          <a className="button button-primary nav-cta" href={contactHref}>
            <CalendarDays aria-hidden="true" />
            Book Call
          </a>
        </div>
      </header>

      {activeOffer ? (
        <OfferPage offer={activeOffer} />
      ) : activeCurriculum || isCurriculumHub || isFreeCurriculum || isExpertCurriculumLibrary ? (
        <CurriculumPage
          curriculum={activeCurriculum}
          isFreeCurriculum={isFreeCurriculum}
          isHub={isCurriculumHub}
          navigateToRoute={navigateToRoute}
        />
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
              <a className="button button-primary" href={contactHref}>
                <CalendarDays aria-hidden="true" />
                Book a Zoom Consultation
              </a>
              <a className="button button-secondary" href={siteHref('/#services')}>
                Explore Services
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
          <div className="section-heading">
            <p className="eyebrow">Built by Phil with AI</p>
            <h2 id="examples-title">
              Featured sites Phil created using AI-assisted thinking, writing,
              and development.
            </h2>
            <p>
              Phil created each of these public projects as practical examples
              of the fluency Xensible teaches: using AI to structure complex
              material, build useful interfaces, and turn ideas into working
              resources without losing human judgment.
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
            {process.map(({ step, body }, index) => (
              <article className="process-step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step}</h3>
                <p>{body}</p>
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
            {reasons.map((reason) => (
              <div className="reason-item" key={reason}>
                <Sparkles aria-hidden="true" />
                <p>{reason}</p>
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

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Start with a conversation</p>
            <h2 id="contact-title">Schedule an AI Fluency Call</h2>
            <p>
              Bring your questions, your team context, and the places where AI
              feels confusing. We will use a short Zoom conversation to identify
              the right first step.
            </p>
          </div>
          <a className="button button-primary" href={contactHref}>
            <Handshake aria-hidden="true" />
            Start with a Team Briefing
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
            package paths, planning notes, and PDF companions.
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
            and PDF companions.
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
            <a className="button button-primary" href={contactHref}>
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
            <a className="button button-primary" href={contactHref}>
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
        </div>
        <a className="button button-primary" href={contactHref}>
          <Handshake aria-hidden="true" />
          Schedule an AI Fluency Call
        </a>
      </section>
    </main>
  )
}

export default App
