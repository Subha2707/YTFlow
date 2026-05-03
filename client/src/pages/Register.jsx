import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return alert('Username is required');
    try {
      await API.post('/api/auth/register', { email, password, username });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="glass-card auth-form page-transition">
      <h2 className="neon-text">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit" className="neon-btn">Create Account</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
        Already Registered?{' '}
        <Link to="/login" style={{ color: '#00ffc4', textDecoration: 'underline' }}>Login</Link>
      </p>
    </div>
  );
}