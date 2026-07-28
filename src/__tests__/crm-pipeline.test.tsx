import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CrmPipelineView from "@/components/crm/CrmPipelineView";
import api from "@/lib/api";
import type { Enquiry } from "@/types/crm";

vi.mock("@/lib/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api, true);

const makeEnquiry = (overrides: Partial<Enquiry> = {}): Enquiry => ({
  _id: "e1",
  name: "Rahul Sharma",
  course: "Full Stack Development",
  mobile: "9876543210",
  email: "rahul@example.com",
  education: "B.Tech",
  workingStatus: "fresher",
  remarks: "Wants weekend batch",
  enquiryDate: "2026-07-28T09:00:00.000Z",
  source: "justdial",
  stage: "new_enquiry",
  stageHistory: [
    {
      fromStage: null,
      toStage: "new_enquiry",
      changedBy: { _id: "u1", email: "admin@webigeeks.com", role: "admin" },
      changedAt: "2026-07-28T09:00:00.000Z",
      note: "Enquiry created",
    },
  ],
  owner: { _id: "u1", email: "admin@webigeeks.com", name: "Admin", role: "admin" },
  createdBy: { _id: "u1", email: "admin@webigeeks.com", name: "Admin", role: "admin" },
  createdAt: "2026-07-28T09:00:00.000Z",
  updatedAt: "2026-07-28T09:00:00.000Z",
  ...overrides,
});

/** The view fetches enquiries, and (for admins) the counsellor list. */
const mockLoad = (enquiries: Enquiry[]) => {
  mockedApi.get.mockImplementation((url: string) => {
    if (url.startsWith("/enquiries")) return Promise.resolve({ data: { data: enquiries } });
    if (url.startsWith("/users")) return Promise.resolve({ data: { data: [] } });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("CrmPipelineView", () => {
  it("renders all six pipeline stages as columns", async () => {
    mockLoad([]);
    render(<CrmPipelineView isAdmin />);

    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    for (const stage of [
      "New Enquiry",
      "Follow Up",
      "Demo Scheduled",
      "Demo Done",
      "Admitted",
      "Cancelled",
    ]) {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument();
    }
  });

  it("places each enquiry card in its own stage column with a live count", async () => {
    mockLoad([
      makeEnquiry({ _id: "a", name: "Alpha", stage: "new_enquiry" }),
      makeEnquiry({ _id: "b", name: "Bravo", stage: "admitted", mobile: "9876543211" }),
      makeEnquiry({ _id: "c", name: "Charlie", stage: "admitted", mobile: "9876543212" }),
    ]);
    render(<CrmPipelineView isAdmin />);

    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
    expect(screen.getByText("Bravo")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText(/Showing 3 of 3 enquiries/i)).toBeInTheDocument();
  });

  it("filters by the search box across name, mobile and course", async () => {
    const user = userEvent.setup();
    mockLoad([
      makeEnquiry({ _id: "a", name: "Alpha", course: "Data Science", mobile: "9000000001" }),
      makeEnquiry({ _id: "b", name: "Bravo", course: "Java", mobile: "9111111112" }),
    ]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());

    const search = screen.getByPlaceholderText(/search name, mobile or course/i);

    await user.type(search, "Bravo");
    await waitFor(() => expect(screen.queryByText("Alpha")).not.toBeInTheDocument());
    expect(screen.getByText("Bravo")).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "9000000001");
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
    expect(screen.queryByText("Bravo")).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "Java");
    await waitFor(() => expect(screen.getByText("Bravo")).toBeInTheDocument());
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("opens the detail view with the full stage timeline when a card is clicked", async () => {
    const user = userEvent.setup();
    mockLoad([
      makeEnquiry({
        stage: "demo_scheduled",
        stageHistory: [
          {
            fromStage: null,
            toStage: "new_enquiry",
            changedBy: { _id: "u1", email: "admin@webigeeks.com", role: "admin" },
            changedAt: "2026-07-28T09:00:00.000Z",
            note: "Enquiry created",
          },
          {
            fromStage: "new_enquiry",
            toStage: "demo_scheduled",
            changedBy: { _id: "u2", email: "priya@webigeeks.com", name: "Priya", role: "counsellor" },
            changedAt: "2026-07-28T11:30:00.000Z",
            note: "Demo booked for Friday",
          },
        ],
      }),
    ]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() => expect(screen.getByText("Rahul Sharma")).toBeInTheDocument());

    await user.click(screen.getByText("Rahul Sharma"));

    const dialog = await screen.findByText("Stage Timeline");
    expect(dialog).toBeInTheDocument();
    // Both journal entries, the actor, and the note are surfaced.
    expect(screen.getByText("Demo booked for Friday")).toBeInTheDocument();
    expect(screen.getByText("Enquiry created")).toBeInTheDocument();
    expect(screen.getByText("Priya")).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText(/Updated:/)).toBeInTheDocument();
  });

  it("hides the delete action from counsellors and offers it to admins", async () => {
    const user = userEvent.setup();
    mockLoad([makeEnquiry()]);

    const { unmount } = render(<CrmPipelineView isAdmin={false} />);
    await waitFor(() => expect(screen.getByText("Rahul Sharma")).toBeInTheDocument());
    await user.click(screen.getByText("Rahul Sharma"));
    await screen.findByText("Stage Timeline");
    expect(screen.queryByLabelText(/delete enquiry/i)).not.toBeInTheDocument();
    unmount();

    mockLoad([makeEnquiry()]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() => expect(screen.getByText("Rahul Sharma")).toBeInTheDocument());
    await user.click(screen.getByText("Rahul Sharma"));
    await screen.findByText("Stage Timeline");
    expect(screen.getByLabelText(/delete enquiry/i)).toBeInTheDocument();
  });

  it("surfaces a message when enquiries cannot be loaded", async () => {
    mockedApi.get.mockRejectedValue({ response: { data: { message: "Server exploded" } } });
    render(<CrmPipelineView isAdmin />);

    await waitFor(() => expect(screen.getByText("Server exploded")).toBeInTheDocument());
  });

  it("only shows the counsellor filter to admins", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    const { unmount } = render(<CrmPipelineView isAdmin={false} />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.queryByText("Counsellor")).not.toBeInTheDocument();
    expect(screen.getByText("Stage")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
    unmount();

    mockLoad([]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.getByText("Counsellor")).toBeInTheDocument();
  });

  it("filters by stage and clears back to the full set", async () => {
    const user = userEvent.setup();
    mockLoad([
      makeEnquiry({ _id: "a", name: "Alpha", stage: "new_enquiry" }),
      makeEnquiry({ _id: "b", name: "Bravo", stage: "admitted", mobile: "9876543211" }),
    ]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /filters/i }));
    const stageSelect = screen.getByLabelText("Stage", { selector: "select" }) as HTMLSelectElement;
    await user.selectOptions(stageSelect, "admitted");

    await waitFor(() => expect(screen.queryByText("Alpha")).not.toBeInTheDocument());
    expect(screen.getByText("Bravo")).toBeInTheDocument();
    expect(screen.getByText(/Showing 1 of 2 enquiries/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /clear all filters/i }));
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
  });
});

