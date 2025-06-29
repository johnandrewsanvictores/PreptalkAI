"use client"

import { useState } from 'react'
import {Link, NavLink} from 'react-router-dom';

import logo from "../../assets/PrepTalkAIlogo.png"
import SignInModal from "../modals/SignInModal"
import SignUpModal from "../modals/SignUpModal"
import { useAuth } from "../../context/AuthContext.jsx"
import api from "../../../axious.js";
import {showConfirmation, showSuccess} from "../../utils/alertHelper.js";
import {useNavigate} from "react-router-dom";
import {getNavLinkClass} from "../../utils/utils.js";

const Nav = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navigate = useNavigate();

  const { user, loading, setUser } = useAuth() // Make sure logout is available in AuthContext

  const handleSignInClick = () => {
    setIsSignInModalOpen(true)
    setIsSignUpModalOpen(false)
  }

  const handleCloseModals = () => {
    setIsSignInModalOpen(false)
    setIsSignUpModalOpen(false)
  }

  const handleSwitchToSignUp = () => {
    setIsSignInModalOpen(false)
    setIsSignUpModalOpen(true)
  }

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false)
    setIsSignInModalOpen(true)
  }

  const handleLogout = async () => {
    try {
      const confirmed = await showConfirmation({
        title: "Log out?",
        text: "Are you sure you want to log out?",
        confirmButtonText: "Log Out"
      });

      if(confirmed){
        const res = await api.post("/auth/logout");
        setUser(null);

        // ✅ Show the message from server
        showSuccess(res.data.message);

        // ✅ Redirect
        navigate("/");
      }



      setIsDropdownOpen(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
      <>
        <nav className="bg-bgColor2 py-6 relative z-50">
          <div className="grid grid-cols-3 items-center w-full mx-auto px-8">
            <Link to="/" className="flex items-center space-x-4">
              <img src={logo} alt="logo" className="h-12 w-12" />
              <span className="text-headingText font-nunito font-bold text-3xl">
              PrepTalk <span className="text-primary">AI</span>
            </span>
            </Link>

            <div className="flex justify-center">
              <div className="flex space-x-10">
                {
                  user ? (
                      <>
                        <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                        <NavLink to="/interview_history" className={getNavLinkClass}>Interview History</NavLink>
                        <NavLink to="/analytics" className={getNavLinkClass}>Analytics</NavLink>
                        <NavLink to="/billing" className={getNavLinkClass}>Billing</NavLink>
                        <NavLink to="/settings" className={getNavLinkClass}>Settings</NavLink>
                      </>
                  ) : (
                      <>
                        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                        <NavLink to="/start_interview" className={getNavLinkClass}>Start Interview</NavLink>
                        <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
                      </>
                  )
                }
              </div>
            </div>

            <div className="flex justify-end relative">
              {
                user ? (
                    <div className="relative">
                      <div
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center space-x-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-user text-lg"></i>
                        <p className="text-lg font-medium">{user.firstName}</p>
                        <i className={`fa-solid fa-caret-down transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}></i>
                      </div>

                      {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                      )}
                    </div>
                ) : (
                    <button
                        onClick={handleSignInClick}
                        className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Sign In
                    </button>
                )
              }
            </div>
          </div>
        </nav>

        {/* Sign In Modal */}
        <SignInModal
            isOpen={isSignInModalOpen}
            onClose={handleCloseModals}
            onSwitchToSignUp={handleSwitchToSignUp}
        />

        {/* Sign Up Modal */}
        <SignUpModal
            isOpen={isSignUpModalOpen}
            onClose={handleCloseModals}
            onSwitchToSignIn={handleSwitchToSignIn}
        />
      </>
  )
}

export default Nav
