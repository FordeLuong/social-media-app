import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Register from './pages/Register';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Register>
      </Register>
    </div>
    )
}

export default App
