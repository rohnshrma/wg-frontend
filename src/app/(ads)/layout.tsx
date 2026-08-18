// Deliberately bare — no Navbar/Footer/FloatingButtons. Ad landing pages
// should give paid clicks nowhere to wander off to except the form.
export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-black min-h-screen bg-background text-text-primary">{children}</div>;
}
