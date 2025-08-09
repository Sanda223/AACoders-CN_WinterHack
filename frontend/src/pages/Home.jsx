import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Home.css'
import Navbar from '../components/Navbar'
import Silk from '../components/silk.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="silk-background">
        <Silk
          speed={5}
          scale={1}
          color="#072b5a"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <Navbar />

      <div className="spacing"></div>

      <header className="chat-header transparent">
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
