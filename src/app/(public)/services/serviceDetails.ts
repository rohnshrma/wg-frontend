// Plain data, deliberately not re-exported from ServicesContent.tsx (a
// "use client" module) — a Server Component importing a named export from a
// client module doesn't reliably get the real value back (it can resolve to
// a client reference instead), which broke servicesSchema() in page.tsx at
// build time (`a.map is not a function`). Keeping the data in its own
// plain module lets both the client component and the server page import
// the same source of truth safely.
export const serviceDetails = [
  {
    number: "01",
    slug: "web-development",
    name: "Web Development",
    description: "Custom websites and web applications built for performance and results.",
    details: [
      "Marketing websites optimized for conversions",
      "Corporate and business websites",
      "E-commerce platforms and storefronts",
      "Progressive web applications (PWAs)",
      "API-driven web applications",
      "Performance-optimized implementations",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    number: "02",
    slug: "product-engineering",
    name: "Product Engineering",
    description: "Scalable SaaS platforms and software products from concept to launch.",
    details: [
      "MVP development and rapid prototyping",
      "SaaS platform architecture",
      "Scalable backend systems",
      "Database design and optimization",
      "API design and implementation",
      "DevOps and deployment infrastructure",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"],
  },
  {
    number: "03",
    slug: "ai-automation",
    name: "AI & Automation",
    description: "Intelligent systems and automation that drive efficiency and innovation.",
    details: [
      "AI integrations and LLM applications",
      "Business process automation",
      "Intelligent chatbots and AI agents",
      "Workflow automation and orchestration",
      "AI-powered data analysis",
      "Predictive modeling and analytics",
    ],
    technologies: ["Python", "OpenAI", "LangChain", "Machine Learning", "Automation APIs"],
  },
  {
    number: "04",
    slug: "design",
    name: "UI/UX Design",
    description: "Strategic design that combines aesthetics with user psychology.",
    details: [
      "Product design and user research",
      "Interaction design and prototyping",
      "Design systems and component libraries",
      "User experience strategy",
      "Brand identity and visual design",
      "Accessibility and inclusive design",
    ],
    technologies: ["Figma", "Adobe XD", "Prototyping", "User Testing", "Design Systems"],
  },
];
