import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fixed: Use absolute backend URL
    axios.get('http://localhost:8080/api/jobs')
      .then(response => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading jobs...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found. Try posting one!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {jobs.map(job => (
            <li key={job.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Salary:</strong> ${job.salary ? job.salary.toLocaleString() : 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}