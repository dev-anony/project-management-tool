import React, { useState, useRef } from 'react'
import { useDraggable } from '@dnd-kit/core'

function DraggableCard() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })

  const [count, setCount] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({x: 0, y: 0});

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
    backgroundColor: '#c52222ff',
    padding: '10px',
    border: '1px solid #219aacff',
  }

  const handleMouseDown = (e) => {console.log('Mouse down', e);
    setIsDragging(true);
    dragStartPos.current = {x: e.clientX, y: e.clientY};
  };

  const handleMouseUp = (e) => {
    const {x, y} = dragStartPos.current;
    const distance = Math.hypot(e.clientX - x, e.clientY - y);

    setIsDragging(false);
    if (distance < 1) {
      setCount((count) => count + 1);
    }
  };
  return (
    <div className='d'
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      count is {count}
    </div>
  )
}

export default DraggableCard