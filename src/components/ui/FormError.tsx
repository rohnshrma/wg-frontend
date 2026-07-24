import { AlertCircle } from "lucide-react";

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
      <AlertCircle className="w-4 h-4 shrink-0" />
      {message}
    </div>
  );
}
