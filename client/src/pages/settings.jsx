import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.jsx";
import { showSuccess } from "../utils/alertHelper.js";
import { useAuth } from "../context/AuthContext.jsx";
import FreelancerComp from "../components/freelancerComp.jsx";
import MicroComp from "../components/microComp.jsx";

const Settings = () => {
  const location = useLocation();
  const formattedText = location.state?.formattedText;
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    location: "",
    jobRole: "",
    softSkills: "",
    hardSkills: "",
    education: "",
    projects: "",
    certification: "",
    bio: "",
  });

  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    userType: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessType: "",
    industry: "",
    businessLocation: "",
    yearsInBusiness: "",
    employees: "",
    businessDescription: "",
    businessGoals: "",
  });

  useEffect(() => {
    if (formattedText) {
      setPersonalInfo((prev) => ({
        ...prev,
        fullName: formattedText.fullName || "",
        email: formattedText.email || "",
        location: formattedText.location || "",
        jobRole: formattedText.jobRole || "",
        softSkills: formattedText.softSkills || "",
        hardSkills: formattedText.hardSkills || "",
        education: formattedText.education || "",
        projects: formattedText.projects || "",
        certification: formattedText.certification || "",
        bio: formattedText.bio || "",
      }));
    }
  }, [formattedText]);

  useEffect(() => {
    if (user) {
      setAccountInfo((prev) => ({
        ...prev,
        userType:
          user.userType === "freelancer" ? "Freelancer" : "Micro-Entrepreneur",
      }));
    }
  }, [user]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (activeTab === "personal") {
      if (user.userType === "freelancer") {
        console.log("Personal Info Saved:", personalInfo);
        showSuccess("Personal information saved successfully!", "Success!");
      } else {
        console.log("Business Info Saved:", businessInfo);
        showSuccess("Business information saved successfully!", "Success!");
      }
    } else {
      console.log("Account Info Saved:", accountInfo);
      showSuccess("Account information saved successfully!", "Success!");
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const getUserInitials = () => {
    if (activeTab === "personal") {
      if (user.userType === "freelancer") {
        const fullName = personalInfo.fullName || "";
        const names = fullName.trim().split(" ");
        if (names.length >= 2) {
          return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        } else if (names[0] && names[0].length > 0) {
          return names[0][0].toUpperCase();
        }
      } else {
        const businessName = businessInfo.businessName || "";
        const names = businessName.trim().split(" ");
        if (names.length >= 2) {
          return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        } else if (names[0] && names[0].length > 0) {
          return names[0][0].toUpperCase();
        }
      }
    } else {
      const firstName = accountInfo.firstName || "";
      const lastName = accountInfo.lastName || "";
      if (firstName && lastName) {
        return (firstName[0] + lastName[0]).toUpperCase();
      } else if (firstName) {
        return firstName[0].toUpperCase();
      } else if (lastName) {
        return lastName[0].toUpperCase();
      }
    }
    return "U";
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-4xl">
            <div className="mb-8">
              <h1 className="text-h2 font-bold text-primary mb-3">Settings</h1>
              <p className="text-h6 text-subHeadingText">
                Manage your account settings and interview preferences
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              {user.userType === "freelancer" ? (
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-8 py-4 rounded-lg text-h6 font-medium transition-all ${
                    activeTab === "personal"
                      ? "bg-primary text-white shadow-lg"
                      : "bg-bgColor2 text-subHeadingText hover:bg-gray-100"
                  }`}
                >
                  Personal Information
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-8 py-4 rounded-lg text-h6 font-medium transition-all ${
                    activeTab === "personal"
                      ? "bg-primary text-white shadow-lg"
                      : "bg-bgColor2 text-subHeadingText hover:bg-gray-100"
                  }`}
                >
                  Business Information
                </button>
              )}
              <button
                onClick={() => setActiveTab("account")}
                className={`px-8 py-4 rounded-lg text-h6 font-medium transition-all ${
                  activeTab === "account"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-bgColor2 text-subHeadingText hover:bg-gray-100"
                }`}
              >
                Account Information
              </button>
            </div>

            <div className="bg-bgColor2 rounded-xl p-8">
              {user.userType === "freelancer" && (
                <FreelancerComp
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isEditing={isEditing}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  getUserInitials={getUserInitials}
                  personalInfo={personalInfo}
                  handlePersonalChange={handlePersonalChange}
                  accountInfo={accountInfo}
                  handleAccountChange={handleAccountChange}
                />
              )}
              {user.userType === "entrep" && (
                <MicroComp
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isEditing={isEditing}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  getUserInitials={getUserInitials}
                  accountInfo={accountInfo}
                  handleAccountChange={handleAccountChange}
                  businessInfo={businessInfo}
                  handleBusinessChange={handleBusinessChange}
                />
              )}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleEdit}
                  disabled={isEditing}
                  className={`px-8 py-3 rounded-lg text-h6 font-medium transition-colors ${
                    isEditing
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isEditing}
                  className={`px-8 py-3 rounded-lg text-h6 font-medium transition-colors ${
                    !isEditing
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-300 text-headingText hover:bg-gray-400"
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
};

export default Settings;
