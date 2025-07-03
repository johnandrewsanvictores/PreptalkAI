import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuitInterviewModal from "../components/modals/quitInterviewModal.jsx";
import FinishInterviewModal from "../components/modals/finishInterviewModal.jsx";
import imageBackground from "../assets/officeBG.jpg";
import {useAuth} from "../context/AuthContext.jsx";
import {getFreelancerQPrompt} from "../data/questionPrompt.js";

export default function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);

  const { user, userContext } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    bio :userContext.bio,
    certification: userContext.certification,
    education: userContext.education,
    email: userContext.email,
    fullName: userContext.fullName,
    hardSkills: userContext.hardSkills,
    jobRole: userContext.jobRole,
    location: userContext.location,
    projects: userContext.projects,
    softSkills: userContext.softSkills
  });

  const interviewSettings = location.state?.interviewSettings;

  const isPracticeMode = interviewSettings?.interviewType === "practice";

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isEndButtonHovered, setIsEndButtonHovered] = useState(false);
  const [isRealInterviewStarted, setIsRealInterviewStarted] = useState(false);
  const [realTimer, setRealTimer] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [isPracticeReady, setIsPracticeReady] = useState(false);
  const [isRealReady, setIsRealReady] = useState(false);


  useEffect(() => {
    if (!interviewSettings) {
      navigate("/interview-settings");
    }


    if(user.userType === "freelancer"){
      const num = Math.floor(Math.random() * 100) + 1;
      console.log(num);
      const prompt = getFreelancerQPrompt(personalInfo, interviewSettings, num);

      console.log(prompt);
      const encodedPrompt = encodeURIComponent(prompt.trim());
      const fetchFreelancerQPrompt = async () => {
        try {
          const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`);
          if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
          }
          const resultText = await response.text();

          const q = JSON.parse(resultText);
          console.log(q);
          setQuestions(q);
          return q;
        } catch (error) {
          console.error("Error fetching interview questions:", error);
          return null;
        }
      }

      fetchFreelancerQPrompt()

      console.log(questions);
    }



  }, [interviewSettings, navigate]);

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

  useEffect(() => {
    if (!isPracticeMode && isRealInterviewStarted) {
      setRealTimer(0);
      setDotCount(0);
      const interval = setInterval(() => {
        setRealTimer((prev) => {
          const next = prev + 1;
          if (next === 3) setDotCount(1);
          if (next === 6) setDotCount(2);
          if (next === 9) setDotCount(3);
          if (next >= 10) {
            setDotCount(0);
            clearInterval(interval);
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion((q) => q + 1);
            } else {
              setShowFinishModal(true);
            }
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    isPracticeMode,
    isRealInterviewStarted,
    currentQuestion,
    questions.length,
  ]);

  useEffect(() => {
    if (!isPracticeMode && isRealInterviewStarted) {
      setRealTimer(0);
      setDotCount(0);
    }
  }, [currentQuestion, isPracticeMode, isRealInterviewStarted]);

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
      {!isPracticeMode && isRealInterviewStarted && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-[100] flex justify-center items-center">
          <span
            className={`mx-2 text-5xl font-bold transition-opacity duration-300 ${
              dotCount === 1
                ? "text-primary opacity-100"
                : "text-primary opacity-30"
            }`}
          >
            .
          </span>
          <span
            className={`mx-2 text-5xl font-bold transition-opacity duration-300 ${
              dotCount === 2
                ? "text-yellow-400 opacity-100"
                : "text-gray-400 opacity-30"
            }`}
          >
            ?
          </span>
          <span
            className={`mx-2 text-5xl font-bold transition-opacity duration-300 ${
              dotCount === 3
                ? "text-red opacity-100"
                : "text-gray-400 opacity-30"
            }`}
          >
            !
          </span>
        </div>
      )}
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

      {/* End Interview button only in Practice Mode */}
      {isPracticeMode && (
        <button
          onClick={handleBackClick}
          onMouseEnter={() => setIsEndButtonHovered(true)}
          onMouseLeave={() => setIsEndButtonHovered(false)}
          className="fixed top-0 left-0 m-4 z-50 px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
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
      )}

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

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 h-[160px]">
        <div className="w-full h-full flex flex-col px-6">
          {isPracticeMode ? (
            <>
              <div className="w-full h-auto">
                {!isPracticeReady ? (
                  <div className="flex flex-col items-start justify-start h-full">
                    <span className="text-xl font-semibold text-gray-800 mb-4">
                      Are you ready?
                    </span>
                  </div>
                ) : (
                  <h2
                    className="text-h6 text-gray-800 text-left leading-relaxed tracking-normal"
                    style={{ padding: 0, margin: 0 }}
                  >
                    {questions[currentQuestion]}
                  </h2>
                )}
              </div>
              <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-4">
                {!isPracticeReady ? (
                  <button
                    onClick={() => setIsPracticeReady(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                  >
                    Yes
                  </button>
                ) : (
                  <button
                    onClick={handleReadyClick}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                  >
                    {currentQuestion === questions.length - 1
                      ? "Finish Interview"
                      : "Skip Question"}
                  </button>
                )}
              </div>
            </>
          ) : (
            // Real Interview Mode - Match Practice Mode layout
            <>
              <div className="w-full h-auto">
                {!isRealReady ? (
                  <div className="flex flex-col items-start justify-start h-full">
                    <span className="text-xl font-semibold text-gray-800 mb-4">
                      Are you ready?
                    </span>
                  </div>
                ) : (
                  isRealInterviewStarted && (
                    <h2
                      className="text-h6 text-gray-800 text-left leading-relaxed tracking-normal"
                      style={{ padding: 0, margin: 0 }}
                    >
                      {questions[currentQuestion]}
                    </h2>
                  )
                )}
              </div>
              {!isRealReady ? (
                <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    onClick={() => {
                      setIsRealReady(true);
                      setIsRealInterviewStarted(true);
                      setCurrentQuestion(0);
                    }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                  >
                    Start
                  </button>
                </div>
              ) : (
                !isRealInterviewStarted && (
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-4">
                    <button
                      onClick={() => {
                        setIsRealInterviewStarted(true);
                        setCurrentQuestion(0);
                      }}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                    >
                      Start
                    </button>
                  </div>
                )
              )}
              {/* No Finish Interview button in Real Interview mode; handled by modal when last question is done */}
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
