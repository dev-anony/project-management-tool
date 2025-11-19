import { useRef } from "react";

export default function DragScroll() {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  const handleMouseDown = (e) => {
    isDown.current = true;
    moved.current = false; // reset movement flag
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(walk) > 5) {
      moved.current = true; // user dragged, not clicked
    }

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleCardClick = (index) => {
    // Ignore click if user dragged
    if (moved.current) return;

    alert("Clicked: " + index);
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="overflow-x-scroll whitespace-nowrap cursor-grab active:cursor-grabbing select-none bg-gray-100 p-4 rounded-xl"
      style={{ width: "400px" }}
    >
      {[1, 2, 3, 4].map((num, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(index)}
          className="inline-block w-48 h-32 bg-blue-300 mx-2 rounded-xl"
        >
          Card {num}
        </div>
      ))}
    </div>
  );
}
