import logo from "../../assets/PrepTalkAIlogo.png"
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="bg-bgColor2 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="logo" className="w-12 h-12" />
              <h2 className="text-2xl font-bold text-headingText"><span className="text-headingText">Preptalk</span> <span className="text-primary">AI</span></h2>
            </div>
            <div> 
              <p className="text-subHeadingText mb-6">
                Empowering you with AI-driven interview preparation to boost your confidence and land your dream job.
              </p>
            </div>
            <div className="flex items-center gap-10">
            <a href="#" className="text-subHeadingText border-r border-gray-900 pr-4 hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-subHeadingText border-r border-gray-900 pr-4 hover:text-primary transition-colors">Start Interview</a>
              <a href="#" className="text-subHeadingText border-r border-gray-900 pr-4 hover:text-primary transition-colors">About</a>
            </div>
            <div className="flex items-center gap-10 mt-4">
              <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-subHeadingText hover:text-primary transition-colors">
                <FaFacebook size={30} />
              </a>
              <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-subHeadingText hover:text-primary transition-colors">
                <FaLinkedin size={30} />
              </a>
              <a href="https://x.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-subHeadingText hover:text-primary transition-colors">
                <FaTwitter size={30} />
              </a>
            </div>
          </div>

          <div className="bg-bgColor p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-headingText mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-subHeadingText mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-bgColor2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-headingText placeholder-gray-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-headingText mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-bgColor2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-headingText placeholder-gray-400"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-subHeadingText mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-bgColor2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-headingText placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-subHeadingText mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-bgColor2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical text-headingText placeholder-gray-400"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-subHeadingText text-sm">
              © 2025 <span className="text-primary">Preptalk</span> AI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-subHeadingText hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-subHeadingText hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-subHeadingText hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
