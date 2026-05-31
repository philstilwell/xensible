from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


rl_config.invariant = True

OUTPUT = Path("output/pdf/from_frozen_fingers_to_wow_teacher_guide.pdf")
PUBLIC_OUTPUT = Path("public/curriculum-pdfs/from-frozen-fingers-to-wow-teacher-guide.pdf")

INK = colors.HexColor("#10252b")
INK_SOFT = colors.HexColor("#284147")
MUTED = colors.HexColor("#5b6f74")
TEAL = colors.HexColor("#16474f")
DEEP = colors.HexColor("#07191e")
CLAY = colors.HexColor("#c35f4f")
BRASS = colors.HexColor("#d3b171")
AQUA = colors.HexColor("#66d4c8")
SURFACE = colors.HexColor("#f7faf6")
MIST = colors.HexColor("#e4f0eb")
PAPER = colors.white
LINE = colors.HexColor("#c7dde2")
LIGHT = colors.HexColor("#f0f6f6")


ACTIVITIES = [
    {
        "title": "The First Safe Hello",
        "stage": "Comfort",
        "time": "20-30 minutes",
        "skill": "Starting a conversation with AI",
        "materials": "School-approved AI tool, projector, student notes",
        "goal": "Students experience AI as an interactive helper rather than a search box.",
        "steps": [
            "Ask each student to choose a harmless familiar topic: a sport, hobby, game, food, animal, book, or skill.",
            "Students type: \"Explain [topic] to me like I am brand new, then ask me one question.\"",
            "They answer the AI question and ask one follow-up beginning with \"Can you make that...\"",
            "Pairs compare how their second prompt changed the response.",
        ],
        "wow": "Have students ask the AI to explain the same topic in three levels: for a five-year-old, for a high school student, and for an expert.",
        "debrief": "What changed when you answered the AI's question? What did the AI do well? Where did it still need you?",
    },
    {
        "title": "Tiny Prompt, Better Prompt",
        "stage": "Comfort",
        "time": "30 minutes",
        "skill": "Adding context, audience, and format",
        "materials": "Shared board or document",
        "goal": "Students see that prompting is a design skill, not magic wording.",
        "steps": [
            "Begin with a one-word prompt such as \"volcanoes\" or \"homework\" and show the weak result.",
            "As a class, add one improvement at a time: role, audience, goal, constraints, tone, and output format.",
            "Students repeat the ladder with their own topic and save each version.",
            "Pairs underline the sentence in their prompt that made the biggest difference.",
        ],
        "wow": "Ask AI to turn the best prompt into a reusable template with blanks any student can fill in.",
        "debrief": "Which details gave you more control? Which details were unnecessary?",
    },
    {
        "title": "AI as a Patient Tutor",
        "stage": "Comfort",
        "time": "35-45 minutes",
        "skill": "Learning through back-and-forth dialogue",
        "materials": "Current class topic or review topic",
        "goal": "Students practice asking for help without embarrassment and checking understanding.",
        "steps": [
            "Students choose one concept they find confusing from any class.",
            "They prompt: \"Tutor me on [concept]. Start with the basics, use one example, then ask me a question to check my understanding.\"",
            "Students answer the AI's question and ask for correction.",
            "They request a new explanation using an analogy connected to something they enjoy.",
        ],
        "wow": "Have AI create a three-question mini-quiz, grade the student's answers, and recommend the next study move.",
        "debrief": "How did it feel to practice privately? What made the AI's feedback useful or not useful?",
    },
    {
        "title": "Question Storm",
        "stage": "Comfort",
        "time": "30-40 minutes",
        "skill": "Turning curiosity into investigable questions",
        "materials": "Sticky notes or digital board",
        "goal": "Students learn that strong AI work often begins with better questions.",
        "steps": [
            "The class chooses a broad theme such as music, climate, fashion, space, sports, health, or games.",
            "Students ask AI for 20 curious questions about the theme for beginners.",
            "They sort questions into categories: factual, creative, personal, ethical, technical, and debatable.",
            "Each student rewrites one question to make it more specific and more interesting.",
        ],
        "wow": "Ask AI to rank the revised questions by research potential and explain the ranking.",
        "debrief": "Which questions made you want to keep working? What makes a question too broad?",
    },
    {
        "title": "Everyday Task Transformer",
        "stage": "Comfort",
        "time": "30 minutes",
        "skill": "Using AI for practical planning",
        "materials": "Student notebooks or devices",
        "goal": "Students discover that AI can turn vague intentions into usable plans.",
        "steps": [
            "Students choose an everyday task: studying, cleaning a backpack, practicing an instrument, preparing for tryouts, or planning a weekend project.",
            "They ask AI to turn the task into a realistic checklist with time estimates.",
            "They revise the prompt so the plan fits their real schedule, energy level, and constraints.",
            "Students mark which steps they would actually do and which are unrealistic.",
        ],
        "wow": "Ask AI to convert the checklist into a calendar plan, reminder script, or parent-friendly explanation.",
        "debrief": "What did the AI assume about you? How did adding personal constraints improve the output?",
    },
    {
        "title": "Explain It Five Ways",
        "stage": "Comfort",
        "time": "35 minutes",
        "skill": "Requesting multiple representations",
        "materials": "Class topic, AI tool",
        "goal": "Students see that one idea can become many learning formats.",
        "steps": [
            "Choose a concept from class: fractions, ecosystems, theme, migration, gravity, or media literacy.",
            "Students prompt AI to explain it as a plain explanation, analogy, story, step-by-step guide, and quiz.",
            "They rate which version helped them most and why.",
            "Groups combine the strongest parts into one improved learning resource.",
        ],
        "wow": "Ask AI to create a teacher-ready mini-lesson that uses all five formats in sequence.",
        "debrief": "Which format helped memory? Which format helped understanding? Are those always the same?",
    },
    {
        "title": "Common Topic Prompt Tournament",
        "stage": "Prompt Craft",
        "time": "60-90 minutes",
        "skill": "Prompt comparison, scoring, and iteration",
        "materials": "Shared topic, AI tool, scoring rubric",
        "goal": "Students learn that prompts can be evaluated rigorously and improved deliberately.",
        "steps": [
            "The class agrees on one common topic of interest, such as sleep, sneakers, video games, local history, fast food, basketball, or ocean animals.",
            "Individually, students write prompts intended to produce the best package of pedagogically useful information on that topic.",
            "Students submit prompts, not names, into a capable AI and ask it to score them for clarity, audience fit, constraints, usefulness, and originality.",
            "The AI identifies strengths, weaknesses, and likely output problems. Students discuss what the scores reveal about prompting.",
            "Then students ask AI to generate stronger prompts for the same topic and compare human and AI-generated versions.",
        ],
        "wow": "Move from a general text answer to a finished product: a PDF explainer, simple website outline, slide deck, interactive quiz, or classroom poster copy.",
        "debrief": "What did the best prompts have in common? What did AI notice that humans missed? What did humans value that AI did not?",
    },
    {
        "title": "The Constraint Game",
        "stage": "Prompt Craft",
        "time": "30-45 minutes",
        "skill": "Controlling outputs with limits",
        "materials": "Constraint cards or shared list",
        "goal": "Students learn that constraints can make AI more useful, creative, and precise.",
        "steps": [
            "Give every group the same topic and a different constraint card: 100 words, no jargon, table only, humorous tone, three examples, no bullet points, or include counterarguments.",
            "Groups run their constrained prompt and paste the result into a shared space.",
            "The class guesses which constraint shaped each result.",
            "Students revise one output by adding a second constraint.",
        ],
        "wow": "Challenge groups to create the most useful one-page beginner guide using exactly five constraints.",
        "debrief": "When did constraints improve quality? When did they make the task worse?",
    },
    {
        "title": "Persona Lens Lab",
        "stage": "Prompt Craft",
        "time": "40 minutes",
        "skill": "Using roles and perspectives carefully",
        "materials": "Topic list, role list",
        "goal": "Students explore how assigned roles change AI's choices, vocabulary, and priorities.",
        "steps": [
            "Choose one topic with many possible lenses, such as school lunches, electric cars, social media, fashion, or a historical event.",
            "Groups ask AI to explain the topic as a scientist, historian, artist, coach, journalist, parent, and student.",
            "Students identify what each persona emphasized, ignored, or oversimplified.",
            "They build a final prompt that requests multiple perspectives without pretending any one role is neutral.",
        ],
        "wow": "Ask AI to create a roundtable conversation among the personas, with each speaker challenging another speaker's assumptions.",
        "debrief": "How can role prompts help? How can they create false authority?",
    },
    {
        "title": "Format Switchboard",
        "stage": "Prompt Craft",
        "time": "45 minutes",
        "skill": "Transforming information into useful formats",
        "materials": "A short article, textbook section, or class notes",
        "goal": "Students learn that format is part of thinking.",
        "steps": [
            "Provide a short chunk of content or have students generate a basic explanation on a topic.",
            "Students ask AI to transform it into a checklist, timeline, FAQ, comparison table, flashcards, and practice quiz.",
            "They evaluate which format fits which purpose: studying, teaching, deciding, remembering, or presenting.",
            "Each group chooses the best format and improves it for a real audience.",
        ],
        "wow": "Create a classroom resource bundle with three formats for the same topic and a note explaining when to use each one.",
        "debrief": "What information became clearer when the format changed? What got lost?",
    },
    {
        "title": "Bad Prompt Rescue",
        "stage": "Prompt Craft",
        "time": "35 minutes",
        "skill": "Diagnosing weak instructions",
        "materials": "A set of intentionally vague prompts",
        "goal": "Students practice naming prompt problems before trying to fix them.",
        "steps": [
            "Give students weak prompts such as \"Tell me about history,\" \"Make it good,\" or \"Help with my project.\"",
            "Students label each problem: unclear goal, missing audience, no constraints, no format, too broad, or impossible to judge.",
            "They rewrite the prompt using the class rubric.",
            "Groups test original and revised prompts side by side.",
        ],
        "wow": "Ask AI to act as a strict prompt coach and explain exactly why each revision improved the likely output.",
        "debrief": "Which missing detail was most damaging? How did you know the rescue worked?",
    },
    {
        "title": "The Iteration Ladder",
        "stage": "Prompt Craft",
        "time": "45-60 minutes",
        "skill": "Improving through multiple rounds",
        "materials": "AI chat history export or notes",
        "goal": "Students experience AI work as a loop: prompt, inspect, revise, test, refine.",
        "steps": [
            "Students begin with a useful but imperfect prompt on a class topic.",
            "They make five planned revisions: clarify the goal, define the audience, add examples, set quality criteria, and request a final format.",
            "After each AI response, students write one sentence explaining what improved.",
            "They submit the first prompt, final prompt, and a short reflection.",
        ],
        "wow": "Ask AI to summarize the student's own improvement process and turn it into a personal prompting checklist.",
        "debrief": "Which revision had the biggest effect? Why is the first answer rarely the final product?",
    },
    {
        "title": "Fact-Check Relay",
        "stage": "Judgment",
        "time": "50-70 minutes",
        "skill": "Verification and source awareness",
        "materials": "AI tool, approved research sources",
        "goal": "Students learn that fluent text still needs evidence.",
        "steps": [
            "Students ask AI for a short explanation of a factual topic and require five specific claims.",
            "Each student highlights the claims and passes them to a partner.",
            "The partner checks each claim using approved sources and marks it verified, uncertain, misleading, or false.",
            "Students revise the AI output to include only verified claims and cite where they checked.",
        ],
        "wow": "Ask AI to generate a verification plan before fact-checking, then compare the AI's plan to the class process.",
        "debrief": "Did the AI sound confident when it should not have? What makes a claim checkable?",
    },
    {
        "title": "Bias and Missing Voices",
        "stage": "Judgment",
        "time": "45-60 minutes",
        "skill": "Identifying omissions and framing",
        "materials": "Topic with social, historical, or cultural dimensions",
        "goal": "Students notice that AI outputs can reflect partial perspectives.",
        "steps": [
            "Students ask AI for a neutral overview of a topic such as city planning, school uniforms, immigration, sports funding, or technology access.",
            "They mark whose interests are centered and whose are missing.",
            "They prompt AI to identify missing stakeholders, possible biases, and questions the first answer did not address.",
            "Students write a more balanced prompt and compare outputs.",
        ],
        "wow": "Create a stakeholder map showing how different groups might define the problem differently.",
        "debrief": "What does \"neutral\" mean in an AI answer? Who has to decide whether an answer is fair?",
    },
    {
        "title": "Hallucination Hunt",
        "stage": "Judgment",
        "time": "35-50 minutes",
        "skill": "Recognizing fabricated or uncertain information",
        "materials": "Teacher-selected prompts with safe verification paths",
        "goal": "Students learn that AI can invent details and that uncertainty is part of responsible use.",
        "steps": [
            "Choose topics where details are easy to verify, such as fictional book facts, local history, obscure records, or made-up product names.",
            "Students ask AI for confident answers and record any suspicious details.",
            "They verify details and classify errors: invented source, wrong date, wrong name, overgeneralization, or unsupported claim.",
            "Students rewrite the prompt to require uncertainty labels and source-checking steps.",
        ],
        "wow": "Ask AI to produce a corrected answer with confidence levels for each claim, then audit those confidence levels.",
        "debrief": "Why is confident language persuasive? What prompt language encouraged caution?",
    },
    {
        "title": "Debate Coach With Two Sides",
        "stage": "Judgment",
        "time": "50-75 minutes",
        "skill": "Argument analysis and counterargument",
        "materials": "Debatable class question",
        "goal": "Students use AI to strengthen reasoning without outsourcing judgment.",
        "steps": [
            "Pairs choose a debatable question with more than one reasonable side.",
            "They ask AI to build arguments for Side A and Side B, each with evidence needs and possible weak points.",
            "Students mark which points are strong, weak, unsupported, or emotionally persuasive.",
            "Pairs prepare a short debate using only the arguments they can explain in their own words.",
        ],
        "wow": "Use AI as a cross-examiner that asks each side three tough questions after the debate.",
        "debrief": "Did AI make either side sound stronger than it deserved? How did you decide what to keep?",
    },
    {
        "title": "Rubric Builder",
        "stage": "Judgment",
        "time": "45 minutes",
        "skill": "Defining quality criteria",
        "materials": "A current assignment or project type",
        "goal": "Students learn that quality has dimensions that can be named, discussed, and revised.",
        "steps": [
            "Students describe a task, such as a paragraph, poster, presentation, lab report, or video.",
            "They ask AI to draft a four-level rubric for the task.",
            "Students critique the rubric: What is vague? What is missing? What would be unfair?",
            "Groups revise the rubric and test it on a sample piece of work.",
        ],
        "wow": "Ask AI to generate three sample submissions at different quality levels, then have students score them and defend their scores.",
        "debrief": "How did the rubric change the way you understood the assignment?",
    },
    {
        "title": "Feedback Without Panic",
        "stage": "Judgment",
        "time": "40-60 minutes",
        "skill": "Using AI for revision feedback",
        "materials": "Student draft without private information",
        "goal": "Students practice receiving feedback as information, not judgment.",
        "steps": [
            "Students choose a short draft or paragraph and remove names or private details.",
            "They ask AI for feedback using a kind but rigorous teacher voice: two strengths, two priorities, and one concrete next step.",
            "Students compare AI feedback with peer feedback and identify overlap.",
            "They revise one sentence or paragraph based on feedback they choose to trust.",
        ],
        "wow": "Ask AI to create a personalized revision checklist from the draft, then use it for a second revision pass.",
        "debrief": "Which feedback felt useful? Which feedback was too generic? Who remains responsible for the final choices?",
    },
    {
        "title": "Classroom Museum Label",
        "stage": "Creation",
        "time": "45-60 minutes",
        "skill": "Condensing and presenting information",
        "materials": "Objects, images, concepts, or artifacts",
        "goal": "Students turn ordinary classroom material into public-facing explanation.",
        "steps": [
            "Each student chooses an object, image, quotation, formula, map, tool, or idea from class.",
            "They ask AI to draft a museum label for a general audience in 80-120 words.",
            "Students revise for accuracy, voice, and curiosity.",
            "They add an audio-tour script, question for visitors, or image-generation prompt if appropriate.",
        ],
        "wow": "Create a mini classroom exhibition with QR codes linking to audio scripts or digital labels.",
        "debrief": "How did the audience change the writing? What makes a short explanation powerful?",
    },
    {
        "title": "Micro Documentary Kit",
        "stage": "Creation",
        "time": "60-90 minutes",
        "skill": "Planning multimedia storytelling",
        "materials": "Recording device optional, AI tool",
        "goal": "Students see how AI can organize creative production without replacing their voice.",
        "steps": [
            "Groups choose a topic that can be explained in two minutes.",
            "They ask AI for a documentary plan: hook, interview questions, scene list, narration, and closing question.",
            "Students revise the plan to match what they can actually film, draw, photograph, or present.",
            "Groups produce a script, storyboard, or short recording.",
        ],
        "wow": "Ask AI to create three alternate documentary styles: investigative, playful, emotional, and news-style. Students choose the best fit.",
        "debrief": "What did AI help organize? Where did human judgment and taste matter most?",
    },
    {
        "title": "Interactive Study Guide",
        "stage": "Creation",
        "time": "60 minutes",
        "skill": "Building adaptive review materials",
        "materials": "Review topic and AI tool",
        "goal": "Students transform study content into an interactive learning experience.",
        "steps": [
            "Students choose a unit topic and ask AI to create a ten-question branching review quiz.",
            "Each answer choice should trigger feedback and a next step: easier question, harder question, hint, or explanation.",
            "Students test the quiz with a partner and mark confusing questions.",
            "They revise the quiz so wrong answers teach rather than shame.",
        ],
        "wow": "Ask AI to convert the branching quiz into copy for a simple website, slide deck, or chatbot-style script.",
        "debrief": "How is an interactive guide different from a worksheet? What makes feedback helpful?",
    },
    {
        "title": "Data Story From Scratch",
        "stage": "Creation",
        "time": "70-100 minutes",
        "skill": "Collecting, analyzing, and explaining data",
        "materials": "Short class survey, spreadsheet optional",
        "goal": "Students use AI to turn small data into a responsible story.",
        "steps": [
            "The class designs a quick survey with safe, non-private questions.",
            "Students collect anonymous totals and enter them into a table.",
            "They ask AI to identify patterns, possible charts, and cautious conclusions.",
            "Students write a data story that includes at least one limitation.",
        ],
        "wow": "Ask AI to produce an infographic outline, including title, chart labels, key takeaway, and a warning against overclaiming.",
        "debrief": "What can small data show? What can it not show?",
    },
    {
        "title": "Local Problem Pitch",
        "stage": "Creation",
        "time": "75-120 minutes",
        "skill": "Problem solving and proposal design",
        "materials": "School or community issue list",
        "goal": "Students use AI to think through solutions, stakeholders, risks, and tradeoffs.",
        "steps": [
            "Groups identify a real school or community problem they care about.",
            "They ask AI to create a stakeholder map, causes, possible solutions, and questions to investigate.",
            "Students choose one solution and prompt AI for a one-page proposal with benefits, risks, resources, and first steps.",
            "Groups revise the proposal based on what they know locally.",
        ],
        "wow": "Create a pitch deck, flyer, email to a decision-maker, or prototype plan from the same proposal.",
        "debrief": "What did AI know generally? What did only your class know locally?",
    },
    {
        "title": "Translation and Accessibility Lab",
        "stage": "Creation",
        "time": "45-60 minutes",
        "skill": "Adapting communication for access",
        "materials": "A teacher-provided text",
        "goal": "Students learn that AI can help include more readers when guided thoughtfully.",
        "steps": [
            "Provide a dense paragraph, announcement, or short lesson text.",
            "Students ask AI to adapt it for a younger reader, multilingual family, audio script, and visual learner.",
            "Students check whether meaning stayed accurate and respectful.",
            "They revise one version to be clearer, warmer, and more useful.",
        ],
        "wow": "Create a communication kit: plain-language version, translated draft for human review, audio narration script, and image prompt.",
        "debrief": "What is the difference between simplifying and dumbing down? Why does human review matter for translation?",
    },
    {
        "title": "Personal Learning Coach Simulation",
        "stage": "Wow Build",
        "time": "45-60 minutes",
        "skill": "Personalized planning with critique",
        "materials": "Student-selected learning goal",
        "goal": "Students see AI personalization as a draft to evaluate, not a command to obey.",
        "steps": [
            "Students choose a learning goal for the next week: vocabulary, typing, fitness, reading, coding, art, or test review.",
            "They describe available time, current level, resources, obstacles, and motivation.",
            "AI creates a seven-day plan with checkpoints and encouragement.",
            "Students critique the plan for realism and revise it into something they would actually try.",
        ],
        "wow": "Ask AI to become a daily coach that checks progress, adjusts the plan, and celebrates evidence of effort.",
        "debrief": "What made the plan feel personal? What did AI still not know about your real life?",
    },
    {
        "title": "No-Code Website Blueprint",
        "stage": "Wow Build",
        "time": "75-120 minutes",
        "skill": "Turning knowledge into a web experience",
        "materials": "AI tool and optional simple website builder",
        "goal": "Students move from text output to a structured digital product.",
        "steps": [
            "Students choose a topic worth teaching to others.",
            "They ask AI for a simple website plan: audience, pages, section headings, visual ideas, and calls to action.",
            "They prompt AI to write concise page copy and a navigation structure.",
            "If tools allow, students use a website builder or simple HTML template to assemble a prototype.",
        ],
        "wow": "Ask AI to add an interactive element: quiz, decision tree, calculator idea, glossary filter, or choose-your-path guide.",
        "debrief": "How did the product change when the audience became a website visitor rather than a teacher?",
    },
    {
        "title": "AI Tool Chain Challenge",
        "stage": "Wow Build",
        "time": "60-90 minutes",
        "skill": "Chaining outputs across formats",
        "materials": "AI tool, design or presentation tool optional",
        "goal": "Students experience AI as part of a production pipeline.",
        "steps": [
            "Groups choose one idea, message, or lesson.",
            "They generate a clear source explanation and verify it.",
            "They transform the source into five products: article, poster copy, podcast script, quiz, and slide outline.",
            "Groups evaluate which transformation best serves the audience and improve it.",
        ],
        "wow": "Ask AI to create a consistent campaign theme, tagline, and style guide for all five products.",
        "debrief": "Which outputs were easiest to transform? How did consistency help or hurt creativity?",
    },
    {
        "title": "Socratic Seminar With AI Observer",
        "stage": "Wow Build",
        "time": "60-80 minutes",
        "skill": "Analyzing discussion quality",
        "materials": "Discussion notes, not student names",
        "goal": "Students use AI to reflect on a real conversation while protecting privacy.",
        "steps": [
            "Hold a short seminar on a rich question.",
            "A student note-taker records themes, claims, evidence, questions, and moments of disagreement without names.",
            "The class gives the anonymized notes to AI and asks for themes, missing questions, strongest evidence, and next discussion moves.",
            "Students compare the AI analysis with their own experience of the conversation.",
        ],
        "wow": "Ask AI to create a follow-up seminar plan that deepens the discussion and includes quieter voices.",
        "debrief": "What can AI notice from notes? What can it not notice about tone, courage, or classroom context?",
    },
    {
        "title": "Mini App Design Sprint",
        "stage": "Wow Build",
        "time": "90-150 minutes",
        "skill": "Design thinking and prototyping",
        "materials": "AI tool, paper prototyping materials, optional coding tool",
        "goal": "Students discover that AI can help turn a need into a prototype plan.",
        "steps": [
            "Groups identify a small classroom problem: tracking assignments, choosing groups, practicing vocab, planning projects, or managing study time.",
            "They ask AI for user stories, essential features, screens, and a simple workflow.",
            "Students sketch the app and ask AI to critique the design for a beginner user.",
            "If appropriate, AI can draft simple code or no-code setup instructions for a prototype.",
        ],
        "wow": "Run a usability test: one group uses another group's prototype while AI-generated criteria guide the observation.",
        "debrief": "How did AI help you think like a designer? What did testing reveal that prompting alone could not?",
    },
    {
        "title": "From Question to Public Product",
        "stage": "Wow Build",
        "time": "2-4 class periods",
        "skill": "Capstone inquiry and publication",
        "materials": "Research sources, AI tool, presentation or publishing tool",
        "goal": "Students combine prompting, verification, revision, creation, and reflection into one finished artifact.",
        "steps": [
            "Students begin with a question they genuinely care about.",
            "They build a research prompt, verify key claims, and revise the prompt based on what they learn.",
            "They create a final product for a real audience: PDF guide, website, slide deck, video plan, interactive quiz, podcast script, or proposal.",
            "They include a process note showing their first prompt, best prompt, verification steps, and final human decisions.",
        ],
        "wow": "Hold a gallery walk where students present not only the product but the AI collaboration path that got them there.",
        "debrief": "What can AI amplify when a human has a real question, clear standards, and responsibility for the final result?",
    },
]

