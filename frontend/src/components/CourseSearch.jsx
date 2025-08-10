// src/CourseSearch.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Silk from './components/silk.jsx';

export default function CourseSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('query', searchTerm);

      const response = await axios.get(`http://localhost:5000/api/courses?${params.toString()}`);
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="silk-background">
        <Silk speed={5} scale={1} color="#072b5a" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* Pass props down to Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />

      <div className="spacing"></div>

      {/* Rest of your page */}
      <main className="main-content">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <ul>
          {results.length === 0 && !loading && <li>No results found</li>}
          {results.map((item) => (
            <li key={item.UnitCode + item.DegreeCode}>
              {item.UnitName
                ? `Unit: ${item.UnitName} (${item.UnitCode})`
                : item.DegreeName
                ? `Degree: ${item.DegreeName}`
                : item.UniversityName
                ? `University: ${item.UniversityName}`
                : 'Unknown'}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
