import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [barsVisible, setBarsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const barRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBarsVisible(true);
      },
      { threshold: 0.3 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCardsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (barRef.current) observer1.observe(barRef.current);
    if (cardRef.current) observer2.observe(cardRef.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">

      {/* HEADER */}
      <div className="text-center py-16 px-6 overflow-hidden">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4 animate-slideDown">
          About IGNITE 🚀
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg animate-fadeIn">
          IGNITE is a platform designed to transform ideas into impactful startups
          by connecting innovators with investors, funding opportunities, and collaboration.
        </p>
      </div>

      {/* ABOUT SECTION WITH BACKGROUND IMAGE */}
<div className="relative py-16">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      alt="team collaboration"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-blue-900/40"></div> {/* overlay */}
  </div>

  {/* GLASS CARD */}
  <div className="relative max-w-5xl mx-auto px-6">
    <div className="backdrop-blur-xl bg-blue-200/30 border border-white/30 rounded-2xl shadow-2xl p-10 animate-slideUp">

      <h2 className="text-2xl font-semibold text-white mb-4">
        About the Platform
      </h2>

      <p className="text-white/90 leading-relaxed text-lg">
        IGNITE creates a powerful ecosystem for growth, innovation, and success
        by connecting students, mentors, and investors into one unified platform.
        It enables collaboration, funding opportunities, and real-world execution
        of ideas into impactful startups.
      </p>

    </div>
  </div>
</div>

      {/* FOCUS AREAS */}
      <div ref={cardRef} className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-10">
          Focus Areas at IGNITE
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div
            className={`backdrop-blur-lg bg-blue-100/40 p-6 rounded-xl shadow-md transition duration-700 hover:scale-105
            ${cardsVisible ? "animate-slideLeft" : "opacity-0"}`}
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-pink-600 mb-2">
              👩‍💼 Female-led Entrepreneurs
            </h3>
            <p className="text-gray-600 text-sm">
              Empowering women founders to lead innovative businesses.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className={`backdrop-blur-lg bg-blue-100/40 p-6 rounded-xl shadow-md transition duration-700 delay-150 hover:scale-105
            ${cardsVisible ? "animate-fadeIn" : "opacity-0"}`}
          >
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              🌱 Sustainability
            </h3>
            <p className="text-gray-600 text-sm">
              Encouraging eco-friendly startups.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className={`backdrop-blur-lg bg-blue-100/40 p-6 rounded-xl shadow-md transition duration-700 delay-300 hover:scale-105
            ${cardsVisible ? "animate-slideRight" : "opacity-0"}`}
          >
            <img
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              🤖 AI & Technology
            </h3>
            <p className="text-gray-600 text-sm">
              Supporting AI-driven startups.
            </p>
          </div>

        </div>
      </div>

      {/* GROWTH SECTION */}
      <div
        ref={barRef}
        className="py-14 bg-gradient-to-r from-blue-100 to-indigo-100"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-10">
          IGNITE Growth Insights 📊
        </h2>

        <div className="max-w-5xl mx-auto space-y-6 px-6">

          {/* BAR 1 */}
          <div>
            <p className="mb-1 font-medium">Startup Registrations</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full bg-indigo-600 transition-all duration-1000 ${
                  barsVisible ? "w-[85%]" : "w-0"
                }`}
              />
            </div>
          </div>

          {/* BAR 2 */}
          <div>
            <p className="mb-1 font-medium">Investor Connections</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full bg-purple-600 transition-all duration-1000 delay-200 ${
                  barsVisible ? "w-[70%]" : "w-0"
                }`}
              />
            </div>
          </div>

          {/* BAR 3 */}
          <div>
            <p className="mb-1 font-medium">Successful Funding</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full bg-blue-600 transition-all duration-1000 delay-300 ${
                  barsVisible ? "w-[60%]" : "w-0"
                }`}
              />
            </div>
          </div>
          {/* SUCCESS STORIES + RATINGS */}
<div className="py-16 bg-gray-50">
  <h2 className="text-2xl font-bold text-center text-indigo-700 mb-12">
    What Startups Say About IGNITE ⭐
  </h2>

  <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">

    {/* CARD 1 */}
    <div className="backdrop-blur-lg bg-blue-100/40 border border-white/30 rounded-xl shadow-lg p-6 hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
        EcoCycle ♻️
      </h3>

      {/* Stars */}
      <p className="text-yellow-500 text-lg">★★★★★</p>
      <p className="text-sm text-gray-500 mb-3">4.8 Rating</p>

      <p className="text-gray-600 text-sm">
        “IGNITE helped us connect with investors and scale our recycling solution
        faster than we imagined.”
      </p>
    </div>

    {/* CARD 2 */}
    <div className="backdrop-blur-lg bg-blue-100/40 border border-white/30 rounded-xl shadow-lg p-6 hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-pink-600 mb-2">
        SheLeads 👩‍💼
      </h3>

      <p className="text-yellow-500 text-lg">★★★★★</p>
      <p className="text-sm text-gray-500 mb-3">4.9 Rating</p>

      <p className="text-gray-600 text-sm">
        “A powerful platform for women entrepreneurs. The mentorship and funding
        opportunities changed everything for us.”
      </p>
    </div>

    {/* CARD 3 */}
    <div className="backdrop-blur-lg bg-blue-100/40 border border-white/30 rounded-xl shadow-lg p-6 hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
        AI Vision 🤖
      </h3>

      <p className="text-yellow-500 text-lg">★★★★☆</p>
      <p className="text-sm text-gray-500 mb-3">4.7 Rating</p>

      <p className="text-gray-600 text-sm">
        “We gained visibility and real business traction through IGNITE. Highly
        recommended for tech startups.”
      </p>
    </div>

  </div>
</div>

        </div>
      </div>

    </div>
  );
};

export default About;