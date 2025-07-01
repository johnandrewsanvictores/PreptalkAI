import React, { useState } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";
import { useNavigate } from "react-router-dom";

const agents = [
  {
    name: "Orion",
    role: "System Design",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zane",
    role: "Sahuring",
    img: "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cypher",
    role: "Warm, Friendly and Engaging",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Lyra",
    role: "Coding",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Apollo",
    role: "Behavioral",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const difficulties = ["Easy", "Moderate", "Intermediate", "Hard", "Expert"];
const VISIBLE_COUNT = 5;

export default function InterviewSettings() {
  const [current, setCurrent] = useState(2);
  const [difficulty, setDifficulty] = useState(2);
  const [numQuestions, setNumQuestions] = useState("");
  const [maximumFQ, setMaximumFQ] = useState("");
  const [interviewType, setInterviewType] = useState("practice");
  const [questionType, setQuestionType] = useState("");

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
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <div className="mb-8 text-center">
              <h1 className="text-h2 font-bold text-primary mb-3">
                Interview Settings
              </h1>
              <p className="text-h6 mb-3 text-subHeadingText">
                Configure your AI interview experience with personalized
                settings
              </p>
            </div>

            <div className="rounded-xl p-8 mb-8">
              <h2 className="text-h4 font-bold text-headingText text-center mb-4">
                Which AI Interview Agent Would You Like to Practice With?
              </h2>
              <p className="text-p text-subHeadingText text-center max-w-3xl mx-auto mb-12">
                Each agent has a unique voice and personality style to suit
                different types of interviews — from friendly to formal, casual
                to corporate. Choose the one that best fits the kind of
                interview you want to prepare for.
              </p>

              <div className="relative flex items-center justify-center mb-12">
                <button
                  onClick={prevAgent}
                  className="absolute left-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-headingText hover:bg-headingText/80 transition-colors"
                  aria-label="Previous agent"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex items-center justify-center space-x-6 overflow-hidden px-20">
                  {getVisibleAgents().map((agent, i) => {
                    const centerIndex = Math.floor(VISIBLE_COUNT / 2);
                    const distanceFromCenter = Math.abs(i - centerIndex);
                    const isCenter = i === centerIndex;

                    let scale, opacity, zIndex, width, height;

                    if (isCenter) {
                      scale = 1;
                      opacity = 1;
                      zIndex = 20;
                      width = "w-56";
                      height = "h-72";
                    } else if (distanceFromCenter === 1) {
                      scale = 0.85;
                      opacity = 0.8;
                      zIndex = 15;
                      width = "w-48";
                      height = "h-60";
                    } else if (distanceFromCenter === 2) {
                      scale = 0.7;
                      opacity = 0.6;
                      zIndex = 10;
                      width = "w-40";
                      height = "h-48";
                    } else {
                      scale = 0.55;
                      opacity = 0.4;
                      zIndex = 5;
                      width = "w-32";
                      height = "h-40";
                    }

                    return (
                      <div
                        key={agent.name + agent.idx}
                        className="relative flex flex-col items-center"
                        style={{
                          transform: `scale(${scale})`,
                          opacity: opacity,
                          zIndex: zIndex,
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
                        }}
                      >
                        {isCenter && (
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-30">
                            <span className="bg-green text-white px-4 py-2 rounded-full text-small font-medium shadow-lg">
                              Selected
                            </span>
                          </div>
                        )}

                        <div className="relative">
                          <img
                            src={agent.img}
                            alt={agent.name}
                            className={`${width} ${height} rounded-2xl object-cover ${
                              isCenter
                                ? "border-4 border-primary shadow-2xl"
                                : "border-2 border-gray-300"
                            }`}
                            style={{
                              transition:
                                "border-width 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={nextAgent}
                  className="absolute right-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-headingText hover:bg-headingText/80 transition-colors"
                  aria-label="Next agent"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center">
                <div className="text-h4 font-bold text-headingText mb-2">
                  {agents[current].name}
                </div>
                <div className="text-h6 text-subHeadingText mb-6">
                  {agents[current].role}
                </div>
                <div className="flex justify-center">
                  <button className="w-14 h-14 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg">
                    <svg
                      width="18"
                      height="18"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <section className="bg-bgColor2 rounded-xl p-8 mb-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-h4 font-bold text-headingText mb-10">
                  What level of difficulty of question you prefer?
                </h2>

                <div className="relative flex items-center justify-between max-w-3xl mx-auto px-6">
                  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-300 z-0" />

                  {difficulties.map((level, index) => {
                    const isActive = difficulty === index;
                    return (
                      <div
                        key={level}
                        className="relative z-10 flex flex-col items-center w-1/5"
                      >
                        <button
                          onClick={() => setDifficulty(index)}
                          className={`w-5 h-5 rounded-full border-4 transition-all duration-300 ${
                            isActive
                              ? "border-blue-600 bg-white ring-4 ring-blue-500"
                              : "border-gray-300 bg-gray-300 hover:border-gray-400"
                          }`}
                        />
                        <span
                          className={`mt-3 text-sm transition-colors ${
                            isActive
                              ? "text-[#0f172a] font-semibold"
                              : "text-slate-600"
                          }`}
                        >
                          {level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="bg-bgColor2 rounded-xl p-8 mb-8">
              <h2 className="text-h4 font-bold text-headingText mb-10 text-center">
                How should questions be handled?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-headingText text-h6 font-medium mb-2">
                    Type of interview:
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-h6 bg-bgColor focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select type of interview</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="technical">Technical</option>
                    <option value="system-design">System Design</option>
                    <option value="case-study">Case Study</option>
                  </select>
                </div>
                <div>
                  <label className="block text-headingText text-h6 font-medium mb-2">
                    Number of Questions:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-h6 bg-bgColor focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter a number"
                  />
                </div>
                <div>
                  <label className="block text-headingText text-h6 font-medium mb-2">
                    Maximum follow-ups per question:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={maximumFQ}
                    onChange={(e) => setMaximumFQ(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-h6 bg-bgColor focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter a number"
                  />
                </div>
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl p-8 mb-8">
              <h2 className="text-h4 font-bold text-headingText mb-10 text-center">
                What type of interview experience do you want?
              </h2>
              <div className="flex items-center justify-center gap-8">
                <label
                  className={`px-8 py-4 rounded-lg border cursor-pointer font-semibold text-h6 transition-all duration-200 ${
                    interviewType === "practice"
                      ? "bg-primary text-white border-primary"
                      : "bg-bgColor text-headingText border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewType"
                    value="practice"
                    checked={interviewType === "practice"}
                    onChange={() => setInterviewType("practice")}
                    className="hidden"
                  />
                  Practice Interview
                </label>
                <label
                  className={`px-8 py-4 rounded-lg border cursor-pointer font-semibold text-h6 transition-all duration-200 ${
                    interviewType === "real"
                      ? "bg-primary text-white border-primary"
                      : "bg-bgColor text-headingText border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewType"
                    value="real"
                    checked={interviewType === "real"}
                    onChange={() => setInterviewType("real")}
                    className="hidden"
                  />
                  Real Interview
                </label>
              </div>
              <div className="text-center text-p text-subHeadingText mt-4">
                {interviewType === "practice"
                  ? "Practice Mode gives helpful tips and retry options."
                  : "Real Interview simulates actual interview conditions with no hints or retries."}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleOnNext}
                className="bg-primary text-white px-12 py-4 rounded-lg font-semibold text-h6 hover:bg-primary/90 transition-all shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
