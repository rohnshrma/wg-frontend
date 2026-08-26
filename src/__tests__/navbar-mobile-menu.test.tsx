import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/layout/Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar mobile menu", () => {
  it("keeps the drawer's nav links out of the accessibility tree until opened", () => {
    render(<Navbar />);
    // The mobile drawer's own "Home" link (distinct from the desktop nav's
    // "Home" link, which coexists in the DOM but is hidden via lg:flex) must
    // not be reachable before the menu is opened.
    expect(screen.queryByTestId("mobile-nav-link-Home")).not.toBeInTheDocument();
  });

  it("opens the drawer and exposes every nav link when the hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));

    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav-link-Home")).toBeInTheDocument();
    });

    for (const label of ["Home", "Courses", "About", "Testimonials", "Gallery", "Blog", "Contact"]) {
      expect(screen.getByTestId(`mobile-nav-link-${label}`)).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("closes the drawer when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav-link-Home")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /close menu/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("mobile-nav-link-Home")).not.toBeInTheDocument();
    });
    expect(screen.queryByRole("button", { name: /close menu/i })).not.toBeInTheDocument();
  });

  it("closes the drawer when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar />);

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav-link-Home")).toBeInTheDocument();
    });

    const backdrop = container.querySelector('[data-testid="mobile-menu-backdrop"]');
    expect(backdrop).toBeTruthy();
    await user.click(backdrop as Element);

    await waitFor(() => {
      expect(screen.queryByTestId("mobile-nav-link-Home")).not.toBeInTheDocument();
    });
  });

  it("re-opens after a full close/open cycle (no stuck state across toggles)", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);
    await waitFor(() => expect(screen.getByTestId("mobile-nav-link-Home")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    await waitFor(() => {
      expect(screen.queryByTestId("mobile-nav-link-Home")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav-link-Home")).toBeInTheDocument();
    });
  });
});
