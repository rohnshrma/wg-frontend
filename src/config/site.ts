export const siteConfig = {
  name: "WebiGeeks",
  tagline: "Your AI Skill Partner",
  description:
    "Become industry-ready with AI-integrated courses in Data Science, Data Analytics, MERN Stack, Python, Power BI, and more. 100% practical training with placement assistance.",
  url: "https://webigeeks.com",
  ogImage: "/images/og-image.jpg",

  contact: {
    phone: "+91 8766367815",
    phone2: "+91 9871257943",
    email: "webigeeksofficial@gmail.com",
    whatsapp: "+918766367815",
    address:
      "M-18, Ground Floor, Old DLF Colony, Sector-14, Gurugram, Haryana",
    mapUrl: "https://maps.app.goo.gl/h2T6wqvd4njcGM2K7",
  },

  social: {
    instagram: "https://instagram.com/webigeeks",
    facebook: "https://facebook.com/webigeeks",
    linkedin: "https://linkedin.com/company/webigeeks",
    youtube: "https://youtube.com/@webigeeks",
    twitter: "https://twitter.com/webigeeks",
  },

  courses: [
    "Full Stack / MERN Stack Development",
    "Data Analytics with Python",
    "Data Science",
    "Artificial Intelligence",
    "Python Programming",
    "Power BI",
    "SQL",
    "Java Programming",
    "C/C++",
    "MS Excel",
  ],

  stats: {
    yearsExperience: 6,
    studentsPlaced: 500,
    courses: 10,
    batchesCompleted: 100,
  },
} as const;

export type SiteConfig = typeof siteConfig;
