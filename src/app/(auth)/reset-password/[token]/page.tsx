import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ResetPasswordContent from "./ResetPasswordContent";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your WebiGeeks account.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <>
      <Navbar />
      <main>
        <ResetPasswordContent token={token} />
      </main>
    </>
  );
}
