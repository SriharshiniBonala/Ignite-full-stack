import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateStudentProfile } from "../../api/studentApi";

const StudentProfile = () => {

  const [student, setStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
  });

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");

    if (storedStudent) {
      const parsedStudent = JSON.parse(storedStudent);

      setStudent(parsedStudent);

      setFormData({
        name: parsedStudent.name || "",
        email: parsedStudent.email || "",
        college: parsedStudent.college || "",
        phone: parsedStudent.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateStudentProfile(student.id, formData);

      const updatedStudent = response.data;

      localStorage.setItem("student", JSON.stringify(updatedStudent));
      setStudent(updatedStudent);

      toast.success("Profile updated successfully 🎉");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!student) {
    return <p className="text-center mt-10">Please login first.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Profile Card */}
      <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-2xl p-10 w-full max-w-2xl z-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold mt-3 text-gray-800">
            {student.name}
          </h1>
          <p className="text-gray-600 text-sm">{student.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-5">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College Name"
            className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
};

export default StudentProfile;