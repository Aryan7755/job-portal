import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Job not found');
        }
        return response.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Loading job details...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
      >
        &larr; Back
      </button>
      <div style={{ border: '1px solid #444', padding: '30px', borderRadius: '8px', background: '#1e1e1e' }}>
        <h1>{job.title}</h1>
        <p style={{ fontSize: '18px', margin: '20px 0', lineHeight: '1.6' }}>{job.description}</p>
        <p style={{ fontSize: '16px' }}><strong>Salary:</strong> ${job.salary ? job.salary : 'Not specified'}</p>
      </div>
    </div>
  );
}

export default JobDetails;