STAGE_SUMMARIES = {
    "Comfort": "Lower fear, make first prompts feel safe, visible, and useful.",
    "Prompt Craft": "Show that prompts can be designed, compared, scored, and improved.",
    "Judgment": "Build verification, bias awareness, critique, and responsibility.",
    "Creation": "Turn AI output into artifacts, media plans, data stories, and proposals.",
    "Wow Build": "Chain tools into personalized coaches, websites, app ideas, and capstones.",
}

PROMPT_SETS = {
    "The First Safe Hello": [
        ("Start", "Explain [topic] to me like I am brand new. Use one everyday example. Then ask me one friendly question to check what I understand."),
        ("Follow-up", "I answered: [student answer]. Correct any misunderstanding gently, then explain the next idea I should learn in three sentences."),
        ("Wow", "Explain the same topic at three levels: for a five-year-old, for a high school student, and for an expert. Put the differences in a table."),
    ],
    "Tiny Prompt, Better Prompt": [
        ("Start", "Give me a beginner explanation of [topic]."),
        ("Improve", "Rewrite my prompt so it includes a clear goal, audience, context, constraints, tone, and output format. Then explain why each part helps."),
        ("Template", "Turn the improved prompt into a reusable fill-in-the-blank template for students studying any topic."),
    ],
    "AI as a Patient Tutor": [
        ("Start", "Tutor me on [concept]. Start with the basics, use one example, and ask me one question before moving on."),
        ("Check", "Here is my answer: [answer]. Tell me what is correct, what is missing, and the next small step I should practice."),
        ("Practice", "Create a three-question mini-quiz on [concept]. Wait for my answers, then grade them and recommend what to review next."),
    ],
    "Question Storm": [
        ("Start", "Generate 20 curious beginner questions about [theme]. Mix factual, creative, ethical, technical, personal, and debatable questions."),
        ("Sort", "Sort these questions into categories and mark the five with the strongest research potential: [questions]. Explain your ranking."),
        ("Sharpen", "Rewrite this question so it is specific, researchable, and interesting to a class audience: [question]."),
    ],
    "Everyday Task Transformer": [
        ("Start", "Turn this everyday task into a realistic checklist with time estimates: [task]. Assume I am a beginner and have limited time."),
        ("Personalize", "Revise the checklist for these constraints: [available time, energy level, deadline, tools, obstacles]. Delete anything unrealistic."),
        ("Convert", "Convert the final checklist into a calendar plan, reminder script, or message I could send to someone helping me stay accountable."),
    ],
    "Explain It Five Ways": [
        ("Start", "Explain [concept] in five formats: plain explanation, analogy, short story, step-by-step guide, and quiz."),
        ("Compare", "Compare the five versions. Which one helps memory, which helps understanding, and which would work best for a beginner?"),
        ("Lesson", "Combine the strongest parts into a 15-minute mini-lesson with teacher script, student activity, and exit question."),
    ],
    "Common Topic Prompt Tournament": [
        ("Student", "Create the best possible prompt for teaching [common topic] to [audience]. It should request accurate, useful, beginner-friendly information in a clear format."),
        ("Judge", "Score these prompts from 0-4 for goal, audience, context, format, and quality check. Identify strengths, weaknesses, and likely output problems: [prompt list]."),
        ("Upgrade", "Generate three stronger prompts for teaching [common topic]. Make one concise, one rigorous, and one creative. Explain the tradeoffs."),
    ],
    "The Constraint Game": [
        ("Start", "Explain [topic] for beginners while following this constraint: [constraint]."),
        ("Add", "Revise the answer using these two constraints at once: [constraint 1] and [constraint 2]. Keep the explanation useful."),
        ("Reflect", "Explain how each constraint changed the output. Which constraint improved clarity, and which made the answer weaker?"),
    ],
    "Persona Lens Lab": [
        ("Start", "Explain [topic] from the perspective of a [role]. Name what this perspective emphasizes and what it might miss."),
        ("Compare", "Explain [topic] through these perspectives: scientist, historian, artist, coach, journalist, parent, and student. Put the differences in a table."),
        ("Roundtable", "Create a roundtable conversation where each perspective asks one tough question of another perspective."),
    ],
    "Format Switchboard": [
        ("Start", "Transform this content into a checklist, timeline, FAQ, comparison table, flashcards, and practice quiz: [content]."),
        ("Purpose", "For each format, explain when a student should use it: studying, teaching, deciding, remembering, or presenting."),
        ("Bundle", "Create a three-part resource bundle for [audience] using the best formats. Include a short note explaining how to use each part."),
    ],
    "Bad Prompt Rescue": [
        ("Diagnose", "Act as a strict but helpful prompt coach. Diagnose what is weak about this prompt: [prompt]. Use labels like unclear goal, missing audience, no constraints, no format, or too broad."),
        ("Rewrite", "Rewrite the prompt so it has a clear goal, audience, context, constraints, output format, and quality check."),
        ("Compare", "Compare the original and revised prompts. Predict how the AI answers would differ and why the revised version is stronger."),
    ],
    "The Iteration Ladder": [
        ("First", "Answer this prompt as written, then identify what information you wish the prompt had included: [first prompt]."),
        ("Revise", "Revise my prompt in five rounds: clarify the goal, define the audience, add examples, set quality criteria, and request a final format."),
        ("Checklist", "Summarize my prompt improvement process as a personal checklist I can reuse before asking AI for help."),
    ],
    "Fact-Check Relay": [
        ("Claims", "Explain [factual topic] in 150 words. Then list five specific claims from your answer that a student should verify."),
        ("Plan", "Create a verification plan for these claims. For each one, name the kind of source needed and what would count as confirmation: [claims]."),
        ("Revise", "Rewrite the explanation using only claims marked verified. Add a short note about what remains uncertain."),
    ],
    "Bias and Missing Voices": [
        ("Overview", "Give a neutral overview of [topic]. Then list whose interests, voices, or experiences might be missing from your overview."),
        ("Stakeholders", "Create a stakeholder map for [topic]. For each stakeholder, name their likely concerns, priorities, and questions."),
        ("Balance", "Rewrite the original overview so it includes multiple perspectives and avoids pretending that one viewpoint is automatically neutral."),
    ],
    "Hallucination Hunt": [
        ("Answer", "Answer this question confidently but mark any detail that may need verification: [question]."),
        ("Audit", "Review your answer and identify possible fabricated details, unsupported claims, wrong dates, wrong names, or overgeneralizations."),
        ("Cautious", "Rewrite the answer with confidence levels for each claim and a list of details students should verify before trusting it."),
    ],
    "Debate Coach With Two Sides": [
        ("Sides", "Build arguments for both sides of this question: [debatable question]. Include evidence needed and likely weak points for each side."),
        ("Cross-exam", "Ask Side A three tough questions and Side B three tough questions. Make the questions fair and specific."),
        ("Improve", "Help us strengthen our argument without adding unsupported claims. Mark each point as strong, weak, emotional, or needing evidence: [argument]."),
    ],
    "Rubric Builder": [
        ("Draft", "Create a four-level rubric for [assignment type]. Include criteria for accuracy, clarity, evidence, organization, and originality."),
        ("Critique", "Critique this rubric for vague language, missing criteria, unfair expectations, and anything students may misunderstand: [rubric]."),
        ("Samples", "Generate three short sample submissions at different quality levels so students can practice scoring with the rubric."),
    ],
    "Feedback Without Panic": [
        ("Feedback", "Give kind but rigorous feedback on this draft. Provide two strengths, two revision priorities, and one concrete next step: [safe draft]."),
        ("Compare", "Compare this AI feedback with peer feedback. Where do they agree, where do they differ, and what should I revise first? [feedback notes]."),
        ("Checklist", "Create a personalized revision checklist from this draft. Make it short enough to use during a second revision pass."),
    ],
    "Classroom Museum Label": [
        ("Label", "Write an 80-120 word museum label for [object, image, quote, formula, map, tool, or idea]. Use a curious tone for a general audience."),
        ("Audio", "Turn the label into a 45-second audio-tour script with one hook, one surprising detail, and one visitor question."),
        ("Revise", "Revise the label for accuracy, clarity, and curiosity. Identify any claim that should be checked before display."),
    ],
    "Micro Documentary Kit": [
        ("Plan", "Create a two-minute documentary plan for [topic]. Include hook, scene list, interview questions, narration beats, and closing question."),
        ("Style", "Rewrite the plan in three styles: investigative, playful, emotional, and news-style. Explain which style best fits the topic and why."),
        ("Storyboard", "Turn the chosen plan into a shot-by-shot storyboard with visuals we can film, draw, photograph, or present."),
    ],
    "Interactive Study Guide": [
        ("Quiz", "Create a ten-question branching review quiz for [unit topic]. Each answer choice should trigger feedback and a next step."),
        ("Repair", "Review this quiz for confusing questions, weak feedback, or wrong-answer explanations that shame the learner: [quiz]."),
        ("Convert", "Convert the quiz into a simple website outline, slide deck flow, or chatbot-style script."),
    ],
    "Data Story From Scratch": [
        ("Survey", "Help us design a short anonymous class survey about [safe topic]. Keep questions non-private and easy to total."),
        ("Analyze", "Analyze this small class data table. Identify patterns, possible charts, cautious conclusions, and limitations: [data]."),
        ("Infographic", "Create an infographic outline with title, chart labels, key takeaway, and one warning against overclaiming."),
    ],
    "Local Problem Pitch": [
        ("Map", "Create a stakeholder map, causes list, possible solutions, and investigation questions for this school or community problem: [problem]."),
        ("Proposal", "Draft a one-page proposal for this solution: [solution]. Include benefits, risks, resources, first steps, and questions for local experts."),
        ("Pitch", "Turn the proposal into a five-slide pitch deck outline, a flyer draft, or an email to a decision-maker."),
    ],
    "Translation and Accessibility Lab": [
        ("Adapt", "Adapt this text for four audiences: younger reader, multilingual family, audio listener, and visual learner: [text]."),
        ("Check", "Check whether the adapted versions kept the meaning accurate, respectful, and clear. Flag anything a human should review."),
        ("Kit", "Create a communication kit with plain-language version, translation draft for human review, audio script, and image prompt."),
    ],
    "Personal Learning Coach Simulation": [
        ("Plan", "Create a seven-day beginner learning plan for this goal: [goal]. Use my time, current level, resources, obstacles, and motivation: [details]."),
        ("Adjust", "Revise the plan to be more realistic. Remove anything too hard, too long, or too vague, and add checkpoints."),
        ("Coach", "Act as a daily coach. Ask me what I completed, adjust tomorrow's plan, and celebrate evidence of effort without exaggerating."),
    ],
    "No-Code Website Blueprint": [
        ("Plan", "Create a simple website plan for teaching [topic] to [audience]. Include pages, section headings, visual ideas, and calls to action."),
        ("Copy", "Write concise page copy for the website. Keep it beginner-friendly and mark any claims that need verification."),
        ("Interactive", "Add one interactive feature idea: quiz, decision tree, calculator, glossary filter, or choose-your-path guide. Explain how it works."),
    ],
    "AI Tool Chain Challenge": [
        ("Source", "Create a clear, verified source explanation about [idea, message, or lesson]. Include claims to check before reuse."),
        ("Transform", "Transform the source into five products: article, poster copy, podcast script, quiz, and slide outline."),
        ("Style", "Create a consistent campaign theme, tagline, and style guide so all five products feel connected."),
    ],
    "Socratic Seminar With AI Observer": [
        ("Analyze", "Analyze these anonymous seminar notes. Identify themes, claims, evidence, questions, disagreements, and missing voices: [notes]."),
        ("Next", "Create a follow-up seminar plan that deepens the discussion and includes quieter voices."),
        ("Reflect", "Compare the AI analysis with our class experience. What can be seen in notes, and what classroom context might be missing?"),
    ],
    "Mini App Design Sprint": [
        ("Users", "Help us design a mini app for this classroom problem: [problem]. Create user stories, essential features, screens, and a simple workflow."),
        ("Critique", "Critique our paper prototype for a beginner user. Identify confusing steps, missing feedback, and unnecessary features: [prototype notes]."),
        ("Test", "Create a usability test script with tasks, observation criteria, and questions for the tester after they try the prototype."),
    ],
    "From Question to Public Product": [
        ("Research", "Turn this question into a research plan: [question]. Include subquestions, search terms, source types, and claims to verify."),
        ("Product", "Help me choose the best final product for this audience: PDF guide, website, slide deck, video plan, quiz, podcast script, or proposal. Explain the tradeoffs."),
        ("Process", "Create a process note template showing first prompt, best prompt, verification steps, human decisions, and final product purpose."),
    ],
}

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "GuideTitle",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=28,
    leading=31,
    textColor=INK,
    alignment=TA_CENTER,
    spaceAfter=9,
)

