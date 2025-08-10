import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './stylesheets/index.css'
import Index from './pages/index.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import DegreeSignup from './pages/DegreeSignup.jsx'
import CourseDetail from "./pages/CourseDetails.jsx";
import CreatePost from './pages/CreatePost.jsx'
import ViewPost from './pages/ViewPost.jsx'
import CreateComment from './pages/CreateComment.jsx'
import Search from './pages/Search.jsx'

function UserDetailsWrapper() {
  const location = useLocation();
  const { userID } = location.state || {};
  if (!userID) {
    return <p>Error: No user ID provided</p>;
  }
  return <DegreeSignup userID={userID} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/DegreeSignup" element={<UserDetailsWrapper />} />
        <Route path="/CreatePost" element={<CreatePost />}/>
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/post/:postID/comment" element={<CreateComment />} />
        <Route path="/search" element={<Search />} /> {/* ✅ New route */}
        <Route path="/Home/CAB222" element={<Home />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)

//<Route path="/courses/:courseCode" element={<CourseDetail />} />