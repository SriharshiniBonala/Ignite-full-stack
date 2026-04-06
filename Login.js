import React, { useState } from "react";
import { loginStudent } from "../../api/studentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
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
      const response = await loginStudent(formData);

      localStorage.setItem("student", JSON.stringify(response.data));
      window.dispatchEvent(new Event("storage"));

      toast.success("Login Successful");
      navigate("/student/dashboard");

    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* 🔥 Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay + blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* ✨ Glass Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fadeIn">

        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
          Student Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-200">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/student/register")}
            className="text-blue-300 font-semibold hover:underline"
          >
            Register as Student
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;