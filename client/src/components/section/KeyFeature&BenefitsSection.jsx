import { useState } from "react";

const KeyFeatureAndBenefitsSection = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const features = [
    {
      title: "AI-Powered Mock Interviews",
      description:
        "Get AI-powered mock interviews tailored to your job role. Practice, get instant feedback, and boost your confidence — all in one place.",
    },
    {
      title: "Real-Time Feedback",
      description:
        "Receive immediate, detailed feedback on your responses, body language, and communication skills to improve your interview performance.",
    },
    {
      title: "Industry-Specific Questions",
      description:
        "Access a comprehensive database of questions tailored to your specific industry and job role for targeted practice.",
    },
    {
      title: "Performance Analytics",
      description:
        "Track your progress over time with detailed analytics and insights to identify areas for improvement.",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Practice anytime, anywhere with our 24/7 available AI interviewer that fits your schedule and learning pace.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-h2 font-bold text-primary mb-6">
              Key Features and Benefits
            </h2>
            <p className="text-p text-subHeadingText leading-relaxed mb-20">
              Get AI-powered mock interviews tailored to your job role.
              Practice, get instant feedback, and boost your confidence — all in
              one place.
            </p>
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGM0aHl2dWJsOG1wMGJxbWZ5bnl6MmtqcTMwNWo4d3Y1eGQ0bmg0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hrm0LJNRkPHDkLIHz9/giphy.gif"
              className="w-full h-full object-cover border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="text-h4 font-semibold text-headingText">
                      {feature.title}
                    </h3>
                    {!expandedItems[index] && (
                      <p className="text-sm text-subHeadingText mt-1 line-clamp-1">
                        {feature.description.substring(0, 60)}...
                      </p>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedItems[index] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedItems[index] && (
                  <div className="px-6 pb-4">
                    <p className="text-p text-subHeadingText leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default KeyFeatureAndBenefitsSection;
