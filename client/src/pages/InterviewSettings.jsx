import React, { useState } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import BrandonImage from "../assets/Brandon.png";
import DavisImage from "../assets/Davis.png";
import HarveyImage from "../assets/Harvey.png";
import SaraImage from "../assets/Sara.png";
import RosaImage from "../assets/Rosa.png";
import RonaImage from "../assets/Rona.png";

const agents = [
  {
    name: "Brandon",
    role: "System Design Expert",
    personality: "Analytical and Detail-Oriented",
    img: BrandonImage,
    description:
      "Expert in technical interviews for software engineering roles. Specializes in coding challenges and system design.",
  },
  {
    name: "Davis",
    role: "Creative & Marketing Specialist",
    personality: "Engaging and Collaborative",
    img: DavisImage,
    description:
      "Focuses on behavioral interviews and leadership assessments. Perfect for management and executive positions.",
  },
  {
    name: "Harvey",
    role: "Behavioral Interview Expert",
    personality: "Warm, Friendly and Engaging",
    img: HarveyImage,
    description:
      "Specializes in marketing and creative role interviews. Expert in portfolio reviews and creative problem-solving.",
  },
  {
    name: "Sara",
    role: "Technical Coding Expert",
    personality: "Logical and Systematic",
    img: SaraImage,
    description:
      "Finance and consulting interview specialist. Covers case studies, analytical thinking, and quantitative reasoning.",
  },
  {
    name: "Rosa",
    role: "Leadership & Strategy Expert",
    personality: "Professional and Motivating",
    img: RosaImage,
    description:
      "Healthcare and medical field expert. Experienced in clinical scenarios and healthcare management interviews.",
  },
  {
    name: "Rona",
    role: "Sales & Business Development Expert",
    personality: "Engaging and Collaborative",
    img: RonaImage,
    description:
      "Sales and business development specialist. Masters relationship building and performance-based interview techniques.",
  },
];

const difficulties = ["Easy", "Moderate", "Intermediate", "Hard", "Expert"];

