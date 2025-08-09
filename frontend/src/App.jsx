// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <nav>
        {/* Links to switch routes */}
        <Link to="/">Home</Link> |{' '}
      </nav>

      <Routes>
        {/* Define routes and their components */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
