const HeroSection = () => {
    return (
        <div className="min-h-screen flex justify-center items-center py-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="mb-10">
                    <h1 className="text-h1 text-headingText font-bold leading-tight mb-8">
                        Master Your Interview Skills with <span className="text-primary">Preptalk AI</span>
                    </h1>
                </div>
                <div className="mb-12">
                    <p className="text-subHeadingText text-xl max-w-3xl mx-auto leading-relaxed">
                        Prepare, practice, and improve with real-time AI feedback. Boost your confidence, sharpen your communication, and get the job you deserve.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-6 flex-wrap">
                    <button className="bg-primary text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Start Interview
                    </button>
                    <button className="border-2 border-gray-300 text-subHeadingText px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        How it works
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
