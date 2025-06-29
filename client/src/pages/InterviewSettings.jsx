import React, { useState } from 'react';
import PublicLayout from '../layout/PublicLayout.jsx';
import {useNavigate} from "react-router-dom";

const agents = [
  { name: 'Nova', role: 'System Design', img: '/img/kenjie.png' },
  { name: 'Tung Tung', role: 'Sahuring', img: '/img/rhesty.png' },
  { name: 'Echo', role: 'Warm, Friendly and Engaging', img: '/img/kenjie.png' },
  { name: 'Atlas', role: 'Coding', img: '/img/kenjie.png' },
  { name: 'Vega', role: 'Behavioral', img: '/img/kenjie.png' },
];

const difficulties = ['Easy', 'Moderate', 'Intermediate', 'Hard', 'Expert'];
const VISIBLE_COUNT = 5;

export default function InterviewSettings() {
  const [current, setCurrent] = useState(2);
  const [difficulty, setDifficulty] = useState(2);
  const [numQuestions, setNumQuestions] = useState('');
  const [maximumFQ, setMaximumFQ] = useState('');
  const [interviewType, setInterviewType] = useState('practice');

  const navigate = useNavigate();

  const prevAgent = () =>
      setCurrent((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
  const nextAgent = () =>
      setCurrent((prev) => (prev === agents.length - 1 ? 0 : prev + 1));

  const getVisibleAgents = () => {
    const half = Math.floor(VISIBLE_COUNT / 2);
    const arr = [];
    for (let i = -half; i <= half; i++) {
      let idx = (current + i + agents.length) % agents.length;
      arr.push({ ...agents[idx], idx });
    }
    return arr;
  };

  const handleOnNext = () => {
    navigate("/camera-setup");
  }

  return (
      <PublicLayout>
        <div className="min-h-screen bg-bgColor flex flex-col font-nunito">
          <main className="flex-1 flex flex-col items-center py-12 px-4">
            <h1 className="text-h2 font-bold text-primary mb-4">Interview Settings</h1>
            <h2 className="text-h5 text-center text-headingText max-w-2xl mb-6">
              Which AI Interview Agent Would You Like to Practice With?
            </h2>
            <p className="text-p text-subHeadingText text-center max-w-xl mb-12">
              Each agent has a unique voice and personality style to suit different types of interviews —
              from friendly to formal, casual to corporate. Choose the one that best fits the kind of
              interview you want to prepare for.
            </p>

            {/* Agent Carousel */}
            <div className="flex items-center justify-center mb-10">
              <button
                  onClick={prevAgent}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-headingText hover:bg-[#0a2a4a] transition-colors mx-2"
                  aria-label="Previous agent"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex space-x-6 items-end min-w-[520px] justify-center">
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
                            className={`rounded-2xl object-cover w-36 h-48 border-4 ${
                                isSelected ? 'border-primary' : 'border-transparent'
                            }`}
                        />
                        <span className="mt-3 font-semibold text-headingText text-p">{agent.name}</span>
                      </div>
                  );
                })}
              </div>

              <button
                  onClick={nextAgent}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-headingText hover:bg-[#0a2a4a] transition-colors mx-2"
                  aria-label="Next agent"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-h5 font-semibold text-headingText">{agents[current].name}</div>
              <div className="text-small text-subHeadingText">{agents[current].role}</div>
            </div>

            {/* Difficulty Selection */}
            <div className="w-full max-w-2xl bg-bgColor2 rounded-xl py-10 px-8 mb-10">
              <div className="text-center font-medium text-headingText text-p mb-6">
                What level of difficulty of question you prefer?
              </div>
              <div className="flex items-center justify-center space-x-8">
                {difficulties.map((level, idx) => (
                    <div key={level} className="flex flex-col items-center">
                      <input
                          type="radio"
                          name="difficulty"
                          checked={difficulty === idx}
                          onChange={() => setDifficulty(idx)}
                          className="accent-primary w-6 h-6 mb-2"
                      />
                      <span className="text-small text-subHeadingText">{level}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Question Handling */}
            <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 mb-10">
              <div className="flex-1">
                <label className="block text-headingText text-p font-medium mb-2">Number of Questions</label>
                <input
                    type="number"
                    min="1"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-p focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter a number"
                />
              </div>
              <div className="flex-1">
                <label className="block text-headingText text-p font-medium mb-2">Maximum follow-ups per question</label>
                <input
                    type="number"
                    min="1"
                    value={maximumFQ}
                    onChange={(e) => setMaximumFQ(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-p focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter a number"
                />
              </div>
            </div>

            {/* Interview Type */}
            <div className="w-full max-w-2xl bg-bgColor2 rounded-xl py-10 px-8 mb-10">
              <div className="text-center font-medium text-headingText text-p mb-4">
                What type of interview experience do you want?
              </div>
              <div className="flex items-center justify-center gap-10">
                <label
                    className={`px-8 py-4 rounded-lg border cursor-pointer font-semibold text-p transition-all duration-200 ${
                        interviewType === 'practice'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-headingText border-gray-300'
                    }`}
                >
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
                <label
                    className={`px-8 py-4 rounded-lg border cursor-pointer font-semibold text-p transition-all duration-200 ${
                        interviewType === 'real'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-headingText border-gray-300'
                    }`}
                >
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
              <div className="text-center text-small text-subHeadingText mt-2">
                Practice Mode gives helpful tips and retry options.
              </div>
            </div>

            {/* Next Button */}
            <button onClick={handleOnNext} className="bg-primary text-white px-20 py-4 rounded-full font-semibold text-p shadow hover:bg-blue-700 transition-all">
              Next
            </button>
          </main>
        </div>
      </PublicLayout>
  );
}
