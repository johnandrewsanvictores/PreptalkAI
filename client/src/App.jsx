import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";
import EntrepreneurSetupProfilepage from "./pages/EntrepreneurSetupProfilepage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
        <Route path="/entrepreneur-setup-profile" element={<EntrepreneurSetupProfilepage />} />
      </Routes>
    </>
  )
}

export default App
