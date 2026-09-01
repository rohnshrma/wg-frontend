// Static copy for the /mern-course-gurugram page. Client-safe: no import of
// the large src/data/courses.ts here (curriculum and project data derived
// from that record live in mern-data.ts, which only the server component
// imports and passes down as props).
//
// Facts here match courseData["mern-stack-development"] and
// src/config/site.ts. No batch dates, headcounts, salaries or placement
// rates are invented; where the source has no number, this page shows none.

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  badge: "Sector-14 Gurugram, and fully online",
  h1: "Become a Job-Ready Full-Stack Developer",
  lede: "This is a MERN Stack course in Gurugram, run on campus and online, for people who want to build web apps for a living. You work with MongoDB, Express, React and Node from the first week, and a mentor is there to catch what you miss.",
  bullets: [
    "One language, JavaScript, from the browser down to the database",
    "Ten or more projects on your GitHub, each one checked by a working developer",
    "You learn the Git workflow, code reviews and interview prep that a job asks for",
  ],
  facts: [
    { label: "Duration", value: "7 months" },
    { label: "Format", value: "Gurgaon or Online" },
    { label: "Batch size", value: "Max 15" },
    { label: "Level", value: "Beginner → Advanced" },
  ],
};

// Marked with * and reconciled by the footnote below. Indicative figures,
// not audited metrics.
export const trustStats = [
  { value: "300+", label: "Students Trained" },
  { value: "4.8★", label: "Student Rating" },
  { value: "15", label: "Max Batch Size" },
  { value: "10+", label: "Live Projects" },
  { value: "100%", label: "Placement Assistance" },
];

export const TRUST_FOOTNOTE =
  "*These numbers are indicative. Your counsellor confirms batch size, project count and what support covers before you enrol. Placement assistance means we work the job search with you. It is not a job guarantee.";

// ---------------------------------------------------------------------------
// Why MERN
// ---------------------------------------------------------------------------

export const whyMern: { title: string; body: string; file: string; snippet: string }[] = [
  {
    title: "One JavaScript ecosystem",
    file: "shared/user.js",
    body: "Browser, server, build tools. It is all JavaScript. Learn the language properly once and you can work anywhere in the stack.",
    snippet: "// runs on client AND server\nconst user = await getUser(id);",
  },
  {
    title: "Build complete applications",
    file: "request.flow",
    body: "You go from the React screen to the Express API to the MongoDB collection. The whole request is yours, not one slice of it.",
    snippet: "UI  →  API  →  DB\nReact   Express   Mongo",
  },
  {
    title: "Skills that carry over",
    file: "components/App.jsx",
    body: "React and Node are everywhere. Once you know them, Next.js, React Native and most modern setups are a short hop.",
    snippet: "import { useState }\n  from 'react';",
  },
  {
    title: "Fast to build, fast to change",
    file: "~/project $",
    body: "npm, hot reload, JSON from end to end. You ship a working feature in an afternoon instead of a week.",
    snippet: "$ npm run dev\n▲ ready in 480 ms",
  },
  {
    title: "A portfolio you can defend",
    file: "~/project $",
    body: "Every module leaves working code on your GitHub. In an interview you open the repo and walk through it.",
    snippet: "$ git push origin main\n→ 12 projects live",
  },
];

// ---------------------------------------------------------------------------
// Interactive MERN stack diagram
// ---------------------------------------------------------------------------

export type StackNodeId = "react" | "express" | "node" | "mongodb";

export const stackNodes: {
  id: StackNodeId;
  name: string;
  role: string;
  tint: string;
  summary: string;
  points: string[];
  code: string;
}[] = [
  {
    id: "react",
    name: "React.js",
    role: "The interface layer",
    tint: "#61DAFB",
    summary:
      "A component library for the interface. It draws your data on the screen, takes user input, and calls the API.",
    points: [
      "Components and JSX for reusable UI",
      "Hooks: useState, useEffect, useContext, useRef",
      "State and props, and how data moves through the tree",
      "React Router for navigation without a page reload",
      "Talking to the API with fetch or Axios",
    ],
    code: "function Courses() {\n  const [list, setList] = useState([]);\n  useEffect(() => {\n    fetch('/api/courses')\n      .then(r => r.json())\n      .then(setList);\n  }, []);\n  return <CourseGrid data={list} />;\n}",
  },
  {
    id: "express",
    name: "Express.js",
    role: "The web framework",
    tint: "#9CA3AF",
    summary:
      "A thin framework on top of Node. It turns an HTTP request into a route, runs it through middleware, and sends JSON back.",
    points: [
      "Routing for GET, POST, PUT and DELETE",
      "The middleware chain: auth, logging, CORS, Helmet",
      "Designing a REST API and its status codes",
      "Error-handling middleware",
      "Validating and cleaning the request",
    ],
    code: "const router = express.Router();\n\nrouter.get('/courses', async (req, res) => {\n  const courses = await Course.find();\n  res.json(courses);\n});\n\nrouter.use(errorHandler);",
  },
  {
    id: "node",
    name: "Node.js",
    role: "The runtime",
    tint: "#8CC84B",
    summary:
      "Runs JavaScript on the server, event-driven and non-blocking. It is what makes Express, npm and your build tools work.",
    points: [
      "The event loop and non-blocking I/O",
      "The npm ecosystem and package.json",
      "Core modules: fs, path, http, events",
      "Async code with promises and async/await",
      "Environment config and backend services",
    ],
    code: "import 'dotenv/config';\nimport express from 'express';\n\nconst app = express();\napp.use(express.json());\napp.use('/api', router);\n\napp.listen(process.env.PORT);",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "The database",
    tint: "#00ED64",
    summary:
      "A document database. Data lives as JSON-like documents instead of table rows. Mongoose adds schemas, validation and queries on top.",
    points: [
      "Documents and collections, next to tables and rows",
      "CRUD and the query operators",
      "Aggregation pipelines",
      "Mongoose schemas, validation and population",
      "Data modelling and indexes on Atlas",
    ],
    code: "const courseSchema = new Schema({\n  title:    { type: String, required: true },\n  slug:     { type: String, unique: true },\n  fees:     Number,\n  isActive: { type: Boolean, default: true },\n});\n\nexport default model('Course', courseSchema);",
  },
];

