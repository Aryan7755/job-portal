import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import PostJob from './components/PostJob';
import JobDetails from './components/JobDetails';
import './App.css';

// Main Job List / Home View Component
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Loading jobs...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No jobs posted yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {jobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{ 
                border: '1px solid #444', 
                padding: '20px', 
                borderRadius: '8px', 
                background: '#1e1e1e',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#888'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444'}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{job.title}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#ccc' }}>{job.description}</p>
              <p style={{ margin: 0 }}><strong>Salary:</strong> ${job.salary ? job.salary : 'Not specified'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main App Layout with Router
function App() {
  return (
    <Router>
      <div>
        {/* Navigation Header */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', background: '#111', color: 'white' }}>
          <h2>Job Portal V1</h2>
          <div>
            <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Browse Jobs</Link>
            <Link to="/post-job" style={{ color: 'white', textDecoration: 'none' }}>Post a Job</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;