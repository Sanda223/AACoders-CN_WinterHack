import { useState } from 'react'
import '../stylesheets/App.css'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />

      {/* Landing Content */}
      <main className="main-content">
        <h1>SIGN UP</h1>
      </main>
    </div>
  )
}

export default App
