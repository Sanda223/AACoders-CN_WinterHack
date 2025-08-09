import { useState } from 'react'
import '../stylesheets/CreatePost.css'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function CreatePost() {
    const [postContent, setPostContent] = useState('')

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('Posted:', postContent)
      // Future: Send to backend or state management
      setPostContent('') // Clear input after post
    } else {
      alert('Post cannot be empty!')
    }
  }

  return (
    <div className="app">
        <Navbar />

        <div className="create-post-wrapper">
        <div className="create-post-container">
            <h2>Create a Post</h2>
            <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            rows={10}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            />
            <button className="post-button" onClick={handlePost}>
            Post
            </button>
        </div>
        </div>
    </div> 
  )  
}
