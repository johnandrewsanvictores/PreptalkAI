import React, { useState } from 'react';
import PublicLayout from '../layout/PublicLayout.jsx';

const agents = [
  {
    name: 'Nova',
    role: 'System Design',
    img: '/img/kenjie.png',
  },
  {
    name: 'Tung Tung',
    role: 'Sahuring',
    img: '/img/rhesty.png',
  },
  {
    name: 'Echo',
    role: 'Warm, Friendly and Engaging',
    img: '/img/kenjie.png',
  },
  {
    name: 'Atlas',
    role: 'Coding',
    img: '/img/kenjie.png',
  },
  {
    name: 'Vega',
    role: 'Behavioral',
    img: '/img/kenjie.png',
  },
];

const difficulties = ['Easy', 'Moderate', 'Intermediate', 'Hard', 'Expert'];

const VISIBLE_COUNT = 5;

export default function InterviewSettings() {
  const [current, setCurrent] = useState(2);
  const [difficulty, setDifficulty] = useState(2);
  const [numQuestions, setNumQuestions] = useState('');
  const [maximumFQ, setMaximumFQ] = useState('');
  const [interviewType, setInterviewType] = useState('practice');

  const prevAgent = () => setCurrent((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
  const nextAgent = () => setCurrent((prev) => (prev === agents.length - 1 ? 0 : prev + 1));

  const getVisibleAgents = () => {
    const half = Math.floor(VISIBLE_COUNT / 2);
    const arr = [];
    for (let i = -half; i <= half; i++) {
      let idx = (current + i + agents.length) % agents.length;
      arr.push({ ...agents[idx], idx });
    }
    return arr;
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <main className="flex-1 flex flex-col items-center py-8 px-2">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Interview Settings</h1>
          <h2 className="text-2xl mb-8 text-center max-w-xl">Which AI Interview Agent Would You Like to Practice With?</h2>
          <p className="text-gray-500 mb-8 text-center max-w-xl">Each agent specializes in different interview types. Choose one to get started!</p>


          <div className="flex items-center justify-center mb-10">
            <button
              onClick={prevAgent}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#08213a] hover:bg-[#0a2a4a] transition-colors mx-2"
              aria-label="Previous agent"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex space-x-4 items-end min-w-[420px] justify-center">
              {getVisibleAgents().map((agent, i) => {
                const isSelected = i === Math.floor(VISIBLE_COUNT / 2);
                return (
                  <div
                    key={agent.name + agent.idx}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      isSelected ? 'scale-125 z-10' : 'scale-90 opacity-60'
                    }`}
                  >
                    <img
                      src={agent.img}
                      alt={agent.name}
                      className={`rounded-2xl object-cover w-28 h-36 border-4 ${
                        isSelected ? 'border-blue-400' : 'border-transparent'
                      }`}
                    />
                    <span className="mt-2 font-semibold text-gray-700">{agent.name}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={nextAgent}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#08213a] hover:bg-[#0a2a4a] transition-colors mx-2"
              aria-label="Next agent"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-center mb-10">
            <div className="text-lg font-semibold text-gray-800">{agents[current].name}</div>
            <div className="text-gray-500">{agents[current].role}</div>
          </div>


          <div className="w-full max-w-2xl bg-[#F1F5F9] rounded-xl py-8 px-6 mb-10">
            <div className="text-center font-medium text-gray-700 mb-4">
              What level of difficulty of question you prefer?
            </div>
            <div className="flex items-center justify-center space-x-6">
              {difficulties.map((level, idx) => (
                <div key={level} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    checked={difficulty === idx}
                    onChange={() => setDifficulty(idx)}
                    className="accent-blue-600 w-5 h-5 mb-1"
                  />
                  <span className="text-sm text-gray-600">{level}</span>
                </div>
              ))}
            </div>
          </div>


          <div className="w-full max-w-2xl flex flex-col md:flex-row gap-6 mb-10">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">Number of Questions</label>
              <input
                type="number"
                min="1"
                value={numQuestions}
                onChange={e => setNumQuestions(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter a number"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 font-medium">Maximum follow-ups per question</label>
              <input
                type="number"
                min="1"
                value={maximumFQ}
                onChange={e => setMaximumFQ(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter a number"
              />
            </div>
          </div>


          <div className="w-full max-w-2xl bg-[#F1F5F9] rounded-xl py-8 px-6 mb-10">
            <div className="text-center font-medium text-gray-700 mb-4">
              What type of interview experience do you want?
            </div>
            <div className="flex items-center justify-center gap-8">
              <label className={`px-6 py-3 rounded-lg border cursor-pointer font-semibold transition-all duration-200 ${interviewType === 'practice' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                <input
                  type="radio"
                  name="interviewType"
                  value="practice"
                  checked={interviewType === 'practice'}
                  onChange={() => setInterviewType('practice')}
                  className="hidden"
                />
                Practice Interview
              </label>
              <label className={`px-6 py-3 rounded-lg border cursor-pointer font-semibold transition-all duration-200 ${interviewType === 'real' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                <input
                  type="radio"
                  name="interviewType"
                  value="real"
                  checked={interviewType === 'real'}
                  onChange={() => setInterviewType('real')}
                  className="hidden"
                />
                Real Interview
              </label>
            </div>
            <div className="text-center text-xs text-gray-600 mt-2">
              Practice helps build confidence and explore new options.
            </div>
          </div>


          <button className="bg-blue-600 text-white px-16 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition-all">
            Next
          </button>
        </main>
      </div>
    </PublicLayout>
  );
} 