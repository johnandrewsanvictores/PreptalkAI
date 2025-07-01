import React from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faStar,
  faClock,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    label: "Total Session",
    value: 5,
    icon: faCalendarAlt,
    color: "text-blue-600",
  },
  { label: "Avg Score", value: "85%", icon: faStar, color: "text-green-600" },
  { label: "Total Time", value: "12H", icon: faClock, color: "text-blue-600" },
  {
    label: "Questions",
    value: 31,
    icon: faQuestionCircle,
    color: "text-orange-600",
  },
];

const sessions = [
  {
    title: "Technical Interview - Software Engineer",
    date: "12-15-2024",
    desc: "Focused on data structures, algorithms, and system design questions for a senior developer role.",
    status: "76%",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    title: "Behavioral Interview - Product Manager",
    date: "12-10-2024",
    desc: "Leadership scenarios, team management, and product strategy discussion for a PM position.",
    status: "89%",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    title: "System Design Interview - Senior Developer",
    date: "12-08-2024",
    desc: "Designed a scalable e-commerce platform architecture with microservices and database optimization.",
    status: "77%",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    title: "Case Study Interview - Business Analyst",
    date: "12-05-2024",
    desc: "Market analysis and business strategy case study for a fintech startup expansion.",
    status: "62%",
    statusColor: "bg-red-100 text-red-800",
  },
];

export default function InterviewHistory() {
  const navigate = useNavigate();

  const handleViewDetails = (sessionIndex) => {
    const selectedSession = sessions[sessionIndex];
    navigate("/interview-session-details", {
      state: {
        sessionTitle: selectedSession.title,
        sessionDate: selectedSession.date,
        sessionDesc: selectedSession.desc,
        sessionStatus: selectedSession.status,
        interviewType: selectedSession.title.split(" - ")[0],
      },
    });
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <h1 className="text-h2 font-bold text-primary mb-3">
              Interview History
            </h1>
            <p className="text-h6 text-subHeadingText mb-12">
              Review your past interview sessions and track your progress
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bgColor2 rounded-xl shadow-lg flex items-center justify-between py-8 px-6"
                >
                  <div className="flex flex-col">
                    <div className="text-h2 font-bold text-headingText">
                      {stat.value}
                    </div>
                    <div className="text-small text-subHeadingText mt-1">
                      {stat.label}
                    </div>
                  </div>
                  <div className={`text-5xl ${stat.color}`}>
                    <FontAwesomeIcon icon={stat.icon} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-bgColor2 rounded-xl shadow-lg p-8">
              <h2 className="text-h4 font-semibold mb-8 text-headingText">
                Recent Sessions
              </h2>
              <div className="space-y-6">
                {sessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="bg-bgColor rounded-xl flex flex-col md:flex-row md:items-center justify-between px-8 py-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-h5 text-headingText mb-2">
                        {session.title}
                      </div>
                      <div className="text-small text-subHeadingText mb-1">
                        {session.date}
                      </div>
                      <div className="text-h6 text-subHeadingText mt-2">
                        {session.desc}
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0 md:ml-6">
                      <span
                        className={`px-4 py-2 rounded-lg text-h6 font-semibold mr-6 ${session.statusColor}`}
                      >
                        {session.status}
                      </span>
                      <button
                        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all text-h6"
                        onClick={() => handleViewDetails(idx)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
