import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestimonialsContent from "@/app/(public)/testimonials/TestimonialsContent";
import type { Testimonial } from "@/types/testimonial";

const makeTestimonial = (overrides: Partial<Testimonial> = {}): Testimonial => ({
  _id: "1",
  studentName: "Priya Sharma",
  courseName: "Data Science",
  companyPlaced: "TCS",
  designation: "Data Analyst",
  salaryPackage: "6.5 LPA",
  testimonialText: "WebiGeeks transformed my career.",
  rating: 5,
  isActive: true,
  displayOrder: 0,
  ...overrides,
});

describe("TestimonialsContent", () => {
  it("shows an empty state when there are no testimonials", () => {
    render(<TestimonialsContent testimonials={[]} />);
    expect(screen.getByText(/success stories coming soon/i)).toBeInTheDocument();
  });

  it("renders real testimonial data when present", () => {
    render(<TestimonialsContent testimonials={[makeTestimonial()]} />);
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText(/data analyst at tcs/i)).toBeInTheDocument();
    expect(screen.getByText("6.5 LPA")).toBeInTheDocument();
    expect(screen.queryByText(/success stories coming soon/i)).not.toBeInTheDocument();
  });

  it("does not render hardcoded placeholder names from the old implementation", () => {
    render(<TestimonialsContent testimonials={[makeTestimonial({ studentName: "Real Student" })]} />);
    expect(screen.queryByText("Rahul Patel")).not.toBeInTheDocument();
    expect(screen.queryByText("Sneha Kulkarni")).not.toBeInTheDocument();
  });
});
