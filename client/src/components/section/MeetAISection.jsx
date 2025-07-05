import BrandonImage from "../../assets/brandon.png";
import DavisImage from "../../assets/davis.png";
import HarveyImage from "../../assets/harvey.png";
import SaraImage from "../../assets/sara.png";
import RosaImage from "../../assets/rosa.png";
import RonaImage from "../../assets/rona.png";

const MeetAISection = () => {
  const aiAgents = [
    {
      id: 1,
      name: "Brandon",
      image: BrandonImage,
      description:
        "A confident and assertive presence, Brandon speaks with clarity and authority. He carries a formal, professional demeanor that reflects leadership and control.",
    },
    {
      id: 2,
      name: "Davis",
      image: DavisImage,
      description:
        "Davis is direct, disciplined, and serious. He has a commanding presence and values precision, making him feel like a veteran in high-pressure environments.",
    },
    {
      id: 3,
      name: "Harvey",
      image: HarveyImage,
      description:
        "Calm and detached, Harvey maintains a neutral expression and flat tone. His passive presence makes him hard to read—reserved, observant, and composed.",
    },
    {
      id: 4,
      name: "Sara",
      image: SaraImage,
      description:
        "Sara is poised, focused, and respectful. She brings a quiet intensity and thoughtful presence that reflects experience, maturity, and high standards.",
    },
    {
      id: 5,
      name: "Rosa",
      image: RosaImage,
      description:
        "Warm, constructive, and insightful—Rosa offers a balanced mix of kindness and professionalism. She’s the type who inspires confidence with her calm and thoughtful personality.",
    },
    {
      id: 6,
      name: "Rona",
      image: RonaImage,
      description:
        "Friendly, upbeat, and approachable, Rona brings positive energy to every interaction. She creates a welcoming atmosphere and naturally puts people at ease.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-h3 sm:text-h2 font-bold text-headingText dark:text-primary mb-4 sm:mb-6">
            Meet AI Agents
          </h2>
          <p className="text-p sm:text-h6 text-subHeadingText dark:text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
            Get AI-powered mock interviews tailored to your job role. Practice,
            get instant feedback, and boost your confidence — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {aiAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-h6 sm:text-h5 font-bold text-headingText dark:text-white mb-2 sm:mb-3">
                  {agent.name}
                </h3>
                <p className="text-small sm:text-p text-subHeadingText dark:text-gray-300 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetAISection;
