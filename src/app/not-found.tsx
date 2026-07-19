import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        {/* 404 Graphic */}
        <div className="relative mb-8">
          <h1 className="text-[140px] md:text-[180px] font-extrabold gradient-text leading-none opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-2xl">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-shadow flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/courses"
            className="px-6 py-3 rounded-xl border border-border text-text-secondary font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            View Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
