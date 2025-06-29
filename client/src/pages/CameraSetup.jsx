import React, { useEffect, useRef, useState } from 'react';
import PublicLayout from '../layout/PublicLayout.jsx';

export default function CameraSetup() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [devices, setDevices] = useState({ video: [], audio: [] });
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedAudio, setSelectedAudio] = useState('');
  const [stream, setStream] = useState(null);


  useEffect(() => {
    let initialStream;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => {
        setError('');
        setStream(s);
        initialStream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }

        return navigator.mediaDevices.enumerateDevices();
      })
      .then(deviceInfos => {
        const video = deviceInfos.filter(d => d.kind === 'videoinput');
        const audio = deviceInfos.filter(d => d.kind === 'audioinput');
        setDevices({ video, audio });
        if (video.length > 0 && !selectedVideo) setSelectedVideo(video[0].deviceId);
        if (audio.length > 0 && !selectedAudio) setSelectedAudio(audio[0].deviceId);
      })
      .catch(err => {
        setError('Unable to access camera or microphone. Please allow permissions and check your device settings.');
      });
    return () => {
      if (initialStream) {
        initialStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  useEffect(() => {
    if (!selectedVideo && !selectedAudio) return;
    const constraints = {
      video: selectedVideo ? { deviceId: { exact: selectedVideo } } : true,
      audio: selectedAudio ? { deviceId: { exact: selectedAudio } } : true,
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(newStream => {
        setError('');
        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      })
      .catch(err => {
        setError('Unable to access camera or microphone. Please allow permissions and check your device settings.');
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedVideo, selectedAudio]);

  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <main className="flex-1 flex flex-col items-center justify-center py-8 px-2">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-xl mt-8">
        

            <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1 font-medium">Camera</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedVideo}
                  onChange={e => setSelectedVideo(e.target.value)}
                >
                  {devices.video.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${device.deviceId}`}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1 font-medium">Microphone</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedAudio}
                  onChange={e => setSelectedAudio(e.target.value)}
                >
                  {devices.audio.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${device.deviceId}`}</option>
                  ))}
                </select>
              </div>
            </div>


            <div className="w-full flex justify-center mb-8">
              <div className="w-[400px] h-[220px] bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                {error ? (
                  <span className="text-red-500 text-center">{error}</span>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">We use your computer camera to help you prepare.</h2>
            <p className="text-gray-500 text-center mb-6">Recording yourself in person can be one of the best ways to practice an interview.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition-all mb-2">Start Interview</button>
            <p className="text-xs text-gray-400 text-center mt-2">You are the only person who will see this recording.</p>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
} 