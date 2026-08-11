import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogContent from "@/app/(public)/blog/BlogContent";
import type { Blog } from "@/types/blog";

const makeBlog = (overrides: Partial<Blog> = {}): Blog => ({
  _id: "1",
  title: "Why Data Science Is the Best Career",
  slug: "why-data-science",
  excerpt: "Data Science continues to dominate the job market.",
  content: "Full body content of the article goes here and is reasonably long.",
  contentType: "html",
  coverImageUrl: "https://res.cloudinary.com/demo/image/upload/cover.jpg",
  category: "Career",
  tags: [],
  isPublished: true,
  viewCount: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("BlogContent", () => {
  it("shows an empty state when there are no posts", () => {
    render(<BlogContent blogs={[]} />);
    expect(screen.getByText(/no articles yet/i)).toBeInTheDocument();
  });

  it("renders real blog data when present", () => {
    render(<BlogContent blogs={[makeBlog()]} />);
    expect(screen.getByText("Why Data Science Is the Best Career")).toBeInTheDocument();
    expect(screen.getByText(/data science continues to dominate/i)).toBeInTheDocument();
  });

  it("renders list cards even when content is omitted (the list API excludes it)", () => {
    // GET /api/blogs uses .select('-content') for payload size — content is
    // undefined here by design, not a fetch error.
    const { content: _omit, ...withoutContent } = makeBlog();
    render(<BlogContent blogs={[withoutContent as Blog]} />);
    expect(screen.getByText("Why Data Science Is the Best Career")).toBeInTheDocument();
  });

  it("filters by search term and shows a distinct 'no results' message", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[
          makeBlog({ _id: "1", slug: "data-science-careers", title: "Data Science Careers", category: "Career" }),
          makeBlog({ _id: "2", slug: "intro-to-generative-ai", title: "Intro to Generative AI", category: "AI" }),
        ]}
      />
    );

    await user.type(screen.getByPlaceholderText(/search articles/i), "generative");

    expect(screen.queryByText("Data Science Careers")).not.toBeInTheDocument();
    expect(screen.getByText("Intro to Generative AI")).toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText(/search articles/i));
    await user.type(screen.getByPlaceholderText(/search articles/i), "nonexistent topic");

    expect(screen.getByText(/no articles found/i)).toBeInTheDocument();
  });
});
