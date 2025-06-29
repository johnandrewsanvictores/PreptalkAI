import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";
import EntrepreneurSetupProfilepage from "./pages/EntrepreneurSetupProfilepage.jsx";
import FreelancerProfile from "./pages/FreelancerProfle.jsx";
import EntrepreneurProfile from "./pages/EntrepreneurProfile.jsx";
import PitchPractice from "./pages/PitchPractice.jsx";  

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
        <Route path="/entrepreneur-setup-profile" element={<EntrepreneurSetupProfilepage />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/entrepreneur-profile" element={<EntrepreneurProfile />} />
        <Route path="/pitch-practice" element={<PitchPractice />} />
      </Routes>
    </>
  )
}

export default App
