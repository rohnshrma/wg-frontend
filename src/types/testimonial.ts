export interface Testimonial {
  _id: string;
  studentName: string;
  courseName: string;
  companyPlaced?: string;
  designation?: string;
  salaryPackage?: string;
  photoUrl?: string;
  videoUrl?: string;
  testimonialText: string;
  rating: number;
  source?: 'google' | 'manual';
  isActive: boolean;
  displayOrder: number;
}
