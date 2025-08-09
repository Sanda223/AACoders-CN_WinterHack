import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../stylesheets/Landing.css' // Optional: for custom styling
import Silk from '../components/silk.jsx';

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
        <h1>Landing Page</h1>
        <p>This is a simple template to get you started with Vite and React.</p>

        <div className="auth-buttons">
          <Link to="/Login" className="auth-button login-button">Login</Link>
          <Link to="/SignUp" className="auth-button signup-button">Sign Up</Link>
        </div>
      </main>
    </div>
  )
}
