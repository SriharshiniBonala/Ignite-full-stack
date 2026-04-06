import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allMentors } from "../../api/mentorApi";
import { getStudentRequests } from "../../api/requestApi";
import { getAverageRating } from "../../api/ratingApi";
import MentorCard from "../../components/MentorCard";

const MentorList = () => {
  const { projectId } = useParams();

  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await allMentors();
        const mentorsData = res.data || [];

        const mentorsWithRating = await Promise.all(
          mentorsData.map(async (mentor) => {
            try {
              const ratingRes = await getAverageRating(mentor.id);
              return {
                ...mentor,
                averageRating: ratingRes.data != null ? ratingRes.data : 0,
              };
            } catch {
              return { ...mentor, averageRating: 0 };
            }
          })
        );

        setMentors(mentorsWithRating);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchRequests = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));
        if (!student) return;

        const res = await getStudentRequests(student.id);
        const projectRequests = (res.data || []).filter(
          (req) => req.project?.id === parseInt(projectId)
        );

        setRequests(projectRequests);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentors();
    fetchRequests();
  }, [projectId]);

  const filteredMentors = mentors.filter((mentor) =>
    (mentor.expertise || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (sortOrder === "low") return a.averageRating - b.averageRating;
    if (sortOrder === "high") return b.averageRating - a.averageRating;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading mentors...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200">

      {/* Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Mentors for Project 🚀
        </h1>

        {/* Search + Sort */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg rounded-xl p-4 flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search by expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Sort by Rating</option>
            <option value="high">High → Low ⭐</option>
            <option value="low">Low → High ⭐</option>
          </select>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="transform hover:scale-105 transition duration-300"
            >
              <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-xl rounded-2xl p-4">
                <MentorCard
                  mentor={mentor}
                  projectId={parseInt(projectId)}
                  requests={requests}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedMentors.length === 0 && (
          <p className="text-center text-gray-600 mt-10 text-lg">
            No mentors found 😕
          </p>
        )}

      </div>
    </div>
  );
};

export default MentorList;