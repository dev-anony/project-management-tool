import './App.css'
import React, { useState } from 'react'
import DndColumn from './components/Board/Column'
import { DndContext } from '@dnd-kit/core'
import DraggableCard from './components/Board/Card'

function App() {

  const [columns, setColumns] = useState({
    todo: [{ id: "card-1", content: "Learn DnD Kit" }],
    done: [],
  });

  const style = {
    display: "flex", 
    gap: "30px", 
    padding: "5px", 
    background: "#31c277ff", 
    minHeight: "100vh" 
  };

  const findColumnOfCard = (id) => {
    for (const key in columns) {
      if (columns[key].some((c) => c.id === id)) return key;
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const fromCol = findColumnOfCard(active.id);
    const toCol = over.id;
    if (fromCol === toCol) return;

    setColumns((prev) => {
      const fromItems = prev[fromCol].filter((c) => c.id !== active.id);
      const toItems = [...prev[toCol], { id: active.id, content: active.data?.current?.content || "Card" }];
      return { ...prev, [fromCol]: fromItems, [toCol]: toItems };
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={style}>
        <DndColumn id="todo" title="To Do">
          {columns.todo.map((card) => (
            <DraggableCard key={card.id} id={card.id}>
              {card.content}
            </DraggableCard>
          ))}
        </DndColumn>

        <DndColumn id="done" title="Done">
          {columns.done.map((card) => (
            <DraggableCard key={card.id} id={card.id}>
              {card.content}
            </DraggableCard>
          ))}
        </DndColumn>
      </div>
    </DndContext>
  );
}

export default App
