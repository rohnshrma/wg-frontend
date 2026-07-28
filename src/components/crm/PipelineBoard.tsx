"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
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

  // Mouse and touch need different activation strategies. A small mouse-move
  // distance keeps a plain click (which opens the detail view) from being
  // swallowed as a drag. Touch can't use distance alone: a finger moves a few
  // pixels on almost every tap, and on a touch surface that ambiguity is what
  // caused the reported glitching — the browser and dnd-kit would race to
  // decide "is this a scroll or a drag?" and sometimes both would partially
  // win. A short hold delay resolves that up front: quick swipes are always a
  // scroll, and only a still finger followed by movement starts a drag.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
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
      // acceleration scales scroll speed linearly — verified against dnd-kit's
      // source (dist/core.esm.js): every 5ms it calls
      // scrollContainer.scrollBy(x, y) where the amount is
      // `acceleration × how far into the edge threshold the pointer is`, with
      // no cap in between, so this multiplier is exact, not approximate.
      // 24 (2x) and 48 (4x) still felt too slow on a real phone; this is 10x
      // the original 12 this session started from.
      autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 120 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveEnquiry(null)}
    >
      <div
        className={cn(
          // Below lg: stages stack as full-width vertical sections and the
          // page itself scrolls — a card is dragged down into the next
          // section, the same gesture as scrolling, with no horizontal
          // scroller to fight over. At lg+ there's room for the traditional
          // side-by-side Kanban columns instead.
          "flex flex-col gap-3 lg:flex-row lg:gap-4 lg:overflow-x-auto lg:pb-4 lg:-mx-4 lg:px-4 xl:mx-0 xl:px-0",
          // Scroll-snap (lg+ only) fights the drag auto-scroll: as dnd-kit
          // nudges scrollLeft to reveal the next column, snap tries to yank
          // it back to the nearest column boundary, which is what produced
          // the "columns shift" / card-jump reports. Snap only applies when
          // nothing is being dragged.
          activeEnquiry ? "lg:snap-none" : "lg:snap-x lg:snap-mandatory xl:snap-none"
        )}
      >
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
          <div className="w-[clamp(260px,78vw,300px)]">
            <EnquiryCard enquiry={activeEnquiry} onOpen={() => {}} isOverlay />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
