import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/CreatePost.css';
import Navbar from '../components/Navbar';
import Silk from '../components/silk.jsx';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [DegreeCode, setDegreeCode] = useState('');
  const [CourseCode, setCourseCode] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  // Hardcode userID for testing
  const [userID, setUserID] = useState('ff5f6818-982b-4358-b3e9-790fa4d8be41');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !userID) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/newPost', {
        title,
        content,
        userID,
        DegreeCode,
        CourseCode,
        likes,
        dislikes,
        pinned,
        createdAt: new Date(),
      });

      setUserID(response.data.userID || '');
      setSuccess(response.data.message || 'Post created successfully!');

      // Reset form
      setTitle('');
      setContent('');
      setDegreeCode('');
      setCourseCode('');
      setLikes(0);
      setDislikes(0);
      setPinned(false);

      alert(`Creating post with:\nTitle: ${title}\nContent: ${content}\nUserID: ${userID}`);

      //navigate("/user-details", { state: { userID: response.data.userID } });
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.error || 'Post creation failed');
      } else {
        setError('Post creation failed');
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
          <h2>Create a Post</h2>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="post-button" onClick={handleSubmit}>
            Post
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
    </div>
  );
}
