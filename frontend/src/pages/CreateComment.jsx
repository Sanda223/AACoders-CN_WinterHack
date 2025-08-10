import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Silk from '../components/silk.jsx';
import '../stylesheets/CreatePost.css';

export default function CreateComment() {
  const { postID } = useParams();  // get postID from URL param
  const [Content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Hardcoded userID for testing
  const UserID = 'ff5f6818-982b-4358-b3e9-790fa4d8be41';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Content) {
      setError('Comment content is required.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/newComment', {
        Content,
        PostID: postID,
        UserID: UserID,
        likes: 0,
        dislikes: 0,
        pinned: false,
      });

      setSuccess(response.data.message || 'Comment created successfully!');
      setContent('');

      // Optionally redirect back to the post details page after success
      setTimeout(() => {
        navigate(`/post/${PostID}`);
      }, 1500);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.error || 'Comment creation failed');
      } else {
        setError('Comment creation failed');
      }
    }
  };

  return (
    <div className="app">
      <div className="silk-background">
        <Silk speed={5} scale={1} color="#072b5a" noiseIntensity={1.5} rotation={0} />
      </div>

      <Navbar />

      <div className="create-post-wrapper">
        <div className="create-post-container transparent">
          <h2>Add a Comment</h2>
          <textarea
            className="post-textarea"
            placeholder="Write your comment here..."
            rows={6}
            value={Content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="post-button" onClick={handleSubmit}>
            Post Comment
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
    </div>
  );
}
