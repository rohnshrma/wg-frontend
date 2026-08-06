import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ForgotPasswordContent from "./ForgotPasswordContent";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your WebiGeeks account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main><ForgotPasswordContent /></main>
    </>
  );
}
