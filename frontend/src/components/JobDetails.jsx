import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Application Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    resumeUrl: '',
    coverNote: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setSubmitError('');

    fetch(`http://localhost:8080/api/applications?jobId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit application');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('Application submitted successfully!');
        setFormData({ applicantName: '', applicantEmail: '', resumeUrl: '', coverNote: '' });
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitError(err.message);
        setSubmitting(false);
      });
  };

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

      <div style={{ border: '1px solid #444', padding: '30px', borderRadius: '8px', background: '#1e1e1e', marginBottom: '30px' }}>
        <h1>{job.title}</h1>
        <p style={{ fontSize: '18px', margin: '20px 0', lineHeight: '1.6' }}>{job.description}</p>
        <p style={{ fontSize: '16px' }}><strong>Salary:</strong> ${job.salary ? job.salary : 'Not specified'}</p>
      </div>

      {/* Application Form Section */}
      <div style={{ border: '1px solid #444', padding: '30px', borderRadius: '8px', background: '#1e1e1e' }}>
        <h2>Apply for this Job</h2>
        {successMessage && <p style={{ color: 'lightgreen', marginBottom: '15px' }}>{successMessage}</p>}
        {submitError && <p style={{ color: 'red', marginBottom: '15px' }}>{submitError}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
            <input 
              type="text" 
              name="applicantName" 
              value={formData.applicantName} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email Address</label>
            <input 
              type="email" 
              name="applicantEmail" 
              value={formData.applicantEmail} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Resume Link (URL)</label>
            <input 
              type="url" 
              name="resumeUrl" 
              value={formData.resumeUrl} 
              onChange={handleChange} 
              required 
              placeholder="https://drive.google.com/..." 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Cover Note</label>
            <textarea 
              name="coverNote" 
              value={formData.coverNote} 
              onChange={handleChange} 
              rows="4" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#2a2a2a', color: 'white' }}
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetails;