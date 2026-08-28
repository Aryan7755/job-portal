import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/applications')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Loading applications...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '40px', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
      >
        &larr; Back to Home
      </button>

      <h1 style={{ marginBottom: '20px' }}>Submitted Applications</h1>

      {applications.length === 0 ? (
        <p style={{ color: '#aaa' }}>No applications received yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {applications.map((app) => (
            <div 
              key={app.id} 
              style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', background: '#1e1e1e' }}
            >
              <h3>{app.applicantName}</h3>
              <p style={{ margin: '8px 0', color: '#ccc' }}><strong>Email:</strong> {app.applicantEmail}</p>
              <p style={{ margin: '8px 0', color: '#ccc' }}>
                <strong>Applied For Job:</strong> {app.job ? app.job.title : 'Unknown Job'}
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong>Resume:</strong>{' '}
                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4dabf7' }}>
                  View Resume
                </a>
              </p>
              {app.coverNote && (
                <p style={{ marginTop: '12px', background: '#2a2a2a', padding: '10px', borderRadius: '4px', fontSize: '14px' }}>
                  <strong>Cover Note:</strong> {app.coverNote}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsList;