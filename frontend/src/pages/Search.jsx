import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Silk from '../components/silk.jsx';

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses?query=${encodeURIComponent(searchTerm)}`
        );
        console.log("API response:", response.data); // 🔍 Debug
        setResults(response.data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch results.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]); // ✅ Listen for search param changes

  return (
    <div className="app">
      <div className="silk-background">
        <Silk speed={5} scale={1} color="#072b5a" noiseIntensity={1.5} rotation={0} />
      </div>

      <Navbar />

      <div className="spacing"></div>

      <div className="chat-header">
        <div className="search-results-box">
        <h1>Search Results for: "{searchTerm}"</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p>No results found</p>
        )}

        {!loading && results.length > 0 && (
          <ul className="results-list">
  {results.map((item) => {
    const key =
      (item.UnitCode || '') +
      (item.DegreeCode || '') +
      (item.UniversityName || '');

    const displayText = item.UnitName
      ? `Unit: ${item.UnitName} (${item.UnitCode})`
      : item.DegreeName
      ? `Degree: ${item.DegreeName}`
      : item.UniversityName
      ? `University: ${item.UniversityName}`
      : 'Unknown';

    const unitLink = item.UnitCode ? `/Home/${item.UnitCode}` : null;

    return (
      <li key={key}>
        {unitLink ? (
          <Link to={unitLink} className="result-link">
            {displayText}
          </Link>
        ) : (
          displayText
        )}
      </li>
    );
  })}
</ul>

        )}
        </div>
      </div>
    </div>
  );
}
