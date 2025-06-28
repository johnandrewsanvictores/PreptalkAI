"use client"

import logo from "../../assets/PrepTalkAIlogo.png"

const Nav = () => {

  return (
    <nav className="bg-bgColor2 py-6">
      <div className="grid grid-cols-3 items-center max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-12 w-12" />
          <span className="text-headingText font-nunito font-bold text-3xl">
            PrepTalk <span className="text-primary">AI</span>
          </span>
        </div>
        
        <div className="flex justify-center">
          <div className="flex space-x-10">
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors text-lg font-medium">Home</a>
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors text-lg font-medium">Start Interview</a>
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors text-lg font-medium">About</a>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