// ---------------------------------------------------------------------------
// "From API request to database" scroll flow
// ---------------------------------------------------------------------------

export const apiFlowSteps: {
  label: string;
  sub: string;
  kind: "client" | "server" | "db";
  detail: string;
}[] = [
  { label: "React UI", sub: "A user opens the Courses page", kind: "client", detail: "<CourseList /> mounts" },
  { label: "GET /api/courses", sub: "The component calls fetch()", kind: "client", detail: "fetch('/api/courses').then(r => r.json())" },
  { label: "Express route", sub: "The router matches the path", kind: "server", detail: "router.get('/courses', ctrl.list)" },
  { label: "Middleware", sub: "Auth, then validation, then logging", kind: "server", detail: "auth() → validate(query) → rateLimit()" },
  { label: "Controller", sub: "Your logic runs", kind: "server", detail: "const data = await courseService.list(req.query)" },
  { label: "MongoDB", sub: "Course.find() through Mongoose", kind: "db", detail: "Course.find(filter).sort(sort).limit(20)" },
  { label: "JSON response", sub: "200, with the data attached", kind: "server", detail: "res.status(200).json({ data })" },
  { label: "React re-renders", sub: "State updates and the UI paints", kind: "client", detail: "setCourses(data) → list paints" },
];

export const curriculumPhases = [
  "Web foundations",
  "JavaScript core",
  "Backend",
  "Data",
  "Frontend framework",
  "Scale & ship",
];

// ---------------------------------------------------------------------------
// Why WebiGeeks
// ---------------------------------------------------------------------------

export const differentiators: { title: string; body: string }[] = [
  { title: "A mentor, not a playlist", body: "Classes are live, taught by people who write code for a living. You ask a question in class and you get the answer in class." },
  { title: "Small batches", body: "Fifteen students, capped. Your mentor knows your code, and knows where you keep getting stuck." },
  { title: "Your code gets reviewed", body: "A developer reads through each project with you before it goes on your GitHub. Naming, structure, the edge cases a passing test hides." },
  { title: "The workflow a team uses", body: "From module nine you work in branches and pull requests, with review comments, the way code ships at a company." },
  { title: "You deploy it for real", body: "Every capstone goes live on Vercel or Render, with a database on Atlas and a domain of your own." },
  { title: "AI is part of the work", body: "You use ChatGPT, Claude and Copilot inside real tasks: prompting, reading the output, fixing what is wrong. Not pasting and hoping." },
  { title: "Interview prep is built in", body: "Fundamentals for the DSA round, mock interviews, and a run-through of your projects before the job hunt starts." },
  { title: "Placement support", body: "We help with your resume and LinkedIn, run mock interviews, and introduce you to companies that hire from us." },
];

// ---------------------------------------------------------------------------
// Career outcomes
// ---------------------------------------------------------------------------

export const careerPath = [
  { role: "Frontend Developer", note: "React, responsive UI, state" },
  { role: "React Developer", note: "Hooks, Redux Toolkit, component design" },
  { role: "Node.js / Backend Developer", note: "Express APIs, auth, databases" },
  { role: "MERN / Full-Stack Developer", note: "You own the whole feature" },
  { role: "Software Developer", note: "General web engineering" },
];

export const canBuild = [
  "Take a feature from the React screen all the way to the database row",
  "Design a REST API and lock it down with JWT and roles",
  "Model data in MongoDB, and query it in SQL too",
  "Put an app on the internet with Vercel, Render and Atlas",
];

export const CAREER_FOOTNOTE =
  "For full-stack roles in India, freshers commonly start somewhere between ₹4 and ₹12 LPA*. It moves with your background, your city and how the interviews go. We cannot promise a number.";

// ---------------------------------------------------------------------------
// Learning modes
// ---------------------------------------------------------------------------

