import { useState } from 'react'
import '../stylesheets/App.css'
import Navbar from '../components/Navbar'
import axios from "axios";

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
      <Navbar />

      {/* Landing Content */}
      <main className="main-content">
        <h1>Welcome to AA Coders web app!!</h1>
        <p>This is a simple template to get you started with Vite and React.</p>
      </main>
    </div>
  )
}
