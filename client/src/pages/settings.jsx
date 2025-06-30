import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.jsx";
import { showSuccess } from "../utils/alertHelper.js";

const Settings = () => {
  const location = useLocation();
  const formattedText = location.state?.formattedText;
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

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
    userType: "Freelancer",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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

  const handleSave = () => {
    if (activeTab === "personal") {
      console.log("Personal Info Saved:", personalInfo);
      showSuccess("Personal information saved successfully!", "Success!");
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
      const fullName = personalInfo.fullName || "";
      const names = fullName.trim().split(" ");
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      } else if (names[0] && names[0].length > 0) {
        return names[0][0].toUpperCase();
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
              {activeTab === "personal" && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <i className="fa-solid fa-user text-primary text-h4"></i>
                    <h2 className="text-h5 font-semibold text-headingText">
                      Personal Information
                    </h2>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-h3">
                        {getUserInitials()}
                      </span>
                    </div>
                    <button className="bg-gray-100 text-headingText px-4 py-2 rounded-lg text-h6 hover:bg-gray-200 transition-colors">
                      <i className="fa-solid fa-camera mr-2"></i>
                      Change photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Full Name:
                      </label>
                      <input
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Email Address:
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Location:
                      </label>
                      <input
                        name="location"
                        value={personalInfo.location}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Job Role:
                      </label>
                      <input
                        name="jobRole"
                        value={personalInfo.jobRole}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter job role"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Soft Skills:
                      </label>
                      <textarea
                        name="softSkills"
                        value={personalInfo.softSkills}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-y"
                        placeholder="Enter soft skills (e.g., Communication, Leadership, Problem Solving)"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Hard Skills:
                      </label>
                      <textarea
                        name="hardSkills"
                        value={personalInfo.hardSkills}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-y"
                        placeholder="Enter hard skills (e.g., JavaScript, Python, React, Node.js)"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Education:
                      </label>
                      <textarea
                        name="education"
                        value={personalInfo.education}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                        placeholder="Enter education details"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Certification:
                      </label>
                      <textarea
                        name="certification"
                        value={personalInfo.certification}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                        placeholder="Enter certifications"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Projects:
                      </label>
                      <textarea
                        name="projects"
                        value={personalInfo.projects}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                        placeholder="Enter projects details"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Bio:
                      </label>
                      <textarea
                        name="bio"
                        value={personalInfo.bio}
                        onChange={handlePersonalChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                        placeholder="Enter bio"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <i className="fa-solid fa-gear text-primary text-h4"></i>
                    <h2 className="text-h5 font-semibold text-headingText">
                      Account Information
                    </h2>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-h3">
                        {getUserInitials()}
                      </span>
                    </div>
                    <button className="bg-gray-100 text-headingText px-4 py-2 rounded-lg text-h6 hover:bg-gray-200 transition-colors">
                      <i className="fa-solid fa-camera mr-2"></i>
                      Change photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        First Name:
                      </label>
                      <input
                        name="firstName"
                        value={accountInfo.firstName}
                        onChange={handleAccountChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Last Name:
                      </label>
                      <input
                        name="lastName"
                        value={accountInfo.lastName}
                        onChange={handleAccountChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        User Type:
                      </label>
                      <input
                        name="userType"
                        value={accountInfo.userType}
                        disabled={true}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Username:
                      </label>
                      <input
                        name="username"
                        value={accountInfo.username}
                        onChange={handleAccountChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-h6 font-medium text-headingText mb-2">
                        Email:
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={accountInfo.email}
                        onChange={handleAccountChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <i className="fa-solid fa-lock text-primary text-h5"></i>
                      <h3 className="text-h6 font-semibold text-headingText">
                        Password
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-h6 font-medium text-headingText mb-2">
                          Old Password:
                        </label>
                        <input
                          name="oldPassword"
                          type="password"
                          value={accountInfo.oldPassword}
                          onChange={handleAccountChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Enter old password"
                        />
                      </div>

                      <div>
                        <label className="block text-h6 font-medium text-headingText mb-2">
                          New Password:
                        </label>
                        <input
                          name="newPassword"
                          type="password"
                          value={accountInfo.newPassword}
                          onChange={handleAccountChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-h6 font-medium text-headingText mb-2">
                          Confirm New Password:
                        </label>
                        <input
                          name="confirmNewPassword"
                          type="password"
                          value={accountInfo.confirmNewPassword}
                          onChange={handleAccountChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-bgColor text-headingText focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
