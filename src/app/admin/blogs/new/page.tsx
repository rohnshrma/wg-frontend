"use client";

import { useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import BlogHtmlImporter from "@/components/admin/BlogHtmlImporter";
import type { Blog } from "@/types/blog";

export default function NewBlogPage() {
  const [showImporter, setShowImporter] = useState(true);
  const [importedData, setImportedData] = useState<Partial<Blog> | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text-primary">New Blog Post</h2>
        {!importedData && (
          <button
            onClick={() => setShowImporter(!showImporter)}
            className="text-sm px-3 py-1 rounded border border-primary text-primary hover:bg-primary-50 transition-colors"
          >
            {showImporter ? "Write from Scratch" : "Import from HTML"}
          </button>
        )}
      </div>

      {showImporter && !importedData ? (
        <BlogHtmlImporter onImport={(data) => setImportedData(data)} />
      ) : null}

      <BlogForm initialData={importedData} />
    </div>
  );
}
