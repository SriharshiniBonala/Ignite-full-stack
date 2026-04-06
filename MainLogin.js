import React from "react";
import { useNavigate } from "react-router-dom";

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">

      {/* TOP BACKGROUND IMAGE */}
      <div className="h-80 w-full relative">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
          alt="team meeting"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* TITLE */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Choose Your Role 🚀
          </h1>
        </div>
      </div>

      {/* LIGHT BLUE SECTION UNDER IMAGE */}
      <div className="bg-gradient-to-b from-blue-100/60 to-transparent pt-20">

        {/* CARDS WRAPPER WITH BACKGROUND IMAGE */}
        <div
          className="max-w-6xl mx-auto px-6 -mt-32 pb-20 bg-cover bg-center rounded-3xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          }}
        >
          <div className="grid md:grid-cols-3 gap-10 text-center">

            {/* STUDENT */}
            <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl pt-28 pb-10 px-6 relative transform hover:-translate-y-3 hover:shadow-2xl transition duration-300">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="Student"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg absolute -top-20 left-1/2 transform -translate-x-1/2"
              />

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                STUDENT
              </h3>

              <p className="text-indigo-600 text-sm font-semibold mb-3">
                learning explorer
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Explore new ideas, gain mentorship, and build your skills with
                real-world projects. IGNITE helps students transform their
                creativity into impactful startups.
              </p>

              <button
                onClick={() => navigate("/student/login")}
                className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-500 transition"
              >
                Login
              </button>
            </div>

            {/* MENTOR */}
            <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl pt-28 pb-10 px-6 relative transform hover:-translate-y-3 hover:shadow-2xl transition duration-300">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Mentor"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg absolute -top-20 left-1/2 transform -translate-x-1/2"
              />

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                MENTOR
              </h3>

              <p className="text-green-600 text-sm font-semibold mb-3">
                innovation guide
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Share your expertise and guide innovators. Help startups refine
                their ideas and scale successfully through your experience.
              </p>

              <button
                onClick={() => navigate("/mentor/login")}
                className="bg-green-600 text-white px-8 py-2 rounded-full hover:bg-green-500 transition"
              >
                Login
              </button>
            </div>

            {/* FUNDER */}
            <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-xl pt-28 pb-10 px-6 relative transform hover:-translate-y-3 hover:shadow-2xl transition duration-300">

              <img
                src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                alt="Funder"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg absolute -top-20 left-1/2 transform -translate-x-1/2"
              />

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                FUNDER
              </h3>

              <p className="text-purple-600 text-sm font-semibold mb-3">
                growth investor
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Invest in innovative startups and support impactful ideas that
                shape the future economy and technology.
              </p>

              <button
                onClick={() => navigate("/funder-login")}
                className="bg-purple-600 text-white px-8 py-2 rounded-full hover:bg-purple-500 transition"
              >
                Login
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div className="py-14 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Why IGNITE?
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          IGNITE connects students, mentors, and investors into one powerful
          ecosystem. Whether you're learning, guiding, or investing — this
          platform empowers innovation, collaboration, and startup growth.
        </p>
      </div>

    </div>
  );
};

export default MainLogin;