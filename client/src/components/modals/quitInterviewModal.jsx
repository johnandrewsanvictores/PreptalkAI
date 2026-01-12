import React from "react";

export default function QuitInterviewModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
        {/* Modal Content */}
        <div className="text-center">
          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-4 leading-tight">
            Leave Interview and save progress?
          </h2>

          {/* Subtitle */}
          <p className="text-subHeadingText text-base mb-8 leading-relaxed">
            You can always comeback to this interview or choose to delete it
            later
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Action - Leave Interview */}
            <button
              onClick={onConfirm}
              className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Yes, leave interview
            </button>

            {/* Secondary Action - Return to Interview */}
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-gray-50 text-headingText font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              No, return to interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
