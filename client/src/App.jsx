import Homepage from "./pages/Homepage.jsx";
import InterviewSettings from "./pages/InterviewSettings.jsx";
import CameraSetup from "./pages/CameraSetup.jsx";
import InterviewHistory from "./pages/InterviewHistory.jsx";
import InterviewSessionDetails from "./pages/InterviewSessionDetails.jsx";
import Analytics from "./pages/Analytics.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/interview-settings" element={<InterviewSettings />} />
      <Route path="/camera-setup" element={<CameraSetup />} />
      <Route path="/interview-history" element={<InterviewHistory />} />
      <Route path="/interview-session-details" element={<InterviewSessionDetails />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  )
}

export default App