export default function InterviewSettings() {
  const [current, setCurrent] = useState(2);
  const [difficulty, setDifficulty] = useState(2);
  const [numQuestions, setNumQuestions] = useState("");
  const [maximumFQ, setMaximumFQ] = useState("");
  const [interviewType, setInterviewType] = useState("practice");
  const [questionType, setQuestionType] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  // Interview types for freelancers (existing types)
  const freelancerInterviewTypes = [
    {
      id: "behavioral",
      title: "Behavioral Interview",
      focus: "Communication, Self-Motivation, Teamwork, Resilience",
      description:
        "Share real-life experiences to highlight how you collaborate, stay motivated, and handle challenges. This interview type focuses on your soft skills in past situations to reveal your soft skills.",
    },
    {
      id: "technical",
      title: "Technical Interview",
      focus:
        "Critical Thinking, Analytical Reasoning, Attention to Detail, Technical Clarity",
      description:
        "Demonstrate how you solve problems, explain processes, and approach tasks logically. This interview is designed to test your thinking and technical articulation.",
    },
    {
      id: "situational",
      title: "Situational Interview",
      focus:
        "Decision-Making, Adaptability, Conflict Resolution, Prioritization",
      description:
        "Respond to hypothetical scenarios that reflect real workplace situations. It evaluates how well you make decisions, handle pressure, and adapt to change.",
    },
    {
      id: "all-in-one",
      title: "All-in-one Interview",
      focus: "All Skills from Other Interview Types",
      description:
        "Experience a full simulation that blends behavioral, technical, and situational questions. It's ideal for overall soft skills and strategic thinking.",
    },
  ];

  const entrepreneurInterviewTypes = [
    {
      id: "product-presentation",
      title: "Product Presentation",
      focus: "Clarity, Confidence, Engagement, Structure",
      description:
        "Practice delivering your product or service clearly and confidently. Learn how to capture attention, keep your audience engaged, and structure your message for maximum impact.",
    },
    {
      id: "customer-interaction",
      title: "Customer Interaction",
      focus: "Though questions, Empathy, Adaptability, Trust",
      description:
        "Simulate real customer conversations—especially the hard ones. Improve how you listen, respond, and build trust during inquiries, feedback sessions, or objections.",
    },
    {
      id: "business-pitching",
      title: "Business Pitching",
      focus:
        "Problem Solution, Value Proposition Client, Investor Appeal, Collaboration",
      description:
        "Train for high-stakes pitches to investors, partners, or clients. Learn to clearly present your business problem, value, and vision in a persuasive and professional way.",
    },
    {
      id: "all-in-one",
      title: "All-in-one Interview",
      focus: "All Skills from Other Interview Types",
      description:
        "Experience a full simulation that blends product presentation, customer interaction, and business pitching it’s ideal for advanced practice, testing your overall soft skills and strategic thinking.",
    },
  ];

  const getInterviewTypes = () => {
    if (user?.userType === "entrep") {
      return entrepreneurInterviewTypes;
    }
    return freelancerInterviewTypes;
  };

  const currentInterviewTypes = getInterviewTypes();

  const prevAgent = () =>
    setCurrent((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
  const nextAgent = () =>
    setCurrent((prev) => (prev === agents.length - 1 ? 0 : prev + 1));

  const handleOnNext = () => {
    if (!questionType) {
      const interviewTypeNames = currentInterviewTypes
        .map((type) => type.title)
        .join(", ");
      alert(`Please select an interview type (${interviewTypeNames})`);
      return;
    }

    if (!numQuestions || numQuestions < 1 || numQuestions > 10) {
      alert("Please enter a valid number of main questions (1-10)");
      return;
    }

    if (maximumFQ === "" || maximumFQ < 0 || maximumFQ > 5) {
      alert("Please enter a valid number of follow-up questions (0-5)");
      return;
    }

    // If all validations pass, navigate to camera setup with settings data
    const interviewSettings = {
      selectedAgent: agents[current],
      difficulty: difficulties[difficulty],
      questionType,
      numQuestions: parseInt(numQuestions),
      maximumFQ: parseInt(maximumFQ),
      interviewType,
    };

    navigate("/camera-setup", { state: { interviewSettings } });
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      questionType &&
      numQuestions &&
      numQuestions >= 1 &&
      numQuestions <= 10 &&
      maximumFQ !== "" &&
      maximumFQ >= 0 &&
      maximumFQ <= 5
    );
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
          <div className="w-full max-w-7xl">
            <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
              <h1 className="text-h3 sm:text-h2 lg:text-h1 font-bold text-primary mb-3 sm:mb-4">
                Interview Settings
              </h1>
              <p className="text-p sm:text-h6 lg:text-h5 text-subHeadingText max-w-3xl mx-auto px-4">
                Configure your AI interview experience with personalized
                settings. Choose your AI interviewer, set difficulty level, and
                customize your practice session.
              </p>
            </div>

            <div className="bg-bgColor2 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-h5 sm:text-h4 lg:text-h3 font-bold text-headingText mb-3 sm:mb-4">
                  Choose Your AI Interview Agent
                </h2>
                <p className="text-small sm:text-p lg:text-h6 text-subHeadingText max-w-4xl mx-auto px-2">
                  Each agent has a unique personality and expertise to match
                  different interview styles. Select the one that best prepares
                  you for your target role.
                </p>
              </div>

              <div className="relative mb-6 sm:mb-8">
                <div className="block sm:hidden">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevAgent}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                      aria-label="Previous agent"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <div className="bg-primary text-white px-4 py-2 rounded-full text-small font-semibold shadow-lg">
                      Selected
                    </div>

                    <button
                      onClick={nextAgent}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                      aria-label="Next agent"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-bgColor rounded-xl p-4 border-4 border-primary shadow-xl max-w-xs">
                      <img
                        src={agents[current].img}
                        alt={agents[current].name}
                        className="w-full h-64 rounded-xl object-cover mb-4"
                      />
                      <div className="text-center">
                        <h3 className="text-h6 font-bold text-headingText mb-2">
                          {agents[current].name}
                        </h3>
                        <p className="text-small text-primary font-semibold mb-2">
                          {agents[current].role}
                        </p>
                        <p className="text-small text-subHeadingText">
                          {agents[current].personality}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 space-x-2">
                    {agents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === current ? "bg-primary" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center">
                  <button
                    onClick={prevAgent}
                    className="absolute left-2 sm:left-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                    aria-label="Previous agent"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center justify-center space-x-6 lg:space-x-8 px-20">
                    {[-1, 0, 1].map((offset) => {
                      const index =
                        (current + offset + agents.length) % agents.length;
                      const agent = agents[index];
                      const isCenter = offset === 0;

                      return (
                        <div
                          key={agent.name + offset}
                          className={`relative transition-all duration-500 ${
                            isCenter
                              ? "scale-100 opacity-100"
                              : "scale-75 opacity-60"
                          }`}
                        >
                          {isCenter && (
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                              <span className="bg-primary text-white px-4 py-2 rounded-full text-small font-semibold shadow-lg">
                                Selected
                              </span>
                            </div>
                          )}

                          <div className="bg-bgColor rounded-xl p-4 lg:p-6 border-2 border-transparent hover:border-primary/30 transition-all">
                            <img
                              src={agent.img}
                              alt={agent.name}
                              className={`w-40 h-52 lg:w-48 lg:h-64 rounded-xl object-cover mb-4 ${
                                isCenter
                                  ? "border-4 border-primary shadow-xl"
                                  : "border-2 border-gray-200"
                              }`}
                            />
                            <div className="text-center">
                              <h3 className="text-p lg:text-h6 font-bold text-headingText mb-2">
                                {agent.name}
                              </h3>
                              <p className="text-small text-primary font-semibold mb-1">
                                {agent.role}
                              </p>
                              <p className="text-small text-subHeadingText hidden lg:block">
                                {agent.personality}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={nextAgent}
                    className="absolute right-2 sm:right-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                    aria-label="Next agent"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-bgColor rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
                  <p className="text-h6 text-subHeadingText hidden lg:block mb-5">
                    {agents[current].description}
                  </p>
                  <button className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-small sm:text-p hover:bg-primary/90 transition-colors shadow-md">
                    <svg
                      width="14"
                      height="14"
                      className="sm:w-4 sm:h-4 inline mr-2"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Preview Voice Sample
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-h5 sm:text-h4 lg:text-h3 font-bold text-headingText mb-3 sm:mb-4">
                  Question Difficulty Level
                </h2>
                <p className="text-small sm:text-p lg:text-h6 text-subHeadingText max-w-3xl mx-auto px-2">
                  Choose the difficulty level that matches your experience and
                  comfort zone. You can always adjust this in future sessions.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8">
                  <div className="absolute left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 h-1 bg-gray-300 rounded-full" />

                  {difficulties.map((level, index) => {
                    const isActive = difficulty === index;
                    return (
                      <div
                        key={level}
                        className="relative z-10 flex flex-col items-center"
                      >
                        <button
                          onClick={() => setDifficulty(index)}
                          className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 sm:border-4 transition-all duration-300 ${
                            isActive
                              ? "border-primary bg-white shadow-lg ring-2 sm:ring-4 ring-primary/20"
                              : "border-gray-300 bg-gray-300 hover:border-primary/50"
                          }`}
                        />
                        <span
                          className={`mt-2 sm:mt-3 lg:mt-4 text-small sm:text-p font-semibold transition-colors ${
                            isActive ? "text-primary" : "text-subHeadingText"
                          }`}
                        >
                          {level}
                        </span>
                        {isActive && (
                          <div className="mt-1 sm:mt-2 bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                            <span className="text-small text-primary font-medium">
                              Selected
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-bgColor2 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-h5 sm:text-h4 lg:text-h3 font-bold text-headingText mb-3 sm:mb-4">
                  How should questions be handled?
                </h2>
                <h3 className="text-h6 sm:text-h5 font-semibold text-primary mb-3 sm:mb-4">
                  Select type of Interview{" "}
                  <span className="text-red text-h6">*</span>
                </h3>
                <p className="text-small sm:text-p lg:text-h6 text-subHeadingText max-w-4xl mx-auto px-2">
                  Choose the interview type you want to practice. Each type is
                  designed to help you improve specific soft skills based on
                  real-world scenarios.
                </p>
                {!questionType && (
                  <div className="mt-2 text-red text-small font-medium">
                    Please select an interview type to continue
                  </div>
                )}
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 ${
                  !questionType ? "ring-2 ring-red rounded-xl p-4" : ""
                }`}
              >
                {currentInterviewTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setQuestionType(type.id)}
                    className={`bg-bgColor rounded-xl p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
                      questionType === type.id
                        ? "border-primary shadow-lg bg-primary/5"
                        : "border-transparent hover:border-primary/30"
                    }`}
                  >
                    <h4 className="text-p sm:text-h6 lg:text-h5 font-bold text-headingText mb-2 sm:mb-3">
                      {type.title}
                    </h4>
                    <p className="text-small italic text-primary mb-3 sm:mb-4 leading-relaxed font-semibold">
                      Focus: {type.focus}
                    </p>
                    <p className="text-small text-subHeadingText leading-relaxed">
                      {type.description}
                    </p>
                    {questionType === type.id && (
                      <div className="mt-3 sm:mt-4 flex items-center text-primary">
                        <svg
                          width="14"
                          height="14"
                          className="sm:w-4 sm:h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        </svg>
                        <span className="text-small font-semibold">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Customize Question Flow */}
              <div className="bg-bgColor rounded-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-h6 sm:text-h5 font-bold text-headingText text-center mb-6 sm:mb-8">
                  Customize Question Flow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                  <div>
                    <label className="block text-p sm:text-h6 font-semibold text-headingText mb-2 sm:mb-3">
                      Number of Main Questions{" "}
                      <span className="text-red text-h6">*</span>
                      <span className="text-small text-subHeadingText font-normal ml-2">
                        (max 10)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-small sm:text-p bg-bgColor2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                        !numQuestions || numQuestions < 1 || numQuestions > 10
                          ? "border-red"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter a number"
                    />
                    {(!numQuestions ||
                      numQuestions < 1 ||
                      numQuestions > 10) && (
                      <div className="mt-1 text-red text-small">
                        Please enter a number between 1 and 10
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-p sm:text-h6 font-semibold text-headingText mb-2 sm:mb-3">
                      Enter Number of Follow-Up Questions{" "}
                      <span className="text-red text-h6">*</span>
                      <span className="text-small text-subHeadingText font-normal ml-2">
                        (max 5)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={maximumFQ}
                      onChange={(e) => setMaximumFQ(e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-small sm:text-p bg-bgColor2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                        maximumFQ === "" || maximumFQ < 0 || maximumFQ > 5
                          ? "border-red"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter a number"
                    />
                    {(maximumFQ === "" || maximumFQ < 0 || maximumFQ > 5) && (
                      <div className="mt-1 text-red text-small">
                        Please enter a number between 0 and 5
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Experience Type */}
            <div className="bg-bgColor2 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-h5 sm:text-h4 lg:text-h3 font-bold text-headingText mb-3 sm:mb-4">
                  Interview Experience Type
                </h2>
                <p className="text-small sm:text-p lg:text-h6 text-subHeadingText max-w-3xl mx-auto px-2">
                  Choose between practice mode with hints and guidance, or
                  realistic mode that simulates actual interview conditions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                <label
                  className={`flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-xl border-2 cursor-pointer font-semibold text-p sm:text-h6 transition-all duration-300 text-center ${
                    interviewType === "practice"
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-bgColor text-headingText border-gray-300 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewType"
                    value="practice"
                    checked={interviewType === "practice"}
                    onChange={() => setInterviewType("practice")}
                    className="hidden"
                  />
                  <div className="mb-2 sm:mb-3">
                    <svg
                      width="24"
                      height="24"
                      className="sm:w-8 sm:h-8 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L3 9V22H8V16H16V22H21V9L12 2Z" />
                    </svg>
                  </div>
                  Practice Interview
                  <p className="text-small mt-1 sm:mt-2 opacity-80">
                    Helpful tips, retry options, and guided feedback
                  </p>
                </label>

                <label
                  className={`flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-xl border-2 cursor-pointer font-semibold text-p sm:text-h6 transition-all duration-300 text-center ${
                    interviewType === "real"
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-bgColor text-headingText border-gray-300 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewType"
                    value="real"
                    checked={interviewType === "real"}
                    onChange={() => setInterviewType("real")}
                    className="hidden"
                  />
                  <div className="mb-2 sm:mb-3">
                    <svg
                      width="24"
                      height="24"
                      className="sm:w-8 sm:h-8 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
                    </svg>
                  </div>
                  Real Interview Simulation
                  <p className="text-small mt-1 sm:mt-2 opacity-80">
                    Realistic conditions with no hints or retries
                  </p>
                </label>
              </div>
            </div>

            {!isFormValid() && (
              <div className="bg-red/10 border border-red rounded-lg p-4 mb-6 text-center max-w-2xl mx-auto">
                <h4 className="font-semibold text-red mb-2">
                  Please complete all required fields:
                </h4>
                <ul className="text-small text-red space-y-1">
                  {!questionType && <li>• Select an interview type</li>}
                  {(!numQuestions || numQuestions < 1 || numQuestions > 10) && (
                    <li>• Enter number of main questions (1-10)</li>
                  )}
                  {(maximumFQ === "" || maximumFQ < 0 || maximumFQ > 5) && (
                    <li>• Enter number of follow-up questions (0-5)</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleOnNext}
                disabled={!isFormValid()}
                className={`px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-lg font-semibold text-p sm:text-h6 transition-all shadow-lg flex items-center gap-2 sm:gap-3 ${
                  isFormValid()
                    ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
                }`}
              >
                <FaCamera
                  size={20}
                  className="sm:w-6 sm:h-6"
                  color={isFormValid() ? "#fff" : "#d1d5db"}
                />
                <span className="hidden sm:inline">
                  Continue to Camera Setup
                </span>
                <span className="sm:hidden">Camera Setup</span>
                <svg
                  width="16"
                  height="16"
                  className="sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
