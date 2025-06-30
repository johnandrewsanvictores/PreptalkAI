import { useState, useRef } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";
import api from "../../axious.js";
import axios from "axios";

const FreelanceSetupProfilepage = () => {
  const [resumeText, setResumeText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const sendToPollinations = async (rawText) => {
    const prompt = `
This is parsed raw text from a resume PDF using pdfjs-dist. The content is jumbled and lacks structure. 
Please analyze the text, extract and identify relevant resume sections (e.g., Profile, Contact Information, Education, Skills, Experience, Projects, etc.), 
and reorganize it into a clean, categorized, and human-readable format. The final output should resemble a properly formatted resume with section headers and logically grouped content. Send only the extracted text, no more questions or feedback. Make sure it is in sentence or paragraph format. make sure it is in json format like {"category":"data in sentence form with new line if any"}.

Here's the raw text:
${rawText}
        `;
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://text.pollinations.ai/${encodedPrompt}`;

    try {
      const response = await axios.get(url);
      console.log("✅ Formatted Resume:", response.data);
      setFormattedText(response.data);
    } catch (error) {
      console.error("❌ Error contacting Pollinations AI:", error);
      alert("Failed to format resume text.");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const response = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const rawText = response.data.text;
      setResumeText(rawText); // show raw jumbled text
      await sendToPollinations(rawText); // send to AI
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Resume upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-h1 font-bold text-primary">
          Setting Up your Profile
        </h1>
        <p className="text-subHeadingText">
          Tell us about yourself so we can tailor your AI practice sessions
        </p>

        {/* Resume Upload Section */}
        <div className="resumeButtonContainer mt-10 flex flex-col justify-center items-center">
          <p className="text-subHeadingText font-bold">Do you have a resume?</p>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            className="bg-[#4F5D75] text-white p-4 px-10 text-h5 rounded-3xl mt-3"
            onClick={triggerFileInput}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
            <i className="pl-2 fa-solid fa-arrow-up-from-bracket"></i>
          </button>

          {/* Raw parsed resume text */}
          {resumeText && (
            <div className="bg-gray-100 mt-6 p-4 rounded-md max-w-xl text-left whitespace-pre-wrap text-sm">
              <strong>🔹 Parsed Resume Text:</strong>
              <p className="mt-2">{resumeText}</p>
            </div>
          )}

          {/* Formatted text from Pollinations */}
          {formattedText && (
            <div className="bg-green-100 mt-6 p-4 rounded-md max-w-xl text-left whitespace-pre-wrap text-sm">
              <strong>✅ AI-Formatted Resume:</strong>
              <p className="mt-2">{formattedText}</p>
            </div>
          )}
        </div>

        <hr className="w-[60%] mt-12 mb-12 border-black" />

        <p className="text-subHeadingText font-bold">Don't have a resume?</p>
        <p className="text-subHeadingText">Add Information manually</p>

        {/* Manual Info Form */}
        <form className="w-9/12 flex flex-col items-center" action="">
          <div className="w-full formContainer grid grid-cols-2 gap-14">
            <div className="nameContainer">
              <label htmlFor="userName">Name: *</label>
              <br />
              <input
                type="text"
                name="userName"
                id="userName"
                className="userName bg-bgColor2 rounded-md w-full h-14"
              />
            </div>

            <div className="surnameContainer">
              <label htmlFor="userSurname">Surname: *</label>
              <br />
              <input
                type="text"
                name="userSurname"
                id="userSurname"
                className="userSurname bg-bgColor2 rounded-md w-full h-14"
              />
            </div>

            <div className="jobPositionContainer">
              <label htmlFor="userJobPosition">Job Position: *</label>
              <br />
              <input
                type="text"
                name="userJobPosition"
                id="userJobPosition"
                className="userJobPosition w-full bg-bgColor2 rounded-md h-14"
              />
            </div>
          </div>
          <input
            className=" bg-primary w-1/4 mt-10 mb-10 p-4 rounded-3xl text-white"
            type="submit"
            value="Save Profile"
          />
        </form>
      </div>
    </PublicLayout>
  );
};

export default FreelanceSetupProfilepage;
