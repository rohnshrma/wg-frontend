"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GraduationCap, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOURCE_LABELS, type Enquiry } from "@/types/crm";

const ownerLabel = (enquiry: Enquiry): string => {
  const owner = enquiry.owner;
  if (!owner || typeof owner === "string") return "Unassigned";
  return owner.name || owner.email.split("@")[0];
};

const relativeTime = (iso: string): string => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

interface Props {
  enquiry: Enquiry;
  onOpen: (enquiry: Enquiry) => void;
  isOverlay?: boolean;
}

export default function EnquiryCard({ enquiry, onOpen, isOverlay }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: enquiry._id,
    data: { enquiry },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // Keyboard users get the same affordance the pointer gets: Enter/Space on
      // the card opens it, while dnd-kit's own handlers own the drag keys.
      onClick={() => onOpen(enquiry)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen(enquiry);
        }
      }}
      className={cn(
        "group w-full text-left bg-white rounded-xl border border-border p-3 cursor-grab active:cursor-grabbing",
        "shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 touch-none",
        isDragging && "opacity-40",
        isOverlay && "shadow-xl ring-2 ring-primary/30 rotate-2 cursor-grabbing"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-sm text-text-primary leading-snug line-clamp-2">
          {enquiry.name}
        </h4>
        <span className="shrink-0 text-[10px] text-text-muted font-medium">
          {relativeTime(enquiry.updatedAt)}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-text-secondary">
        <p className="flex items-center gap-1.5 min-w-0">
          <GraduationCap className="w-3.5 h-3.5 shrink-0 text-text-muted" />
          <span className="truncate">{enquiry.course}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 shrink-0 text-text-muted" />
          <span className="tabular-nums">{enquiry.mobile}</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-border/70">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary font-medium truncate">
          {SOURCE_LABELS[enquiry.source] ?? enquiry.source}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-text-muted truncate max-w-[45%]">
          <User className="w-3 h-3 shrink-0" />
          <span className="truncate">{ownerLabel(enquiry)}</span>
        </span>
      </div>
    </div>
  );
}
