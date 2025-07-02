const MeetAISection = () => {
  const aiAgents = [
    {
      id: 1,
      name: "Orion",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Expert in technical interviews for software engineering roles. Specializes in coding challenges and system design.",
    },
    {
      id: 2,
      name: "Orion",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Focuses on behavioral interviews and leadership assessments. Perfect for management and executive positions.",
    },
    {
      id: 3,
      name: "Zane",
      image:
        "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Specializes in marketing and creative role interviews. Expert in portfolio reviews and creative problem-solving.",
    },
    {
      id: 4,
      name: "Cypher",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description:
        "Finance and consulting interview specialist. Covers case studies, analytical thinking, and quantitative reasoning.",
    },
    {
      id: 5,
      name: "Lyra",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Healthcare and medical field expert. Experienced in clinical scenarios and healthcare management interviews.",
    },
    {
      id: 6,
      name: "Apollo",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Sales and business development specialist. Masters relationship building and performance-based interview techniques.",
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
