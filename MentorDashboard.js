import React, { useEffect, useState } from "react";
import {
  getMentorRequests,
  acceptRequest,
  rejectRequest
} from "../../api/requestApi";
import {
  getRatings,
  getAverageRating
} from "../../api/ratingApi";
import { toast } from "react-toastify";

const MentorDashboard = () => {
  const mentor = JSON.parse(localStorage.getItem("mentor"));

  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (!mentor) return;
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const reqRes = await getMentorRequests(mentor.id);
      const ratingRes = await getRatings(mentor.id);
      const avgRes = await getAverageRating(mentor.id);

      setRequests(reqRes.data);
      setRatings(ratingRes.data);
      setAvgRating(avgRes.data || 0);
    } catch {
      toast.error("Error loading dashboard");
    }
  };

  const handleAccept = async (id) => {
    await acceptRequest(id);
    toast.success("Accepted");
    loadData();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    toast.warn("Rejected");
    loadData();
  };

  if (!mentor) return <p className="text-center mt-10">Login first</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex">

      {/* 🔷 SIDEBAR */}
      <div className="w-64 m-4 rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl border border-white/30 p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-8">
            🚀 IGNITE
          </h2>

          <div className="bg-white/40 p-4 rounded-xl mb-6">
            <p className="font-bold text-gray-800">{mentor.name}</p>
            <p className="text-sm text-gray-600">{mentor.expertise}</p>
          </div>

          <nav className="space-y-2">
            {["requests", "ratings", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-white/30 text-gray-700"
                }`}
              >
                {tab === "requests" && "📩 Requests"}
                {tab === "ratings" && "⭐ Ratings"}
                {tab === "history" && "📊 History"}
              </button>
            ))}
          </nav>
        </div>

        <p className="text-xs text-gray-600">© Ignite</p>
      </div>

      {/* 🔶 MAIN AREA */}
      <div className="flex-1 p-8">

        {/* 🔹 TOP HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {mentor.name} 👋
          </h1>

          <div className="bg-white/40 backdrop-blur px-4 py-2 rounded-lg shadow">
            <span className="text-sm text-gray-700">
              {new Date().toDateString()}
            </span>
          </div>
        </div>

        {/* 🔹 STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 text-sm">Pending Requests</p>
            <h2 className="text-3xl font-bold text-blue-700">
              {requests.filter(r => r.status === "PENDING").length}
            </h2>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 text-sm">Average Rating</p>
            <h2 className="text-3xl font-bold text-yellow-500">
              {avgRating.toFixed(1)} ⭐
            </h2>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {requests.filter(r => r.status === "ACCEPTED").length}
            </h2>
          </div>

        </div>

        {/* 🔹 CONTENT */}
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg">

          {/* REQUESTS */}
          {activeTab === "requests" && (
            <>
              <h2 className="text-xl font-bold mb-6">Mentorship Requests</h2>

              {requests.filter(r => r.status === "PENDING").length === 0 ? (
                <p className="text-gray-500 italic">
                  No requests right now
                </p>
              ) : (
                requests
                  .filter(r => r.status === "PENDING")
                  .map(req => (
                    <div
                      key={req.id}
                      className="bg-white p-5 rounded-xl shadow mb-4 hover:shadow-xl transition border border-gray-100"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-blue-800">
                            {req.studentName}
                          </p>

                          <p className="text-sm text-gray-600">
                            {req.projectName} • {req.projectDomain}
                          </p>

                          <p className="mt-2 text-gray-700 italic">
                            "{req.message}"
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(req.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => handleReject(req.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}

          {/* RATINGS */}
          {activeTab === "ratings" && (
            <>
              <h2 className="text-xl font-bold mb-6">Ratings</h2>

              {ratings.map(r => (
                <div key={r.id} className="bg-white p-4 rounded shadow mb-3">
                  <div className="flex justify-between">
                    <p className="font-semibold">{r.studentName}</p>
                    <span>{"⭐".repeat(r.rating)}</span>
                  </div>
                  <p className="text-gray-600 italic mt-2">
                    {r.feedback}
                  </p>
                </div>
              ))}
            </>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <>
              <h2 className="text-xl font-bold mb-6">History</h2>

              <table className="w-full bg-white rounded shadow overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Project</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {requests
                    .filter(r => r.status !== "PENDING")
                    .map(req => (
                      <tr key={req.id} className="border-t text-center">
                        <td className="p-3">{req.studentName}</td>
                        <td className="p-3">{req.projectName}</td>
                        <td className="p-3">{req.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;