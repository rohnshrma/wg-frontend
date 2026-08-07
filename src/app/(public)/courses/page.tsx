import type { Metadata } from "next";
import CoursesContent from "./CoursesContent";
import { getCourses } from "@/lib/courses";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Courses",
  description:
    "Explore AI-integrated courses in Data Science, Data Analytics, MERN Stack, Python, Power BI, SQL, Java, and more. 100% practical training with placement assistance.",
  path: "/courses",
});

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CoursesContent courses={courses} />;
}
