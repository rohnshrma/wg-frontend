// Server-only derivation of the MERN course record. Kept in its own module
// (imported only by page.tsx, a Server Component) so the large
// src/data/courses.ts object never ends up in the client bundle. The
// interactive client components receive `curriculum` / `projects` as props.
//
// Every field here is mapped straight off courseData["mern-stack-development"]
// — the same authoritative record the /courses/mern-stack-development detail
// page renders. Nothing is invented.

import { courseData } from "@/data/courses";

type RawModule = { module: string; topics: string[] };
type RawProject = { title: string; desc: string };

const MERN = courseData["mern-stack-development"] as {
  description: string;
  duration: string;
  fees: number;
  technologies: string[];
  curriculum: RawModule[];
  projects: RawProject[];
  careers: string[];
};

// The curriculum array has 13 entries, but three of them each cover two
// numbered modules ("Module 5 & 6", "10 & 11", "12 & 13"), so the programme
// is 16 modules — which is what the hero, pricing and FAQ all say. Derive
// the real count from the highest module number in the titles.
const MODULE_NUMS = MERN.curriculum.flatMap((m) => {
  const mm = m.module.match(/^Module\s+([\d\s&]+?)\s*[—-]/i);
  return mm ? mm[1].split("&").map((x) => parseInt(x.trim(), 10)) : [];
});

export const mernMeta = {
  description: MERN.description,
  duration: MERN.duration,
  moduleCount: MODULE_NUMS.length ? Math.max(...MODULE_NUMS) : MERN.curriculum.length,
  fees: MERN.fees,
};

// One-line role for each technology in courseData.technologies, mirroring the
// "Technologies You Will Master" page of the course brochure. Anything not in
// this map falls back to an empty descriptor.
const TECH_ROLE: Record<string, string> = {
  HTML5: "Semantic markup & structure",
  CSS3: "Styling, Flexbox & Grid",
  "Bootstrap 5": "Responsive UI framework",
  "JavaScript ES6+": "The language of the web",
  "React.js": "Component-based frontend",
  "Node.js": "Server-side JS runtime",
  "Express.js": "Web & API framework",
  MongoDB: "NoSQL document database",
  Mongoose: "MongoDB object modelling",
  "Git & GitHub": "Version control & review",
  TypeScript: "Type-safe JavaScript",
  "Redux Toolkit": "Predictable state management",
  "REST APIs": "API design & integration",
  "JWT Auth": "Auth & authorisation",
  Deployment: "Vercel, Render, Atlas & cloud",
};

export const technologies = MERN.technologies.map((name) => ({
  name,
  role: TECH_ROLE[name] ?? "",
}));

// A phase label, a plain-English "by the end you can" line drawn from the
// module's own topics, and the technologies it introduces. Indexed against
// courseData.curriculum.
const MODULE_META: { phase: string; outcome: string; tags: string[] }[] = [
  { phase: "Web foundations", outcome: "Write a clean HTML page that reads well to a screen reader and to Google.", tags: ["HTML5", "Accessibility", "Forms"] },
  { phase: "Web foundations", outcome: "Turn a design mockup into a layout that holds up on a phone.", tags: ["CSS3", "Flexbox", "Grid"] },
  { phase: "Web foundations", outcome: "Put a tidy responsive page together quickly with a component library.", tags: ["Bootstrap 5", "Utilities", "Components"] },
  { phase: "JavaScript core", outcome: "Write modern JavaScript, and be comfortable with closures and async code.", tags: ["JavaScript", "ES6+", "Async"] },
  { phase: "JavaScript core", outcome: "Make a page interactive with the DOM, and know where jQuery still shows up.", tags: ["DOM", "Events", "jQuery"] },
  { phase: "Backend", outcome: "Run JavaScript on the server, and explain the event loop and npm.", tags: ["Node.js", "npm", "Core modules"] },
  { phase: "Backend", outcome: "Stand up a routed server and a REST API with a middleware chain.", tags: ["Express.js", "Middleware", "EJS"] },
  { phase: "Backend", outcome: "Work the way a team does: feature branches, pull requests, reviews.", tags: ["Git", "GitHub", "PRs"] },
  { phase: "Data", outcome: "Model data in MongoDB and SQL, and query both from Node.", tags: ["SQL", "MongoDB", "Mongoose"] },
  { phase: "Data", outcome: "Build a REST API and lock it down with JWT, hashing and roles.", tags: ["REST", "JWT", "bcrypt", "RBAC"] },
  { phase: "Frontend framework", outcome: "Build a React app with state, hooks, routing and Redux Toolkit.", tags: ["React", "Hooks", "Redux Toolkit"] },
  { phase: "Scale & ship", outcome: "Add TypeScript to a React and Express codebase without the guesswork.", tags: ["TypeScript", "Generics", "Types"] },
  { phase: "Scale & ship", outcome: "Ship a full-stack app to the cloud with a domain and a deploy pipeline.", tags: ["Vercel", "Render", "Atlas", "PM2"] },
];

