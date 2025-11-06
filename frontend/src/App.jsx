import { useState } from 'react'
<<<<<<< HEAD
=======
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
>>>>>>> d3242b93a4997c8c79689a90e43cb59cc583c084
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
