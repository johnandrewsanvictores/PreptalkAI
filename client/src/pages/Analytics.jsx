import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faChartBar,
  faClock,
  faAward,
  faDownload,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import PublicLayout from "../layout/PublicLayout.jsx";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export default function Analytics() {
  const [filter, setFilter] = useState("Last 30 Days");
  const [selectedInterview, setSelectedInterview] = useState("behavioral");

  const handleExport = () => {
    alert(`Exporting analytics data for ${filter}`);
  };

  // Chart data configuration
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Interview Score',
        data: [65, 72, 80, 84],
        borderColor: '#3b82f6', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 0,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    }
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
      label: "Day Streak",
      value: 4,
      icon: faFire,
      color: "text-orange-600",
    },
  ];

  const skillsMap = {
    behavioral: [
      { name: "Communication", score: 85 },
      { name: "Self-Motivation", score: 80 },
      { name: "Teamwork", score: 75 },
      { name: "Resilience", score: 70 },
    ],
    technical: [
      { name: "Critical Thinking", score: 80 },
      { name: "Analytical Reasoning", score: 78 },
      { name: "Attention to Detail", score: 85 },
      { name: "Technical Clarity", score: 82 },
    ],
    situational: [
      { name: "Decision-Making", score: 84 },
      { name: "Adaptability", score: 79 },
      { name: "Conflict Resolution", score: 76 },
      { name: "Prioritization", score: 83 },
    ],
    "all-in-one": [
      { name: "Communication", score: 85 },
      { name: "Self-Motivation", score: 80 },
      { name: "Teamwork", score: 75 },
      { name: "Resilience", score: 70 },
      { name: "Critical Thinking", score: 80 },
      { name: "Analytical Reasoning", score: 78 },
      { name: "Attention to Detail", score: 85 },
      { name: "Technical Clarity", score: 82 },
      { name: "Decision-Making", score: 84 },
      { name: "Adaptability", score: 79 },
      { name: "Conflict Resolution", score: 76 },
      { name: "Prioritization", score: 83 },
    ],
  };

  const interviewOptions = [
    { id: "behavioral", label: "Behavioral Interview" },
    { id: "technical", label: "Technical Interview" },
    { id: "situational", label: "Situational Interview" },
    { id: "all-in-one", label: "All-in-one Interview" },
  ];

  // Bar chart config for skills (used when many skills e.g., all-in-one)
  const skillsBarData = {
    labels: skillsMap["all-in-one"].map((s) => s.name),
    datasets: [
      {
        label: "Score",
        data: skillsMap["all-in-one"].map((s) => s.score),
        backgroundColor: "#2F80ED",
        borderRadius: 4,
      },
    ],
  };

  const skillsBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x', // vertical bars
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { display: false },
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return value + '%';
          },
        },
      },
      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y + '%';
          },
        },
      },
    },
  };

  const skills = skillsMap[selectedInterview];

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
            <h1 className="text-h3 sm:text-h2 font-bold text-primary mb-3">Analytics</h1>
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

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 mb-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bgColor2 rounded-xl shadow-lg flex items-center justify-between py-6 sm:py-8 px-4 sm:px-6"
                >
                  <div className="flex flex-col">
                    <div className="text-h4 sm:text-h3 font-bold text-headingText">
                      {stat.value}
                    </div>
                    <div className="text-small text-subHeadingText mt-1">
                      {stat.label}
                    </div>
                  </div>
                  <div className={`text-4xl sm:text-5xl ${stat.color}`}>
                    <FontAwesomeIcon icon={stat.icon} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="bg-bgColor2 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-100">
                <h3 className="text-h6 sm:text-h5 text-subHeadingText mb-3 sm:mb-4">
                  Performance Trends
                </h3>
                <div className="h-48 sm:h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-bgColor2 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
                  <h3 className="text-h6 sm:text-h5 font-semibold text-headingText">
                    Skills Assessment
                  </h3>
                  <select
                    value={selectedInterview}
                    onChange={(e) => setSelectedInterview(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-small sm:text-p focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto"
                  >
                    {interviewOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedInterview === "all-in-one" ? (
                  <div className="h-48 sm:h-64">
                    <Bar data={skillsBarData} options={skillsBarOptions} />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex flex-col sm:flex-row sm:justify-between text-p sm:text-p mb-2 gap-1">
                          <span className="text-headingText">{skill.name}</span>
                          <span className="text-subHeadingText">
                            {skill.score}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div
                            className="bg-primary h-2 sm:h-3 rounded-full"
                            style={{ width: `${skill.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-12">
              <h3 className="text-h6 sm:text-h5 font-semibold text-headingText mb-4 sm:mb-6">
                Performance by Interview Type
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {interviewTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`${type.color} rounded-xl p-6 flex flex-col items-center`}
                  >
                    <span className="text-small sm:text-h6 font-bold text-headingText mb-1 sm:mb-2">
                      {type.name}
                    </span>
                    <span className="text-h4 sm:text-h3 font-bold text-headingText">
                      {type.score}%
                    </span>
                    <span className="text-small text-subHeadingText mt-2">
                      {type.sessions} Sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 mb-12">
              {recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className={`rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 ${rec.color}`}
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
