import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Silk from '../components/silk.jsx';

export default function ViewPost() {
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

        <main className="main-content">
        <h1>Post Details</h1>
        </main>
    </div>
  )
}
