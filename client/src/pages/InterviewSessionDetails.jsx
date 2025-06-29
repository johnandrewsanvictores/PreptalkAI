import React from 'react';
import PublicLayout from '../layout/PublicLayout.jsx';

export default function InterviewSessionDetails() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <main className="flex-1 flex flex-col items-center py-8 px-2">
          <div className="w-full max-w-6xl">


            <div className="bg-white shadow p-4 rounded-t-lg border-b border-gray-200 flex flex-col gap-2 mb-6">
              <span className="text-xs text-blue-600 cursor-pointer">&lt; Back to History</span>
              <h1 className="text-2xl font-semibold">Interview Session Details</h1>
              <p className="text-gray-500 text-sm">Review your performance and feedback</p>
            </div>


            <div className="flex flex-col lg:flex-row gap-6">
             
              <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3 flex flex-col gap-4 self-stretch">
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[455px] pr-2 flex-1">
                  {[1,2,3,4,5,6,7].map((q) => (
                    <div key={q} className="flex justify-between items-center py-1 border-b last:border-b-0">
                      <span className="font-medium text-gray-700">Question {q}:</span>
                      <button className="text-blue-600 text-sm hover:underline">Show</button>
                    </div>
                  ))}
                </div>
                <div className="mt-auto border-t pt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Interview Type:</span>
                    <span className="font-semibold text-gray-700">Technical Interview</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Overall Score:</span>
                    <span className="text-green-600 font-bold">88%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Duration:</span>
                    <span className="text-gray-700">45min</span>
                  </div>
                </div>
              </div>

              
              <div className="flex-1 flex flex-col gap-6 self-stretch">
                <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 h-full">
                  <div className="font-semibold text-lg">Question 1:</div>
                  <div className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Egestas et nibh velit quis nibh euismod.</div>
                  <div className="flex justify-center my-4">
                    <video
                      src="/video/interview_sample.mp4"
                      controls
                      className="rounded-lg w-full max-w-2xl h-96 object-cover bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Comment for your response on this</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      rows={2}
                      placeholder="Leave your comment here..."
                      disabled
                    >Lorem ipsum dolor sit amet consectetur. Egestas et nibh velit quis nibh euismod.</textarea>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="bg-white rounded-lg shadow p-6 mt-6 w-full">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-lg font-semibold mb-4">Detailed Feedback</h2>
                <div className="pl-4 md:pl-6">
                  <div className="mb-5">
                    <h3 className="text-green-600 font-bold">Strengths</h3>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur. Mauris id velit vitae ultricies erat tempor bibendum porttitor tincidunt.</li>
                      <li>Lorem ipsum dolor sit amet consectetur. Mauris id velit vitae ultricies erat tempor bibendum porttitor tincidunt.</li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-red-500 font-bold">Areas for Improvement</h3>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur. Mauris id velit vitae ultricies erat tempor bibendum porttitor tincidunt.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-blue-600 font-bold">Recommendations</h3>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      <li>Lorem ipsum dolor sit amet consectetur. Mauris id velit vitae ultricies erat tempor bibendum porttitor tincidunt.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
} 