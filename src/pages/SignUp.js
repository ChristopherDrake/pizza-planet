import React, { useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from 'react-router';
import "./SignUp.css";

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        auth.signInWithEmailAndPassword(email, password);
        navigate('/');
    } catch (err) {
    setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
