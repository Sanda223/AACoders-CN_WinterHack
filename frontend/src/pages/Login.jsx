import { useState } from 'react'
import '../stylesheets/Login.css'
import Navbar from '../components/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    setError('')
    // TODO: Replace with real authentication
    alert(`Logging in with:\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`)
  }

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="login-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Log In</button>
          </form>
        </div>
      </main>
    </div>
  )
}
