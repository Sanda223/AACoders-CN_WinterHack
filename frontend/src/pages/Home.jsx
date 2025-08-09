import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Home.css'
import Navbar from '../components/Navbar'
import axios from "axios";
import Silk from '../components/silk.jsx';
import ShinyText from '../components/ShinyText.jsx';

export default function CourseSearch() {
  const [code, setCode] = useState("");
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (code) params.append("code", code);
      if (degree) params.append("degree", degree);
      if (university) params.append("university", university);

      const response = await axios.get(`/api/courses?${params.toString()}`);
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch courses. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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
            <button className="create-post-button"><ShinyText text="+ Create Post" disabled={false} speed={3} className='custom-class' /></button>
          </Link>
        </div>
      </header>

      <main className="main-content">
        
      </main>
    </div>
  )
}
