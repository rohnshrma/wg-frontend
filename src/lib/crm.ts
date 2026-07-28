import api from "@/lib/api";
import type { Enquiry, EnquiryStage, EnquiryStats, StaffUser } from "@/types/crm";

export interface EnquiryFilters {
  search?: string;
  stage?: string;
  source?: string;
  course?: string;
  owner?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface EnquiryPayload {
  name: string;
  course: string;
  education?: string;
  workingStatus?: string;
  mobile: string;
  email?: string;
  remarks?: string;
  enquiryDate?: string;
  source: string;
  owner?: string;
}

const buildQuery = (filters: EnquiryFilters): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  params.set("limit", "100");
  return params.toString();
};

export const fetchEnquiries = async (filters: EnquiryFilters = {}): Promise<Enquiry[]> => {
  const res = await api.get(`/enquiries?${buildQuery(filters)}`);
  return res.data.data || [];
};

export const fetchEnquiry = async (id: string): Promise<Enquiry> => {
  const res = await api.get(`/enquiries/${id}`);
  return res.data.data;
};

export const fetchEnquiryStats = async (): Promise<EnquiryStats> => {
  const res = await api.get("/enquiries/stats");
  return res.data.data;
};

export const createEnquiry = async (payload: EnquiryPayload): Promise<Enquiry> => {
  const res = await api.post("/enquiries", payload);
  return res.data.data;
};

export const updateEnquiry = async (
  id: string,
  payload: Partial<EnquiryPayload> & { stage?: EnquiryStage }
): Promise<Enquiry> => {
  const res = await api.put(`/enquiries/${id}`, payload);
  return res.data.data;
};

export const moveEnquiryStage = async (
  id: string,
  stage: EnquiryStage,
  note?: string
): Promise<Enquiry> => {
  const res = await api.patch(`/enquiries/${id}/stage`, { stage, note });
  return res.data.data;
};

export const deleteEnquiry = async (id: string): Promise<void> => {
  await api.delete(`/enquiries/${id}`);
};

export const fetchStaffUsers = async (role?: string): Promise<StaffUser[]> => {
  const res = await api.get(`/users${role ? `?role=${role}` : ""}`);
  return res.data.data || [];
};

export const createStaffUser = async (payload: {
  email: string;
  password: string;
  name: string;
  role: "admin" | "counsellor";
}): Promise<StaffUser> => {
  const res = await api.post("/users", payload);
  return res.data.data;
};

export const updateStaffUser = async (
  id: string,
  payload: { name?: string; role?: string; isActive?: boolean; password?: string }
): Promise<StaffUser> => {
  const res = await api.put(`/users/${id}`, payload);
  return res.data.data;
};

export const deleteStaffUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
