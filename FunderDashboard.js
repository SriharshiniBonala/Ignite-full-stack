import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FunderDashboard = () => {
  const navigate = useNavigate();
  const funder = JSON.parse(localStorage.getItem("funder"));

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  if (!funder) return <p className="text-center mt-10">Please login</p>;

  const handleLogoff = () => {
    localStorage.removeItem("funder");
    window.dispatchEvent(new Event("storage"));
    navigate("/funder-login");
  };

  // 🔔 Mock Notifications (replace with API later)
  const notifications = [
    "New project request received",
    "AI Startup project funded successfully",
    "3 students applied for funding",
  ];

  // 📂 Mock Funded Projects (replace with API)
  const fundedProjects = [
    {
      id: 1,
      name: "AI Resume Analyzer",
      domain: "AI/ML",
      status: "Active",
      amount: 5000,
    },
    {
      id: 2,
      name: "Blockchain Voting System",
      domain: "Blockchain",
      status: "Completed",
      amount: 8000,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden">

      {/* 🌫️ Background */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-400 opacity-20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* 🔵 Sidebar */}
      <div className="w-64 backdrop-blur-xl bg-blue-900/80 text-white p-6 shadow-2xl z-10">

        <h2 className="text-2xl font-bold mb-10">💼 Funder Panel</h2>

        <div className="flex flex-col items-center mb-10">
          <img
            src={`https://ui-avatars.com/api/?name=${funder.name}`}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <h3 className="mt-3">{funder.name}</h3>
          <p className="text-sm text-blue-200">{funder.organization}</p>
        </div>

        <div className="space-y-3">
          <div onClick={() => setActiveTab("dashboard")} className="nav-item">📊 Dashboard</div>
          <div onClick={() => setActiveTab("projects")} className="nav-item">📂 Funded Projects</div>
        </div>

        <button
          onClick={handleLogoff}
          className="mt-10 w-full bg-red-500 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* 🔷 Main Content */}
      <div className="flex-1 p-8 z-10">

        {/* 🔔 Top Bar */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {funder.name}
          </h1>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-2xl"
            >
              🔔
            </button>

            {/* Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
              {notifications.length}
            </span>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                <h3 className="font-bold mb-2">Notifications</h3>
                {notifications.map((note, i) => (
                  <p key={i} className="text-sm text-gray-600 mb-1">
                    • {note}
                  </p>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

              <div className="glass-card">
                <p>Total Funding</p>
                <h2 className="text-xl font-bold">${funder.fundingAmount}</h2>
              </div>

              <div className="glass-card">
                <p>Projects Funded</p>
                <h2 className="text-xl font-bold">12</h2>
              </div>

              <div className="glass-card">
                <p>Active Deals</p>
                <h2 className="text-xl font-bold">5</h2>
              </div>

              <div className="glass-card">
                <p>Domain</p>
                <h2 className="text-lg">{funder.domain}</h2>
              </div>

            </div>

            <div className="glass-card">
              <h2 className="font-bold mb-2">Funding Usage</h2>
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-blue-600 h-3 rounded-full w-[60%]"></div>
              </div>
            </div>
          </>
        )}

        {/* ================= PROJECTS ================= */}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">📂 Funded Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {fundedProjects.map((proj) => (
                <div key={proj.id} className="glass-card">

                  <h3 className="text-lg font-bold">{proj.name}</h3>
                  <p className="text-sm text-blue-600">{proj.domain}</p>

                  <div className="flex justify-between mt-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      proj.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {proj.status}
                    </span>

                    <span className="font-semibold text-purple-600">
                      ${proj.amount}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Styles */}
      <style>
        {`
          .glass-card {
            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: 0.3s;
          }

          .glass-card:hover {
            transform: translateY(-5px);
          }

          .nav-item {
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: 0.2s;
          }

          .nav-item:hover {
            background: rgba(255,255,255,0.2);
          }
        `}
      </style>

    </div>
  );
};

export default FunderDashboard;