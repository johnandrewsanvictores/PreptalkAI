import { redirect, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Nav.jsx";
import Footer from "../components/navigation/Footer.jsx";
import { showConfirmation, showError } from "../utils/alertHelper.js";
import api from "../../axious.js";
import { useAuth } from "../context/AuthContext.jsx";

const DecideTypeofUserPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleFreelancerChoice = async () => {
    const isConfirmed = await showConfirmation({
      title: "Are you sure you want to continue as a Freelancer?",
      text: "This will set up your profile for freelancer scenarios and training.",
      confirmButtonText: "Yes, continue",
      cancelButtonText: "No, go back",
    });

    if (isConfirmed) {
      console.log("Hi");
      const response = await api.put(
        "/auth/updateUser",
        {
          _id: user._id,
          isFirstVisit: false,
          userType: "freelancer",
        }
      );

      if (response.status === 200) {
        setUser({ ...user, isFirstVisit: false, userType: "freelancer" });
        navigate("/dashboard", { state: { fromChoicePage: true } });
      } else {
        showError("Something went wrong!", "Error");
      }
    }
  };

  const handleMicroEntrepreneurChoice = async () => {
    const isConfirmed = await showConfirmation({
      title: "Are you sure you want to continue as a Micro Entrepreneur?",
      text: "This will set up your profile for micro entrepreneur scenarios and training.",
      confirmButtonText: "Yes, continue",
      cancelButtonText: "No, go back",
    });

    if (isConfirmed) {
      console.log("Hi");
      const response = await api.put(
        "/auth/updateUser",
        {
          _id: user._id,
          isFirstVisit: false,
          userType: "entrep",
        }
      );

      if (response.status === 200) {
        setUser({ ...user, isFirstVisit: false, userType: "entrep" });
        navigate("/settings");
      } else {
        showError("Something went wrong!", "Error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">
              What type of user are you?
            </h1>
            <p className="text-gray-600 text-lg">
              Boost your communication skills with scenarios built for your
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Freelancer
              </h2>
              <p className="text-gray-600 mb-8">
                Sharpen your communication skills for client calls, job
                interviews, and project discussions with real-world AI practice.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Key Training Focus:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Responding to client inquiries
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Pitching your services confidently
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Negotiating project scope and timelines
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Building trust in early conversations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Perfect For:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">Web developers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">Designers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Writers & content creators
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Virtual assistants, marketers, etc.
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleFreelancerChoice}
                className="w-full bg-blue-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start as Freelancer
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Micro Entrepreneur
              </h2>
              <p className="text-gray-600 mb-8">
                Practice essential conversations for growing your business —
                from pitching to customers, investors, and partners.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  What You'll Practice:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Presenting your product or service
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Explaining your value clearly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Handling tough customer questions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Pitching to investors or collaborators
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Best for:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">Small business owners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Online sellers & service providers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">
                      Side hustlers and early-stage founders
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleMicroEntrepreneurChoice}
                className="w-full bg-blue-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start as Micro Entrepreneur
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DecideTypeofUserPage;
