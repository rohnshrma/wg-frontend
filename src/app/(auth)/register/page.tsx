import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import RegisterContent from "./RegisterContent";
import { getCurrentTenant } from "@/lib/tenant";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your WebiGeeks account to get started.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  const tenant = await getCurrentTenant();
  return (
    <>
      <Navbar tenant={tenant} />
      <main><RegisterContent /></main>
    </>
  );
}
