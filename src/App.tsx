import type { ComponentType, MouseEvent } from 'react'
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
  Compass,
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
import './App.css'

type IconType = ComponentType<LucideProps>

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
    description:
      'A logical-fallacies reference with definitions, examples, teaching paths, case studies, and practice tools.',
  },
  {
    name: 'CogBias',
    url: 'https://cogbias.site/',
    domain: 'cogbias.site',
    description:
      'A cognitive-bias learning site with clear entries, comparison guides, assessments, self-audits, and debiasing tools.',
  },
  {
    name: 'Byteseismic Philosophy',
    url: 'https://byteseismic.com/',
    domain: 'byteseismic.com',
    description:
      'A guided philosophy inquiry network organized by questions, routes, concepts, dialogues, maps, and quizzes.',
  },
  {
    name: 'DOING.TOKYO',
    url: 'https://doing.tokyo/',
    domain: 'doing.tokyo',
    description:
      'A practical one-day Tokyo itinerary planner that adapts route style, budget, pace, weather, food, and logistics.',
  },
  {
    name: 'Credencing',
    url: 'https://credencing.com/',
    domain: 'credencing.com',
    description:
      'An interactive model for thinking about evidence, perception, confidence, rationality, and irrationality.',
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
  'mailto:hello@xensible.com?subject=AI%20Fluency%20Call%20for%20Xensible'

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

function App() {
  const [currentPath, setCurrentPath] = useState(getInitialPath)
  const activeOffer = offerFormats.find(
    (offer) => currentPath === `/offers/${offer.slug}`,
  )

  useEffect(() => {
    const handlePopState = () => setCurrentPath(stripBasePath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = activeOffer
      ? `${activeOffer.title} | Xensible`
      : 'Xensible | AI Fluency Training'
  }, [activeOffer])

  const navigateToOffer = (
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
      ) : (
        <HomePage navigateToOffer={navigateToOffer} />
      )}

      <footer className="site-footer">
        <p>Xensible</p>
        <p>AI fluency training, coaching, and practical guidance over Zoom.</p>
      </footer>
    </div>
  )
}

function HomePage({
  navigateToOffer,
}: {
  navigateToOffer: (
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
                onClick={(event) => navigateToOffer(event, `/offers/${slug}`)}
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

        <section className="section founder-section" id="guide" aria-labelledby="guide-title">
          <div className="founder-visual" aria-hidden="true">
            <div className="guide-compass">
              <Compass />
            </div>
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
            <p className="eyebrow">Built with AI</p>
            <h2 id="examples-title">
              Public examples of AI-assisted thinking, writing, and site
              creation.
            </h2>
            <p>
              These projects show the kind of practical fluency Xensible
              teaches: using AI to structure complex material, build useful
              interfaces, and turn ideas into working resources without losing
              human judgment.
            </p>
          </div>
          <div className="example-grid">
            {aiBuiltSites.map(({ name, url, domain, description }) => (
              <a
                className="example-card"
                href={url}
                key={domain}
                rel="noreferrer"
                target="_blank"
              >
                <span className="example-domain">{domain}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="text-link">
                  Visit site
                  <ExternalLink aria-hidden="true" />
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
