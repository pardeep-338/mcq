import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Leaderboard(){
  const [list,setList] = useState([]);
  useEffect(()=>{
    API.get('/scores/top').then(r=>setList(r.data)).catch(()=>{});
  },[]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ol className="space-y-2">
        {list.map((s,i)=> (
          <li key={s._id} className="flex justify-between p-3 border rounded">
            <div>
              <div className="font-semibold">{i+1}. {s.username}</div>
              <div className="text-xs text-gray-500">Taken on {new Date(s.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-lg font-bold">{s.score}/{s.total}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
