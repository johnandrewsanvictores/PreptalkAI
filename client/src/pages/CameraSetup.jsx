import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";

export default function CameraSetup() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState({ video: [], audio: [] });
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let initialStream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        setError("");
        setStream(s);
        initialStream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }

        return navigator.mediaDevices.enumerateDevices();
      })
      .then((deviceInfos) => {
        const video = deviceInfos.filter((d) => d.kind === "videoinput");
        const audio = deviceInfos.filter((d) => d.kind === "audioinput");
        setDevices({ video, audio });
        if (video.length > 0 && !selectedVideo)
          setSelectedVideo(video[0].deviceId);
        if (audio.length > 0 && !selectedAudio)
          setSelectedAudio(audio[0].deviceId);
      })
      .catch((err) => {
        setError(
          "Unable to access camera or microphone. Please allow permissions and check your device settings."
        );
      });
    return () => {
      if (initialStream) {
        initialStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedVideo && !selectedAudio) return;
    const constraints = {
      video: selectedVideo ? { deviceId: { exact: selectedVideo } } : true,
      audio: selectedAudio ? { deviceId: { exact: selectedAudio } } : true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((newStream) => {
        setError("");
        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      })
      .catch((err) => {
        setError(
          "Unable to access camera or microphone. Please allow permissions and check your device settings."
        );
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedVideo, selectedAudio]);

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          {/* Device Selection Controls */}
          <div className="w-full max-w-4xl mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-3 font-semibold text-lg">
                    Camera
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedVideo}
                    onChange={(e) => setSelectedVideo(e.target.value)}
                  >
                    {devices.video.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-3 font-semibold text-lg">
                    Microphone
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedAudio}
                    onChange={(e) => setSelectedAudio(e.target.value)}
                  >
                    {devices.audio.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${device.deviceId}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
              {/* Video Preview */}
              <div className="w-full max-w-2xl mb-8">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                  {error ? (
                    <div className="text-center p-8">
                      <div className="text-red-500 text-lg mb-2">📷</div>
                      <span className="text-red-500 text-center block max-w-md">
                        {error}
                      </span>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </div>

              {/* Content Text */}
              <div className="text-center mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  We use your computer camera to help you prepare.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Recording yourself is proven to be one of the best ways to
                  practice an interview
                </p>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Start Interview
                </button>
                <p className="text-sm text-gray-500 mt-4 max-w-md">
                  Your recording are always private and will only be seen by
                  you.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
