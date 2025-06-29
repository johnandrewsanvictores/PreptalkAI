import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";
import EntrepreneurSetupProfilepage from "./pages/EntrepreneurSetupProfilepage.jsx";
import FreelancerProfile from "./pages/FreelancerProfle.jsx";
import EntrepreneurProfile from "./pages/EntrepreneurProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";  
import DecideTypeofUserPage from "./pages/DecideTypeofUserPage.jsx";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import InterviewSettings from "./pages/InterviewSettings.jsx";
import CameraSetup from "./pages/CameraSetup.jsx";
import InterviewHistory from "./pages/InterviewHistory.jsx";
import InterviewSessionDetails from "./pages/InterviewSessionDetails.jsx";
import Analytics from "./pages/Analytics.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
        <Route path="/entrepreneur-setup-profile" element={<EntrepreneurSetupProfilepage />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/entrepreneur-profile" element={<EntrepreneurProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/decide-user-type" element={<DecideTypeofUserPage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/interview-settings" element={<InterviewSettings />} />
        <Route path="/camera-setup" element={<CameraSetup />} />
        <Route path="/interview-history" element={<InterviewHistory />} />
        <Route path="/interview-session-details" element={<InterviewSessionDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  )
}

export default App
