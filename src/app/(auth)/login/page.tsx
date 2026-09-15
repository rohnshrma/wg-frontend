import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import LoginContent from "./LoginContent";
import { getCurrentTenant } from "@/lib/tenant";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your WebiGeeks student or admin dashboard.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const tenant = await getCurrentTenant();
  return (
    <>
      <Navbar tenant={tenant} />
      <main>
        <Suspense fallback={null}>
          <LoginContent />
        </Suspense>
      </main>
    </>
  );
}
