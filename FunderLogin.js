import React, { useState } from "react";
import { loginFunder } from "../../api/funderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FunderLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(true);

      const res = await loginFunder(formData);

      localStorage.setItem("funder", JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage"));

      toast.success("Welcome back 👋");
      navigate("/funder-dashboard");

    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* 🌫️ BACKGROUND BLUR BLOBS */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400 opacity-20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* 🔵 LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900 text-white p-12">

        <div className="max-w-md z-10">
          <h1 className="text-4xl font-bold mb-4">
            Empower Innovation 💡
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Support visionary students, fund impactful ideas,
            and shape the future of innovation with your guidance.
          </p>
        </div>

        {/* subtle glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent)]"></div>
      </div>

      {/* ⚪ RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-6 z-10">

        {/* 🧊 GLASS CARD */}
        <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-2xl p-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Funder Login
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>

              <div className="flex items-center bg-white/70 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-medium flex justify-center items-center shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Login"
              )}
            </button>

          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/funder-register")}
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default FunderLogin;