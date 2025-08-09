import { useState } from 'react'
import '../stylesheets/Signup.css'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import Silk from '../components/silk.jsx';

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    setError('')
    setSuccess('')

    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      })
      const userID = response.data.userID;

      setSuccess(response.data.message || 'Signup successful!')
      setName('')
      setEmail('')
      setPassword('')
      alert(`Signing up with:\nName: ${name}\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`)

      navigate("/user-details", { state: { userID } });

    } catch (err) {
      // Handle errors returned from backend
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Signup failed')
      } else {
        setError('Signup failed')
      }
    }
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
