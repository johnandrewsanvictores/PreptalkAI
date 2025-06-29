import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faChartBar, faClock, faAward, faDownload } from '@fortawesome/free-solid-svg-icons';
import PublicLayout from '../layout/PublicLayout.jsx';

export default function Analytics() {
  const [filter, setFilter] = useState('Last 30 Days');

  const handleExport = () => {

    alert(`Exporting analytics data for ${filter}`);
  };

  const stats = [
    { label: 'Avg Score', value: '84%', icon: faBullseye, color: 'text-blue-600' },
    { label: 'Total Practice Interview', value: 23, icon: faChartBar, color: 'text-green-600' },
    { label: 'Practice Time', value: '12H', icon: faClock, color: 'text-blue-600' },
    { label: 'Skills Improved', value: 4, icon: faAward, color: 'text-orange-600' },
  ];

  const skills = [
    { name: 'Communication', score: 85 },
    { name: 'Critical Thinking', score: 80 },
    { name: 'Adaptability', score: 72 },
    { name: 'Problem Solving', score: 90 },
  ];

  const interviewTypes = [
    { name: 'Technical', score: 89, sessions: 12, color: 'bg-blue-100' },
    { name: 'Behavioral', score: 70, sessions: 7, color: 'bg-green-100' },
    { name: 'Design', score: 78, sessions: 2, color: 'bg-yellow-100' },
    { name: 'Adaptability', score: 91, sessions: 5, color: 'bg-orange-100' },
  ];

  const recommendations = [
    {
      title: 'Focus Area',
      color: 'bg-yellow-50',
      content:
        'Work on strengthening your answer explanations. Consider providing more structure and context to improve clarity.',
    },
    {
      title: 'Strength',
      color: 'bg-green-50',
      content:
        'Your communication is balanced. Maintain clear communication while adding concise examples to support your points.',
    },
    {
      title: 'Next Goal',
      color: 'bg-blue-50',
      content:
        'Increase average score to 90% by reaching 3 more sessions this month.',
    },
    {
      title: 'Consistency',
      color: 'bg-purple-50',
      content:
        'Continue practicing at regular intervals! Try to maintain the momentum of at least 2 sessions per week.',
    },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <main className="flex-1 flex flex-col items-center py-8 px-2">
          <div className="w-full max-w-6xl">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">Analytics</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <p className="text-gray-500 mb-4 md:mb-0">Track your interview performance and progress over time.</p>
              <div className="flex items-center gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {['Last 7 Days', 'Last 30 Days', 'All Time'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700 transition"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Export
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#e8f0fa] rounded-lg shadow flex flex-col items-center py-6">
                  <div className={`text-3xl mb-2 ${stat.color}`}>
                    <FontAwesomeIcon icon={stat.icon} />
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1 text-center px-2">{stat.label}</div>
                </div>
              ))}
            </div>


            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#e8f0fa] rounded-lg shadow p-6 flex flex-col justify-center items-center h-64">
                <h3 className="text-gray-400 mb-2">Performance Trends</h3>
                <div className="text-gray-300 text-xl">chart visualization</div>
              </div>

              <div className="bg-[#e8f0fa] rounded-lg shadow p-6">
                <h3 className="text-gray-700 font-semibold mb-4">Skills Assessment</h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{skill.name}</span>
                        <span className="text-gray-600">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="bg-[#e8f0fa] rounded-lg shadow p-6 mb-8">
              <h3 className="text-gray-700 font-semibold mb-4">Performance by Interview Type</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {interviewTypes.map((type) => (
                  <div key={type.name} className={`${type.color} rounded-lg p-4 flex flex-col items-center`}>
                    <span className="text-lg font-bold text-gray-800 mb-1">{type.name}</span>
                    <span className="text-2xl font-bold text-gray-700">{type.score}%</span>
                    <span className="text-xs text-gray-500 mt-1">{type.sessions} Sessions</span>
                  </div>
                ))}
              </div>
            </div>


            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {recommendations.map((rec) => (
                <div key={rec.title} className={`rounded-lg shadow p-6 ${rec.color}`}>
                  <h4 className="text-md font-semibold mb-2 text-gray-800">{rec.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{rec.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
} 