import PublicLayout from "../layout/PublicLayout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadResumeModal from "../components/modals/uploadResumeModal.jsx";
import api from "../../axious.js";

// Local fallback while data is loading
const defaultSkills = [
  { name: "Communication", score: 0 },
  { name: "Critical Thinking", score: 0 },
  { name: "Adaptability", score: 0 },
  { name: "Problem Solving", score: 0 },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromChoicePage = location.state?.fromChoicePage;
  const [isUploadResumeModalOpen, setIsUploadResumeModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard information
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    if (fromChoicePage) {
      setIsUploadResumeModalOpen(true);
    }
  }, [fromChoicePage]);

  const handleBeginInterview = () => {
    navigate("/interview-settings");
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <div className="mb-8 text-center">
              <h3 className="font-bold text-headingText text-h3 mb-3">
                {`Welcome Back, ${dashboardData?.firstName ?? "User"}!`}
              </h3>
              <p className="text-p text-subHeadingText">
                Ready to ace your next interview? Let's continue improving your
                skills
              </p>
            </div>
            <div className="container1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-10 w-full">
              <div className="startInterviewContainer flex flex-col justify-center items-center bg-primary bg-opacity-[.13] p-10 rounded-2xl border-primary border-[1.5px]">
                <p className="text-primary text-h4 font-bold">
                  Start Interview
                </p>
                <p className="text-small">
                  Practice with AI-powered mock interviews
                </p>
                <button
                  onClick={handleBeginInterview}
                  className="bg-primary text-white p-1 px-14 text-h6 rounded-3xl mt-3 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <i className="fa-solid fa-circle-play"></i> Begin Interview
                </button>
              </div>

              <div className="quickOverviewContainer md:col-span-2 bg-bgColor2 p-5 px-8 rounded-2xl">
                <div className="top relative flex">
                  <p className="font-bold text-h5 text-headingText">
                    Quick Overview
                  </p>
                  <p className="bg-primary bg-opacity-[.13] rounded-2xl border-primary border-[1.5px] text-[12px] items-center flex absolute right-0 top-2 p-[4px]">
                    {dashboardData?.quickOverview?.credits ?? 0} credits
                  </p>
                </div>
                <div className="content">
                  <div className="overviewDataContainer grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-h5 text-headingText font-bold">
                        {dashboardData?.quickOverview?.totalSessions ?? 0}
                      </p>
                      <p>Total Session</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-h5 font-bold text-green">
                        {dashboardData?.quickOverview?.avgScore ?? 0}%
                      </p>
                      <p>Avg Score</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-h5 font-bold text-primary">
                        {dashboardData?.quickOverview?.practiceTime ?? 0}
                      </p>
                      <p>Practice Time</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-h5 font-bold">
                        {dashboardData?.quickOverview?.skillsImproved ?? 0}
                      </p>
                      <p className="">Skills Improved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full mt-10">
              <div className="recentSessionContainer bg-bgColor2 p-10 py-5 rounded-xl">
                <p className="text-h5 text-headingText font-bold">
                  <i className="fa-regular fa-clock pr-2"></i> Recent Sessions
                </p>
                {dashboardData?.recentSessions?.length ? (
                  dashboardData.recentSessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="behavioralInterview  bg-bgColor rounded-2xl p-4 mb-4 mt-4 border-primary border-[1.5px] flex"
                    >
                      <div className="container relative">
                        <p className="text-h6 font-bold">{session.title}</p>
                        <p className="text-small">{session.date}</p>
                      </div>
                      <p
                        className={`text-p  border-[1px] rounded-full w-16 h-16 flex items-center justify-center ${
                          session.score >= 70
                            ? "bg-green bg-opacity-[.28] border-green"
                            : session.score >= 40
                            ? "bg-yellow bg-opacity-[.28] border-yellow"
                            : "bg-red bg-opacity-[.28] border-red"
                        }`}
                      >
                        {session.score}%
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-subHeadingText">No sessions yet.</p>
                )}
              </div>

              <div className="softSkillsSummaryContainer bg-bgColor2 rounded-xl p-10 py-5">
                <p className="text-h5 text-headingText font-bold">
                  <i className="fa-regular fa-clock pr-2"></i> Soft Skills
                  Summary
                </p>
                <div className="">
                  <div className="space-y-3">
                    {(dashboardData?.skillsSummary ?? defaultSkills).map(
                      (skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-p my-4">
                            <span className="text-gray-600">{skill.name}</span>
                            <span className="text-gray-600">
                              {skill.score}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-4 rounded-full"
                              style={{ width: `${skill.score}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container3 p-10 py-5 bg-bgColor2 rounded-xl mt-10 w-full">
              <p className="text-h4 text-headingText font-bold">
                {" "}
                <i className="fa-solid fa-triangle-exclamation text-brown text-h3"></i>{" "}
                Areas of Improvement
              </p>
              {dashboardData?.areasOfImprovement?.length ? (
                <div className="space-y-4 mt-4">
                  {dashboardData.areasOfImprovement.map((area, idx) => (
                    <div
                      key={idx}
                      className="cardContainer bg-brown bg-opacity-[.28] border-brown border-[1.5px] rounded-xl p-4"
                    >
                      <p className="text-p">{area}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-subHeadingText">No improvement areas yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
      <UploadResumeModal
        isOpen={isUploadResumeModalOpen}
        onClose={() => setIsUploadResumeModalOpen(false)}
        onSkip={() => setIsUploadResumeModalOpen(false)}
        onUpload={() => setIsUploadResumeModalOpen(false)}
      />
    </PublicLayout>
  );
};

export default Dashboard;