export type CurriculumModule = {
  n: number;
  label: string; // "01", or "05–06" for the combined entries
  title: string;
  phase: string;
  outcome: string;
  tags: string[];
  topics: string[];
};

export const curriculum: CurriculumModule[] = MERN.curriculum.map((m, i) => {
  const meta = MODULE_META[i] ?? MODULE_META[MODULE_META.length - 1];
  const numMatch = m.module.match(/^Module\s+([\d\s&]+?)\s*[—-]/i);
  const label = numMatch
    ? numMatch[1]
        .split("&")
        .map((x) => x.trim().padStart(2, "0"))
        .join("–")
    : String(i + 1).padStart(2, "0");
  return {
    n: i + 1,
    label,
    title: m.module.replace(/^Module\s[\d&\s]+—\s/, ""),
    phase: meta.phase,
    outcome: meta.outcome,
    tags: meta.tags,
    topics: m.topics,
  };
});

const PROJECT_META: Record<string, { stack: string[]; learn: string; featured?: boolean }> = {
  "E-Commerce Platform": {
    stack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "JWT"],
    learn: "Catalogue and cart state. A checkout you have to be logged in for. An admin role, and a dashboard with full CRUD.",
    featured: true,
  },
  "Food Ordering App": {
    stack: ["React", "Node.js", "Express", "MongoDB"],
    learn: "Menus that change, a cart and checkout, an order status that updates, and a view built for the restaurant.",
    featured: true,
  },
  "Job Portal System": {
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "File upload"],
    learn: "Two logins that see different things. Resume uploads. A tracker for applications, and admin approval.",
    featured: true,
  },
  "Student Management System": {
    stack: ["React", "Node.js", "Express", "MongoDB"],
    learn: "Full CRUD, plus search, sorting and filtering, and a dashboard with a few charts.",
    featured: true,
  },
  "Blog Website": {
    stack: ["Node.js", "Express", "EJS", "MongoDB"],
    learn: "Server-rendered pages with a templating engine, CRUD on posts, an Express backend behind it.",
  },
  "Weather App": {
    stack: ["JavaScript", "Fetch API", "Async/await"],
    learn: "Calling someone else's API, and handling the loading and error states that come with it.",
  },
  "To-Do App": {
    stack: ["React", "Node.js", "Express", "MongoDB"],
    learn: "The smallest full-stack loop there is: React on top, Node underneath, one database.",
  },
  "Dice Game": {
    stack: ["JavaScript", "DOM"],
    learn: "Moving things around the DOM, a bit of randomness, two-player turn logic.",
  },
};

// Illustrative build spec for each featured project — the feature list, a
// representative Mongoose model, and the REST routes you'd implement. These
// are teaching examples of what you build, not screenshots or business
// claims.
type ProjectSpec = {
  features: string[];
  schema: string;
  api: { method: string; path: string; desc: string }[];
};

