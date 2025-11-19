import { useRef } from "react";
import React from "react";
import KanbanBoard from "../components/Board/Board";

export default function DragScroll() {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  // NEW: track if any child is dragging
  const childDragging = useRef(false);

  const handleMouseDown = (e) => {
    // If a child is dragging, don't start container drag
    if (childDragging.current) return;

    isDown.current = true;
    moved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    if (childDragging.current) return; // bail out if child drag in progress

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(walk) > 5) moved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="overflow-x-scroll whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
      style={{ width: "100%" }}
    >
      <KanbanBoard />
    </div>
  );
}
