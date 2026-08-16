import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6">
      <div className="text-center max-w-md">
        <p className="text-sm text-white/50 uppercase tracking-widest mb-6">404</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Page not found.
        </h1>
        <p className="text-white/50 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white hover:bg-agency-accent text-ink hover:text-white font-semibold rounded-full transition-colors duration-300"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white rounded-full font-semibold text-white transition-colors duration-300"
          >
            Contact us
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
