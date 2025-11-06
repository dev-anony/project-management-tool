import DraggableCard from './Card';
import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import './Column.css'

function DndColumn({id, title, children}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  const style = {
    color: isOver ? 'green' : undefined, 
    padding: '20px', 
    border: '2px dashed gray', 
    minHeight: '200px',
    backgroundColor: isOver ? '#2c89dbff' : 'white',
  }

  return (
    <div 
      ref={setNodeRef} 
      style={{ style }} 
      className={`column ${isOver ? "column--over" : ""}`}
    >
      <h2 className="column__title">{title}</h2>

      <div className="column__content">
        {children && children.length > 0 ? (
          children
        ) : (
          <p className="column__placeholder">Drop cards here</p>
        )}
      </div>
    </div>
  )
}
export default DndColumn