import { useState } from "react";
import {
  Upload,
  Bot,
  Settings,
  Mic,
  BarChart2,
  Star,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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
      icon: Upload,
      title: "Smart Resume Upload",
      summary:
        "Upload your resume and get AI-powered analysis and suggestions.",
      description:
        "Users (freelancers or MSMEs) can upload their resume or business profile through a secure uploader. The system uses this input to generate tailored interview or pitch questions, ensuring that simulations are realistic and relevant to the user’s actual experience or business context.",
    },
    {
      icon: Bot,
      title: "AI Agent Selection",
      summary:
        "Choose from specialized AI interviewers for different industries.",
      description:
        "Users can choose from a range of AI personas like a tech recruiter, startup investor, HR executive, or loan officer. Each agent provides unique personalities, helping users practice for different audiences and improving adaptability, nonverbal fluency, and cultural sensitivity.",
    },
    {
      icon: Settings,
      title: "Custom Interview Settings",
      summary:
        "Personalize your interview experience with custom configurations.",
      description:
        "Adjust your session by selecting the interview type, difficulty level, number of questions, and preferred mode. This lets you tailor each experience to your current needs and learning goals.",
    },
    {
      icon: Mic,
      title: "Interactive Mock Interviews",
      summary: "Practice with real-time voice and video mock interviews.",
      description:
        "Simulate real interviews or business pitches with dynamic follow-up questions from AI agents. These help build your confidence, adaptability, and communication skills in realistic scenarios.",
    },
    {
      icon: BarChart2,
      title: "Performance Analytics",
      summary: "Track your progress with detailed analytics and insights.",
      description:
        "Monitor your progress over time through an analytics dashboard. It shows trends, improvements, and insights to help you prepare smarter.",
    },
    {
      icon: Star,
      title: "AI Recommendations",
      summary: "Get personalized suggestions to improve your interview skills.",
      description:
        "Based on your performance, the system provides tailored practice suggestions. These help you continuously improve in specific skill areas.",
    },
    {
      icon: CreditCard,
      title: "Flexible Pricing",
      summary: "Start free and upgrade as you grow your career.",
      description:
        "Enjoy full access to all features during your first three sessions. After the trial, continue practicing through a flexible and affordable credit-based system.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-bgColor2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-6">
            Key Features and Benefits
          </h2>
          <p className="text-p text-subHeadingText leading-relaxed max-w-3xl mx-auto">
            Discover powerful AI-driven tools designed to transform your
            interview preparation and boost your confidence for any job
            opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isExpanded = expandedItems[index];

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h5 font-bold text-headingText mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-small text-subHeadingText leading-relaxed">
                      {feature.summary}
                    </p>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-p text-subHeadingText leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleItem(index)}
                  className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium text-small group"
                >
                  <span>{isExpanded ? "See Less" : "See More"}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureAndBenefitsSection;
