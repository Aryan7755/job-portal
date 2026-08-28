import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import PostJob from './components/PostJob'; // We will create this next

function App() {
  return (
    <Router>
      <div>
        <nav style={{ background: '#282c34', padding: '15px 20px', color: 'white', display: 'flex', gap: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Job Portal V1</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: 'auto' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Browse Jobs</Link>
            <Link to="/post-job" style={{ color: 'white', textDecoration: 'none' }}>Post a Job</Link>
          </div>
        </nav>
        
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;