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

  // Static fallback only — `useActiveCourseTitles()` fetches the real,
  // `isActive: true` list from `/api/courses` at render time and this array
  // is used only while that request is in flight or if it fails. Kept in
  // sync with the real catalogue by hand since it's a small, rarely-changing
  // list; if it drifts again, the hook's live fetch still wins for anyone
  // who isn't on a stale cached page.
  courses: [
    "Full Stack / MERN Stack Development",
    "Data Analytics with Python",
    "Data Science",
    "Artificial Intelligence",
    "Python Programming",
    "Power BI",
    "SQL",
    "Java Programming",
    "C/C++ Programming",
    "MS Excel",
    "React JS",
    "TypeScript",
    "Digital Marketing",
    "Mobile App Development",
  ],

  // studentsPlaced deliberately removed — a specific headcount of "placed"
  // students isn't a claim we can stand behind, so it's not tracked as a
  // stat anywhere on the site. Use "students trained" in prose instead,
  // with no attached number.
  // `courses` deliberately removed — that count is now derived live from
  // the real course catalogue (see StatsCounter.tsx / useActiveCourseTitles)
  // instead of tracked as a static number that drifts.
  stats: {
    yearsExperience: 6,
    batchesCompleted: 100,
  },
} as const;

export type SiteConfig = typeof siteConfig;