subtitle_style = ParagraphStyle(
    "GuideSubtitle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=12.6,
    leading=17,
    textColor=INK_SOFT,
    alignment=TA_CENTER,
    spaceAfter=10,
)

h1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=17.5,
    leading=22,
    textColor=INK,
    spaceBefore=12,
    spaceAfter=8,
)

h2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=13.6,
    leading=17,
    textColor=TEAL,
    spaceBefore=8,
    spaceAfter=5,
)

body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=13.2,
    textColor=INK,
    spaceAfter=6,
)

small = ParagraphStyle(
    "Small",
    parent=body,
    fontSize=8.2,
    leading=11.2,
    textColor=MUTED,
)

stage_style = ParagraphStyle(
    "Stage",
    parent=h2,
    fontSize=12,
    leading=15,
    textColor=INK,
    backColor=MIST,
    borderColor=LINE,
    borderWidth=0.55,
    borderPadding=(6, 8, 6, 8),
    spaceBefore=10,
    spaceAfter=6,
)

activity_title = ParagraphStyle(
    "ActivityTitle",
    parent=h2,
    fontSize=12.2,
    leading=15,
    textColor=colors.white,
    backColor=TEAL,
    borderPadding=(5, 7, 5, 7),
    spaceBefore=5,
    spaceAfter=4,
)

