import React from "react";

const FullPageLoader = ({
  message = "Connecting...",
  subMessage = "Please wait while we set up your interview",
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 border-4 border-gray-600 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Inner Ring */}
          <div className="absolute inset-2 w-16 h-16 border-4 border-gray-700 rounded-full animate-spin animation-delay-1000">
            <div className="absolute top-0 left-0 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white">{message}</h2>
          <p className="text-gray-300 text-lg">{subMessage}</p>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="text-center space-y-1 max-w-md">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Initializing AI Avatar</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span>Preparing Interview Questions</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Setting up Video Connection</span>
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-500 text-sm">PrepTalk AI Interview System</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
