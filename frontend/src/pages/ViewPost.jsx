import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Silk from '../components/silk.jsx';
import '../stylesheets/ViewPost.css'

export default function ViewPost() {
  const likes = 10;
  const dislikes = 3;


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

        <div className="top-left-link">
          <Link to="/Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="white"
              viewBox="0 0 24 24"
              className="back-icon"
            >
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </Link>
        </div>


      <div className="content-container">
        <div className="post-container transparent">
          <div className="post-header">
            <h2 className="post-title">CAB402 is cooked</h2>
            <p className="post-author">By Sandaru</p>
          </div>

          <div className="post-content">
            <p>
              This is the main content of the post. It can include multiple
              paragraphs, images, or any other rich text elements you'd like to
              support. This page is styled using ViewPost.css.
            </p>
            <p>
              You can customize this further to dynamically load content from a
              database or API.
            </p>
          </div>

          <div className="reaction-buttons">
            <button className="like-btn">👍 {likes}</button>
            <button className="dislike-btn">👎 {dislikes}</button>
          </div>
        </div>
      </div>

        <main className="main-content">
        </main>
    </div>
  )
}
