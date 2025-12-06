import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const res = await API.post('/auth/register',{ name,email,password });
    login(res.data.token, res.data.user);
    nav('/');
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border mb-2" required />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-2" required type="email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border mb-4" required type="password" />
      <button className="w-full p-2 bg-blue-600 text-white rounded">Create account</button>
    </form>
  );
}
