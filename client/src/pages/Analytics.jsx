import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faChartBar,
  faClock,
  faAward,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import PublicLayout from "../layout/PublicLayout.jsx";

export default function Analytics() {
  const [filter, setFilter] = useState("Last 30 Days");

  const handleExport = () => {
    alert(`Exporting analytics data for ${filter}`);
  };

  const stats = [
    {
      label: "Avg Score",
      value: "84%",
      icon: faBullseye,
      color: "text-blue-600",
    },
    {
      label: "Total Practice Interview",
      value: 23,
      icon: faChartBar,
      color: "text-green-600",
    },
    {
      label: "Practice Time",
      value: "12H",
      icon: faClock,
      color: "text-blue-600",
    },
    {
      label: "Skills Improved",
      value: 4,
      icon: faAward,
      color: "text-orange-600",
    },
  ];

  const skills = [
    { name: "Communication", score: 85 },
    { name: "Critical Thinking", score: 80 },
    { name: "Adaptability", score: 72 },
    { name: "Problem Solving", score: 90 },
  ];

  const interviewTypes = [
    { name: "Technical", score: 89, sessions: 12, color: "bg-blue-100" },
    { name: "Behavioral", score: 70, sessions: 7, color: "bg-green-100" },
    { name: "Design", score: 78, sessions: 2, color: "bg-yellow-100" },
    { name: "Adaptability", score: 91, sessions: 5, color: "bg-orange-100" },
  ];

  const recommendations = [
    {
      title: "Focus Area",
      color: "bg-yellow-50",
      content:
        "Work on strengthening your answer explanations. Consider providing more structure and context to improve clarity.",
    },
    {
      title: "Strength",
      color: "bg-green-50",
      content:
        "Your communication is balanced. Maintain clear communication while adding concise examples to support your points.",
    },
    {
      title: "Next Goal",
      color: "bg-blue-50",
      content:
        "Increase average score to 90% by reaching 3 more sessions this month.",
    },
    {
      title: "Consistency",
      color: "bg-purple-50",
      content:
        "Continue practicing at regular intervals! Try to maintain the momentum of at least 2 sessions per week.",
    },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <h1 className="text-h2 font-bold text-primary mb-3">Analytics</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <p className="text-h6 text-subHeadingText mb-6 md:mb-0">
                Track your interview performance and progress over time.
              </p>
              <div className="flex items-center gap-6">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-h6 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {["Last 7 Days", "Last 30 Days", "All Time"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-lg text-h6 shadow hover:bg-primary/90 transition"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Export
                </button>
              </div>
            </div>

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

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-bgColor2 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center h-80">
                <h3 className="text-h5 text-subHeadingText mb-4">
                  Performance Trends
                </h3>
                <div className="text-subHeadingText text-h4">
                  chart visualization
                </div>
              </div>

              <div className="bg-bgColor2 rounded-xl shadow-lg p-8">
                <h3 className="text-h5 font-semibold text-headingText mb-6">
                  Skills Assessment
                </h3>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-h6 mb-2">
                        <span className="text-headingText">{skill.name}</span>
                        <span className="text-subHeadingText">
                          {skill.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-h5 font-semibold text-headingText mb-6">
                Performance by Interview Type
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {interviewTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`${type.color} rounded-xl p-6 flex flex-col items-center`}
                  >
                    <span className="text-h6 font-bold text-headingText mb-2">
                      {type.name}
                    </span>
                    <span className="text-h3 font-bold text-headingText">
                      {type.score}%
                    </span>
                    <span className="text-small text-subHeadingText mt-2">
                      {type.sessions} Sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className={`rounded-xl shadow-lg p-8 ${rec.color}`}
                >
                  <h4 className="text-h6 font-semibold mb-4 text-headingText">
                    {rec.title}
                  </h4>
                  <p className="text-p text-subHeadingText leading-relaxed">
                    {rec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
