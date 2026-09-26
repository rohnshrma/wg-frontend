import { describe, expect, it } from "vitest";
import type { ClientRect } from "@dnd-kit/core";
import { pipelineCollisionDetection } from "@/components/crm/PipelineBoard";

const rect = (left: number, top: number, width: number, height: number): ClientRect => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

// Two side-by-side columns: "demo_scheduled" holding one card, and an empty
// "demo_done". The card is dragged so the pointer sits squarely inside the
// empty column, level with the neighbouring card.
const droppables = {
  demo_scheduled: rect(0, 0, 300, 800),
  "card-aman": rect(8, 8, 284, 130),
  demo_done: rect(316, 0, 300, 800),
};

const run = (pointer: { x: number; y: number } | null) => {
  const droppableRects = new Map(Object.entries(droppables));
  const droppableContainers = Object.keys(droppables).map((id) => ({
    id,
    key: id,
    data: { current: {} },
    disabled: false,
    node: { current: null },
    rect: { current: droppableRects.get(id)! },
  }));
  return pipelineCollisionDetection({
    active: droppableContainers[1] as never,
    collisionRect: rect(pointer ? pointer.x - 142 : 180, 20, 284, 130),
    droppableRects,
    droppableContainers: droppableContainers as never,
    pointerCoordinates: pointer,
  });
};

describe("pipelineCollisionDetection", () => {
  it("drops into an empty column when the pointer is over it", () => {
    const hits = run({ x: 460, y: 80 });
    expect(hits[0]?.id).toBe("demo_done");
  });

  it("falls back to closest corners when there is no pointer (keyboard drag)", () => {
    const hits = run(null);
    expect(hits.length).toBeGreaterThan(0);
  });
});
