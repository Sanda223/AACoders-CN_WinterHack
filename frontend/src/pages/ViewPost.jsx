import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Silk from '../components/silk.jsx';
import '../stylesheets/ViewPost.css';

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getPostAndComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/post/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch post details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostAndComments();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return null;

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
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24" className="back-icon">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </Link>
      </div>

      <div className="content-container">
        <div className="post-container transparent">
          <div className="post-header">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-author">By {post.author || "Unknown"}</p>
          </div>

          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <div className="reaction-row">
            <button className="like-btn transparent">👍 {post.likes || 0}</button>
            <button className="dislike-btn transparent">👎 {post.dislikes || 0}</button>
            <button className="reply-btn transparent"><Link to={`/post/${post._id}/comment`}>Reply</Link></button>
          </div>

          <div className="comment-section">
            <h3 className="comment-heading">Comments</h3>
            {post.Comments && post.Comments.length > 0 ? (
              post.Comments.map((comment, idx) => (
                <div key={idx} className="comment transparent">

                  <p className="comment-body">{comment.Content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
