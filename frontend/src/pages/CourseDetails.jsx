import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetail() {
  const { courseCode } = useParams(); // expects route like /courses/:courseCode
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`/api/courses/${courseCode}/posts`);
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [courseCode]);

  return (
    <div>
      <h2>Posts for Course: {courseCode.toUpperCase()}</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 && !loading && <p>No posts for this course yet.</p>}

      <ul>
        {posts.map((post) => (
          <li key={post._id} style={{ marginBottom: "1rem" }}>
            <strong>{post.title}</strong> <br />
            {post.content} <br />
            <small>By {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
