import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Chatbot state
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm IGNITE Assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  // 🧠 FAQ Logic (AI-like responses)
  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("mentor")) {
      return "You can connect with mentors through your dashboard → select project → view mentors.";
    }

    if (text.includes("funder") || text.includes("funding")) {
      return "Funders help finance your ideas 💰. Visit 'View Funders' section to explore opportunities.";
    }

    if (text.includes("register")) {
      return "You can register as Student, Mentor, or Funder from the homepage 🚀";
    }

    if (text.includes("project")) {
      return "Go to dashboard and click 'Upload Idea' to add your project.";
    }

    if (text.includes("contact")) {
      return "You can contact us using the form on this page. We usually reply within 24 hours.";
    }

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello there 👋 How can I assist you today?";
    }

    return "I'm still learning 🤖 Try asking about mentors, funders, projects, or registration!";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 relative">

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Contact <span className="text-indigo-600">IGNITE 🚀</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Reach out to us for mentorship, funding, or collaboration.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              📧 Email Support (24h response)
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              🤝 Collaboration Opportunities
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              🚀 Startup Guidance
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>

            <button className="w-full bg-indigo-600 text-white p-3 rounded-lg">
              Send 🚀
            </button>

          </form>
        </div>
      </div>

      {/* 💬 FLOATING CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50">

        {/* Chat Window */}
        {open && (
          <div className="w-80 h-[420px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-fadeIn">

            {/* Header */}
            <div className="bg-indigo-600 text-white p-3 font-semibold">
              IGNITE Assistant 🤖
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 p-2 outline-none"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-4"
              >
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          💬
        </button>
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(10px);}
            to {opacity: 1; transform: translateY(0);}
          }
        `}
      </style>

    </div>
  );
};

export default Contact;