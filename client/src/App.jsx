import {Routes, Route, Outlet, Navigate} from "react-router-dom";

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
import {useAuth} from "./context/AuthContext.jsx";
import Aboutpage from "./pages/Aboutpage.jsx";
import Settings from "./pages/settings.jsx";

function App() {
  const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/" />;
  };




  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route element={<PrivateRoute />}>
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
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
