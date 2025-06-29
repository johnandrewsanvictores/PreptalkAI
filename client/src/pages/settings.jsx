import React, { useState } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "Onick",
    lastName: "Kobayashi",
    email: "onick@example.com",
    location: "",
    jobRole: "",
    softSkills: "",
    hardSkills: "",
    education: "",
    certification: "",
    bio: "",
    username: "",
    userType: "Student",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving:", formData);
  };

  const handleEdit = () => {
    console.log("Edit mode enabled");
  };

  const getUserInitials = () => {
    const firstName = formData.firstName || "";
    const lastName = formData.lastName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || "U";
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-bgColor py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-h2 font-bold text-headingText mb-2">
              Settings
            </h1>
            <p className="text-h6 text-subHeadingText">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex mb-8">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors text-h6 ${
                activeTab === "personal"
                  ? "bg-primary bg-opacity-[.13] text-primary border-b-2 border-primary"
                  : "bg-bgColor2 text-subHeadingText hover:text-headingText"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ml-2 text-h6 ${
                activeTab === "account"
                  ? "bg-primary bg-opacity-[.13] text-primary border-b-2 border-primary"
                  : "bg-bgColor2 text-subHeadingText hover:text-headingText"
              }`}
            >
              Account Information
            </button>
          </div>

          <div className="bg-bgColor2 rounded-xl shadow-lg">
            {activeTab === "personal" && (
              <div className="p-8">
                <div className="flex items-center mb-8 pb-6 border-b border-gray-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-h4">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-h5 font-semibold text-headingText mr-2">
                          Personal Information
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 text-small font-medium flex items-center mt-1">
                        <i className="fa-solid fa-camera mr-2"></i>
                        Change photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        First Name:
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Email:
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Location:
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-p font-medium text-headingText mb-2">
                      Job Role:
                    </label>
                    <input
                      type="text"
                      value={formData.jobRole}
                      onChange={(e) =>
                        handleInputChange("jobRole", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Soft Skills:
                      </label>
                      <textarea
                        value={formData.softSkills}
                        onChange={(e) =>
                          handleInputChange("softSkills", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Hard Skills:
                      </label>
                      <textarea
                        value={formData.hardSkills}
                        onChange={(e) =>
                          handleInputChange("hardSkills", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-p font-medium text-headingText mb-2">
                      Education:
                    </label>
                    <textarea
                      value={formData.education}
                      onChange={(e) =>
                        handleInputChange("education", e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-p font-medium text-headingText mb-2">
                      Certification:
                    </label>
                    <textarea
                      value={formData.certification}
                      onChange={(e) =>
                        handleInputChange("certification", e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-p font-medium text-headingText mb-2">
                      Bio:
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-300">
                  <button
                    onClick={handleEdit}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-h6"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-bgColor hover:bg-gray-200 text-subHeadingText px-8 py-3 rounded-lg font-semibold transition-colors text-h6 border border-gray-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="p-8">
                <div className="flex items-center mb-8 pb-6 border-b border-gray-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-h4">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-h5 font-semibold text-headingText mr-2">
                          Account Information
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 text-small font-medium flex items-center mt-1">
                        <i className="fa-solid fa-camera mr-2"></i>
                        Change photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        First Name:
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        User Type:
                      </label>
                      <input
                        type="text"
                        value={formData.userType}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-subHeadingText cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-p font-medium text-headingText mb-2">
                        Username:
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-p font-medium text-headingText mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-300">
                    <div className="flex items-center mb-6">
                      <i className="fa-solid fa-lock text-h6 text-subHeadingText mr-2"></i>
                      <span className="text-h5 font-semibold text-headingText">
                        Password
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-p font-medium text-headingText mb-2">
                            Old Password:
                          </label>
                          <input
                            type="password"
                            value={formData.oldPassword}
                            onChange={(e) =>
                              handleInputChange("oldPassword", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                          />
                        </div>
                        <div>
                          <label className="block text-p font-medium text-headingText mb-2">
                            New Password:
                          </label>
                          <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) =>
                              handleInputChange("newPassword", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-p font-medium text-headingText mb-2">
                          Confirm New Password:
                        </label>
                        <input
                          type="password"
                          value={formData.confirmNewPassword}
                          onChange={(e) =>
                            handleInputChange(
                              "confirmNewPassword",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-headingText"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-300">
                  <button
                    onClick={handleEdit}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-h6"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-bgColor hover:bg-gray-200 text-subHeadingText px-8 py-3 rounded-lg font-semibold transition-colors text-h6 border border-gray-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
