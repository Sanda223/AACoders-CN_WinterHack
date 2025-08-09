import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../stylesheets/Landing.css' // Optional: for custom styling
import Silk from '../components/silk.jsx';
import ShinyText from '../components/ShinyText.jsx';

export default function LandingPage() {
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

      <main className="main-content landing">
        <h1><ShinyText text="PeerReviewed" disabled={false} speed={3} className='custom-class' /></h1>
        <div className="intro-text-container">
          <p>Your space to connect, collaborate, and chat with students in your university units.</p>
          <p>Whether you're looking for study partners, help with assignments, or just want to meet others in your course — UnitCircle brings your classmates together in one place.</p>
          <p>Join a forum for your unit, post questions, share insights, or just say hello. Let's make uni feel a little less solo.</p>
        </div>

        <div className="auth-buttons">
          <Link to="/Login" className="auth-button login-button">Login</Link>
          <Link to="/SignUp" className="auth-button signup-button">Sign Up</Link>
        </div>
      </main>
    </div>
  )
}
