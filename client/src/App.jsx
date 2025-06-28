import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FreelanceSetupProfilepage from "./pages/FreelanceSetupProfilepage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/freelancer-setup-profile" element={<FreelanceSetupProfilepage />} />
      </Routes>
    </>
  )
}

export default App
