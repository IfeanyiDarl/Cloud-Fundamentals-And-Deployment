import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckSquare, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-400">
        <CheckSquare className="w-6 h-6" />
        <span>WorkDen</span>
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">Hi, <strong className="text-slate-200">{user.name}</strong></span>
          <button 
            onClick={logout} 
            className="flex items-center gap-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-sm transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

