import React, { useState, useEffect } from "react";
import { sendRequest } from "../api/requestApi";
import { getAverageRating } from "../api/ratingApi";
import RatingSystem from "./RatingSystem"; // Import the new component
import { toast } from "react-toastify";

const MentorCard = ({ mentor, projectId, requests = [] }) => {
  const student = JSON.parse(localStorage.getItem("student"));
  const [status, setStatus] = useState("SEND");
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    // 1. Set Status
    const req = requests.find(r => r.mentor?.id === mentor.id && r.project?.id === projectId);
    if (req) setStatus(req.status);

    // 2. Set Average
    getAverageRating(mentor.id).then(res => setAvg(res.data || 0));
  }, [requests, mentor.id, projectId]);

  const handleRequest = async () => {
    const msg = prompt("Enter message:");
    if (!msg) return;
    try {
      await sendRequest({ studentId: student.id, mentorId: mentor.id, projectId, message: msg });
      toast.success("Sent!");
      setStatus("PENDING");
    } catch { toast.error("Error"); }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-bold">{mentor.name}</h3>
        <p className="text-blue-600">{mentor.expertise}</p>
        <p className="text-sm text-gray-600">{mentor.organization}</p>
        <p className="text-sm text-gray-600">{mentor.experience} years experience</p>
      <p className="text-xs text-blue-600 font-bold mb-2">⭐ Avg: {Number(avg).toFixed(1)}</p>

      {status === "PENDING" && <button className="w-full bg-yellow-500 text-white py-2 rounded">Pending</button>}
      {status === "REJECTED" && <button className="w-full bg-red-600 text-white py-2 rounded">Rejected</button>}
      
      {status === "ACCEPTED" && (
        <div className="space-y-3">
          <button className="w-full bg-green-600 text-white py-2 rounded font-bold">Already Mentoring</button>
          {/* 🔥 This component handles its own database sync so refresh won't break it */}
          <RatingSystem mentorId={mentor.id} studentId={student.id} projectId={projectId} />
        </div>
      )}

      {status === "SEND" && (
        <button onClick={handleRequest} className="w-full bg-blue-600 text-white py-2 rounded">Send Request</button>
      )}
    </div>
  );
};

export default MentorCard;