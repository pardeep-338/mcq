import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="p-4 bg-gray-50 min-h-screen">
          <nav className="max-w-5xl mx-auto flex gap-4 mb-6">
            <Link to="/">Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>

          <main className="max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<Quiz/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
