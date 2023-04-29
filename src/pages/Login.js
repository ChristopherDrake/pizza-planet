import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      try {
        await auth.signInWithEmailAndPassword(email, password);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
