"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, GraduationCap, MapPin, Save, User } from "lucide-react";

type Course = {
  _id: string;
  title: string;
  fees: number;
  duration?: string;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  qualification: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  courseId: string;
  paymentMode: "emi" | "full";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  qualification: "",
  fatherName: "",
  motherName: "",
  parentPhone: "",
  courseId: "",
  paymentMode: "emi",
};

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setFormData((current) => ({ ...current, email: user.email || "" }));

        const [coursesRes, dashboardRes] = await Promise.all([
          fetch(`${API_URL}/courses`),
          fetch(`${API_URL}/students/me/dashboard`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const coursesData = await coursesRes.json();
        if (coursesRes.ok) setCourses(coursesData.data || []);

        const dashboardData = await dashboardRes.json();
        const student = dashboardData.data?.student;
        if (dashboardRes.ok && student) {
          setIsLocked(Boolean(student.isProfileLocked));
          setFormData({
            fullName: student.fullName || "",
            phone: student.studentContactNumber || "",
            email: student.email || user.email || "",
            dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : "",
            gender: student.gender || "",
            address: student.address?.street || "",
            city: student.address?.city || "",
            state: student.address?.state || "",
            pincode: student.address?.pincode || "",
            qualification: student.qualification || "",
            fatherName: student.fatherName || "",
            motherName: student.motherName || "",
            parentPhone: student.parentContactNumber || "",
            courseId: student.courseId?._id || student.courseId || "",
            paymentMode: student.paymentMode || "emi",
          });
        }
      } catch {
        setError("Could not load profile details");
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const selectedCourse = courses.find((course) => course._id === formData.courseId);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/students/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          fullName: formData.fullName,
          studentContactNumber: formData.phone,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          qualification: formData.qualification,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          parentContactNumber: formData.parentPhone,
          courseId: formData.courseId,
          courseFees: selectedCourse?.fees || 0,
          joiningDate: new Date().toISOString(),
          paymentMode: formData.paymentMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not save profile");
      setSaved(true);
      setIsLocked(Boolean(data.data?.isProfileLocked));
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 disabled:text-text-muted";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {saved && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> Profile submitted successfully. Admin can now review it.</div>}
      {error && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}
      {isLocked && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> Your registration is approved and your profile is locked.</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *"><input disabled={isLocked} required value={formData.fullName} onChange={(event) => updateField("fullName", event.target.value)} className={inputClass} placeholder="Full Name" /></Field>
            <Field label="Phone *"><input disabled={isLocked} required type="tel" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className={inputClass} placeholder="Phone Number" /></Field>
            <Field label="Email *"><input disabled={isLocked} required type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} placeholder="Email Address" /></Field>
            <Field label="Date of Birth *"><input disabled={isLocked} required type="date" value={formData.dateOfBirth} onChange={(event) => updateField("dateOfBirth", event.target.value)} className={inputClass} /></Field>
            <Field label="Gender *">
              <select disabled={isLocked} required value={formData.gender} onChange={(event) => updateField("gender", event.target.value)} className={inputClass}>
                <option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-secondary" /> Address</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Address *" wide><textarea disabled={isLocked} required value={formData.address} onChange={(event) => updateField("address", event.target.value)} className={`${inputClass} resize-none`} rows={2} placeholder="Full Address" /></Field>
            <Field label="City *"><input disabled={isLocked} required value={formData.city} onChange={(event) => updateField("city", event.target.value)} className={inputClass} placeholder="City" /></Field>
            <Field label="State *"><input disabled={isLocked} required value={formData.state} onChange={(event) => updateField("state", event.target.value)} className={inputClass} placeholder="State" /></Field>
            <Field label="Pincode *"><input disabled={isLocked} required value={formData.pincode} onChange={(event) => updateField("pincode", event.target.value)} className={inputClass} placeholder="Pincode" /></Field>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-accent" /> Education & Course</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Qualification *"><input disabled={isLocked} required value={formData.qualification} onChange={(event) => updateField("qualification", event.target.value)} className={inputClass} placeholder="e.g. B.Tech, BSc, BCA" /></Field>
            <Field label={courses.length > 0 ? "Course *" : "Course"}>
              <select disabled={isLocked} required={courses.length > 0} value={formData.courseId} onChange={(event) => updateField("courseId", event.target.value)} className={inputClass}>
                <option value="">{courses.length > 0 ? "Select course" : "Course can be assigned by admin later"}</option>
                {courses.map((course) => <option key={course._id} value={course._id}>{course.title} - Rs. {course.fees}</option>)}
              </select>
            </Field>
            <Field label="Payment Mode *">
              <select disabled={isLocked} required value={formData.paymentMode} onChange={(event) => updateField("paymentMode", event.target.value as FormData["paymentMode"])} className={inputClass}>
                <option value="emi">EMI</option><option value="full">Full Payment</option>
              </select>
            </Field>
            <Field label="Father Name *"><input disabled={isLocked} required value={formData.fatherName} onChange={(event) => updateField("fatherName", event.target.value)} className={inputClass} placeholder="Father Name" /></Field>
            <Field label="Mother Name *"><input disabled={isLocked} required value={formData.motherName} onChange={(event) => updateField("motherName", event.target.value)} className={inputClass} placeholder="Mother Name" /></Field>
            <Field label="Parent Phone *"><input disabled={isLocked} required type="tel" value={formData.parentPhone} onChange={(event) => updateField("parentPhone", event.target.value)} className={inputClass} placeholder="Parent Phone" /></Field>
          </div>
        </div>

        {!isLocked && (
          <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2">
            {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Submit For Approval
          </button>
        )}
      </form>
    </motion.div>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
      {children}
    </div>
  );
}
