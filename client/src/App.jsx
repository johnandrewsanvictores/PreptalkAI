import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";
import DecideTypeofUserPage from "./pages/DecideTypeofUserPage.jsx";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import InterviewSettings from "./pages/InterviewSettings.jsx";
import CameraSetup from "./pages/CameraSetup.jsx";
import InterviewHistory from "./pages/InterviewHistory.jsx";
import InterviewSessionDetails from "./pages/InterviewSessionDetails.jsx";
import Analytics from "./pages/Analytics.jsx";
import Aboutpage from "./pages/Aboutpage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
        <Route path="/decide-user-type" element={<DecideTypeofUserPage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/interview-settings" element={<InterviewSettings />} />
        <Route path="/camera-setup" element={<CameraSetup />} />
        <Route path="/interview-history" element={<InterviewHistory />} />
        <Route path="/interview-session-details" element={<InterviewSessionDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </>
  )
}

export default App
