const MeetAISection = () => {
    const aiAgents = [
        {
            id: 1,
            name: "John Andrew",
            image: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Expert in technical interviews for software engineering roles. Specializes in coding challenges and system design."
        },
        {
            id: 2,
            name: "John Andrew",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Focuses on behavioral interviews and leadership assessments. Perfect for management and executive positions."
        },
        {
            id: 3,
            name: "John Andrew",
            image: "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Specializes in marketing and creative role interviews. Expert in portfolio reviews and creative problem-solving."
        },
        {
            id: 4,
            name: "John Andrew",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            description: "Finance and consulting interview specialist. Covers case studies, analytical thinking, and quantitative reasoning."
        },
        {
            id: 5,
            name: "John Andrew",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Healthcare and medical field expert. Experienced in clinical scenarios and healthcare management interviews."
        },
        {
            id: 6,
            name: "John Andrew",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Sales and business development specialist. Masters relationship building and performance-based interview techniques."
        }
    ];

    return (
        <section className="py-16 px-4 bg-bgColor">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-12">
                    <h2 className="text-h2 font-bold text-primary mb-6">Meet AI Agents</h2>
                    <p className="text-p text-subHeadingText max-w-3xl mx-auto">
                        Get AI-powered mock interviews tailored to your job role. Practice, get 
                        instant feedback, and boost your confidence — all in one place.
                    </p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aiAgents.map((agent) => (
                        <div key={agent.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                            
                            <div className="aspect-square overflow-hidden">
                                <img 
                                    src={agent.image} 
                                    alt={agent.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            
                            <div className="p-6">
                                <h3 className="text-h5 font-bold text-headingText mb-3">{agent.name}</h3>
                                <p className="text-p text-subHeadingText leading-relaxed">
                                    {agent.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MeetAISection