export const learningModes: {
  title: string;
  where: string;
  cmd: string;
  body: string;
  points: string[];
}[] = [
  {
    title: "Classroom",
    where: "Sector-14, Gurugram",
    cmd: "$ cd ~/campus/sector-14",
    body: "You come to the campus. Classes are in person, the lab is there when you need it, and the mentor is a desk away.",
    points: ["Old DLF Colony, Sector-14", "Near Sikanderpur and HUDA City Centre metro", "Morning, evening and weekend batches"],
  },
  {
    title: "Live Online",
    where: "From anywhere",
    cmd: "$ join --live --online",
    body: "The same classes, streamed live. Not recordings you watch alone. Every session is still recorded so you can go back over it.",
    points: ["Live, instructor-led sessions", "Recordings kept for revision", "Weekday and weekend batches"],
  },
  {
    title: "Hybrid",
    where: "Switch as you need",
    cmd: "$ mode --hybrid",
    body: "Turn up on campus the weeks you can. Join online the weeks you cannot. Nothing else changes.",
    points: ["Move between online and offline", "Same content, same mentor", "Fits around a job"],
  },
];

// ---------------------------------------------------------------------------
// Pricing — ₹30,000 list fee (courseData.fees) with the current offer price.
// ---------------------------------------------------------------------------

export const pricing = {
  listPrice: "₹30,000",
  offerPrice: "₹19,999",
  duration: "7 months, 16 modules",
  includes: [
    "All 16 modules, from your first HTML tag to a deployed app",
    "Ten or more projects, each reviewed with a mentor",
    "Live classes, on campus or online",
    "Recordings and lifetime access to the material",
    "The Git workflow, and working with AI tools",
    "Interview prep and mock technical rounds",
    "Placement support: resume, LinkedIn, introductions",
    "A completion certificate and a GitHub portfolio review",
  ],
  emiNote: "You can pay in instalments. Ask your counsellor what the current plan looks like.",
};

// ---------------------------------------------------------------------------
// FAQ — MERN-specific, consistent with courseData.faqs. The placement answer
// stays honest: assistance, not a guarantee.
// ---------------------------------------------------------------------------

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is the MERN stack?",
    a: "MERN is four tools that all run on JavaScript: MongoDB for the database, Express for the server, React for the interface, and Node underneath it all. Because it is one language across the whole thing, one person can build a complete web app.",
  },
  {
    q: "Is this course suitable for complete beginners?",
    a: "Yes. Week one starts with your first line of HTML, and JavaScript is taught from scratch before any framework. Most people who join have never written code before.",
  },
  {
    q: "Do I need prior programming experience?",
    a: "No. If you already code, the early web and JavaScript weeks will move fast for you. Nothing is assumed.",
  },
  {
    q: "What will I actually learn?",
    a: "Sixteen modules. HTML, CSS and Bootstrap. JavaScript, the DOM and jQuery. Node and Express. Git and GitHub. SQL, MongoDB and Mongoose. REST APIs and authentication. React and Redux Toolkit. TypeScript. Deployment. Each one ends with code on your GitHub.",
  },
  {
    q: "Will I build real projects?",
    a: "Yes, ten or more. The bigger ones are an e-commerce platform, a food-ordering app, a job portal and a student management system. Smaller pieces sit alongside them. A mentor reviews each project before it goes public.",
  },
  {
    q: "Will I learn React and Node.js properly?",
    a: "Yes. React covers components, hooks, routing, API calls and Redux Toolkit. Node covers the runtime, npm, the core modules, async code, and building services with Express.",
  },
  {
    q: "Will I learn MongoDB?",
    a: "Yes. The document model, CRUD, the query operators, aggregation pipelines, and Mongoose schemas and population, all against MongoDB Atlas. SQL basics come with it.",
  },
  {
    q: "Will I learn Git and GitHub?",
    a: "Yes. It has its own module, and after that it is the workflow for every project. Branches, merges, pull requests, review comments, the lot.",
  },
  {
    q: "Is the course available offline in Gurugram?",
    a: "Yes. You can attend in person at our Sector-14 campus in Old DLF Colony, near Sikanderpur and HUDA City Centre metro. You can also join live online, or mix the two.",
  },
  {
    q: "Is online training available?",
    a: "Yes. Online students get the same classes, the same mentors and the same batch structure. Sessions are recorded for revision, but the class itself is live.",
  },
  {
    q: "How long is the course, and how much time will it take each week?",
    a: "Seven months, sixteen modules. Plan for about an hour of live class a day, plus two to three hours of practice and project work. Roughly 15 to 20 hours a week. It is meant to fit around a job or college.",
  },
  {
    q: "Do you provide placement assistance?",
    a: "Yes. We help with your resume and LinkedIn, run mock interviews, review your GitHub, and introduce you to companies that hire from us.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No. No honest training programme can promise you a job, so we do not. What we do is work the job search with you and prepare you for the interviews. That is real support, not a promise.",
  },
  {
    q: "Can I pay the fee in instalments?",
    a: "Yes. Instalment options are available. Ask your counsellor for the current plan when you book a demo.",
  },
];
