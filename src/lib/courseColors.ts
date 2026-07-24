// Purely presentational — the backend Course model has no "color" field,
// so card accent gradients are derived deterministically from the slug.
const GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-blue-500 to-indigo-600",
  "from-yellow-500 to-amber-600",
  "from-cyan-500 to-teal-600",
  "from-red-500 to-rose-600",
  "from-slate-500 to-gray-700",
  "from-green-500 to-emerald-600",
];

export function courseGradient(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return GRADIENTS[hash % GRADIENTS.length];
}
