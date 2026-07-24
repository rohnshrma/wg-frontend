import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import LoginContent from "./LoginContent";

export const metadata: Metadata = { title: "Login", description: "Login to your WebiGeeks student or admin dashboard." };

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <LoginContent />
        </Suspense>
      </main>
    </>
  );
}
