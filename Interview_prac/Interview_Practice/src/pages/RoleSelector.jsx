import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useInterview } from "../utils/InterviewContext.jsx";
import VideoBackground from "../components/VideoBackground";

const rolesList = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Machine Learning Engineer",
  "Data Scientist",
  "AI Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "QA / Test Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Analyst",
  "Blockchain Developer",
  "Game Developer",
  "Network Engineer",
  "Database Administrator",
  "IT Support Engineer",
  "Site Reliability Engineer",
  "Embedded Systems Engineer",
  "Big Data Engineer",
  "Business Analyst",
];

const RoleSelector = () => {
  const navigate = useNavigate();
  const { role, setRole } = useInterview();
  const [selectedRole, setSelectedRole] = useState(role || "");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const filteredRoles = rolesList.filter((role) =>
    role.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select a job role.");
      return;
    }

    setError("");

    // Save to context
    setRole(selectedRole);

    // SAVE ROLE TO BACKEND SESSION
    try {
      const response = await api.post("/set-role", { role: selectedRole });
      if (response.error) {
        console.warn("Backend not available, continuing without saving to session");
      }
    } catch (error) {
      console.warn("Backend not available, continuing without saving to session");
    }

    navigate("/experience");
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <VideoBackground />
      
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10 min-h-screen">
        <div className="w-full max-w-4xl">
          {/* Main Content Container */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20">
            
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">
                Select Your Job Role
              </h1>
              <p className="text-gray-300">Choose the position you want to interview for</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search job roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 bg-gray-800/50 border border-cyan-400/50 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
            </div>

            {/* Grid of Roles */}
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-gray-800/50">
              {filteredRoles.length === 0 ? (
                <p className="text-center text-gray-400 col-span-full py-8">No roles found</p>
              ) : (
                filteredRoles.map((role, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 border-2 rounded-xl text-left font-semibold transition-all transform hover:scale-105 ${
                      selectedRole === role
                        ? "bg-gray-800/70 border-cyan-400 text-white shadow-lg shadow-cyan-400/30"
                        : "bg-gray-800/50 border-cyan-400/50 text-gray-200 hover:bg-gray-800/70 hover:border-cyan-400"
                    }`}
                  >
                    {role}
                  </button>
                ))
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/50 border border-red-400/50 rounded-lg text-red-200 text-sm font-medium mb-4">
                {error}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-cyan-400 text-gray-900 font-bold rounded-xl hover:bg-cyan-300 transition transform hover:scale-105 shadow-lg shadow-cyan-400/30"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
