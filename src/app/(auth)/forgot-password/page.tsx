import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ForgotPasswordContent from "./ForgotPasswordContent";
import { getCurrentTenant } from "@/lib/tenant";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your WebiGeeks account password.",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  const tenant = await getCurrentTenant();
  return (
    <>
      <Navbar tenant={tenant} />
      <main><ForgotPasswordContent /></main>
    </>
  );
}
