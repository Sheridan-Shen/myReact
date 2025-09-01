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
      <div>
        <TodoList />
      </div>
      
      {/* <div>
        <Counter />
      </div>   */}

      {/* <div>
        <Register />
      </div> */}
    </>
  )
}

export default App
