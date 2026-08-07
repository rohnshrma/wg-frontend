import type { Metadata } from "next";
import { getLocationPageContent } from "@/data/locationPages";
import CourseLocationPage from "@/components/location-pages/CourseLocationPage";
import { pageMetadata } from "@/lib/seo";

const content = getLocationPageContent("react-js")!;

export const metadata: Metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: content.path,
});

export default function ReactCourseGurugramPage() {
  return <CourseLocationPage content={content} />;
}