describe("CrmPipelineView — enquiry form", () => {
  it("prefills the date field with the current date and time", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );

    await user.click(screen.getByRole("button", { name: /new enquiry/i }));

    const dialog = await screen.findByRole("heading", { name: /^New Enquiry$/, level: 2 });
    expect(dialog).toBeInTheDocument();

    const dateInput = screen.getByLabelText(/date & time/i) as HTMLInputElement;
    expect(dateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    // Prefilled to "now", not left blank for the user to type.
    const diffMs = Math.abs(Date.now() - new Date(dateInput.value).getTime());
    expect(diffMs).toBeLessThan(5 * 60 * 1000);
  });

  it("offers exactly the four required lead sources", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /new enquiry/i }));

    const sourceSelect = (await screen.findByLabelText(/source/i)) as HTMLSelectElement;
    const options = within(sourceSelect)
      .getAllByRole("option")
      .map((o) => o.textContent);
    expect(options).toEqual([
      "Select source",
      "Justdial",
      "Offline Marketing",
      "Website",
      "Google Maps",
    ]);
  });

  it("blocks submission with a bad mobile number and a missing source", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /new enquiry/i }));
    await screen.findByLabelText(/mobile number/i);

    await user.type(screen.getByLabelText(/^name/i), "Test User");
    await user.type(screen.getByLabelText(/^course/i), "Python");
    await user.type(screen.getByLabelText(/mobile number/i), "12345");
    await user.click(screen.getByRole("button", { name: /create enquiry/i }));

    expect(
      await screen.findByText(/enter a valid 10-digit indian mobile number/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/select a source/i)).toBeInTheDocument();
    expect(mockedApi.post).not.toHaveBeenCalled();
  });

  it("posts a valid enquiry and shows it on the board", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    mockedApi.post.mockResolvedValueOnce({
      data: { data: makeEnquiry({ _id: "new1", name: "Meera Iyer", stage: "new_enquiry" }) },
    });

    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /new enquiry/i }));
    await screen.findByLabelText(/mobile number/i);

    await user.type(screen.getByLabelText(/^name/i), "Meera Iyer");
    await user.type(screen.getByLabelText(/^course/i), "Data Science");
    await user.type(screen.getByLabelText(/mobile number/i), "9876543210");
    await user.selectOptions(screen.getByLabelText(/source/i), "justdial");
    await user.click(screen.getByRole("button", { name: /create enquiry/i }));

    await waitFor(() => expect(mockedApi.post).toHaveBeenCalledTimes(1));
    const [url, payload] = mockedApi.post.mock.calls[0] as [string, Record<string, unknown>];
    expect(url).toBe("/enquiries");
    expect(payload).toMatchObject({
      name: "Meera Iyer",
      course: "Data Science",
      mobile: "9876543210",
      source: "justdial",
    });
    expect(payload.enquiryDate).toBeTruthy();

    await waitFor(() => expect(screen.getByText("Meera Iyer")).toBeInTheDocument());
  });

  it("strips non-digits and caps the mobile field at 10 characters", async () => {
    const user = userEvent.setup();
    mockLoad([]);
    render(<CrmPipelineView isAdmin />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "New Enquiry" })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /new enquiry/i }));

    const mobile = (await screen.findByLabelText(/mobile number/i)) as HTMLInputElement;
    await user.type(mobile, "98a76-543 21099999");
    expect(mobile.value).toBe("9876543210");
  });
});
