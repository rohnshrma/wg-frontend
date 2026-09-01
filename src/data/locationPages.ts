// Content for every /[course]-course-gurugram landing page. Kept as one
// central data file — rather than 12 separately-authored page.tsx files —
// specifically so sitemap.ts and CourseDetailContent's location-page links
// read from this same list and can't silently drift out of sync with each
// other the way the old hardcoded Footer course list did.
//
// Each entry's `whyChooseUs` and `localFaqs` are written from that course's
// real facts (mode/duration/fee/level, pulled from the production API) —
// not the same four bullets with the course name swapped. The shared
// address/directions/metro-access FAQ lives once in the rendering
// component instead of being repeated here per course, since that's a
// single real fact, not content that needs 12 rewrites.

export interface LocationPageContent {
  courseSlug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  h1: string;
  heroPitch: string;
  whyChooseUs: string[];
  localFaqs: { question: string; answer: string }[];
}

export const locationPages: LocationPageContent[] = [
  {
    courseSlug: "mern-stack-development",
    path: "/mern-course-gurugram",
    metaTitle: "MERN Stack Course in Gurugram",
    metaDescription:
      "MERN Stack course in Gurugram and online. Go from beginner to job-ready full-stack developer in 7 months with React, Node, Express and MongoDB.",
    breadcrumbLabel: "MERN Course in Gurugram",
    h1: "Become a Job-Ready Full-Stack Developer",
    heroPitch:
      "A 7-month, project-based MERN Stack programme run from our Sector-14 campus — offline for Gurugram-based students, fully online for everyone else, same instructors and curriculum either way.",
    whyChooseUs: [
      "A physical campus in Sector-14 — not just a login link — for students who want in-person mentorship without giving up the option to join online on a busy week.",
      "Batches capped at 15 students, so questions get answered directly instead of queued in a chat window.",
      "The same 16-module, project-heavy curriculum covered on our full MERN Stack course page — HTML through deployment — taught by the same instructors online or in person.",
      "100% placement assistance: resume building, mock interviews, LinkedIn optimisation, and direct referrals, run from the Gurugram campus for both online and offline students.",
    ],
    localFaqs: [
      {
        question: "Do you run offline MERN Stack batches in Gurugram, or only online?",
        answer:
          "Both. You can attend the full 7-month MERN Stack programme in person at the Sector-14 campus, or join the same curriculum and instructors fully online with recorded backups — many of our Gurugram students mix both depending on their week.",
      },
      {
        question: "How is the Gurugram batch different from an online-only course?",
        answer:
          "Same curriculum and mentors either way. Offline students at the Gurugram campus get direct in-person doubt-clearing and access to the physical lab; it comes down to whether you'd rather commute to Sector-14 or learn remotely.",
      },
    ],
  },
  {
    courseSlug: "python-programming",
    path: "/python-course-gurugram",
    metaTitle: "Python Course in Gurugram | Beginner to Advanced Training",
    metaDescription:
      "Python course at our Sector-14, Gurugram campus — offline or online, 2-3 months, OOP to Flask/Django, 3 milestone projects. Near Sikanderpur & HUDA City Centre metro.",
    breadcrumbLabel: "Python Course in Gurugram",
    h1: "Python Course in Gurugram",
    heroPitch:
      "A 2-3 month Python programme built for absolute beginners and career switchers — from your first line of code to OOP, decorators, and web apps with Flask/Django. Offline at our Sector-14 campus or fully online.",
    whyChooseUs: [
      "The shortest, lowest-cost course in our catalogue — built as the entry point for people who've never written code, not a shortened version of a harder course.",
      "Three milestone projects along the way (a logic app, an OOP application, and a final capstone), so you have real, working code to show before the course even ends.",
      "Batches capped at 15 students, offline at our Sector-14 campus for Gurugram-based students, or fully online with recorded backups.",
      "A natural next step into MERN Stack, Data Analytics, or Data Science once you're comfortable — many Python graduates continue with us rather than starting over elsewhere.",
    ],
    localFaqs: [
      {
        question: "I've never coded before — can I really start with Python in Gurugram?",
        answer:
          "Yes — this is the course we built for exactly that. It starts from installing Python and using the command line, not from an assumption you already know how to code. Most of our Gurugram Python batch has been complete beginners.",
      },
      {
        question: "Should I learn Python or jump straight into MERN Stack?",
        answer:
          "If you're an absolute beginner or want the fastest, cheapest path to your first working code, start with Python. If you already know you want to build web applications and don't mind a longer, deeper programme, MERN Stack is the more direct route.",
      },
    ],
  },
  {
    courseSlug: "data-analytics",
    path: "/data-analytics-course-gurugram",
    metaTitle: "Data Analytics Course in Gurugram | Excel to Power BI",
    metaDescription:
      "Data Analytics training at our Sector-14, Gurugram campus — Excel, SQL, Python, Power BI & Tableau. 6-7 months, offline or online, real business projects.",
    breadcrumbLabel: "Data Analytics Course in Gurugram",
    h1: "Data Analytics Course in Gurugram",
    heroPitch:
      "A 6-7 month Data Analytics programme run from our Sector-14 campus that starts at Excel fundamentals and builds up through SQL, Python, Power BI, and Tableau — for people moving into data roles from a non-programming background as much as for career switchers who already code.",
    whyChooseUs: [
      "Starts from Excel, not Python — built for people whose background is business, finance, or operations, not computer science, and who need the full analytics stack, not just one tool.",
      "Covers Power BI and Tableau inside the same programme, so you graduate able to actually build the dashboards analytics roles are hired to produce, not just describe them.",
      "Offline at our Sector-14 campus or fully online, with the same instructors and real business case studies (retail, finance, healthcare, e-commerce) either way.",
      "100% placement assistance on top of the technical training — resume building, mock interviews, and direct referrals from our Gurugram-based hiring network.",
    ],
    localFaqs: [
      {
        question: "I have a non-technical background — can I still do Data Analytics in Gurugram?",
        answer:
          "Yes — the course is structured to start from Excel basics precisely because most of our Gurugram Data Analytics students come from business, commerce, or operations backgrounds, not computer science.",
      },
      {
        question: "What's the difference between this and the Data Science course?",
        answer:
          "Data Analytics focuses on extracting and communicating insight from existing data — Excel, SQL, Power BI, Tableau — and is a beginner-level course. Data Science goes further into building predictive models with Python, machine learning, and deep learning, and assumes some existing programming comfort.",
      },
    ],
  },
  {
    courseSlug: "power-bi",
    path: "/power-bi-training-gurugram",
    metaTitle: "Power BI Training in Gurugram | Dashboards & DAX",
    metaDescription:
      "Power BI training at our Sector-14, Gurugram campus — DAX, data modeling, real dashboards, certification. 2 months, offline or online.",
    breadcrumbLabel: "Power BI Training in Gurugram",
    h1: "Power BI Training in Gurugram",
    heroPitch:
      "A focused, 2-month Power BI programme at our Sector-14 campus for working professionals who need one specific, high-demand skill — DAX, data modeling, and real interactive dashboards — without committing to a multi-month career-change course.",
    whyChooseUs: [
      "A short, specific upskilling course, not a repackaged slice of our full Data Analytics programme — built for people who already have a job and want one tool mastered well.",
      "Goes beyond basic charting into DAX measures, star-schema data modeling, and the AI visuals (Decomposition Tree, Key Influencers) that separate a working analyst from someone who's only used the drag-and-drop features.",
      "Offline at our Sector-14 campus or fully online — either way you leave with real dashboards built on real business data, not a template.",
      "A certification on completion, which matters for Power BI specifically since it's often the credential that gets checked in interviews for BI-analyst roles in Gurugram's corporate offices.",
    ],
    localFaqs: [
      {
        question: "Is this course enough on its own, or do I need the full Data Analytics course first?",
        answer:
          "Power BI Training stands alone — it's built for people who want this one tool, not the full Excel-to-Tableau analytics stack. If you later want the broader programme, our Data Analytics course covers Power BI as one module within it.",
      },
      {
        question: "Can working professionals in Gurugram fit this course around a full-time job?",
        answer:
          "Yes — it's a short, 2-month programme specifically because most Power BI students already have a job. Both offline (Sector-14 campus) and online formats are available; ask us about current batch timings when you enquire.",
      },
    ],
  },
  {
    courseSlug: "data-science",
    path: "/data-science-course-gurugram",
    metaTitle: "Data Science Course in Gurugram | ML & Deep Learning",
    metaDescription:
      "Data Science course at our Sector-14, Gurugram campus — Python, ML, Deep Learning, NLP, GenAI. 4 months, offline or online, production model deployment.",
    breadcrumbLabel: "Data Science Course in Gurugram",
    h1: "Data Science Course in Gurugram",
    heroPitch:
      "A 4-month, intermediate-level Data Science programme at our Sector-14 campus — Machine Learning, Deep Learning, NLP, and Generative AI, ending in a capstone project deployed the way production models actually get shipped, not left in a notebook.",
    whyChooseUs: [
      "An intermediate-level course, not a beginner one — built for people with some existing Python comfort who are ready to go straight into regression, classification, and neural networks rather than repeating programming basics.",
      "Covers the full modern stack in one programme: classical ML, deep learning (CNNs, RNNs, transfer learning), NLP, and practical GenAI/prompt engineering.",
      "Ends with real deployment — Flask/FastAPI, Docker basics, cloud deployment — so the capstone project is a working, shippable thing, not just a trained model file.",
      "Offline at our Sector-14 campus or fully online, with direct mentor access either way given our small batch sizes.",
    ],
    localFaqs: [
      {
        question: "Do I need Python experience before starting Data Science in Gurugram?",
        answer:
          "Basic programming knowledge helps but isn't mandatory — the course does start from Python fundamentals for data science before moving into statistics and ML, so a genuine beginner can follow it, though it moves faster than our dedicated Python course.",
      },
      {
        question: "Is this the same as the Artificial Intelligence course?",
        answer:
          "No — Data Science is the broader, intermediate-level foundation (statistics, ML, an intro to deep learning and NLP). Artificial Intelligence is our advanced course, going deeper into computer vision, transformer architectures, and generative AI, and is a natural next step after Data Science rather than a substitute for it.",
      },
    ],
  },
  {
    courseSlug: "artificial-intelligence",
    path: "/ai-course-gurugram",
    metaTitle: "AI Course in Gurugram | Neural Networks to GenAI",
    metaDescription:
      "Advanced Artificial Intelligence training at our Sector-14, Gurugram campus — Computer Vision, NLP, Transformers, Generative AI. 5 months, hybrid.",
    breadcrumbLabel: "AI Course in Gurugram",
    h1: "Artificial Intelligence Course in Gurugram",
    heroPitch:
      "Our most advanced programme, run from the Sector-14 campus — 5 months deep into Computer Vision, NLP and Transformer architectures, Generative AI, and Reinforcement Learning, for students who already have a Data Science or equivalent ML foundation.",
    whyChooseUs: [
      "An advanced-level course by design — not a rebrand of Data Science, but the deeper programme for people who already have that foundation and want to specialise.",
      "Genuinely current curriculum: GANs, diffusion models, LLM fine-tuning, and practical LangChain/Hugging Face work, alongside the classical CNN/object-detection/NLP fundamentals.",
      "Reinforcement Learning is covered as its own module (Q-Learning, policy gradients, deep RL) — a topic most local institutes at this level skip entirely.",
      "Small batches at the Sector-14 campus or online, which matters more at this level than at the beginner courses, since advanced material needs faster individual feedback.",
    ],
    localFaqs: [
      {
        question: "Do I need to complete the Data Science course first?",
        answer:
          "Not formally required, but strongly recommended — this course assumes real comfort with Python and ML fundamentals from day one. Our Data Science course is the natural, and easiest, path in if you're starting from a general programming background.",
      },
      {
        question: "Is this course available offline at the Gurugram campus?",
        answer:
          "Yes — it's a hybrid programme, so you can attend in person at Sector-14 or join online, with the same instructors and project work either way.",
      },
    ],
  },
  {
    courseSlug: "sql",
    path: "/sql-course-gurugram",
    metaTitle: "SQL Course in Gurugram | Joins to Window Functions",
    metaDescription:
      "SQL training at our Sector-14, Gurugram campus — joins, subqueries, window functions, CTEs. 6 weeks, offline or online, 100+ practice problems.",
    breadcrumbLabel: "SQL Course in Gurugram",
    h1: "SQL Course in Gurugram",
    heroPitch:
      "A focused 6-week SQL course at our Sector-14 campus — from SELECT statements through window functions and CTEs — built for a fast, specific outcome: real SQL fluency for interviews and on-the-job work, not a semester-long detour.",
    whyChooseUs: [
      "Our shortest and lowest-cost course, by design — the fastest way to get one concrete, interview-tested skill rather than a multi-month commitment.",
      "Goes past basic SELECT/WHERE into the material that actually differentiates candidates in interviews: window functions (ROW_NUMBER, RANK, LAG/LEAD) and recursive CTEs.",
      "100+ practice problems on real databases, not just slides — the kind of repetition that makes syntax stick before an interview, not just during the class.",
      "Offline at our Sector-14 campus or fully online — a 6-week course fits around a job search or a current job either way.",
    ],
    localFaqs: [
      {
        question: "Can I finish this course before an upcoming job interview?",
        answer:
          "That's exactly what it's built for — 6 weeks, focused specifically on the SQL concepts (joins, subqueries, window functions) that come up most often in technical interviews, not a broad database-theory course.",
      },
      {
        question: "Do I need any prior database experience?",
        answer:
          "No — the course starts from relational database fundamentals (tables, keys, normalisation) before moving into query writing, so complete beginners can follow it.",
      },
    ],
  },
  {
    courseSlug: "java-programming",
    path: "/java-course-gurugram",
    metaTitle: "Java Course in Gurugram | OOP to Spring Boot",
    metaDescription:
      "Offline Java programming course at our Sector-14, Gurugram campus — OOP, Collections, JDBC, intro to Spring Boot. 3 months, interview-ready curriculum.",
    breadcrumbLabel: "Java Course in Gurugram",
    h1: "Java Course in Gurugram",
    heroPitch:
      "A 3-month, offline-only Java programme at our Sector-14 campus — OOP fundamentals through Collections, multithreading, JDBC, and an introduction to Spring Boot, taught entirely in person.",
    whyChooseUs: [
      "Offline-only — Java at WebiGeeks is taught exclusively at the Sector-14 campus, so if you're searching for Java training in Gurugram specifically, this course requires showing up, not an online course with a Gurugram landing page attached.",
      "Covers both console applications and an intro to Spring Boot, so the course bridges core Java fundamentals into the framework most enterprise Java roles actually use.",
      "Interview-ready curriculum — Collections, multithreading, and JDBC are exactly the areas Java interviews probe, not a generic syntax tour.",
      "Small in-person batches mean direct instructor time on the parts of Java (memory model, concurrency) that are hard to self-teach from documentation alone.",
    ],
    localFaqs: [
      {
        question: "Is the Java course available online, or only at the Gurugram campus?",
        answer:
          "Offline only, at our Sector-14 campus. Unlike most of our other courses, we don't currently run this one online — so this page is specifically for students who can attend in person in Gurugram.",
      },
      {
        question: "Does this course cover Spring Boot in depth?",
        answer:
          "It's an introduction to Spring Boot after building a solid core-Java foundation (OOP, Collections, JDBC) — enough to understand how enterprise Java applications are structured, positioned as a strong starting point rather than a deep-dive Spring specialisation.",
      },
    ],
  },
  {
    courseSlug: "c-cpp-programming",
    path: "/c-cpp-course-gurugram",
    metaTitle: "C / C++ Course in Gurugram | DSA Foundations",
    metaDescription:
      "Offline C/C++ programming classes at our Sector-14, Gurugram campus — pointers, memory management, STL, DSA basics. 2 months, competitive-coding ready.",
    breadcrumbLabel: "C / C++ Course in Gurugram",
    h1: "C / C++ Course in Gurugram",
    heroPitch:
      "A 2-month, offline-only C/C++ course at our Sector-14 campus focused on the fundamentals — pointers, memory management, and the STL — that everything else in software engineering, from DSA interviews to systems programming, is built on.",
    whyChooseUs: [
      "Offline-only at the Sector-14 campus — built for in-person learning of concepts (pointers, manual memory management) that are notoriously hard to absorb from a video alone.",
      "Our lowest-cost course after MS Excel and SQL, built as an accessible entry point for engineering students who want DSA-ready fundamentals before tackling interview prep.",
      "STL coverage alongside core C/C++ — the standard library knowledge that's assumed, not taught, in most competitive-programming and DSA courses elsewhere.",
      "A genuine foundation course — most of our Gurugram students take this before or alongside a DSA/interview-prep track, not as a standalone career course.",
    ],
    localFaqs: [
      {
        question: "Is this a beginner course, or do I need prior programming experience?",
        answer:
          "Beginner-level — it's designed as a foundations course, so no prior programming experience is assumed.",
      },
      {
        question: "Will this course prepare me for coding interviews and DSA rounds?",
        answer:
          "It builds the foundation DSA interview prep is built on — pointers, memory management, and the STL — rather than being a DSA/interview-prep course itself. Most students treat it as the first step before dedicated interview preparation.",
      },
    ],
  },
  {
    courseSlug: "ms-excel",
    path: "/ms-excel-course-gurugram",
    metaTitle: "MS Excel Course in Gurugram | Business Analysis",
    metaDescription:
      "Online MS Excel training for Gurugram professionals — advanced formulas, PivotTables, macros, VBA for business and data roles. 4 weeks.",
    breadcrumbLabel: "MS Excel Course in Gurugram",
    h1: "MS Excel Course for Gurugram Professionals",
    heroPitch:
      "A focused, 4-week, fully online Excel course for Gurugram working professionals who need real business-analysis skills — advanced formulas, PivotTables, and VBA — without a campus visit or a long time commitment.",
    whyChooseUs: [
      "Fully online by design — this is the one course in our catalogue built entirely around working professionals who need a fast, flexible skill upgrade, not a campus visit.",
      "Our lowest-cost, shortest course — 4 weeks, ₹5,000 — because the goal is one specific, immediately-usable skill set, not a career change.",
      "Goes past basic formulas into PivotTables, macros, and VBA — the Excel skills that actually get noticed in business and data-adjacent roles, not just spreadsheet formatting.",
      "Real business templates and scenarios, not generic practice files, since most students are applying this directly to a current job.",
    ],
    localFaqs: [
      {
        question: "Is there an offline batch at the Gurugram campus for Excel?",
        answer:
          "No — MS Excel is currently an online-only course, which is why this page is framed around Gurugram professionals learning remotely rather than campus visits, unlike most of our other courses.",
      },
      {
        question: "Is this enough to move into a data analyst role, or should I take Data Analytics instead?",
        answer:
          "This course is a strong, fast upgrade to your existing Excel skills. If you're aiming to move into a data analyst role specifically, our Data Analytics course covers Excel as its first module before going into SQL, Python, and Power BI — a bigger commitment but a more complete path into that career.",
      },
    ],
  },
  {
    courseSlug: "react-js",
    path: "/react-course-gurugram",
    metaTitle: "React JS Course in Gurugram | Modern Frontend",
    metaDescription:
      "React.js training at our Sector-14, Gurugram campus — hooks, Redux Toolkit, routing, real project builds. 6 weeks, offline or online.",
    breadcrumbLabel: "React JS Course in Gurugram",
    h1: "React JS Course in Gurugram",
    heroPitch:
      "A focused, 6-week React.js course at our Sector-14 campus for developers who already know JavaScript and want modern frontend skills specifically — hooks, Redux Toolkit, and routing — without the full MERN Stack's backend modules.",
    whyChooseUs: [
      "An intermediate-level, React-only course — for developers who already have JavaScript fundamentals and want frontend depth quickly, rather than starting over with our full-stack MERN programme.",
      "Covers the modern React ecosystem specifically: hooks, custom hooks, Redux Toolkit and RTK Query, and React Router — not the older class-component patterns still taught in a lot of legacy course material.",
      "Real project builds, not isolated exercises — the same project-based approach as our full MERN course, scoped to frontend only.",
      "Offline at our Sector-14 campus or fully online, in a compact enough format to fit around an existing job or ongoing studies.",
    ],
    localFaqs: [
      {
        question: "Do I need to know JavaScript before taking this course?",
        answer:
          "Yes — this is an intermediate-level, React-specific course that assumes JavaScript fundamentals. If you're starting from zero, our Python course or the full MERN Stack programme (which teaches JavaScript from scratch) are better starting points.",
      },
      {
        question: "How is this different from the React module inside the MERN Stack course?",
        answer:
          "Same core React content, but this course is scoped and paced for developers who only want frontend skills right now — 6 weeks instead of 7 months — without the Node.js, Express, and MongoDB backend modules the full MERN programme includes.",
      },
    ],
  },
  {
    courseSlug: "typescript",
    path: "/typescript-course-gurugram",
    metaTitle: "TypeScript Course in Gurugram | Type-Safe JavaScript",
    metaDescription:
      "TypeScript training at our Sector-14, Gurugram campus for JS developers — generics, interfaces, React & Node integration. 4 weeks, offline or online.",
    breadcrumbLabel: "TypeScript Course in Gurugram",
    h1: "TypeScript Course in Gurugram",
    heroPitch:
      "A compact, 4-week TypeScript course at our Sector-14 campus for working JavaScript developers — type annotations, generics, and interfaces through to using TypeScript in real React and Node.js codebases.",
    whyChooseUs: [
      "Our shortest technical course — built for developers who already write JavaScript daily and need TypeScript specifically, not a general programming course.",
      "Goes beyond basic type annotations into generics, utility types (Partial, Pick, Omit), and typing real React props and Node/Express backends — the parts that trip up developers moving from plain JS.",
      "Small batches at the Sector-14 campus or online, which matters for a fast-paced, intermediate-level course like this one.",
      "A natural pairing with our MERN Stack or React JS courses for developers who want to add type safety to a stack they're already learning.",
    ],
    localFaqs: [
      {
        question: "Is TypeScript hard to learn if I already know JavaScript?",
        answer:
          "It's a fast add-on for a working JavaScript developer — most of the course is about the type system layered on top of syntax you already know, which is why it's a 4-week course rather than a multi-month one.",
      },
      {
        question: "Should I learn TypeScript before or after MERN Stack?",
        answer:
          "Either order works. Some Gurugram students take this after MERN Stack to add type safety to what they've already built; others take it alongside React JS if they're frontend-focused. It assumes JavaScript fundamentals either way, so it isn't a first course for someone starting from zero.",
      },
    ],
  },
];

export function getLocationPageContent(courseSlug: string): LocationPageContent | undefined {
  return locationPages.find((p) => p.courseSlug === courseSlug);
}
