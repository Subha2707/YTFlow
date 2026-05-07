import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      alert("You're already logged in!");
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="glass-card auth-form page-transition">
      <h2 className="neon-text">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="neon-btn">Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
        New User?{' '}
        <Link to="/register" style={{ color: '#00ffc4', textDecoration: 'underline' }}>Register for free</Link>
      </p>
    </div>
  );
}