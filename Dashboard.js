import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentProjects } from "../../api/studentApi";
import { getStudentRequests } from "../../api/requestApi";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [acceptedMentors, setAcceptedMentors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student) return;

    getStudentProjects(student.id).then((res) => setProjects(res.data));

    getStudentRequests(student.id).then((res) => {
      const accepted = {};
      res.data.forEach((req) => {
        if (req.status === "ACCEPTED") {
          accepted[req.project.id] = req.mentor;
        }
      });
      setAcceptedMentors(accepted);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 relative overflow-hidden">

      {/* 🔥 Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Student Dashboard
        </h1>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Projects
          </h2>

          <button
            onClick={() => navigate("/add-project")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition duration-300"
          >
            + Upload Idea
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="backdrop-blur-xl bg-white/40 border border-white/50 rounded-2xl p-6 shadow-xl hover:scale-105 transition duration-300"
            >

              {/* Project Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {project.projectName}
              </h3>

              {/* Domain */}
              <p className="text-blue-600 font-medium mb-2">
                {project.domain}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {project.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => navigate(`/mentors/${project.id}`)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  View Mentors
                </button>

                <button
                  onClick={() => navigate(`/funders`)}
                  className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                >
                  View Funders
                </button>
              </div>

              {/* Assigned Mentor */}
              {acceptedMentors[project.id] && (
                <div className="bg-white/60 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Mentor Assigned
                  </p>
                  <p className="text-gray-900 font-medium">
                    {acceptedMentors[project.id].name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            No projects yet. Start by uploading your idea 🚀
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;