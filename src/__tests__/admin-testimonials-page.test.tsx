import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminTestimonialsPage from "@/app/admin/testimonials/page";
import api from "@/lib/api";

vi.mock("@/lib/api", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api, true);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AdminTestimonialsPage", () => {
  it("shows an empty state once loading finishes with no data", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { data: [] } });

    render(<AdminTestimonialsPage />);

    expect(screen.getByText(/loading testimonials/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/no testimonials yet/i)).toBeInTheDocument());
    expect(mockedApi.get).toHaveBeenCalledWith("/testimonials/admin/all");
  });

  it("renders fetched testimonials", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            studentName: "Jane Doe",
            courseName: "Data Science",
            testimonialText: "Loved it",
            rating: 5,
            isActive: true,
            displayOrder: 0,
          },
        ],
      },
    });

    render(<AdminTestimonialsPage />);

    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows an error message if the fetch fails", async () => {
    mockedApi.get.mockRejectedValueOnce({ response: { data: { message: "Server error" } } });

    render(<AdminTestimonialsPage />);

    await waitFor(() => expect(screen.getByText("Server error")).toBeInTheDocument());
  });
});
