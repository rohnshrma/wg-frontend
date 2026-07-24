export interface StudentAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface StudentCourse {
  _id: string;
  title: string;
  slug?: string;
  duration?: string;
}

export interface Student {
  _id: string;
  userId: string;
  admissionId?: string;
  status: "pending" | "approved" | "rejected";

  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  photoUrl: string;
  aadhaarUrl: string;

  fatherName: string;
  motherName: string;
  parentContactNumber: string;

  studentContactNumber: string;
  email: string;
  address: StudentAddress;

  qualification: string;

  courseId?: StudentCourse;
  courseFees: number;
  joiningDate: string;

  paymentMode: "full" | "emi";
  totalPaid: number;
  pendingAmount: number;

  approvedBy?: { _id: string; email: string };
  approvedAt?: string;
  rejectionReason?: string;

  isProfileLocked: boolean;
  createdAt: string;
  updatedAt: string;
}
