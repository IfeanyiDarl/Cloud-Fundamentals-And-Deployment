import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-slate-800 border border-slate-700 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">Login to WorkDen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required 
        />
        <input 
          type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required 
        />
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-lg font-semibold transition">
          Sign In
        </button>
      </form>
      <p className="text-xs text-slate-400 text-center mt-4">
        Need an account? <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
      </p>
    </div>
  );
}

