import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-900 overflow-x-hidden relative">

      {/* 🌈 FLOATING BLOBS (FIXED) */}
      <div className="absolute w-[300px] h-[300px] bg-blue-400/20 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-400/20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* HERO SECTION */}
      <div className="relative h-[85vh] overflow-hidden">

        {/* PARALLAX BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_23-2148898687.jpg')",
          }}
        ></div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-wide animate-fadeIn">
            IGNITE 🚀
          </h1>

          <p className="text-xl md:text-2xl text-blue-300 font-medium mb-6">
            Fueling Ideas. Igniting Innovation. Connecting Futures.
          </p>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg shadow-xl hover:scale-110 hover:shadow-2xl transition duration-300">
            Get Started
          </button>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-6 animate-bounce text-white text-sm">
            ↓ Scroll
          </div>

        </div>
      </div>

      {/* 📊 STATS SECTION */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 pb-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6 text-center">

          {[
            { value: "500+", label: "Startups", color: "text-indigo-600" },
            { value: "200+", label: "Mentors", color: "text-blue-600" },
            { value: "150+", label: "Investors", color: "text-purple-600" }
          ].map((item, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-xl shadow-lg py-6 hover:scale-105 hover:shadow-2xl transition"
            >
              <h3 className={`text-3xl font-bold ${item.color}`}>
                {item.value}
              </h3>
              <p className="text-gray-500">{item.label}</p>
            </div>
          ))}

        </div>
      </div>

      {/* 🚀 FEATURES */}
      <div className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
          What IGNITE Offers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              img: "https://images.unsplash.com/photo-1551434678-e076c223a692",
              title: "💡 Idea Sharing",
              desc: "Showcase ideas and validate them with real feedback.",
              color: "text-blue-600"
            },
            {
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              title: "🚀 Network",
              desc: "Connect with mentors & innovators globally.",
              color: "text-indigo-600"
            },
            {
              img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
              title: "💰 Funding",
              desc: "Access investors and funding opportunities.",
              color: "text-purple-600"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md hover:shadow-2xl transition hover:-translate-y-3 group overflow-hidden"
            >
              <img
                src={item.img}
                className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                alt=""
              />

              <div className="p-5 text-center">
                <h3 className={`text-lg font-semibold ${item.color} mb-2`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 🌟 MID SECTION */}
      <div className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100 text-center px-4 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.2),transparent)]"></div>

        <h2 className="text-2xl font-bold text-indigo-700 mb-3 relative z-10">
          A Launchpad for Innovators 🚀
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto text-sm relative z-10">
          IGNITE bridges the gap between ideas and execution by connecting
          students, mentors, and investors into one ecosystem.
        </p>
      </div>

      {/* 🔥 FINAL CTA */}
      <div className="py-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-center text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent)]"></div>

        <h2 className="text-xl font-semibold mb-2 relative z-10">
          Start Your Journey 🚀
        </h2>

        <p className="text-sm mb-4 text-blue-100 relative z-10">
          Join IGNITE and bring your ideas to life.
        </p>

        <button className="bg-white text-indigo-700 px-6 py-2 rounded-full font-medium hover:scale-110 hover:shadow-xl transition relative z-10">
          Join Now
        </button>
      </div>

      {/* ✨ Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(20px);}
            to {opacity: 1; transform: translateY(0);}
          }
        `}
      </style>

    </div>
  );
};

export default Home;