export interface CurriculumModule {
  moduleTitle: string;
  topics: string[];
}

export interface CourseProject {
  title: string;
  description: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  logoUrl?: string;
  bannerUrl?: string;

  duration: string;
  mode: "online" | "offline" | "hybrid";
  level: "beginner" | "intermediate" | "advanced";
  fees: number;

  technologies: string[];
  curriculum: CurriculumModule[];
  projects: CourseProject[];
  careerOpportunities: string[];

  faqs: CourseFAQ[];
  curriculumPdfUrl?: string;

  metaTitle?: string;
  metaDescription?: string;

  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;

  createdAt?: string;
  updatedAt?: string;
}
