import React, { useState } from 'react';
import { registerStudent } from '../../api/studentApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // ✅ console added

    try {
      await registerStudent({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        collegeName: formData.college,
        phoneNumber: formData.phone
      });

      toast.success("Student Registered Successfully!");
      navigate('/student/login');

    } catch (error) {
      console.error("Error registering student:", error);
      toast.error("Error registering student!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* 🔥 Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* ✨ Glass Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-lg animate-fadeIn">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white p-3 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-200">
          Have already an account?{" "}
          <button
            onClick={() => navigate('/student/login')}
            className="text-blue-300 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;