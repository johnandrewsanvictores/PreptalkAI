import React from "react";

export default function FinishInterviewModal({
  isOpen,
  onReviewResponses,
  onGoToDashboard,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
        {/* Modal Content */}
        <div className="text-center">
          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-2 leading-tight">
            Interview Complete
          </h2>

          {/* Subtitle */}
          <h3 className="text-xl font-semibold text-headingText mb-4">
            Thank you for Interviewing!
          </h3>

          {/* Description */}
          <p className="text-subHeadingText text-base mb-8 leading-relaxed">
            That addresses all the questions we have for you today. All of your
            responses have been recorded and can be reviewed in the interview
            history.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Action - Review Responses */}
            <button
              onClick={onReviewResponses}
              className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Review Responses
            </button>

            {/* Secondary Action - Go to Dashboard */}
            <button
              onClick={onGoToDashboard}
              className="w-full bg-white hover:bg-gray-50 text-headingText font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
