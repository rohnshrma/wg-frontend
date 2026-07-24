import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailContent from "./CourseDetailContent";
import { getCourseBySlug } from "@/lib/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: course.metaTitle || `${course.title} Course`,
    description:
      course.metaDescription ||
      `Learn ${course.title} with 100% practical, AI-integrated training at WebiGeeks. Industry projects, placement assistance, and flexible timings.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailContent course={course} />;
}