label = ParagraphStyle(
    "Label",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=8.7,
    leading=11.6,
    textColor=TEAL,
    spaceAfter=1,
)

dash = ParagraphStyle(
    "Dash",
    parent=body,
    leftIndent=12,
    firstLineIndent=-8,
    spaceAfter=2.4,
)

step = ParagraphStyle(
    "Step",
    parent=body,
    leftIndent=17,
    firstLineIndent=-13,
    spaceAfter=3.0,
)

table_header = ParagraphStyle(
    "TableHeader",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=8.8,
    leading=10.4,
    textColor=colors.white,
    spaceAfter=0,
)

table_cell = ParagraphStyle(
    "TableCell",
    parent=body,
    fontSize=7.9,
    leading=10.4,
    textColor=INK,
    spaceAfter=0,
)

table_cell_bold = ParagraphStyle(
    "TableCellBold",
    parent=table_cell,
    fontName="Helvetica-Bold",
)

note_style = ParagraphStyle(
    "Note",
    parent=small,
    fontSize=8.0,
    leading=10.7,
    textColor=INK_SOFT,
    spaceAfter=0,
)

prompt_label_style = ParagraphStyle(
    "PromptLabel",
    parent=small,
    fontName="Helvetica-Bold",
    fontSize=7.7,
    leading=9.3,
    textColor=TEAL,
    spaceAfter=0,
)

