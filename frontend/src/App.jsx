import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DndContext, useDraggable } from '@dnd-kit/core'

function DraggableButton({ count, setCount }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'count-button',
  })

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({x: 0, y: 0});

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'fixed', // change to fixed for full-page dragging
    top: '60%',
    left: '50%',
    zIndex: 9999,
  }

  const handleMouseDown = (e) => {console.log('Mouse down', e);
    setIsDragging(true);
    dragStartPos.current = {x: e.clientX, y: e.clientY};
  };

  const handleMouseUp = (e) => {
    const {x, y} = dragStartPos.current;
    const distance = Math.hypot(e.clientX - x, e.clientY - y);

    setIsDragging(false);
    if (distance < 5) {
      setCount((count) => count + 1);
    }
  };
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => setCount((c) => c + 1)}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      count is {count}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <DndContext>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* Button is draggable independently now */}
      <DraggableButton count={count} setCount={setCount} />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </DndContext>
  )
}

export default App
