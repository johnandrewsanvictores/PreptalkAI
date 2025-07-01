import PublicLayout from "../layout/PublicLayout.jsx";

const Aboutpage = () => {
  return (
    <PublicLayout>
      <section className="py-24 px-4 bg-bgColor">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-h1 font-bold text-headingText mb-8">
            What is{" "}
            <div className="relative inline-block">
              <span className="text-subHeadingText">PrepTalk</span>{" "}
              <span className="text-primary">AI</span>
              <svg
                className="absolute left-0 bottom-[-20px] w-full"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 15 C50 5, 150 5, 195 15"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
            ?
          </h1>
          <p className="text-h6 text-subHeadingText leading-relaxed max-w-4xl mx-auto">
            Preptalk AI is an AI-powered platform built to help Filipino
            freelancers and micro-entrepreneurs prepare for interviews, client
            meetings, and business pitches through realistic mock interview
            simulations. In the Philippines, many talented individuals struggle
            to succeed globally—not because they lack skills, but because they
            lack proper interview techniques. Practice, and poor communication
            often prevent them from securing opportunities. Preptalk AI provides
            a safe, supportive, and intelligent environment where users can
            practice, get feedback, and build the confidence they need to
            succeed in the real world scenario.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-bgColor2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-h6 text-subHeadingText max-w-3xl mx-auto">
              To empower Filipino freelancers and micro-entrepreneurs with the
              confidence and communication skills they need to compete and grow
              on the global stage.
            </p>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[600px]">
            <div className="bg-bgColor border border-gray-300 flex items-center justify-center p-8 text-center rounded-lg">
              <div>
                <h3 className="text-h4 font-bold text-headingText mb-4">
                  Build Confidence.
                </h3>
                <p className="text-h6 text-subHeadingText">
                  Turn Shyness Into Strength
                </p>
              </div>
            </div>

            <div className="bg-bgColor border border-gray-300 overflow-hidden rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
                  alt="Mobile apps and devices"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-bgColor border border-gray-300 flex items-center justify-center p-8 text-center rounded-lg">
              <div>
                <h3 className="text-h4 font-bold text-headingText mb-4">
                  Compete Globally.
                </h3>
                <p className="text-h6 text-subHeadingText">
                  Turn Practice Into Power
                </p>
              </div>
            </div>

            <div className="bg-bgColor border border-gray-300 flex items-center justify-center p-8 text-center rounded-lg">
              <div>
                <h3 className="text-h4 font-bold text-headingText mb-4">
                  Unlock Opportunities.
                </h3>
                <p className="text-h6 text-subHeadingText">
                  Turn Skills Into Success
                </p>
              </div>
            </div>

            <div className="bg-bgColor border border-gray-300 overflow-hidden rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                  alt="Business analytics dashboard"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-bgColor border border-gray-300 overflow-hidden rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop"
                  alt="Mobile phone interface"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-bgColor">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-6">Who We Help</h2>
            <p className="text-h6 text-subHeadingText max-w-3xl mx-auto">
              Preptalk AI is built for freelancers and micro-entrepreneurs who
              have the skills, passion, and drive— but struggle to communicate
              that confidently when it matters most. We focus on two core
              groups:
            </p>
          </div>

          <div className="space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h3 className="text-h2 font-bold text-headingText">
                  Freelancers
                </h3>
                <p className="text-h6 text-subHeadingText leading-relaxed">
                  From graphic designers and virtual assistants to web
                  developers and writers—Preptalk AI helps Filipino freelancers
                  practice mock interviews, improve communication skills, and
                  confidently pitch themselves to global clients.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop"
                  alt="Creative freelancer working with art palette"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex justify-center order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?q=80&w=800&auto=format&fit=crop"
                  alt="Natural bamboo texture representing growth"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-h2 font-bold text-headingText">
                  Micro-Entrepreneur
                </h3>
                <p className="text-h6 text-subHeadingText leading-relaxed">
                  For small business owners who need to present their ideas to
                  investors, secure funding, or sell their products more
                  effectively—Preptalk AI provides pitch simulations and
                  communication coaching to help them grow and scale their
                  businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-bgColor2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-6">
              What makes it different
            </h2>
            <p className="text-h6 text-subHeadingText max-w-4xl mx-auto">
              Preptalk AI is built for freelancers and micro-entrepreneurs who
              have the skills, passion, and drive— but struggle to communicate
              that confidently when it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop"
                  alt="AI and technology concept"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-base text-subHeadingText leading-relaxed font-medium">
                  AI-driven feedback and progress tracking
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                  alt="Professional communication and soft skills"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-base text-subHeadingText leading-relaxed font-medium">
                  Focused on soft skills and real-world practice
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
                  alt="Business meeting and collaboration"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-base text-subHeadingText leading-relaxed font-medium">
                  Includes both freelancer and entrepreneurial tracks
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=600&auto=format&fit=crop"
                  alt="Clear communication and presentation"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-base text-subHeadingText leading-relaxed font-medium">
                  Emphasizes clear communication, confidence, and persuasion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Aboutpage;
