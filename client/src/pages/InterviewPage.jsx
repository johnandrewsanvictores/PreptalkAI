import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuitInterviewModal from "../components/modals/quitInterviewModal.jsx";
import FinishInterviewModal from "../components/modals/finishInterviewModal.jsx";
import FullPageLoader from "../components/shared/FullPageLoader.jsx";
import imageBackground from "../assets/officeBG.jpg";
import { useAuth } from "../context/AuthContext.jsx";
import { getFreelancerQPrompt } from "../data/questionPrompt.js";
import { useDIDStreaming } from "../hooks/useDIDStreaming";
import {
  getVoiceIdByAgentName,
  getAgentNameFromSettings,
} from "../utils/voiceMapping";

export default function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userVideoRef = useRef(null);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);

  const { user, userContext } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    bio: userContext.bio,
    certification: userContext.certification,
    education: userContext.education,
    email: userContext.email,
    fullName: userContext.fullName,
    hardSkills: userContext.hardSkills,
    jobRole: userContext.jobRole,
    location: userContext.location,
    projects: userContext.projects,
    softSkills: userContext.softSkills,
  });

  // D-ID Streaming hook
  const {
    isConnecting: didConnecting,
    isConnected: didConnected,
    isStreamReady: didStreamReady,
    error: didError,
    connect: didConnect,
    speak: didSpeak,
    disconnect: didDisconnect,
    setPresenter: didSetPresenter,
    videoRef: didVideoRef,
    retryVideoConnection: didRetryVideo,
    clearError: clearDIDError,
  } = useDIDStreaming();

  const interviewSettings = location.state?.interviewSettings;

  const isPracticeMode = interviewSettings?.interviewType === "practice";

  // Get voice ID based on selected agent
  const agentName = getAgentNameFromSettings(interviewSettings);
  const voiceId = getVoiceIdByAgentName(agentName);

  // Log the selected agent and voice for debugging
  useEffect(() => {
    if (interviewSettings?.selectedAgent) {
      console.log("🎭 Selected Agent:", agentName);
      console.log("🗣️ Voice ID:", voiceId);
      console.log("⚙️ Interview Settings:", interviewSettings);
    }
  }, [agentName, voiceId, interviewSettings]);

  // Add debugging for DID streaming states
  useEffect(() => {
    console.log("📊 DID Streaming State Update:", {
      didConnecting,
      didConnected,
      didStreamReady,
      didError,
    });
  }, [didConnecting, didConnected, didStreamReady, didError]);

  const [questions, setQuestions] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

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

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechTimer, setSpeechTimer] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [fallbackMode, setFallbackMode] = useState(false);

  // Handle interview completion
  const handleInterviewComplete = useCallback(async () => {
    console.log("🎬 Interview completed, cleaning up...");

    try {
      // Close D-ID connection properly
      console.log("🔌 Closing D-ID connection...");
      await didDisconnect();
      console.log("✅ D-ID connection closed");
    } catch (error) {
      console.error("❌ Error closing D-ID connection:", error);
    }

    // Stop camera
    if (stream) {
      console.log("📹 Stopping camera stream...");
      stream.getTracks().forEach((track) => {
        track.stop();
        console.log(`🔴 Stopped ${track.kind} track`);
      });
      setStream(null);
      console.log("✅ Camera stream stopped");
    }

    // Clear any ongoing timers
    if (speechTimer) {
      clearTimeout(speechTimer);
      setSpeechTimer(null);
    }
    if (questionTimer) {
      clearTimeout(questionTimer);
      setQuestionTimer(null);
    }

    // Reset states
    setIsSpeaking(false);
    setIsTyping(false);
    setCountdown(0);

    // Show completion modal
    console.log("🎉 Interview complete - showing finish modal");
    setShowFinishModal(true);
  }, [didDisconnect, stream, speechTimer, questionTimer]);

  // Function to start a question with perfect sync
  const startQuestion = useCallback(
    async (questionIndex) => {
      if (questionIndex >= questions.length) {
        console.log(`🏁 All questions completed, closing connection`);
        handleInterviewComplete();
        return;
      }

      const currentQuestionText = questions[questionIndex];
      if (!currentQuestionText) return;

      console.log(
        `🎯 Starting question ${questionIndex + 1}/${questions.length}`
      );

      // Reset states
      setCurrentQuestion(questionIndex);
      setCountdown(0);
      setDisplayedText("");
      setIsTyping(true);
      setIsSpeaking(true);

      // Track completion of both typing and speech
      let typingComplete = false;
      let speechComplete = false;
      let speechAttempted = false;

      const checkBothComplete = () => {
        if (typingComplete && speechComplete) {
          console.log(
            `✅ Both typing and speech completed for question ${
              questionIndex + 1
            }`
          );
          // Start countdown for next question
          if (questionIndex < questions.length - 1) {
            setCountdown(10);

            // Countdown timer
            const countdownInterval = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(countdownInterval);
                  // Start next question immediately when countdown reaches 0
                  setTimeout(() => startQuestion(questionIndex + 1), 100);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          } else {
            // Last question completed
            console.log(`🏁 All questions completed, closing connection`);
            handleInterviewComplete();
          }
        }
      };

      // Start typing animation
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < currentQuestionText.length) {
          setDisplayedText((prev) => currentQuestionText.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          typingComplete = true;
          clearInterval(typeInterval);
          console.log(`✍️ Typing completed for question ${questionIndex + 1}`);
          checkBothComplete();
        }
      }, 50);

      // Function to attempt speech with retry
      const attemptSpeech = async (retryCount = 0) => {
        if (speechAttempted && speechComplete) return; // Prevent duplicate attempts

        speechAttempted = true;
        const maxRetries = 2;

        try {
          // Check if we're in fallback mode or should enable it
          if (fallbackMode) {
            console.log("📖 Fallback mode: Text-only interview");
            setIsSpeaking(false);
            speechComplete = true;
            checkBothComplete();
            return;
          }

          // Wait for stream to be ready if it's not yet ready
          if (!didStreamReady) {
            console.log("⏳ Waiting for stream to be ready...");
            // Wait up to 5 seconds for stream to be ready
            let waitTime = 0;
            while (!didStreamReady && waitTime < 5000) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              waitTime += 100;
            }
          }

          if (didStreamReady) {
            console.log(
              `🗣️ Agent speaking question ${questionIndex + 1} (attempt ${
                retryCount + 1
              }):`,
              currentQuestionText
            );

            const result = await didSpeak(currentQuestionText, voiceId);

            if (result) {
              console.log(
                `✅ Speech completed for question ${questionIndex + 1}`
              );
              setIsSpeaking(false);
              speechComplete = true;
              checkBothComplete();
            } else {
              throw new Error("Speech failed");
            }
          } else {
            console.warn(
              "❌ Stream not ready after waiting, enabling fallback mode"
            );
            setFallbackMode(true);
            setIsSpeaking(false);
            speechComplete = true;
            checkBothComplete();
          }
        } catch (error) {
          console.error(
            `❌ Speech failed for question ${questionIndex + 1} (attempt ${
              retryCount + 1
            }):`,
            error
          );

          // Check if it's a payment error (402)
          if (
            error.message &&
            (error.message.includes("402") ||
              error.message.includes("Payment Required") ||
              error.message.includes("Failed to create talk"))
          ) {
            console.warn(
              "💳 D-ID credits exhausted or stream error - enabling fallback mode"
            );
            setFallbackMode(true);
            setIsSpeaking(false);
            speechComplete = true;
            checkBothComplete();
            return;
          }

          // Retry logic
          if (retryCount < maxRetries && !fallbackMode) {
            console.log(
              `🔄 Retrying speech for question ${questionIndex + 1}...`
            );
            // Wait a bit before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Reset the attempted flag for retry
            speechAttempted = false;
            await attemptSpeech(retryCount + 1);
          } else {
            console.warn(
              `❌ Max retries reached for question ${
                questionIndex + 1
              }, enabling fallback mode`
            );
            setFallbackMode(true);
            setIsSpeaking(false);
            speechComplete = true;
            checkBothComplete();
          }
        }
      };

      // Start speech attempt
      attemptSpeech();
    },
    [
      questions,
      didStreamReady,
      didSpeak,
      voiceId,
      handleInterviewComplete,
      fallbackMode,
    ]
  );

  // Auto-progression logic with perfect speech synchronization
  useEffect(() => {
    if (!isPracticeReady && !(isRealReady && isRealInterviewStarted)) return;

    // Start the first question immediately
    if (currentQuestion === 0) {
      startQuestion(0);
    }
  }, [
    isPracticeReady,
    isRealReady,
    isRealInterviewStarted,
    currentQuestion,
    startQuestion,
  ]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (speechTimer) {
        clearTimeout(speechTimer);
      }
      if (questionTimer) {
        clearTimeout(questionTimer);
      }
      // Reset countdown on cleanup
      setCountdown(0);
    };
  }, [speechTimer, questionTimer]);

  // Separate useEffect for initial navigation check
  useEffect(() => {
    if (!interviewSettings) {
      navigate("/interview-settings");
    }
  }, [interviewSettings, navigate]);

  // Separate useEffect for D-ID connection on page load
  useEffect(() => {
    if (!interviewSettings) return;

    const initializeDID = async () => {
      console.log("Initializing D-ID connection...");
      // Set the presenter based on selected agent
      didSetPresenter(agentName);
      // Then connect
      await didConnect();
    };

    initializeDID();
  }, [interviewSettings, didConnect, didSetPresenter, agentName]);

  // Separate useEffect for fetching questions (only once)
  useEffect(() => {
    if (!interviewSettings || questionsLoaded || user.userType !== "freelancer")
      return;

    const fetchQuestions = async () => {
      try {
        const num = Math.floor(Math.random() * 100) + 1;
        console.log("Fetching questions with random number:", num);
        const prompt = getFreelancerQPrompt(
          personalInfo,
          interviewSettings,
          num
        );

        const encodedPrompt = encodeURIComponent(prompt.trim());
        const response = await fetch(
          `https://text.pollinations.ai/${encodedPrompt}`
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const resultText = await response.text();
        console.log("Raw API response:", resultText);

        // Clean the response to handle markdown-formatted JSON
        let cleanedText = resultText.trim();

        // Remove markdown code blocks if present
        if (cleanedText.startsWith("```json")) {
          cleanedText = cleanedText
            .replace(/^```json\s*/, "")
            .replace(/\s*```$/, "");
        } else if (cleanedText.startsWith("```")) {
          cleanedText = cleanedText
            .replace(/^```\s*/, "")
            .replace(/\s*```$/, "");
        }

        console.log("Cleaned response:", cleanedText);
        const q = JSON.parse(cleanedText);

        console.log("Questions fetched:", q);
        setQuestions(q);
        setQuestionsLoaded(true);
      } catch (error) {
        console.error("Error fetching interview questions:", error);
      }
    };

    fetchQuestions();
  }, [interviewSettings, questionsLoaded, user.userType]);

  // Page loading state management
  useEffect(() => {
    const checkLoadingComplete = () => {
      console.log("🔍 Checking loading status:", {
        didConnected,
        didStreamReady,
        questionsLoaded,
        questionsLength: questions.length,
        isPageLoading,
      });

      // Allow start when D-ID is connected (not just stream ready) and questions are loaded
      if (didConnected && questionsLoaded && questions.length > 0) {
        console.log(
          "✅ Page loading complete - D-ID connected and questions loaded"
        );
        setTimeout(() => {
          console.log("🎯 Setting isPageLoading to false");
          setIsPageLoading(false);
        }, 500); // Reduced delay for faster response
      } else {
        console.log("⏳ Still loading:", {
          needsConnection: !didConnected,
          needsStreamReady: !didStreamReady,
          needsQuestions: !questionsLoaded || questions.length === 0,
        });
      }
    };

    checkLoadingComplete();
  }, [didConnected, didStreamReady, questionsLoaded, questions.length]);

  useEffect(() => {
    let initialStream;

    const setupCamera = async () => {
      try {
        console.log("📹 Setting up camera...");

        // First check if camera permissions are available
        const permissions = await navigator.permissions
          .query({ name: "camera" })
          .catch(() => null);
        if (permissions?.state === "denied") {
          console.warn("⚠️ Camera permissions denied");
          setError("Camera access denied. Please check your browser settings.");
          return;
        }

        const constraints = {
          video: {
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
            facingMode: "user",
          },
          audio: false, // Set to false since we're not recording audio
        };

        const s = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("✅ Camera stream obtained:", s);

        setError("");
        setStream(s);
        initialStream = s;

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = s;
          console.log("📺 Video element source set");

          // Ensure video plays
          try {
            await userVideoRef.current.play();
            console.log("▶️ User video playing");
          } catch (playError) {
            console.log(
              "⚠️ Video play failed (this is often normal):",
              playError
            );
          }
        }
      } catch (err) {
        console.error("❌ Camera setup failed:", err);

        // Provide more specific error messages
        let errorMessage = "Camera error: ";
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          errorMessage =
            "No camera found. Please ensure a camera is connected.";
        } else if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          errorMessage =
            "Camera access denied. Please allow camera permissions and refresh.";
        } else if (
          err.name === "NotReadableError" ||
          err.name === "TrackStartError"
        ) {
          errorMessage = "Camera is in use by another application.";
        } else if (err.name === "OverconstrainedError") {
          errorMessage = "Camera doesn't support the requested settings.";
        } else {
          errorMessage += err.message || "Unknown error";
        }

        setError(errorMessage);
      }
    };

    setupCamera();

    return () => {
      if (initialStream) {
        console.log("🔄 Cleaning up camera stream");
        initialStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      // Cleanup D-ID connection
      didDisconnect();
    };
  }, [stream, didDisconnect]);

  useEffect(() => {
    if (showFinishModal && stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [showFinishModal, stream]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      didDisconnect();
    };

    const handlePopState = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      didDisconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [stream, didDisconnect]);

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
    didDisconnect();
    navigate("/dashboard");
  };

  const handleQuitCancel = () => {
    setShowQuitModal(false);
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    didDisconnect();
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

  // Show full-page loader while initializing
  if (isPageLoading) {
    return (
      <FullPageLoader
        message="Setting up your interview"
        subMessage="Please wait while we prepare everything for you"
      />
    );
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
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-4">
            <span className="text-white text-3xl mb-2">📷</span>
            <span className="text-white text-xs text-center mb-2">{error}</span>
            <button
              onClick={() => {
                setError("");
                // Retry camera setup
                window.location.reload();
              }}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Retry Camera
            </button>
          </div>
        ) : (
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
      </div>

      {/* D-ID Error Display */}
      {didError && (
        <div className="absolute top-6 left-6 z-10 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm">{didError}</span>
            <button
              onClick={clearDIDError}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Fallback Mode Indicator */}
      {fallbackMode && (
        <div className="absolute top-6 left-6 z-10 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📖</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Text-Only Mode</span>
              <span className="text-xs opacity-90">AI credits exhausted</span>
            </div>
          </div>
        </div>
      )}

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

      {/* D-ID AI Avatar */}
      <div className="absolute left-1/2 bottom-[160px] transform -translate-x-1/2 z-20">
        {didConnected || didStreamReady ? (
          <div className="relative">
            <video
              ref={didVideoRef}
              autoPlay
              playsInline
              className="w-[500px] h-auto object-contain"
              onLoadedData={() => {
                console.log("🎥 Video loaded with data");
                // Ensure video starts playing immediately
                if (didVideoRef.current) {
                  didVideoRef.current.play().catch(console.warn);
                }
              }}
              onPlay={() => console.log("▶️ Video started playing")}
              onError={(e) => {
                console.log("❌ Video error:", e);
                // Try to retry connection on error
                setTimeout(() => {
                  console.log("🔄 Attempting video retry due to error...");
                  didRetryVideo();
                }, 2000);
              }}
              onCanPlay={() => {
                // Ensure video can play with audio
                if (didVideoRef.current) {
                  console.log("🔊 Video can play - ensuring audio enabled");
                  didVideoRef.current.muted = false;
                  didVideoRef.current.volume = 1.0;
                }
              }}
              onLoadedMetadata={() => {
                console.log("📊 Video metadata loaded - ready to play");
                if (didVideoRef.current) {
                  didVideoRef.current.play().catch(console.warn);
                }
              }}
              onEmptied={() => {
                console.log("⚠️ Video stream emptied - attempting retry...");
                setTimeout(() => didRetryVideo(), 1000);
              }}
              onStalled={() => {
                console.log("⚠️ Video stalled - attempting retry...");
                setTimeout(() => didRetryVideo(), 2000);
              }}
            />
            {/* Connection indicator */}
            {didConnecting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <div className="text-white text-lg mb-2">Preparing AI...</div>
                <div className="animate-pulse h-8 w-8 bg-white rounded-full"></div>
              </div>
            )}
            {didStreamReady && (
              <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
            {/* Debug video info */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs p-2 rounded max-w-[200px]">
              <div>
                Stream: {didVideoRef?.current?.srcObject ? "Active" : "None"}
              </div>
              <div>
                Size: {didVideoRef?.current?.videoWidth}x
                {didVideoRef?.current?.videoHeight}
              </div>
              <div>Ready: {didStreamReady ? "Yes" : "No"}</div>
              <div>Connected: {didConnected ? "Yes" : "No"}</div>
              <button
                onClick={didRetryVideo}
                className="mt-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Retry Video
              </button>
            </div>
          </div>
        ) : (
          // Fallback to static image or placeholder with loading state
          <div className="relative">
            {interviewSettings?.selectedAgent?.img ? (
              <div
                className="relative w-[500px] h-auto"
                style={{
                  background: "transparent",
                  isolation: "isolate",
                }}
              >
                <img
                  src={interviewSettings.selectedAgent.img}
                  alt={interviewSettings.selectedAgent.name}
                  className="w-full h-auto object-contain"
                  style={{
                    filter:
                      "brightness(1.1) contrast(1.2) saturate(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                    mixBlendMode: "screen",
                    background: "transparent",
                    backgroundColor: "transparent",
                    opacity: 0.95,
                    // Advanced background removal for light backgrounds
                    clipPath: "ellipse(45% 60% at center 45%)",
                    transform: "scale(1.1)",
                  }}
                />
                {/* Subtle glow effect to enhance blending */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 70% at center 40%, rgba(255,255,255,0.3), transparent 60%)",
                    mixBlendMode: "soft-light",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ) : (
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center opacity-50">
                <div className="text-white text-8xl">🤖</div>
              </div>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-gray-800 text-lg mb-2 font-semibold">
                Connecting AI...
              </div>
              <div className="animate-spin h-8 w-8 border-4 border-gray-800 border-t-transparent rounded-full"></div>
            </div>
          </div>
        )}
      </div>

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
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-2 h-6 bg-gray-800 ml-1 animate-pulse"></span>
                    )}
                  </h2>
                )}
              </div>
              <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-4">
                {!isPracticeReady ? (
                  <button
                    onClick={async () => {
                      console.log("🎯 Practice Start button clicked");
                      setIsPracticeReady(true);
                      setCurrentQuestion(0);
                      // startQuestion will be called by useEffect
                    }}
                    disabled={
                      ((didConnecting || !didConnected) && !fallbackMode) ||
                      questions.length === 0
                    }
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {didConnecting
                      ? "Connecting..."
                      : !didConnected && !fallbackMode
                      ? "Preparing AI..."
                      : questions.length === 0
                      ? "Loading Questions..."
                      : fallbackMode
                      ? "Yes (Text Only)"
                      : "Yes"}
                  </button>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    {/* Question Progress */}
                    <div className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-64 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / questions.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Speaking Indicator */}
                    {isSpeaking && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <div className="animate-pulse w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">
                          {fallbackMode
                            ? "Displaying question..."
                            : "Agent is speaking..."}
                        </span>
                      </div>
                    )}

                    {/* Next Question Timer */}
                    {!isSpeaking &&
                      currentQuestion < questions.length - 1 &&
                      countdown > 0 && (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <div className="animate-spin w-3 h-3 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                          <span className="text-sm">
                            Next question in {countdown} seconds...
                          </span>
                        </div>
                      )}

                    {/* Interview Completed */}
                    {!isSpeaking &&
                      currentQuestion >= questions.length - 1 &&
                      countdown === 0 && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <span className="text-sm font-medium">
                            Interview completed!
                          </span>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </>
          ) : (
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
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-2 h-6 bg-gray-800 ml-1 animate-pulse"></span>
                      )}
                    </h2>
                  )
                )}
              </div>
              {!isRealReady ? (
                <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    onClick={async () => {
                      console.log("🎯 Real Interview Start button clicked");
                      setIsRealReady(true);
                      setIsRealInterviewStarted(true);
                      setCurrentQuestion(0);
                      // startQuestion will be called by useEffect
                    }}
                    disabled={
                      ((didConnecting || !didConnected) && !fallbackMode) ||
                      questions.length === 0
                    }
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {didConnecting
                      ? "Connecting..."
                      : !didConnected && !fallbackMode
                      ? "Preparing AI..."
                      : questions.length === 0
                      ? "Loading Questions..."
                      : fallbackMode
                      ? "Start (Text Only)"
                      : "Start"}
                  </button>
                </div>
              ) : (
                isRealInterviewStarted && (
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
                    {/* Question Progress */}
                    <div className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-64 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / questions.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Speaking Indicator */}
                    {isSpeaking && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <div className="animate-pulse w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-sm">
                          {fallbackMode
                            ? "Displaying question..."
                            : "Agent is speaking..."}
                        </span>
                      </div>
                    )}

                    {/* Next Question Timer */}
                    {!isSpeaking &&
                      currentQuestion < questions.length - 1 &&
                      countdown > 0 && (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <div className="animate-spin w-3 h-3 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                          <span className="text-sm">
                            Next question in {countdown} seconds...
                          </span>
                        </div>
                      )}

                    {/* Interview Completed */}
                    {!isSpeaking &&
                      currentQuestion >= questions.length - 1 &&
                      countdown === 0 && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <span className="text-sm font-medium">
                            Interview completed!
                          </span>
                        </div>
                      )}
                  </div>
                )
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
