import { useNavigate } from 'react-router-dom'
import logo from "../assets/PrepTalkAIlogo.png"

const DecideTypeofUserPage = () => {
  const navigate = useNavigate()

  const handleFreelancerChoice = () => {
    // Navigate to freelancer setup or dashboard
    console.log('User chose Freelancer')
    // navigate('/freelancer-setup')
  }

  const handleMicroEntrepreneurChoice = () => {
    // Navigate to micro entrepreneur setup or dashboard  
    console.log('User chose Micro Entrepreneur')
    // navigate('/micro-entrepreneur-setup')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-8 w-8" />
            <span className="text-headingText font-nunito font-bold text-xl">
              Preptalk <span className="text-primary">AI</span>
            </span>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">Contact</a>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">N</span>
            </div>
            <span className="text-gray-700 font-medium">Nicko V</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">What type of user are you?</h1>
          <p className="text-gray-600 text-lg">Boost your communication skills with scenarios built for your journey</p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Freelancer Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Freelancer</h2>
            <p className="text-gray-600 mb-8">
              Sharpen your communication skills for client calls, job interviews, and project discussions with real-world AI practice.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Training Focus:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Responding to client inquiries</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Pitching your services confidently</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Negotiating project scope and timelines</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Building trust in early conversations</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Perfect For:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Web developers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Designers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Writers & content creators</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Virtual assistants, marketers, etc.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleFreelancerChoice}
              className="w-full bg-blue-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Start as Freelancer
            </button>
          </div>

          {/* Micro Entrepreneur Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Micro Entrepreneur</h2>
            <p className="text-gray-600 mb-8">
              Practice essential conversations for growing your business — from pitching to customers, investors, and partners.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">What You'll Practice:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Presenting your product or service</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Explaining your value clearly</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Handling tough customer questions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Pitching to investors or collaborators</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Best for:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Small business owners</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Online sellers & service providers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">Side hustlers and early-stage founders</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleMicroEntrepreneurChoice}
              className="w-full bg-blue-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Start as Micro Entrepreneur
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="logo" className="h-6 w-6" />
              <span className="text-headingText font-nunito font-bold">
                Preptalk <span className="text-primary">AI</span>
              </span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Start Interview</a>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8 pt-8 border-t text-sm text-gray-500">
            <p>© 2025 Preptalk AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DecideTypeofUserPage