prompt_text_style = ParagraphStyle(
    "PromptText",
    parent=small,
    fontSize=7.45,
    leading=9.6,
    textColor=INK,
    spaceAfter=0,
)


def p(text, style=body):
    return Paragraph(escape(text), style)


def rich(text, style=body):
    return Paragraph(text, style)


def dash_list(items):
    return [p(f"- {item}", dash) for item in items]


def numbered_list(items):
    return [p(f"{index}. {item}", step) for index, item in enumerate(items, 1)]


def prompt_table(title):
    rows = [[p(label, prompt_label_style), p(prompt, prompt_text_style)] for label, prompt in PROMPT_SETS[title]]
    table = Table(rows, colWidths=[0.82 * inch, 6.14 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fbfdfc")),
                ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#fbfdfc"), LIGHT]),
                ("BOX", (0, 0), (-1, -1), 0.45, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def on_page(canvas, doc):
    canvas.saveState()
    width, height = letter
    if doc.page > 1:
        canvas.setFillColor(LIGHT)
        canvas.rect(0, height - 0.42 * inch, width, 0.42 * inch, stroke=0, fill=1)
        canvas.setFillColor(TEAL)
        canvas.setFont("Helvetica-Bold", 8)
        canvas.drawString(0.55 * inch, height - 0.27 * inch, "From Frozen Fingers to Wow")
        canvas.setFillColor(MUTED)
        canvas.setFont("Helvetica", 8)
        canvas.drawRightString(width - 0.55 * inch, height - 0.27 * inch, f"Page {doc.page}")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.55 * inch, 0.46 * inch, width - 0.55 * inch, 0.46 * inch)
    canvas.restoreState()


def stage_table():
    rows = [
        [rich("Stage", table_header), rich("Activities", table_header), rich("Main teacher move", table_header)],
        [p("Comfort", table_cell_bold), p("1-6", table_cell), p(STAGE_SUMMARIES["Comfort"], table_cell)],
        [p("Prompt Craft", table_cell_bold), p("7-12", table_cell), p(STAGE_SUMMARIES["Prompt Craft"], table_cell)],
        [p("Judgment", table_cell_bold), p("13-18", table_cell), p(STAGE_SUMMARIES["Judgment"], table_cell)],
        [p("Creation", table_cell_bold), p("19-24", table_cell), p(STAGE_SUMMARIES["Creation"], table_cell)],
        [p("Wow Build", table_cell_bold), p("25-30", table_cell), p(STAGE_SUMMARIES["Wow Build"], table_cell)],
    ]
    table = Table(rows, colWidths=[1.25 * inch, 0.8 * inch, 5.0 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DEEP),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fbfdfc")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#fbfdfc"), LIGHT]),
                ("GRID", (0, 0), (-1, -1), 0.45, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def rubric_table():
    data = [
        ["Criterion", "4 - Strong", "2 - Developing", "0 - Missing"],
        ["Goal", "Task and desired outcome are explicit.", "Topic is present but purpose is fuzzy.", "No clear task."],
        ["Audience", "Reader, level, and tone are named.", "Audience is implied.", "No audience."],
        ["Context", "Useful background and constraints are included.", "Some context, but gaps remain.", "AI must guess."],
        ["Format", "Output structure is specific and usable.", "Format is vague.", "No format requested."],
        ["Quality check", "Prompt asks for criteria, critique, or verification.", "Some quality language.", "No way to judge success."],
    ]
    rows = []
    for row_index, row in enumerate(data):
        style = table_header if row_index == 0 else table_cell
        rows.append([p(cell, table_cell_bold if row_index > 0 and col_index == 0 else style) for col_index, cell in enumerate(row)])
    table = Table(rows, colWidths=[1.15 * inch, 2.25 * inch, 2.05 * inch, 1.6 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), TEAL),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fbfdfc")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#fbfdfc"), LIGHT]),
                ("GRID", (0, 0), (-1, -1), 0.45, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def activity_flowables(index, item):
    heading = f"{index:02d}. {item['title']}"
    meta = f"Stage: {item['stage']}     Time: {item['time']}     Core skill: {item['skill']}"
    sequence_items = [
        "Frame the activity goal, name the safe-input boundary, and show the artifact students will produce.",
        *item["steps"],
        "Give students two minutes to mark what improved, what became confusing, and what they still need to verify.",
        "Have students save the first prompt, best prompt, final output, and one human decision they made.",
    ]
    step_paragraphs = numbered_list(sequence_items)
    intro = KeepTogether(
        [
            p(heading, activity_title),
            p(meta, small),
            rich(f"<b>Materials:</b> {escape(item['materials'])}", body),
            rich(f"<b>Goal:</b> {escape(item['goal'])}", body),
            p("Step-by-step classroom flow", label),
            step_paragraphs[0],
        ]
    )
    notes = Table(
        [
            [
                rich(f"<b>Wow extension</b><br/>{escape(item['wow'])}", note_style),
                rich(f"<b>Debrief</b><br/>{escape(item['debrief'])}", note_style),
            ]
        ],
        colWidths=[3.48 * inch, 3.48 * inch],
    )
    notes.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.45, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return [
        intro,
        *step_paragraphs[1:],
        p("Copy-ready prompts", label),
        prompt_table(item["title"]),
        notes,
        Spacer(1, 6),
    ]


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.62 * inch,
        title="From Frozen Fingers to Wow",
        author="Xensible",
        subject="Teacher guide for beginner AI classroom activities",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        bottomPadding=0,
        rightPadding=0,
        topPadding=0,
    )
    doc.addPageTemplates([PageTemplate(id="normal", frames=[frame], onPage=on_page)])

    story = [
        Spacer(1, 0.55 * inch),
        rich("From Frozen Fingers to Wow", title_style),
        p("A teacher's guide for helping complete beginners discover AI's potential", subtitle_style),
        Spacer(1, 0.12 * inch),
        Table(
            [
                [
                    rich("<b>Teacher Guide</b>", ParagraphStyle("CoverLabel", parent=body, fontSize=13, leading=16, textColor=TEAL)),
                    p("30 step-by-step classroom activities with copy-ready prompts and high-wow AI products", body),
                ]
            ],
            colWidths=[1.7 * inch, 5.35 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
                    ("BOX", (0, 0), (-1, -1), 0.65, LINE),
                    ("LINEBEFORE", (1, 0), (1, 0), 4, BRASS),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 13),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 13),
                ]
            ),
        ),
        Spacer(1, 0.28 * inch),
        p(
            "This guide gives teachers 30 classroom activities that begin with nervous first keystrokes and build toward polished, surprising products. The thread running through every activity is simple: students should not merely ask AI for answers. They should learn to direct it, question it, verify it, improve it, and transform its output into something useful.",
            body,
        ),
        p(
            "Use a school-approved AI system and follow local policy. Students should avoid private information, names, grades, health details, addresses, passwords, and anything they would not want stored or reviewed. Treat AI output as a draft, not authority.",
            body,
        ),
        Spacer(1, 0.18 * inch),
        HRFlowable(width="100%", thickness=1.1, color=TEAL),
        Spacer(1, 0.18 * inch),
        p("Quick Start", h1),
        *dash_list(
            [
                "Best fit: grades 6-12, higher education, adult education, or professional learning, with adaptation.",
                "Class rhythm: demonstrate briefly, let students try, compare outputs, revise prompts, use the provided prompt ladder, and reflect.",
                "Teacher stance: praise curiosity, ask for evidence, and require students to explain final choices.",
                "Evidence of learning: prompt drafts, AI outputs, verification notes, revised products, and short reflections.",
            ]
        ),
        p("The 30-Activity Pathway", h1),
        stage_table(),
        PageBreak(),
        p("Prompt Quality Rubric", h1),
        p(
            "Use this five-part rubric for prompt tournaments, peer review, quick grading, or student self-assessment. A strong prompt does not need to be long. It needs to tell the AI what success looks like.",
            body,
        ),
        rubric_table(),
        Spacer(1, 0.18 * inch),
        p("Beginner Prompt Frame", h2),
        rich(
            "<b>Act as</b> [role] <b>to help</b> [audience] <b>understand or create</b> [goal]. <b>Use</b> [context]. <b>Include</b> [requirements]. <b>Format as</b> [format]. <b>Before finalizing, check for</b> [quality criteria].",
            body,
        ),
        p("Classroom Norms", h2),
        *dash_list(
            [
                "Do not paste private information into AI systems.",
                "Do not trust a response because it sounds confident.",
                "Do not let AI replace your own thinking, taste, responsibility, or voice.",
                "Do use AI to ask better questions, generate options, explain complexity, critique drafts, and build products.",
            ]
        ),
        PageBreak(),
        p("The Activities", h1),
        p(
            "Each activity can stand alone, but the sequence is designed to build confidence, craft, judgment, and creative ambition. Each activity includes a classroom flow plus copy-ready prompts. Replace bracketed text with the topic, draft, data, or question students are using.",
            body,
        ),
    ]

    current_stage = None
    for index, activity in enumerate(ACTIVITIES, 1):
        if activity["stage"] != current_stage:
            current_stage = activity["stage"]
            story.append(p(f"{current_stage} - {STAGE_SUMMARIES[current_stage]}", stage_style))
        story.extend(activity_flowables(index, activity))

    story.extend(
        [
            Spacer(1, 0.08 * inch),
            HRFlowable(width="100%", thickness=1.0, color=LINE),
            Spacer(1, 0.1 * inch),
            p("Teacher Closing Moves", h1),
            p(
                "A beginner AI classroom becomes powerful when students can name what changed between their first attempt and their final product. End major activities by asking students to show their process, not only the output.",
                body,
            ),
            p("Exit Ticket Options", h2),
            *dash_list(
                [
                    "My first prompt was weak because...",
                    "The revision that helped most was...",
                    "One AI claim I verified or questioned was...",
                    "One choice I made that the AI could not make for me was...",
                    "Next time, I will prompt more clearly by...",
                ]
            ),
            p("Simple Student Reflection", h2),
            p(
                "In five sentences, explain what you asked AI to do, how you improved your prompt, what you checked, what you changed by human judgment, and what your final product helps someone understand or do.",
                body,
            ),
        ]
    )

    doc.build(story)
    copyfile(OUTPUT, PUBLIC_OUTPUT)


if __name__ == "__main__":
    build_pdf()
