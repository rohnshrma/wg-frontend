import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryContent from "@/app/(public)/gallery/GalleryContent";
import type { GalleryImage } from "@/types/gallery";

const makeImage = (overrides: Partial<GalleryImage> = {}): GalleryImage => ({
  _id: "1",
  imageUrl: "https://res.cloudinary.com/demo/image/upload/a.jpg",
  thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/a-thumb.jpg",
  caption: "Data Science Batch",
  category: "classroom",
  displayOrder: 0,
  isActive: true,
  ...overrides,
});

describe("GalleryContent", () => {
  it("shows an empty state when there are no images", () => {
    render(<GalleryContent images={[]} />);
    expect(screen.getByText(/no photos yet/i)).toBeInTheDocument();
  });

  it("renders real image captions when present", () => {
    render(<GalleryContent images={[makeImage()]} />);
    expect(screen.getByText("Data Science Batch")).toBeInTheDocument();
    expect(screen.queryByText(/no photos yet/i)).not.toBeInTheDocument();
  });

  it("filters images by category", async () => {
    const user = userEvent.setup();
    render(
      <GalleryContent
        images={[
          makeImage({ _id: "1", category: "classroom", caption: "Classroom Photo" }),
          makeImage({ _id: "2", category: "events", caption: "Event Photo" }),
        ]}
      />
    );

    expect(screen.getByText("Classroom Photo")).toBeInTheDocument();
    expect(screen.getByText("Event Photo")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Events" }));

    await waitFor(() => expect(screen.queryByText("Classroom Photo")).not.toBeInTheDocument());
    expect(screen.getByText("Event Photo")).toBeInTheDocument();
  });
});
