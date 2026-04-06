import React, { useState } from "react";
import { registerMentor } from "../../api/mentorApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MentorRegister = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    organization: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.expertise) newErrors.expertise = "Expertise is required";
    if (!formData.organization)
      newErrors.organization = "Organization is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await registerMentor(formData);

      toast.success("Mentor Registered Successfully 🎉");
      navigate("/mentor/login");

    } catch (error) {
      console.error(error);
      toast.error("Error registering mentor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')"
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-800/60 to-blue-900/70"></div>

      {/* Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-lg z-10">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Mentor Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-transparent text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Expertise */}
          <div>
            <input
              type="text"
              name="expertise"
              placeholder="💡 Expertise"
              value={formData.expertise}
              onChange={handleChange}
              className="input"
            />
            {errors.expertise && <p className="error">{errors.expertise}</p>}
          </div>

          {/* Organization */}
          <div>
            <input
              type="text"
              name="organization"
              placeholder="🏢 Organization"
              value={formData.organization}
              onChange={handleChange}
              className="input"
            />
            {errors.organization && <p className="error">{errors.organization}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Register"
            )}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/mentor/login")}
            className="text-blue-300 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>

      {/* Styles */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            outline: none;
          }

          .error {
            color: #fca5a5;
            font-size: 12px;
            margin-top: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default MentorRegister;