import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.jsx";
import api from "../../axious.js";

export default function InterviewSessionDetails() {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [sessionDetails, setSessionDetails] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const { data } = await api.get(`/sessions/${id}`);
        setSessionDetails(data);
      } catch (err) {
        console.error("Failed to fetch session details", err);
      }
    };
    fetchDetails();
  }, [id]);

  const sessionData = location.state || {};
  const sessionTitle = sessionDetails
    ? `${sessionDetails.interviewType || "Interview"} - ${sessionDetails.jobRole || "N/A"}`
    : sessionData.sessionTitle || "Technical Interview - Software Engineer";

  const interviewType = sessionDetails?.interviewType || sessionData.interviewType || "Technical Interview";

  // Compute overall score average if sessionDetails present
  const computedScore = sessionDetails?.questionData
    ? `${Math.round(
        sessionDetails.questionData.reduce((sum, q) => sum + (q.score || 0), 0) /
          sessionDetails.questionData.length
      )}%`
    : null;

  const sessionStatus = computedScore || sessionData.sessionStatus || "88%";

  const sessionDate = sessionDetails?.createdAt
    ? new Date(sessionDetails.createdAt).toLocaleDateString()
    : sessionData.sessionDate || "12-15-2024";

  // Helpers to derive dynamic fields when we have a details doc
  const durationDisplay = sessionDetails?.duration
    ? (() => {
        const match = sessionDetails.duration.match(/(\d+)/);
        if (match) {
          const sec = parseInt(match[1], 10);
          const min = Math.round(sec / 60);
          return `${min}min`;
        }
        return sessionDetails.duration;
      })()
    : "45min";

  const currentQ = sessionDetails?.questionData?.[activeQuestion - 1] || {};

  const handleBackToHistory = () => {
    navigate("/interview-history");
  };

  const questions = sessionDetails?.questionData?.reduce((acc, qObj, idx) => {
    acc[idx + 1] = qObj.question;
    return acc;
  }, {}) || {
    1: "Tell me about yourself and why you're interested in this position?",
    2: "What are your greatest strengths and how do they apply to this role?",
    3: "Describe a challenging situation you faced at work and how you handled it.",
    4: "Where do you see yourself in 5 years and how does this role fit into your career goals?",
    5: "What do you know about our company and why do you want to work here?",
    6: "How do you handle working under pressure and tight deadlines?",
    7: "Do you have any questions for us about the role or company?",
  };

  if (!sessionDetails && id) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-bgColor">
          <p className="text-h5 text-subHeadingText">Loading session details...</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-7xl">
            <div className="bg-bgColor2 shadow-lg p-8 rounded-t-xl border-b border-gray-200 flex flex-col gap-4 mb-8">
              <button
                className="text-h6 text-primary cursor-pointer hover:text-primary/80 transition-colors flex items-center gap-2 font-medium w-fit"
                onClick={handleBackToHistory}
              >
                &lt; Back to History
              </button>
              <h1 className="text-h2 font-semibold text-headingText">
                Interview Session Details
              </h1>
              <p className="text-subHeadingText text-h6">
                Review your performance and feedback
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="bg-bgColor2 rounded-xl shadow-lg p-8 w-full lg:w-1/3 flex flex-col gap-6 self-stretch">
                <div className="mb-4">
                  <h3 className="text-h5 font-semibold text-headingText mb-2">
                    {sessionTitle}
                  </h3>
                  <p className="text-small text-subHeadingText">
                    {sessionDate}
                  </p>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-4 flex-1">
                  {Array.from({ length: sessionDetails?.questionData?.length || 7 }, (_, i) => i + 1).map((q) => (
                    <div
                      key={q}
                      className={`flex justify-between items-center py-3 border-b last:border-b-0 ${
                        q === activeQuestion
                          ? "bg-primary/10 px-4 rounded-lg border-l-4 border-l-primary"
                          : ""
                      }`}
                    >
                      <span className="font-medium text-headingText text-h6">
                        Question {q}:
                      </span>
                      {q !== activeQuestion && (
                        <button
                          className="text-primary text-h6 hover:underline"
                          onClick={() => setActiveQuestion(q)}
                        >
                          Show
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-auto border-t pt-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-h6 text-subHeadingText">
                      Interview Type:
                    </span>
                    <span className="font-semibold text-headingText text-h6">
                      {interviewType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-h6 text-subHeadingText">
                      Overall Score:
                    </span>
                    <span className="text-green-600 font-bold text-h6">
                      {sessionStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-h6 text-subHeadingText">
                      Duration:
                    </span>
                    <span className="text-headingText text-h6">{durationDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-8 self-stretch">
                <div className="bg-bgColor2 rounded-xl shadow-lg p-8 flex flex-col gap-6 h-full">
                  <div className="font-semibold text-h5 text-headingText">
                    Question {activeQuestion}:
                  </div>
                  <div className="text-subHeadingText text-h6">
                    {questions[activeQuestion]}
                  </div>
                  <div className="text-subHeadingText text-h6 mt-4">
                    Your Response:
                  </div>
                  <div className="flex justify-center my-6">
                    <video
                      src={currentQ.video_path_segment || "/video/interview_sample.mp4"}
                      controls
                      className="rounded-xl w-full max-w-2xl h-96 object-cover bg-black shadow-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div>
                    <label className="block text-headingText font-medium mb-3 text-h6">
                      Feedback Based on Your Response
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-p"
                      rows={3}
                      placeholder="Leave your comment here..."
                      disabled
                    >
                      {currentQ.feedback || "Feedback not available."}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl shadow-lg p-8 mt-8 w-full">
              <div className="w-full">
                <h2 className="text-h3 font-semibold mb-8 text-headingText">
                  Detailed Feedback
                </h2>
                <div className="pl-0">
                  <div className="mb-8">
                    <h3 className="text-green-600 font-bold text-h4 mb-4">
                      Strengths
                    </h3>
                    <ul className="list-disc ml-8 text-subHeadingText text-h6 space-y-2">
                      {(sessionDetails?.detailedFeedback?.strengths || [
                        "You spoke clearly and maintained good pacing throughout the session.",
                        "Your response to \"Tell me about yourself\" was concise and well-structured.",
                        "You confidently explained your role and the value you offer to clients/customers."
                      ]).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-red font-bold text-h4 mb-4">
                      Areas for Improvement
                    </h3>
                    <ul className="list-disc ml-8 text-subHeadingText text-h6 space-y-2">
                      {(sessionDetails?.detailedFeedback?.areasOfImprovement || [
                        "You used a few filler words (like 'um' or 'ah') that could affect clarity.",
                        "Some answers lacked specific examples — adding real experiences could make them stronger.",
                        "There was slight hesitation when asked about handling client concerns. Try rehearsing difficult scenarios."
                      ]).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-primary font-bold text-h4 mb-4">
                      Recommendations
                    </h3>
                    <ul className="list-disc ml-8 text-subHeadingText text-h6 space-y-2">
                      {(sessionDetails?.detailedFeedback?.recommendations ? [sessionDetails.detailedFeedback.recommendations] : [
                        "Practice answering with real examples from past work to increase credibility and trust.",
                        "Record yourself during practice to catch filler words and adjust your tone.",
                        "Focus on the 'why' behind your business decisions or freelancing choices to show confidence and insight."
                      ]).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
