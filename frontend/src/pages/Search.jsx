import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';
import Navbar from '../components/Navbar';
import axios from "axios";
import Silk from '../components/silk.jsx';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);


    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/courses?query=${encodeURIComponent(searchTerm)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
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

      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="spacing"></div>

      <main className="main-content">
        {loading && <p>Loading...</p>}
        {!loading && results.length === 0 && <p>No results found</p>}
        {/* Results list */}
        <ul>
          {results.map((item) => (
            <li key={(item.UnitCode || '') + (item.DegreeCode || '')}>
              {item.UnitName
                ? `Unit: ${item.UnitName} (${item.UnitCode})`
                : item.DegreeName
                ? `Degree: ${item.DegreeName}`
                : item.UniversityName
                ? `University: ${item.UniversityName}`
                : "Unknown"}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

