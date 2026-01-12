import React, { useState } from "react";
import PublicLayout from "../layout/PublicLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const pricingPlans = [
  {
    name: "Starter Pack",
    price: "₱100",
    credits: 10,
    pricePerCredit: "₱20 per credit",
    features: [
      "10 Interview session",
      "Basic Performance Analytics",
      "Standard Question Bank",
    ],
    isPopular: false,
  },
  {
    name: "Professional Pack",
    price: "₱500",
    credits: 60,
    pricePerCredit: "₱20 per credit",
    features: [
      "10 Interview session",
      "Basic Performance Analytics",
      "Standard Question Bank",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise Pack",
    price: "₱1000",
    credits: 150,
    pricePerCredit: "₱20 per credit",
    features: [
      "10 Interview session",
      "Basic Performance Analytics",
      "Standard Question Bank",
    ],
    isPopular: false,
  },
];

const transactionHistory = [
  {
    title: "Starter Pack - 10 Credits",
    date: "2025-06-29",
    amount: "₱100",
    status: "Completed",
  },
  {
    title: "Professional Pack - 60 Credits",
    date: "2025-06-29",
    amount: "₱500",
    status: "Completed",
  },
  {
    title: "Starter Pack - 10 Credits",
    date: "2025-06-29",
    amount: "₱100",
    status: "Completed",
  },
  {
    title: "Professional Pack - 60 Credits",
    date: "2025-06-29",
    amount: "₱500",
    status: "Completed",
  },
];

const Billing = () => {
  const [activeTab, setActiveTab] = useState("purchase");
  const { user } = useAuth();
  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col bg-bgColor">
        <main className="flex-1 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-6xl">
            <div className="mb-8">
              <h1 className="text-h2 font-bold text-primary mb-3">
                Billing & Credits
              </h1>
              <p className="text-h6 text-subHeadingText">
                Manage your credits and purchase additional interview sessions
              </p>
            </div>

            {/* if user is freelancer or micro-entrepreneur */}
            {user &&
              (user.userType === "freelancer" ||
                user.userType === "entrep") && (
                <div className="bg-bgColor2 rounded-xl p-8 mb-8">
                  <h2 className="text-h5 font-semibold text-headingText mb-4">
                    Current Balance
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-h2 font-bold text-primary">
                      120 Credits
                    </span>
                    <span className="text-h6 text-subHeadingText">
                      Enough for 120 interview session
                    </span>
                  </div>
                </div>
              )}

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setActiveTab("purchase")}
                className={`px-8 py-4 rounded-lg text-h6 font-medium transition-all ${
                  activeTab === "purchase"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-bgColor2 text-subHeadingText hover:bg-gray-100"
                }`}
              >
                Purchase Credits
              </button>
              {user && (
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-8 py-4 rounded-lg text-h6 font-medium transition-all ${
                    activeTab === "history"
                      ? "bg-primary text-white shadow-lg"
                      : "bg-bgColor2 text-subHeadingText hover:bg-gray-100"
                  }`}
                >
                  Transaction History
                </button>
              )}
            </div>

            {activeTab === "purchase" && (
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-bgColor2 rounded-xl p-8 relative ${
                      plan.isPopular
                        ? "border-2 border-primary ring-2 ring-primary ring-opacity-20"
                        : "border border-gray-200"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white px-4 py-2 rounded-full text-small font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-h5 font-bold text-headingText mb-2">
                        {plan.name}
                      </h3>
                      <div className="text-h2 font-bold text-headingText mb-1">
                        {plan.price}
                      </div>
                      <div className="text-h6 text-primary font-semibold mb-1">
                        {plan.credits} credits
                      </div>
                      <div className="text-small text-subHeadingText">
                        {plan.pricePerCredit}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-h6 text-subHeadingText">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`w-full py-4 rounded-lg text-h6 font-semibold transition-all ${
                        plan.isPopular
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-100 text-headingText hover:bg-gray-200"
                      }`}
                    >
                      {plan.isPopular && (
                        <i className="fa-solid fa-credit-card mr-2"></i>
                      )}
                      Purchase now
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-bgColor2 rounded-xl p-8">
                <h2 className="text-h5 font-semibold text-headingText mb-8">
                  Transaction History
                </h2>
                <div className="space-y-4">
                  {transactionHistory.map((transaction, index) => (
                    <div
                      key={index}
                      className="bg-bgColor rounded-xl p-6 flex items-center justify-between border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="text-h6 font-semibold text-headingText mb-1">
                          {transaction.title}
                        </h3>
                        <p className="text-small text-subHeadingText">
                          {transaction.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-h6 font-bold text-headingText">
                          {transaction.amount}
                        </span>
                        <span className="bg-green bg-opacity-20 text-green px-4 py-2 rounded-full text-small font-medium">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </PublicLayout>
  );
};

export default Billing;
