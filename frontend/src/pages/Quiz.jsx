import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api';
import sampleQuestions from '../sample_questions.json';

export default function Quiz(){
  const { user } = useContext(AuthContext);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const total = sampleQuestions.length;
  const score = useMemo(()=>{
    let s=0;
    for(const q of sampleQuestions){
      if (answers[q.id] === q.answerIndex) s++;
    }
    return s;
  }, [answers]);

  async function submitScore(){
    if (!user) return alert('Login to submit score');
    await API.post('/scores', { score, total, username: user.name });
    alert('Score submitted!');
  }

  if (showResult){
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        <div className="mb-4">Score: <strong>{score}/{total}</strong></div>
        <div className="flex gap-2">
          <button onClick={submitScore} className="p-2 bg-blue-600 text-white rounded">Submit to leaderboard</button>
          <button onClick={()=>{ setShowResult(false); setAnswers({}); }} className="p-2 border rounded">Retake</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded space-y-4">
      <h2 className="text-2xl font-semibold">Sample Quiz</h2>
      {sampleQuestions.map((q,idx)=>(
        <div key={q.id} className="p-4 border rounded">
          <div className="font-semibold">{idx+1}. {q.question}</div>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            {q.options.map((opt,i)=>(
              <label key={i} className={`p-2 border rounded ${answers[q.id]===i?'bg-green-50':''}`}>
                <input type="radio" name={`q${q.id}`} checked={answers[q.id]===i} onChange={()=> setAnswers(a=>({...a, [q.id]: i}))} /> <span className="ml-2">{String.fromCharCode(65+i)}. {opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={()=>setShowResult(true)} className="p-2 bg-indigo-600 text-white rounded">Finish</button>
        <button onClick={()=>{ setAnswers({}); }} className="p-2 border rounded">Clear</button>
      </div>
    </div>
  );
}
