"use client"

import logo from "../../assets/PrepTalkAIlogo.png"

const Nav = () => {

  return (
    <nav className="bg-bgColor2 p-4">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-10 w-10" />
          <span className="text-headingText font-nunito font-bold text-2xl">
            PrepTalk <span className="text-primary">AI</span>
          </span>
        </div>
        
        <div className="flex justify-center">
          <div className="flex space-x-8">
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors">Home</a>
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors">Start Interview</a>
            <a href="#" className="text-subHeadingText hover:text-headingText transition-colors">About</a>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
