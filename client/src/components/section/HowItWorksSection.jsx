const HowItWorksSection = () => {
    return (
        <section className="py-16 px-4 bg-bgColor2">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    <div className="flex justify-center">
                        <img src="https://plus.unsplash.com/premium_photo-1733317257106-79b094845b8e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover border-2 border-gray-300 rounded-lg" />
                    </div>

                    
                    <div>
                        
                        <div className="mb-12">
                            <h2 className="text-h2 font-bold text-primary mb-6">How it works</h2>
                            <p className="text-p text-subHeadingText leading-relaxed">
                                Get AI-powered mock interviews tailored to your job role. Practice, get 
                                instant feedback, and boost your confidence — all in one place.
                            </p>
                        </div>

                        
                        <div className="space-y-8">
                            <div className="bg-white p-4 rounded-lg">
                                <h3 className="text-h4 font-bold text-headingText mb-3">Step 1</h3>
                                <p className="text-p text-subHeadingText leading-relaxed">
                                    Choose your desired job role and industry. Our AI will customize 
                                    interview questions based on the specific requirements and common 
                                    scenarios for your target position.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h3 className="text-h4 font-bold text-headingText mb-3">Step 2</h3>
                                <p className="text-p text-subHeadingText leading-relaxed">
                                    Participate in realistic mock interviews with our AI interviewer. 
                                    Practice behavioral questions, technical assessments, and situational 
                                    scenarios in a pressure-free environment.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg">
                                <h3 className="text-h4 font-bold text-headingText mb-3">Step 3</h3>
                                <p className="text-p text-subHeadingText leading-relaxed">
                                    Receive detailed feedback and performance analytics. Identify your 
                                    strengths and areas for improvement with personalized recommendations 
                                    to boost your interview confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorksSection