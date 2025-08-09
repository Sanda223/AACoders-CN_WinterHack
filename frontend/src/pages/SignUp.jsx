import { useState } from 'react'
import '../stylesheets/Signup.css'
import Navbar from '../components/Navbar'
import Silk from '../components/silk.jsx';

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    setError('')
    // TODO: Send data to backend
    alert(`Signed up as:\nName: ${name}\nEmail: ${email}`)
  }

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

      <div className="container-wrapper">
        <div className="signup-container transparent">
          <h1>Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name..."
              required
            />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              required
            />

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Sign Up</button>
          </form>
        </div>
        </div>
    </div>
  )
}
