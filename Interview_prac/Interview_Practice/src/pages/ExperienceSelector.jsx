import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useInterview } from "../utils/InterviewContext.jsx";
import backgroundVideo from "../assets/background-video.mp4";

const experienceLevels = [
  { label: "Fresher", value: "0" },
  { label: "0 - 1 years", value: "0-1" },
  { label: "1 - 2 years", value: "1-2" },
  { label: "2 - 3 years", value: "2-3" },
  { label: "3 - 5 years", value: "3-5" },
  { label: "5+ years", value: "5+" },
];

const ExperienceSelector = () => {
  const navigate = useNavigate();
  const { experience, setExperience } = useInterview();
  const [selectedExp, setSelectedExp] = useState(experience || "");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedExp) {
      setError("Please choose your experience level.");
      return;
    }

    setError("");

    // Save to context
    setExperience(selectedExp);

    // Send experience to backend
    try {
      const response = await api.post("/set-experience", { experience: selectedExp });
      if (response.error) {
        console.warn("Backend not available, continuing without saving to session");
      }
    } catch (error) {
      console.warn("Backend not available, continuing without saving to session");
    }

    navigate("/resume-upload");
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10 min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Main Content Container */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20">
            
            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">
                Your Experience
              </h1>
              <p className="text-gray-300">Select your professional experience level</p>
            </div>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {experienceLevels.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExp(item.value)}
                  className={`p-5 border-2 rounded-xl text-center font-bold transition-all transform hover:scale-105 ${
                    selectedExp === item.value
                      ? "bg-gray-800/70 border-cyan-400 text-white shadow-lg shadow-cyan-400/30"
                      : "bg-gray-800/50 border-cyan-400/50 text-gray-200 hover:bg-gray-800/70 hover:border-cyan-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/50 border border-red-400/50 rounded-lg text-red-200 text-sm font-medium mb-4 text-center">
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

export default ExperienceSelector;
