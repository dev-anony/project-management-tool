import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DraggableButton from './components/Board/Card'
import { DndContext } from '@dnd-kit/core'

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
