import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />

      {/* Landing Content */}
      <main className="main-content">
        <h1>Welcome to AA Coders web app!!</h1>
        <p>This is a simple template to get you started with Vite and React.</p>
      </main>
    </div>
  )
}

export default App
