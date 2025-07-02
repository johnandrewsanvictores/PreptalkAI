import { useEffect, useRef } from "react";

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const stepElements = sectionRef.current?.querySelectorAll(".step-item");
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      stepNumber: "01",
      title: "Choose Your Role",
      description:
        "Select your desired job role and industry. Our AI will customize interview questions based on the specific requirements and common scenarios for your target position.",
      videoPlaceholder: "role-selection",
    },
    {
      stepNumber: "02",
      title: "Set Up Your Profile",
      description:
        "Upload your resume and set your preferences. Our system analyzes your background to create personalized interview scenarios that match your experience level.",
      videoPlaceholder: "profile-setup",
    },
    {
      stepNumber: "03",
      title: "Practice Mock Interviews",
      description:
        "Participate in realistic mock interviews with our AI interviewer. Practice behavioral questions, technical assessments, and situational scenarios in a pressure-free environment.",
      videoPlaceholder: "mock-interview",
    },
    {
      stepNumber: "04",
      title: "Get Real-time Feedback",
      description:
        "Receive instant feedback on your responses, body language, and communication skills. Our AI analyzes your performance and provides actionable insights.",
      videoPlaceholder: "feedback-analysis",
    },
    {
      stepNumber: "05",
      title: "Track Your Progress",
      description:
        "Monitor your improvement over time with detailed analytics. Identify your strengths and areas for improvement with personalized recommendations to boost your interview confidence.",
      videoPlaceholder: "progress-tracking",
    },
  ];

  return (
    <section
      id="hiw"
      className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 bg-bgColor2"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="step-item text-center mb-16 sm:mb-20 md:mb-24 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-h3 sm:text-h2 font-bold text-primary mb-6">
            How it works
          </h2>
          <p className="text-p sm:text-h6 md:text-h5 text-subHeadingText leading-relaxed max-w-3xl mx-auto">
            Get AI-powered mock interviews tailored to your job role. Practice,
            get instant feedback, and boost your confidence — all in one place.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.stepNumber}
                className="step-item group opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Content */}
                  <div
                    className={`${
                      isEven ? "lg:order-2" : "lg:order-1"
                    } space-y-6`}
                  >
                    <div className="inline-flex items-center space-x-4 mb-6">
                      <span className="bg-primary text-white text-h6 sm:text-h5 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                        {step.stepNumber}
                      </span>
                      <div className="h-px bg-primary w-12 sm:w-16 md:w-20"></div>
                    </div>

                    <h3 className="text-h4 sm:text-h3 md:text-h2 font-bold text-headingText leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-p sm:text-h6 text-subHeadingText leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Video/Animation Placeholder */}
                  <div
                    className={`${
                      isEven ? "lg:order-1" : "lg:order-2"
                    } relative group-hover:scale-105 transition-transform duration-500`}
                  >
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 aspect-video">
                      {/* Video placeholder - replace with actual video components */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-sm sm:text-base text-primary font-semibold capitalize">
                            {step.videoPlaceholder.replace("-", " ")} Demo
                          </p>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute top-4 left-16 w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>

                    {/* Floating step indicator */}
                    <div className="absolute -top-4 -right-4 bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      {step.stepNumber}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="step-item text-center mt-16 sm:mt-20 md:mt-24 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 shadow-lg border-2 border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-h4 sm:text-h3 font-bold text-headingText mb-4">
              Ready to get started?
            </h3>
            <p className="text-p sm:text-h6 text-subHeadingText mb-6">
              Join thousands of professionals who have improved their interview
              skills with PrepTalk AI.
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-lg text-h6 font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your First Mock Interview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
