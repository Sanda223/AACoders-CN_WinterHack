import { useState } from 'react'
import '../stylesheets/Signup.css'
import Navbar from '../components/Navbar'

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
      <Navbar />

      <main className="main-content">
        <div className="signup-container">
          <h2>Sign Up</h2>
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
      </main>
    </div>
  )
}
