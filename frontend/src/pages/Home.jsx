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

      <div className="post-section">
        <section className="recent-posts transparent">
          <ul className="post-list">
            {[
              {
                title: "CAB402 is cooked",
                body: "Everyone is struggling with this subject — assignments are brutal and the final exam is harder than expected.",
              },
              {
                title: "Looking for a study group for INB100",
                body: "Anyone interested in forming a weekly study group to tackle INB100? Preferably weekends or evenings.",
              },
              {
                title: "Tips for surviving the final year at QUT",
                body: "Final year can be overwhelming. Here are a few tips I wish I knew earlier to help manage your time and stress.",
              },
              {
                title: "Free pizza at GP Library level 4 at 1PM, should be all gone by 3PM so be quick",
                body: "Student guild is offering free pizza this afternoon. Come early to grab a slice before it’s all gone!",
              },
            ].map((post, index) => (
              <li key={index} className="post-item">
                <span className="post-title">
                  <Link to="/ViewPost" style={{ textDecoration: 'none' }}>
                    {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}
                  </Link>
                </span>
                <div className="post-footer">
                  <p className="post-body">
                    {post.body.length > 80 ? post.body.slice(0, 80) + "..." : post.body}
                  </p>
                  <span className="post-author">by Sandaru</span>
                </div>
              </li>
            ))}
          </ul>

        </section>
      </div>



      <main className="main-content">
        
      </main>
    </div>
  )
}
