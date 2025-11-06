import { useState } from 'react'
import './App.css'
import DraggableButton from './components/Board/Card'
import { DndContext } from '@dnd-kit/core'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DndContext>
      
      {/* Button is draggable independently now */}
      <DraggableButton count={count} setCount={setCount} />

    </DndContext>
  )
}

export default App
