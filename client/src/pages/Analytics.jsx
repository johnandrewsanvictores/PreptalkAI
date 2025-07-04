import React, { useState, useEffect } from "react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import api from "../../axious.js";
import { useAuth } from "../context/AuthContext.jsx";

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
  const filterOptions = [
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
    { label: "All Time", days: null },
  ];

  const [filter, setFilter] = useState(filterOptions[1].label); // default "Last 30 Days"
  const [selectedInterview, setSelectedInterview] = useState("behavioral");
  const [analyticsData, setAnalyticsData] = useState(null);
  const { user } = useAuth();

  // Fetch analytics whenever the filter changes
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const selected = filterOptions.find((o) => o.label === filter);
        const params = {};
        if (selected?.days) params.range = selected.days; // backend will interpret range in days

        const { data } = await api.get("/analytics", { params });
        setAnalyticsData(data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };

    fetchAnalytics();
  }, [filter]);

  // Export feature removed

  const chartData = analyticsData && analyticsData.chart
    ? {
        labels: analyticsData.chart.labels,
        datasets: [
          {
            label: 'Interview Score',
            data: analyticsData.chart.data.map((v) => v / 10),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
          },
        ],
      }
    : { labels: [], datasets: [] };

  // Options for the line chart (0‒10 scale)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 0,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: { borderWidth: 3 },
    },
  };

  const hasBackendData = analyticsData && Array.isArray(analyticsData.stats) && analyticsData.stats.length > 0;

  const emptyStats = [
    { label: 'Avg Score', value: '0%', icon: faBullseye, color: 'text-blue-600' },
    { label: 'Total Practice Interview', value: 0, icon: faChartBar, color: 'text-green-600' },
    { label: 'Practice Time', value: '0H', icon: faClock, color: 'text-blue-600' },
    { label: 'Day Streak', value: 0, icon: faFire, color: 'text-orange-600' },
  ];

  const stats = hasBackendData
    ? analyticsData.stats.map((s) => ({
        ...s,
        icon:
          s.label === "Avg Score"
            ? faBullseye
            : s.label === "Total Practice Interview"
            ? faChartBar
            : s.label === "Practice Time"
            ? faClock
            : faFire,
        color:
          s.label === "Avg Score"
            ? "text-blue-600"
            : s.label === "Total Practice Interview"
            ? "text-green-600"
            : s.label === "Practice Time"
            ? "text-blue-600"
            : "text-orange-600",
      }))
    : emptyStats;

  // Skills maps for freelancers
  const freelancerSkillsMap = {
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

  // Skills maps for micro-entrepreneurs
  const entrepreneurSkillsMap = {
    "product-presentation": [
      { name: "Clarity", score: 85 },
      { name: "Confidence", score: 80 },
      { name: "Engagement", score: 75 },
      { name: "Structure", score: 78 },
    ],
    "customer-interaction": [
      { name: "Though questions", score: 82 },
      { name: "Empathy", score: 79 },
      { name: "Adaptability", score: 85 },
      { name: "Trust", score: 77 },
    ],
    "business-pitching": [
      { name: "Problem Solution", score: 80 },
      { name: "Value Proposition Client", score: 83 },
      { name: "Investor Appeal", score: 78 },
      { name: "Collaboration", score: 75 },
    ],
    "all-in-one": [
      { name: "Clarity", score: 85 },
      { name: "Confidence", score: 80 },
      { name: "Engagement", score: 75 },
      { name: "Structure", score: 78 },
      { name: "Though questions", score: 82 },
      { name: "Empathy", score: 79 },
      { name: "Adaptability", score: 85 },
      { name: "Trust", score: 77 },
      { name: "Problem Solution", score: 80 },
      { name: "Value Proposition Client", score: 83 },
      { name: "Investor Appeal", score: 78 },
      { name: "Collaboration", score: 75 },
    ],
  };

  // Get appropriate skills map based on user type
  const getSkillsMap = () => {
    if (user?.userType === "entrep") {
      return entrepreneurSkillsMap;
    }
    return freelancerSkillsMap;
  };

  const defaultSkillsMap = getSkillsMap();

  const skillsMap = analyticsData?.skillsMap ?? defaultSkillsMap;

  // Interview options for freelancers
  const freelancerInterviewOptions = [
    { id: "behavioral", label: "Behavioral Interview" },
    { id: "technical", label: "Technical Interview" },
    { id: "situational", label: "Situational Interview" },
    { id: "all-in-one", label: "All-in-one Interview" },
  ];

  // Interview options for micro-entrepreneurs
  const entrepreneurInterviewOptions = [
    { id: "product-presentation", label: "Product Presentation" },
    { id: "customer-interaction", label: "Customer Interaction" },
    { id: "business-pitching", label: "Business Pitching" },
    { id: "all-in-one", label: "All-in-one Interview" },
  ];

  // Get appropriate interview options based on user type
  const getInterviewOptions = () => {
    if (user?.userType === "entrep") {
      return entrepreneurInterviewOptions;
    }
    return freelancerInterviewOptions;
  };

  const interviewOptions = getInterviewOptions();

  // Update selectedInterview default based on user type
  useEffect(() => {
    if (user?.userType === "entrep") {
      setSelectedInterview("product-presentation");
    } else {
      setSelectedInterview("behavioral");
    }
  }, [user?.userType]);

  // Bar chart config for skills
  const getBarChartDataKey = () => {
    return "all-in-one"; // Both freelancers and entrepreneurs have all-in-one
  };

  const barChartDataKey = getBarChartDataKey();
  const skillsBarData = {
    labels: skillsMap[barChartDataKey]?.map((s) => s.name) || [],
    datasets: [
      {
        label: "Score",
        data: skillsMap[barChartDataKey]?.map((s) => s.score) || [],
        backgroundColor: "#2F80ED",
        borderRadius: 4,
      },
    ],
  };

  const skillsBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x", // vertical bars
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { display: false },
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return value + "%";
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
            return context.parsed.y + "%";
          },
        },
      },
    },
  };

  const skills = skillsMap[selectedInterview] || [];

  // Default interview types
  const defaultInterviewTypes = [
    { name: "Technical", score: 0, sessions: 0, color: "bg-blue-100" },
    { name: "Behavioral", score: 0, sessions: 0, color: "bg-green-100" },
    { name: "Situational", score: 0, sessions: 0, color: "bg-yellow-100" },
    { name: "All-in-one", score: 0, sessions: 0, color: "bg-orange-100" },
  ];

  const interviewTypes =
    analyticsData?.interviewTypes?.length === 4
      ? analyticsData.interviewTypes
      : defaultInterviewTypes;

  // Default recommendations
  const defaultRecommendations = [
    { title: "Focus Area", color: "bg-yellow-50", content: "No data yet." },
    { title: "Strength", color: "bg-green-50", content: "No data yet." },
    { title: "Next Goal", color: "bg-blue-50", content: "No data yet." },
    { title: "Consistency", color: "bg-orange-50", content: "No data yet." },
  ];

  const recommendations =
    analyticsData?.recommendations?.length === 4
      ? analyticsData.recommendations
      : defaultRecommendations;

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <h1 className="text-h3 sm:text-h2 font-bold text-primary mb-3">
              Analytics
            </h1>
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
                  {filterOptions.map((opt) => (
                    <option key={opt.label} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {/* Export button removed */}
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

            {!hasBackendData && (
              <p className="text-center text-subHeadingText mb-12">No data yet.</p>
            )}

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
                {selectedInterview === barChartDataKey ? (
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

            {/* Personalized Recommendation section */}
            <h3 className="text-h6 sm:text-h5 font-semibold text-headingText mb-4 sm:mb-6">
              Personalized Recommendation
            </h3>

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
