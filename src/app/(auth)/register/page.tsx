import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import RegisterContent from "./RegisterContent";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your WebiGeeks account to get started.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main><RegisterContent /></main>
    </>
  );
}