const PROJECT_SPEC: Record<string, ProjectSpec> = {
  "E-Commerce Platform": {
    features: [
      "Product catalogue with categories & search",
      "Cart and wishlist state",
      "JWT register / login",
      "Checkout with payment simulation",
      "Admin panel for products, orders and users",
    ],
    schema: `const productSchema = new Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  category: { type: String, index: true },
  stock:    { type: Number, default: 0 },
  images:   [String],
}, { timestamps: true });`,
    api: [
      { method: "GET", path: "/api/products?category=", desc: "list & filter the catalogue" },
      { method: "GET", path: "/api/products/:id", desc: "one product" },
      { method: "POST", path: "/api/cart", desc: "add an item (auth)" },
      { method: "POST", path: "/api/orders", desc: "place an order (auth)" },
      { method: "GET", path: "/api/admin/orders", desc: "every order (admin, RBAC)" },
    ],
  },
  "Food Ordering App": {
    features: [
      "Dynamic menu by category",
      "Cart & checkout with order summary",
      "Live order-status tracking",
      "User accounts & profiles",
      "Restaurant admin dashboard",
    ],
    schema: `const orderSchema = new Schema({
  user:   { type: ObjectId, ref: 'User' },
  items:  [{ dish: { type: ObjectId, ref: 'Dish' }, qty: Number }],
  total:  Number,
  status: { type: String, enum: ['placed','cooking','out','delivered'],
            default: 'placed' },
}, { timestamps: true });`,
    api: [
      { method: "GET", path: "/api/menu", desc: "menu grouped by category" },
      { method: "POST", path: "/api/orders", desc: "place an order (auth)" },
      { method: "PATCH", path: "/api/orders/:id/status", desc: "advance status (restaurant)" },
      { method: "GET", path: "/api/orders/mine", desc: "the signed-in user's orders" },
    ],
  },
  "Student Management System": {
    features: [
      "Create, edit and delete records",
      "Search, sort and filter",
      "Analytics dashboard with charts",
      "Full MongoDB + Mongoose integration",
      "Pagination on the API",
    ],
    schema: `const studentSchema = new Schema({
  name:   { type: String, required: true },
  email:  { type: String, unique: true },
  course: { type: String, index: true },
  marks:  { type: Number, min: 0, max: 100 },
  active: { type: Boolean, default: true },
}, { timestamps: true });`,
    api: [
      { method: "GET", path: "/api/students?search=&sort=", desc: "paged, searchable list" },
      { method: "POST", path: "/api/students", desc: "create a record" },
      { method: "PUT", path: "/api/students/:id", desc: "update a record" },
      { method: "DELETE", path: "/api/students/:id", desc: "remove a record" },
      { method: "GET", path: "/api/stats", desc: "dashboard aggregates" },
    ],
  },
  "Job Portal System": {
    features: [
      "Job posting with categories",
      "Separate seeker & employer roles",
      "Résumé upload on apply",
      "Application-status tracking",
      "Admin approve / reject",
      "Filter by location, skill, salary",
    ],
    schema: `const jobSchema = new Schema({
  title:    { type: String, required: true },
  company:  { type: ObjectId, ref: 'User' },
  location: { type: String, index: true },
  skills:   [String],
  salary:   { min: Number, max: Number },
  status:   { type: String, enum: ['pending','live','closed'],
              default: 'pending' },
}, { timestamps: true });`,
    api: [
      { method: "GET", path: "/api/jobs?location=&skill=", desc: "search & filter jobs" },
      { method: "POST", path: "/api/jobs", desc: "post a job (employer)" },
      { method: "POST", path: "/api/jobs/:id/apply", desc: "apply + upload résumé (seeker)" },
      { method: "PATCH", path: "/api/applications/:id", desc: "update application status" },
      { method: "GET", path: "/api/admin/pending", desc: "listings awaiting approval" },
    ],
  },
};

export type ShowcaseProject = {
  title: string;
  desc: string;
  stack: string[];
  learn: string;
  featured: boolean;
  spec?: ProjectSpec;
};

export const projects: ShowcaseProject[] = MERN.projects.map((p) => ({
  title: p.title,
  desc: p.desc,
  stack: PROJECT_META[p.title]?.stack ?? ["JavaScript"],
  learn: PROJECT_META[p.title]?.learn ?? p.desc,
  featured: PROJECT_META[p.title]?.featured ?? false,
  spec: PROJECT_SPEC[p.title],
}));
