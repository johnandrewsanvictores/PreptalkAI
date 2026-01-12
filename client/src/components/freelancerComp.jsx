const FreelancerComp = ({
  activeTab,
  setActiveTab,
  isEditing,
  handleEdit,
  handleSave,
  getUserInitials,
  personalInfo,
  handlePersonalChange,
  accountInfo,
  handleAccountChange,
}) => {
  return (
    <>
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
                value={accountInfo?.firstName || ""}
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
                value={accountInfo?.lastName || ""}
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
                value={accountInfo?.userType || "Freelancer"}
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
                value={accountInfo?.username || ""}
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
                value={accountInfo?.email || ""}
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
                  value={accountInfo?.oldPassword || ""}
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
                  value={accountInfo?.newPassword || ""}
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
                  value={accountInfo?.confirmNewPassword || ""}
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
    </>
  );
};

export default FreelancerComp;
