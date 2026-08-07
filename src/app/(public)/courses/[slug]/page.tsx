import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailContent from "./CourseDetailContent";
import { getCourseBySlug, getRelatedCourses } from "@/lib/courses";
import { getTestimonialsByCourse } from "@/lib/testimonials";
import { courseSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return { title: "Course Not Found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: course.metaTitle || `${course.title} Course`,
    description:
      course.metaDescription ||
      `Learn ${course.title} with 100% practical, AI-integrated training at WebiGeeks. Industry projects, placement assistance, and flexible timings.`,
    path: `/courses/${course.slug}`,
  });
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

  const [ratings, relatedCourses] = await Promise.all([
    getTestimonialsByCourse(course.title),
    getRelatedCourses(course.slug, course.technologies),
  ]);

  return (
    <>
      <JsonLd data={courseSchema(course, ratings)} />
      {course.faqs.length > 0 && <JsonLd data={faqPageSchema(course.faqs)} />}
      <CourseDetailContent course={course} relatedCourses={relatedCourses} />
    </>
  );
}
