"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { STAGE_LABELS, STAGE_STYLES, type Enquiry, type EnquiryStage } from "@/types/crm";
import EnquiryCard from "./EnquiryCard";

interface Props {
  stage: EnquiryStage;
  enquiries: Enquiry[];
  onOpen: (enquiry: Enquiry) => void;
}

export default function PipelineColumn({ stage, enquiries, onOpen }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage, data: { stage } });
  const styles = STAGE_STYLES[stage];

  return (
    <div className="flex flex-col w-[280px] sm:w-[300px] shrink-0 snap-start">
      <div className="flex items-center justify-between gap-2 px-1 pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", styles.dot)} />
          <h3 className="font-bold text-sm text-text-primary truncate">
            {STAGE_LABELS[stage]}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums",
            styles.badge
          )}
        >
          {enquiries.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-xl p-2 space-y-2 transition-colors duration-200 min-h-[140px]",
          "bg-gray-100/70 ring-1 ring-inset ring-border/60",
          // Only the drop target lights up, so where a card will land is
          // unambiguous even with six columns on screen.
          isOver && cn("bg-white ring-2", styles.ring)
        )}
      >
        <SortableContext
          items={enquiries.map((e) => e._id)}
          strategy={verticalListSortingStrategy}
        >
          {enquiries.map((enquiry) => (
            <EnquiryCard key={enquiry._id} enquiry={enquiry} onOpen={onOpen} />
          ))}
        </SortableContext>

        {enquiries.length === 0 && (
          <p className="text-center text-xs text-text-muted py-8 select-none">
            Drop enquiries here
          </p>
        )}
      </div>
    </div>
  );
}
