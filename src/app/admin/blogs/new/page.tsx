import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-text-primary">New Blog Post</h2>
      <BlogForm />
    </div>
  );
}
