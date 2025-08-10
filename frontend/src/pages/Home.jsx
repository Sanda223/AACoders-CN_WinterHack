import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Silk from '../components/silk.jsx';
import ShinyText from '../components/ShinyText.jsx';

export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts'); // absolute URL to avoid proxy issues
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
            <img src="../../img/QUT_img.png" alt="Chat Icon" />
          </div>
          <h1>QUT General Chat</h1>
        </div>
        <div className="header-info-container">
          <div className="header-info">
            <small className="members">20,342 members</small>
            <small className="active">
              <span className="active-dot"></span>
              175 active
            </small>
          </div>
          <Link to="/CreatePost" style={{ textDecoration: 'none' }}>
            <button className="create-post-button">
              <ShinyText
                text="+ Create Post"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </button>
          </Link>
        </div>
      </header>

      <div className="post-section">
        <section className="recent-posts transparent">
          {loading && <p>Loading posts...</p>}
          {error && <p className="error">{error}</p>}
          <ul className="post-list">
            {posts.map((post, index) => (
              <li key={post._id || index} className="post-item">
                <span className="post-title">
                  <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                    {post.title?.length > 50
                      ? post.title.slice(0, 50) + "..."
                      : post.title}
                  </Link>
                </span>
                <div className="post-footer">
                  <p className="post-body">
                    {post.content?.length > 80
                      ? post.content.slice(0, 80) + "..."
                      : post.content}
                  </p>
                  <span className="post-author">by {post.userID || 'Unknown'}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <main className="main-content"></main>
    </div>
  );
}
