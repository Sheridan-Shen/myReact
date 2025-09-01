import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hello from './components/Hello'
import './App.css'
import TodoList from './components/TodoList'
import Counter from './components/Counter'
import Register from './components/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <TodoList />
      </div>
      <div>
        <Counter />
      </div>   */}

      <div>
        <Register />
      </div>

      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
