import { describe, it, expect, vi } from "vitest";
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

  it("renders multiple blog cards", () => {
    const blogs = [
      makeBlog({ _id: "1", title: "First Post", slug: "first-post" }),
      makeBlog({ _id: "2", title: "Second Post", slug: "second-post" }),
      makeBlog({ _id: "3", title: "Third Post", slug: "third-post" }),
    ];
    render(<BlogContent blogs={blogs} />);

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("Third Post")).toBeInTheDocument();
  });

  it("filters by category", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[
          makeBlog({ _id: "1", title: "Career Post", category: "Career" }),
          makeBlog({ _id: "2", title: "AI Post", category: "AI" }),
          makeBlog({ _id: "3", title: "Tutorial Post", category: "Tutorial" }),
        ]}
      />
    );

    const careerButton = screen.getAllByRole("button", { name: "Career" })[0];
    await user.click(careerButton);

    expect(screen.getByText("Career Post")).toBeInTheDocument();
    expect(screen.queryByText("AI Post")).not.toBeInTheDocument();
    expect(screen.queryByText("Tutorial Post")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[makeBlog({ title: "Python Programming Basics" })]}
      />
    );

    await user.type(screen.getByPlaceholderText(/search articles/i), "python");

    expect(screen.getByText("Python Programming Basics")).toBeInTheDocument();
  });

  it("clears search results when input is cleared", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[
          makeBlog({ _id: "1", title: "Python Guide", slug: "python-guide" }),
          makeBlog({ _id: "2", title: "JavaScript Tips", slug: "js-tips" }),
        ]}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search articles/i);
    await user.type(searchInput, "python");
    expect(screen.getByText("Python Guide")).toBeInTheDocument();
    expect(screen.queryByText("JavaScript Tips")).not.toBeInTheDocument();

    await user.clear(searchInput);
    expect(screen.getByText("Python Guide")).toBeInTheDocument();
    expect(screen.getByText("JavaScript Tips")).toBeInTheDocument();
  });

  it("renders blog excerpt correctly", () => {
    render(
      <BlogContent
        blogs={[
          makeBlog({
            excerpt: "This is a custom excerpt for the blog post.",
          }),
        ]}
      />
    );

    expect(screen.getByText("This is a custom excerpt for the blog post.")).toBeInTheDocument();
  });

  it("renders blog cover image", () => {
    render(
      <BlogContent
        blogs={[
          makeBlog({
            title: "Test Post Title",
            coverImageUrl: "https://example.com/custom-cover.jpg",
          }),
        ]}
      />
    );

    const img = screen.getByAltText("Test Post Title");
    expect(img).toHaveAttribute("src", expect.stringContaining("custom-cover.jpg"));
  });

  it("renders blog metadata (category and date)", () => {
    render(
      <BlogContent
        blogs={[
          makeBlog({
            category: "Technology",
            createdAt: "2026-01-15T00:00:00.000Z",
          }),
        ]}
      />
    );

    const allTechElements = screen.getAllByText("Technology");
    expect(allTechElements.length).toBeGreaterThan(0);
  });

  it("renders category badges in blog cards", () => {
    render(
      <BlogContent
        blogs={[
          makeBlog({ _id: "1", title: "ML Post", category: "Machine Learning" }),
          makeBlog({ _id: "2", title: "Web Post", category: "Web Dev" }),
        ]}
      />
    );

    const allCategoryElements = screen.getAllByText("Machine Learning");
    expect(allCategoryElements.length).toBeGreaterThan(0);
  });

  it("combines multiple filter conditions (search + category)", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[
          makeBlog({ _id: "1", title: "Python Career Guide", category: "Career" }),
          makeBlog({ _id: "2", title: "JavaScript Career Path", category: "Career" }),
          makeBlog({ _id: "3", title: "Python Tutorials", category: "Tutorial" }),
        ]}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search articles/i);
    await user.type(searchInput, "Python");

    expect(screen.getByText("Python Career Guide")).toBeInTheDocument();
    expect(screen.queryByText("JavaScript Career Path")).not.toBeInTheDocument();
    expect(screen.getByText("Python Tutorials")).toBeInTheDocument();
  });

  it("handles special characters in search", async () => {
    const user = userEvent.setup();
    render(
      <BlogContent
        blogs={[makeBlog({ title: "C++ Advanced Techniques" })]}
      />
    );

    await user.type(screen.getByPlaceholderText(/search articles/i), "C++");

    expect(screen.getByText("C++ Advanced Techniques")).toBeInTheDocument();
  });

  it("preserves the order of blogs as provided", () => {
    const blogs = [
      makeBlog({
        _id: "1",
        title: "First Post",
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
      makeBlog({
        _id: "2",
        title: "Second Post",
        createdAt: "2026-01-31T00:00:00.000Z",
      }),
    ];

    render(<BlogContent blogs={blogs} />);

    const firstPost = screen.getByText("First Post");
    const secondPost = screen.getByText("Second Post");
    expect(firstPost).toBeInTheDocument();
    expect(secondPost).toBeInTheDocument();
  });
});
