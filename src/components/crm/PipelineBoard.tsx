"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ENQUIRY_STAGES, type Enquiry, type EnquiryStage } from "@/types/crm";
import { moveEnquiryStage } from "@/lib/crm";
import EnquiryCard from "./EnquiryCard";
import PipelineColumn from "./PipelineColumn";

interface Props {
  enquiries: Enquiry[];
  onOpen: (enquiry: Enquiry) => void;
  onStageChanged: (updated: Enquiry) => void;
  onOptimisticMove: (id: string, stage: EnquiryStage) => void;
  onRevert: (snapshot: Enquiry[]) => void;
  onError: (message: string) => void;
}

export default function PipelineBoard({
  enquiries,
  onOpen,
  onStageChanged,
  onOptimisticMove,
  onRevert,
  onError,
}: Props) {
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);

  const sensors = useSensors(
    // A small activation distance keeps a plain click on the card (which opens
    // the detail view) from being swallowed as a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const byStage = useMemo(() => {
    const grouped = Object.fromEntries(
      ENQUIRY_STAGES.map((stage) => [stage, [] as Enquiry[]])
    ) as Record<EnquiryStage, Enquiry[]>;
    for (const enquiry of enquiries) {
      (grouped[enquiry.stage] ??= []).push(enquiry);
    }
    return grouped;
  }, [enquiries]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveEnquiry((event.active.data.current?.enquiry as Enquiry) ?? null);
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveEnquiry(null);
      if (!over) return;

      const dragged = active.data.current?.enquiry as Enquiry | undefined;
      if (!dragged) return;

      // The drop target is either a column (id === stage) or another card, in
      // which case we take that card's stage.
      const overStage = (over.data.current?.stage ??
        (over.data.current?.enquiry as Enquiry | undefined)?.stage ??
        over.id) as EnquiryStage;

      if (!ENQUIRY_STAGES.includes(overStage) || overStage === dragged.stage) return;

      // Snapshot before mutating so a failed save can be rolled back exactly.
      const snapshot = enquiries;
      onOptimisticMove(dragged._id, overStage);

      try {
        const updated = await moveEnquiryStage(dragged._id, overStage);
        onStageChanged(updated);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        onRevert(snapshot);
        onError(error.response?.data?.message || "Could not move the enquiry. Please try again.");
      }
    },
    [enquiries, onOptimisticMove, onStageChanged, onRevert, onError]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveEnquiry(null)}
    >
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none">
        {ENQUIRY_STAGES.map((stage) => (
          <PipelineColumn
            key={stage}
            stage={stage}
            enquiries={byStage[stage] ?? []}
            onOpen={onOpen}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
        {activeEnquiry && (
          <div className="w-[280px] sm:w-[300px]">
            <EnquiryCard enquiry={activeEnquiry} onOpen={() => {}} isOverlay />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
