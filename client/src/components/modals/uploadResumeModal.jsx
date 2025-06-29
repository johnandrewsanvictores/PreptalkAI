import { useState, useCallback } from "react";
import logo from "../../assets/PrepTalkAIlogo.png";
import axios from "axios";
import api from "../../../axious.js";
import {useNavigate} from "react-router-dom";

const UploadResumeModal = ({ isOpen, onClose, onSkip, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formattedText, setFormattedText] = useState({});

  const navigate = useNavigate();

  const acceptedFormats = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxFileSize = 5 * 1024 * 1024;

  const resetModal = () => {
    setFile(null);
    setError("");
    setIsLoading(false);
    setDragActive(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSkip = () => {
    resetModal();
    onSkip();
  };

  const validateFile = (file) => {
    if (!file) return "Please select a file";

    if (!acceptedFormats.includes(file.type)) {
      return "Please upload a PDF, DOC, or DOCX file";
    }

    if (file.size > maxFileSize) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  const handleFile = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 1. Upload to backend
      const formData = new FormData();
      formData.append("resume", file);

      const uploadRes = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const rawText = uploadRes.data.text;

      // 2. Prepare prompt for Pollinations
      const prompt = `
This is parsed raw text from a resume PDF using pdfjs-dist. The content is jumbled and lacks structure. 
Please analyze the text, extract and identify relevant resume sections (e.g., Profile, Contact Information, Education, Skills, Experience, Projects, etc.), 
and reorganize it into a clean, categorized, and human-readable format. 
The final output should resemble a properly formatted resume with section headers and logically grouped content.
Send only the extracted text in valid JSON format like {"category":"sentence format"}. The category are fullName (Just a fullname, no extras), email, location, jobRole (Just a job title), softSkills, hardSkills, projects (project or experience), education, certification (certification or awards), and bio (just introduction, description or bio). Leave the category empty string if you didn't find any match on the given information. The value of category should be a sentence only, not array. convert that to sentence.

Here's the raw text:
${rawText}
    `;

      const encodedPrompt = encodeURIComponent(prompt);
      const pollinationsURL = `https://text.pollinations.ai/${encodedPrompt}`;

      // 3. Call Pollinations AI
      const pollRes = await axios.get(pollinationsURL);
      const formatted = pollRes.data;

      // 4. Use formatted result
      setFormattedText({formatted}); // save to state or pass somewhere
      resetModal?.();
      console.log(formattedText);
      navigate("/settings", { state: { formattedText: formatted } });
      // onClose?.();

    } catch (err) {
      console.error("Upload/Format failed:", err);
      setError("Failed to upload and process resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          disabled={isLoading}
        >
          ×
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-headingText font-nunito font-bold text-2xl">
              Preptalk <span className="text-primary">AI</span>
            </span>
          </div>

          <h2 className="text-4xl font-bold text-blue-500 mb-4">
            Upload Your Resume
          </h2>

          <p className="text-gray-600 text-center text-sm leading-relaxed max-w-md">
            Upload your resume so our AI can better understand your background
            and tailor interview questions based on your experience, skills, and
            goals.
          </p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : file
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={(ref) => {
                if (ref) {
                  ref.onclick = () => ref.click();
                }
              }}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInput}
              disabled={isLoading}
            />

            <div className="flex flex-col items-center space-y-4">
              {file ? (
                <div className="text-green-600">
                  <svg
                    className="h-12 w-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              ) : (
                <div className="text-gray-400">
                  <svg
                    className="h-12 w-12 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag and drop or choose a file
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    className="text-blue-500 hover:text-blue-600 underline focus:outline-none"
                    disabled={isLoading}
                  >
                    Choose file
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm text-gray-500">
              Accepted format: PDF
            </p>
            <p className="text-sm text-gray-500">Maximum file size: 5mb</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              Don't have a resume? You can continue by manually setting up your
              profile. Questions will be based on the details you provide.
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
              disabled={isLoading}
            >
              Skip for now
            </button>

            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || isLoading}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {isLoading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResumeModal;
