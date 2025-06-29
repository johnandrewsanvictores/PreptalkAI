import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.jsx";
import {showSuccess} from "../utils/alertHelper.js";

const Settings = () => {
  const location = useLocation();
  const formattedText = location.state?.formattedText;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    jobRole: "",
    softSkills: "",
    hardSkills: "",
    education: "",
    certification: "",
    bio: "",
    projects: "",
  });

  useEffect(() => {
    if (formattedText) {
      setFormData((prev) => ({
        ...prev,
        fullName: formattedText.fullName || "",
        email: formattedText.email || "",
        location: formattedText.location || "",
        jobRole: formattedText.jobRole || "",
        softSkills: formattedText.softSkills || "",
        hardSkills: formattedText.hardSkills || "",
        education: formattedText.education || "",
        certification: formattedText.certification || "",
        bio: formattedText.bio || "",
        projects: formattedText.projects || "",
      }));
    }
  }, [formattedText]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    showSuccess("Profile information saved successfully!", "Success!");
  };

  return (
      <PublicLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block font-medium">Full Name</label>
              <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  type="email"
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Job Role</label>
              <input
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Soft Skills</label>
              <textarea
                  name="softSkills"
                  value={formData.softSkills}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Hard Skills</label>
              <textarea
                  name="hardSkills"
                  value={formData.hardSkills}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Education</label>
              <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Certifications/Awards</label>
              <textarea
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Projects/Experience</label>
              <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium">Bio</label>
              <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>

            <button
                type="submit"
                className="col-span-2 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Save Profile
            </button>
          </form>
        </div>
      </PublicLayout>
  );
};

export default Settings;
