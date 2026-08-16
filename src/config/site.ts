export const siteConfig = {
  name: "WebiGeeks Digital",
  tagline: "Premium Digital Solutions for International Businesses",
  description:
    "WebiGeeks Digital builds premium websites, web applications, AI solutions, and digital products for international businesses. We deliver technology that drives real business outcomes.",
  url: "https://webigeeksdigital.com",

  contact: {
    phone: "+91 8766367815",
    email: "hello@webigeeksdigital.com",
    whatsapp: "+918766367815",
    address: "Remote • India-based team serving global clients",
  },

  social: {
    linkedin: "https://linkedin.com/company/webigeeks-digital",
    twitter: "https://twitter.com/webigeeksdigital",
    github: "https://github.com/webigeeks-digital",
  },

  services: [
    { name: "Web Development", slug: "web-development" },
    { name: "Product Engineering", slug: "product-engineering" },
    { name: "AI & Automation", slug: "ai-automation" },
    { name: "UI/UX Design", slug: "design" },
  ],

  stats: {
    yearsExperience: 6,
    projectsCompleted: 50,
    clientsSatisfied: 40,
  },
} as const;

export type SiteConfig = typeof siteConfig;
