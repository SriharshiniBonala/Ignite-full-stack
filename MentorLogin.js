import React, { useState } from "react";
import { loginMentor } from "../../api/mentorApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MentorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginMentor(formData);

      toast.success("Mentor Login Successful 🎉");

      localStorage.setItem("mentor", JSON.stringify(response.data));
      window.dispatchEvent(new Event("storage"));

      navigate("/mentor/dashboard");

    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')"
        }}
      ></div>

      {/* 🎨 Softer Blue-Purple Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-800/60 to-purple-900/70"></div>

      {/* 🌫️ Subtle Floating Blobs (NO PINK) */}
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 top-[-60px] left-[-60px] animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20 bottom-[-60px] right-[-60px] animate-pulse"></div>

      {/* 💎 Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md z-10 transform hover:scale-105 transition duration-500">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Mentor Login
          </h2>
          <p className="text-gray-200 text-sm mt-1">
            Welcome back. Continue mentoring 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="📧 Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/mentor/register")}
            className="text-blue-300 font-semibold hover:underline"
          >
            Register as Mentor
          </button>
        </p>

      </div>
    </div>
  );
};

export default MentorLogin;