import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuitInterviewModal from "../components/modals/quitInterviewModal.jsx";
import FinishInterviewModal from "../components/modals/finishInterviewModal.jsx";
import imageBackground from "../assets/officeBG.jpg";

export default function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);

  const interviewSettings = location.state?.interviewSettings;

  const isPracticeMode = interviewSettings?.interviewType === "practice";

  useEffect(() => {
    if (!interviewSettings) {
      navigate("/interview-settings");
    }
  }, [interviewSettings, navigate]);

  const [questions, setQuestions] = useState([
    "Tell me about yourself and how your experience aligns with this role.",
    "What is your greatest strength?",
    "What is your greatest weakness?",
    "Why do you want to work for us?",
    "What are your salary expectations?",
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isEndButtonHovered, setIsEndButtonHovered] = useState(false);
  const [isRealInterviewStarted, setIsRealInterviewStarted] = useState(false);

  useEffect(() => {
    let initialStream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        setError("");
        setStream(s);
        initialStream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch((err) => {
        setError("Unable to access camera or microphone.");
      });

    return () => {
      if (initialStream) {
        initialStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleBackClick = () => {
    setShowQuitModal(true);
  };

  const handleQuitConfirm = () => {
    navigate("/dashboard");
  };

  const handleQuitCancel = () => {
    setShowQuitModal(false);
  };

  const handleReadyClick = () => {
    if (currentQuestion === questions.length - 1) {
      setShowFinishModal(true);
    } else {
      handleNextQuestion();
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleReviewResponses = () => {
    stopCameraStream();
    navigate("/interview-history");
  };

  const handleGoToDashboard = () => {
    stopCameraStream();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!isPracticeMode && interviewSettings) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
              return 180;
            } else {
              setShowFinishModal(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPracticeMode, currentQuestion, questions.length, interviewSettings]);

  useEffect(() => {
    if (!isPracticeMode) {
      setTimeRemaining(180);
    }
  }, [currentQuestion, isPracticeMode]);

  useEffect(() => {
    if (!isPracticeMode) {
      const handleKeyPress = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setShowFinishModal(true);
          }
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isPracticeMode, currentQuestion, questions.length]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!interviewSettings) {
    return null;
  }

  return (
    <div className="relative h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <img
          src={imageBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute top-6 right-6 z-10 w-[250px] h-[200px] bg-black rounded-lg overflow-hidden border-3 border-white shadow-xl">
        {error ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-white text-sm">📷</span>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
      </div>

      {/* AI Interviewer - Natural placement without background */}
      {interviewSettings?.selectedAgent?.img ? (
        <div className="absolute left-1/2 bottom-[160px] transform -translate-x-1/2 z-20">
          <img
            src={interviewSettings.selectedAgent.img}
            alt={interviewSettings.selectedAgent.name}
            className="w-[500px] h-auto object-contain"
          />
        </div>
      ) : (
        <div className="absolute left-1/2 bottom-[160px] transform -translate-x-1/2 z-20">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-8xl">🤖</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 h-[160px]">
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
          {isPracticeMode ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {questions[currentQuestion]}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1}
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleReadyClick}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Interview"
                    : "I'm Ready"}
                </button>
                <button
                  onClick={handleBackClick}
                  onMouseEnter={() => setIsEndButtonHovered(true)}
                  onMouseLeave={() => setIsEndButtonHovered(false)}
                  className="px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
                  style={{
                    backgroundColor: isEndButtonHovered ? "#B83D3D" : "#DE5656",
                    color: "white",
                    transform: isEndButtonHovered
                      ? "translateY(-1px)"
                      : "translateY(0px)",
                    boxShadow: isEndButtonHovered
                      ? "0 10px 25px rgba(222, 86, 86, 0.4)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  End Interview
                </button>
              </div>
            </>
          ) : (
            // Real Interview Mode - Using same container structure as Practice Mode
            <>
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {questions[currentQuestion]}
                </h2>
              </div>

              {!isRealInterviewStarted && (
                <div className="flex justify-center mb-3">
                  <button
                    onClick={() => {
                      setIsRealInterviewStarted(true);
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        setShowFinishModal(true);
                      }
                    }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                  >
                    {currentQuestion === questions.length - 1
                      ? "Finish Interview"
                      : "Start"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isPracticeMode && (
        <QuitInterviewModal
          isOpen={showQuitModal}
          onClose={handleQuitCancel}
          onConfirm={handleQuitConfirm}
        />
      )}

      <FinishInterviewModal
        isOpen={showFinishModal}
        onReviewResponses={handleReviewResponses}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}
