"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Eye, FileText, MessageCircle, Calendar } from "lucide-react";
import api from "@/lib/api";

interface BlogAnalytics {
  _id: string;
  title: string;
  slug: string;
  category: string;
  viewCount: number;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function BlogAnalyticsPage() {
  const [blogs, setBlogs] = useState<BlogAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"all" | "30" | "7">("all");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/blogs/admin/all?limit=1000");
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const publishedBlogs = blogs.filter((b) => b.isPublished);
  const totalViews = publishedBlogs.reduce((sum, b) => sum + b.viewCount, 0);
  const avgViews = publishedBlogs.length ? Math.round(totalViews / publishedBlogs.length) : 0;

  const topBlogs = [...publishedBlogs].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

  const blogsByCategory = publishedBlogs.reduce(
    (acc, blog) => {
      const cat = blog.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCategories = Object.entries(blogsByCategory)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const getDaysAgo = (date: string): number => {
    return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  };

  const getViewTrend = (views: number, publishedDaysAgo: number): number => {
    if (publishedDaysAgo === 0) return 0;
    return Math.round(views / publishedDaysAgo);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2 mb-1">
          <TrendingUp className="w-8 h-8 text-primary" />
          Blog Analytics
        </h1>
        <p className="text-text-secondary">Performance metrics and engagement insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          {
            label: "Published Blogs",
            value: publishedBlogs.length,
            icon: FileText,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Avg Views/Blog",
            value: avgViews.toLocaleString(),
            icon: TrendingUp,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Draft Posts",
            value: blogs.filter((b) => !b.isPublished).length,
            icon: Calendar,
            color: "bg-amber-50 text-amber-600",
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className={`${metric.color} rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-medium opacity-75">{metric.label}</p>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Blogs */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Top Performing Blogs
          </h2>
          {isLoading ? (
            <p className="text-text-muted text-sm">Loading...</p>
          ) : topBlogs.length === 0 ? (
            <p className="text-text-muted text-sm">No published blogs yet</p>
          ) : (
            <div className="space-y-3">
              {topBlogs.map((blog, idx) => {
                const daysPublished = getDaysAgo(blog.publishedAt || blog.createdAt);
                const viewsPerDay = getViewTrend(blog.viewCount, daysPublished);
                return (
                  <div key={blog._id} className="pb-3 border-b border-border last:border-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary truncate text-sm">
                          {idx + 1}. {blog.title}
                        </p>
                        <p className="text-xs text-text-muted">{blog.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1 text-primary font-semibold">
                          <Eye className="w-3 h-3" /> {blog.viewCount} views
                        </span>
                        <span className="text-text-muted">
                          {viewsPerDay} views/day ({daysPublished}d)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Posts by Category */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Posts by Category</h2>
          {isLoading ? (
            <p className="text-text-muted text-sm">Loading...</p>
          ) : topCategories.length === 0 ? (
            <p className="text-text-muted text-sm">No categories yet</p>
          ) : (
            <div className="space-y-3">
              {topCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-text-primary">{cat.name}</p>
                    <span className="text-sm font-bold text-primary">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/60 h-full"
                      style={{
                        width: `${(cat.count / Math.max(...topCategories.map((c) => c.count))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All Blogs Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">All Blogs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="text-left px-6 py-3 font-semibold text-text-secondary">Title</th>
                <th className="text-left px-6 py-3 font-semibold text-text-secondary">Category</th>
                <th className="text-center px-6 py-3 font-semibold text-text-secondary">Views</th>
                <th className="text-center px-6 py-3 font-semibold text-text-secondary">Views/Day</th>
                <th className="text-left px-6 py-3 font-semibold text-text-secondary">Published</th>
                <th className="text-center px-6 py-3 font-semibold text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-muted">
                    Loading analytics...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-muted">
                    No blogs yet
                  </td>
                </tr>
              ) : (
                [...blogs]
                  .sort((a, b) => b.viewCount - a.viewCount)
                  .map((blog) => {
                    const daysPublished = getDaysAgo(blog.publishedAt || blog.createdAt);
                    const viewsPerDay = getViewTrend(blog.viewCount, daysPublished);
                    return (
                      <tr key={blog._id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                        <td className="px-6 py-3">
                          <p className="font-semibold text-text-primary truncate max-w-xs">{blog.title}</p>
                        </td>
                        <td className="px-6 py-3 text-text-secondary text-sm">{blog.category}</td>
                        <td className="px-6 py-3 text-center">
                          <span className="font-semibold text-primary">{blog.viewCount}</span>
                        </td>
                        <td className="px-6 py-3 text-center text-text-secondary text-sm">
                          {viewsPerDay}
                        </td>
                        <td className="px-6 py-3 text-sm text-text-muted">
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString("en-IN")
                            : "—"}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              blog.isPublished
                                ? "bg-success-light text-success"
                                : "bg-gray-100 text-text-muted"
                            }`}
                          >
                            {blog.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
