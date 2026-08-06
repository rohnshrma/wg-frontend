import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getLocationPageContent } from "@/data/locationPages";
import CourseLocationPage from "@/components/location-pages/CourseLocationPage";

const content = getLocationPageContent("typescript")!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: `${siteConfig.url}${content.path}` },
};

export default function TypeScriptCourseGurugramPage() {
  return <CourseLocationPage content={content} />;
}
