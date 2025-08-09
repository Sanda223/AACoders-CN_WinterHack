import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../stylesheets/Landing.css' // Optional: for custom styling

export default function LandingPage() {
  return (
    <div className="app">
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
