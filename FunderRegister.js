import React, { useState } from "react";
import { registerFunder } from "../../api/funderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FunderRegister = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    domain: "",
    fundingAmount: "",
    contact: "",
    description: ""
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

      await registerFunder(formData);

      toast.success("Funder Registered Successfully 🎉");
      navigate("/funder-login");

    } catch (error) {
      console.error(error);
      toast.error("Error registering funder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* 🌫️ Background blobs */}
      <div className="absolute w-[400px] h-[400px] bg-blue-300 opacity-20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-300 opacity-20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* 🔵 LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900 text-white p-12">

        <div className="max-w-md animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4">
            Invest in Ideas 🚀
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Discover innovative student projects and support the next generation
            of creators and entrepreneurs.
          </p>
        </div>

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent)]"></div>
      </div>

      {/* ⚪ RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-6 z-10">

        {/* 🧊 Glass Card with Animation */}
        <div className="w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl p-8 animate-slideUp">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Funder Registration
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Create your account to start funding
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="name" placeholder="Full Name" onChange={handleChange} required className="input" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="input" />

            <input name="organization" placeholder="Organization" onChange={handleChange} className="input" />
            <input name="domain" placeholder="Domain (Fintech, AI...)" onChange={handleChange} className="input" />
            <input name="fundingAmount" type="number" placeholder="Funding Amount" onChange={handleChange} className="input" />
            <input name="contact" placeholder="Contact Info" onChange={handleChange} className="input" />

            <textarea
              name="description"
              placeholder="Short Description"
              onChange={handleChange}
              className="input resize-none h-24"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-medium flex justify-center items-center shadow-md"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Register"
              )}
            </button>

          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/funder-login")}
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>

        </div>
      </div>

      {/* 🔥 Reusable Input Style + Animations */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            background: rgba(255,255,255,0.8);
            border: 1px solid #d1d5db;
            outline: none;
            transition: 0.3s;
          }

          .input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slideUp {
            animation: slideUp 0.6s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease;
          }
        `}
      </style>

    </div>
  );
};

export default FunderRegister;