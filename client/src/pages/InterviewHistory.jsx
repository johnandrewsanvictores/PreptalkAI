import React from 'react';
import PublicLayout from '../layout/PublicLayout.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStar, faClock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const stats = [
    { label: 'Total Session', value: 5, icon: faCalendarAlt },
    { label: 'Avg Score', value: 5, icon: faStar },
    { label: 'Total Time', value: 5, icon: faClock },
    { label: 'Questions', value: 31, icon: faQuestionCircle },
  ];

const sessions = [
  {
    title: 'International Interactions',
    date: 'MM-DD-YYYY',
    desc: 'Lorem ipsum dolor sit amet consectetur. Egestas et vehicula quis massa?',
    status: '80%',
  },
  {
    title: 'International Interactions',
    date: 'MM-DD-YYYY',
    desc: 'Lorem ipsum dolor sit amet consectetur. Egestas et vehicula quis massa?',
    status: '100%',
  },
  {
    title: 'International Interactions',
    date: 'MM-DD-YYYY',
    desc: 'Lorem ipsum dolor sit amet consectetur. Egestas et vehicula quis massa?',
    status: '70%',
  },
  {
    title: 'International Interactions',
    date: 'MM-DD-YYYY',
    desc: 'Lorem ipsum dolor sit amet consectetur. Egestas et vehicula quis massa?',
    status: '20%',
  },
];

export default function InterviewHistory() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">


        <main className="flex-1 flex flex-col items-center py-8 px-2">
          <div className="w-full max-w-5xl">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">Interview History</h1>
            <p className="text-gray-500 mb-8">Review your past interview sessions and unlock your progress.</p>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow flex flex-col items-center py-6">
                  <div className="text-3xl mb-2">
                    <FontAwesomeIcon icon={stat.icon} />
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>


            <div className="bg-[#e8f0fa] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
              <div className="space-y-4">
                {sessions.map((session, idx) => {
                  let badgeStyle = {};
                  if (session.status === '100%') {
                    badgeStyle = { background: '#7fffd4', color: '#000000', fontWeight: 'bold' };
                  } else if (session.status === '80%' || session.status === '70%') {
                    badgeStyle = { background: '#ffe066', color: '#000000', fontWeight: 'bold' };
                  } else if (session.status === '20%') {
                    badgeStyle = { background: '#ff4d4f', color: '#000000', fontWeight: 'bold' };
                  }
                  return (
                    <div key={idx} className="bg-white rounded-lg flex flex-col md:flex-row md:items-center justify-between px-4 py-3 shadow-sm">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{session.title}, {session.date}</div>
                        <div className="text-xs text-gray-500 mt-1">{session.desc}</div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0 md:ml-4">
                        <span style={badgeStyle} className="px-3 py-1 rounded-full text-xs font-semibold mr-4">{session.status}</span>
                        <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold border border-blue-200 hover:bg-blue-100 transition-all text-xs">View Details</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
} 