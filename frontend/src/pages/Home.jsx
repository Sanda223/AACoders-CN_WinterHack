import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Home.css'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />

      <header className="chat-header">
        <div className="chat-header-top">
          <div className="chat-img-box">
            <img src="../../img/QUT_img.png" alt="Chat Icon"/>
          </div>
          <h1>QUT General Chat</h1>
        </div>
        <div className="header-info-container">
          <div className="header-info">
            <small className="members">123 members</small>
            <small className="active">
              <span className="active-dot"></span>
              12 active
            </small>
          </div>
          <Link to="/CreatePost" style={{ textDecoration: 'none' }}>
            <button className="create-post-button">+ Create Post</button>
          </Link>
        </div>
      </header>

      <main className="main-content">
        
      </main>
    </div>
  )
}

export default App
