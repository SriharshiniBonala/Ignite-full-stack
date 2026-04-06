import React, { useEffect, useState } from "react";
import { getAllFunders } from "../../api/funderApi";

const FunderList = () => {
  const [funders, setFunders] = useState([]);

  useEffect(() => {
    getAllFunders().then(res => setFunders(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 relative overflow-hidden p-6">

      {/* Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          💰 Available Funders
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {funders.map((f) => (
            <div
              key={f.id}
              className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-xl rounded-2xl p-6 transform hover:scale-105 hover:shadow-2xl transition duration-300"
            >

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold shadow-md">
                  {f.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{f.name}</h3>
                  <p className="text-sm text-gray-600">{f.organization}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-gray-700 text-sm">

                <p>
                  <span className="font-semibold">🌐 Domain:</span> {f.domain}
                </p>

                <p>
                  <span className="font-semibold">💵 Funding:</span>{" "}
                  <span className="text-green-600 font-bold">
                    ${f.fundingAmount}
                  </span>
                </p>

                <p className="italic text-gray-600">
                  "{f.description}"
                </p>

                <p className="text-xs text-gray-500">
                  📞 {f.contact}
                </p>
              </div>

              {/* Button (optional future action) */}
              <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition duration-300">
                Connect
              </button>

            </div>
          ))}

        </div>

        {/* Empty State */}
        {funders.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No funders available 😕
          </p>
        )}

      </div>
    </div>
  );
};

export default FunderList;