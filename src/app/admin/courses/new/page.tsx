import CourseForm from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-text-primary">Add Course</h2>
      <CourseForm />
    </div>
  );
}
