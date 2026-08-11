"use client";

import { useState } from "react";
import { AlertCircle, Upload, Copy } from "lucide-react";
import type { Blog } from "@/types/blog";

interface ImportedBlogData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export default function BlogHtmlImporter({ onImport }: { onImport?: (data: Partial<Blog>) => void }) {
  const [htmlContent, setHtmlContent] = useState("");
  const [importedData, setImportedData] = useState<ImportedBlogData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const extractBlogData = (html: string): ImportedBlogData | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract title (from h1 or meta)
      const h1 = doc.querySelector("h1");
      const titleMeta = doc.querySelector('meta[property="og:title"]');
      const title = h1?.textContent || titleMeta?.getAttribute("content") || "Untitled";

      // Extract excerpt/description
      const descMeta = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
      const excerpt = descMeta?.getAttribute("content") || doc.querySelector("p")?.textContent || title.substring(0, 300);

      // Extract the article/main content
      const article = doc.querySelector("article") || doc.querySelector("main") || doc.body;
      let content = article?.innerHTML || html;

      // Clean up common HTML artifacts
      content = content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .trim();

      // Extract category from any metadata or default
      const categoryMeta = doc.querySelector('meta[name="category"]');
      const category = categoryMeta?.getAttribute("content") || "General";

      // Extract tags
      const tagMeta = doc.querySelector('meta[name="keywords"]');
      const tags = tagMeta
        ? tagMeta.getAttribute("content")?.split(",").map((t) => t.trim()) || []
        : [];

      const metaTitle = doc.querySelector("title")?.textContent || title;
      const metaDescription = excerpt;

      return { title, excerpt, content, category, tags, metaTitle, metaDescription };
    } catch (err) {
      console.error("Error parsing HTML:", err);
      return null;
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setHtmlContent(text);
      const data = extractBlogData(text);
      if (data) {
        setImportedData(data);
        setError("");
      } else {
        setError("Could not parse HTML. Make sure it's valid HTML content.");
      }
    } catch (err) {
      setError("Failed to read clipboard. Make sure you have permission.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const html = event.target?.result as string;
      setHtmlContent(html);
      const data = extractBlogData(html);
      if (data) {
        setImportedData(data);
        setError("");
      } else {
        setError("Could not parse the HTML file. Make sure it's valid HTML.");
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Import Blog from HTML</p>
          <p>Paste HTML content or upload an HTML file. We'll extract the title, content, and metadata automatically.</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handlePaste}
          className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-primary bg-primary-50 text-primary font-medium hover:bg-primary/5 transition-colors"
        >
          📋 Paste HTML from Clipboard
        </button>

        <div className="relative">
          <label className="block">
            <span className="sr-only">Upload HTML file</span>
            <input
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-text-secondary hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Or upload HTML file
            </div>
          </label>
        </div>
      </div>

      {error && (
        <div className="flex gap-3 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {importedData && (
        <div className="space-y-4 bg-gray-50 rounded-lg p-6 border border-border">
          <h3 className="font-bold text-text-primary">Extracted Blog Data</h3>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Title</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={importedData.title}
                readOnly
                className="flex-1 px-3 py-2 rounded border border-border text-sm bg-white text-text-secondary"
              />
              <button
                type="button"
                onClick={() => copyToClipboard(importedData.title)}
                className="px-3 py-2 rounded border border-border hover:bg-gray-100 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Excerpt (first 300 chars)</label>
            <textarea
              value={importedData.excerpt}
              readOnly
              rows={2}
              className="w-full px-3 py-2 rounded border border-border text-sm bg-white text-text-secondary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Category</label>
            <input
              type="text"
              value={importedData.category}
              readOnly
              className="w-full px-3 py-2 rounded border border-border text-sm bg-white text-text-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {importedData.tags.length > 0 ? (
                importedData.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded font-medium">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-text-muted text-xs">No tags extracted</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Content Preview (HTML)</label>
            <div className="bg-white border border-border rounded p-3 text-xs overflow-auto max-h-64 font-mono text-text-secondary">
              {importedData.content.substring(0, 500)}...
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onImport?.(importedData as Partial<Blog>);
              setImportedData(null);
              setHtmlContent("");
            }}
            className="w-full px-4 py-2 rounded-lg gradient-primary text-white font-medium hover:shadow-md transition-shadow"
          >
            ✓ Use This Data
          </button>
        </div>
      )}
    </div>
  );
}
