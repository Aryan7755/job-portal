import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { loginUser, registerUser } from '../services/authService';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'CANDIDATE'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // 2. Initialize navigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            if (isLogin) {
                await loginUser({ username: formData.username, password: formData.password });
                setMessage('Login successful! Redirecting...');
                
                // 3. Perform actual redirection to home page after 1 second
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                await registerUser(formData);
                setMessage('Registration successful! Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Check backend connection.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', background: '#1e1e1e', color: '#fff' }}>
            <h2>{isLogin ? 'Login to Job Portal' : 'Register New Account'}</h2>
            
            {message && <p style={{ color: '#4bb543' }}>{message}</p>}
            {error && <p style={{ color: '#ff4d4d' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />

                {!isLogin && (
                    <>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                        />
                        <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                            <option value="CANDIDATE">Candidate</option>
                            <option value="EMPLOYER">Employer</option>
                        </select>
                    </>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />

                <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>

            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    style={{ background: 'none', border: 'none', color: '#4dabf7', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {isLogin ? 'Register here' : 'Login here'}
                </button>
            </p>
        </div>
    );
}