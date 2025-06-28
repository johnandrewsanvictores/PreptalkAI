import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";
import DecideTypeofUserPage from "./pages/DecideTypeofUserPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
        <Route path="/decide-user-type" element={<DecideTypeofUserPage />} />
      </Routes>
    </>
  )
}

export default App
