import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [student, setStudent] = useState(null);

  const loadUser = () => {
    try {
      const storedMentor = localStorage.getItem("mentor");
      const storedStudent = localStorage.getItem("student");

      setMentor(storedMentor ? JSON.parse(storedMentor) : null);
      setStudent(storedStudent ? JSON.parse(storedStudent) : null);

    } catch (error) {
      console.error("Error parsing localStorage:", error);
      setMentor(null);
      setStudent(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    if (!mentor && !student) return;

    localStorage.removeItem("mentor");
    localStorage.removeItem("student");

    setMentor(null);
    setStudent(null);

    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">

        {/* 🔥 Logo */}
        <Link to="/" className="font-bold text-2xl tracking-wide">
          IGNITE 🚀
        </Link>

        {/* Menu */}
        <div className="flex gap-6 items-center text-sm md:text-base">

          <Link className="hover:text-gray-200 transition" to="/">Home</Link>
          <Link className="hover:text-gray-200 transition" to="/about">About</Link>
          <Link className="hover:text-gray-200 transition" to="/contact">Contact</Link>

          {!mentor && !student && (
            <Link
              to="/login"
              className="bg-white text-indigo-700 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}

          {mentor && (
            <>
              <span className="text-green-200 font-medium">
                Welcome {mentor.name}
              </span>
              <Link
                to="/mentor/profile"
                className="hover:text-gray-200 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {student && (
            <>
              <span className="text-yellow-200 font-medium">
                Welcome {student.name}
              </span>
              <Link
                to="/student/profile"
                className="hover:text-gray-200 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Header;