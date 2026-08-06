import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getLocationPageContent } from "@/data/locationPages";
import CourseLocationPage from "@/components/location-pages/CourseLocationPage";

const content = getLocationPageContent("python-programming")!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: `${siteConfig.url}${content.path}` },
};

export default function PythonCourseGurugramPage() {
  return <CourseLocationPage content={content} />;
}
