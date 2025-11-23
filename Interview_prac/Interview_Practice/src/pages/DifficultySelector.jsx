import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useInterview } from "../utils/InterviewContext.jsx";
import backgroundVideo from "../assets/background-video.mp4";

const difficultyLevels = [
  { label: "Easy", value: "easy", desc: "Basic-level questions" },
  { label: "Medium", value: "medium", desc: "Moderate difficulty" },
  { label: "Hard", value: "hard", desc: "Advanced interview questions" },
  { label: "Expert", value: "expert", desc: "For senior-level challenge" },
];

const DifficultySelector = () => {
  const navigate = useNavigate();
  const { difficulty, setDifficulty } = useInterview();
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty || "");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedDifficulty) {
      setError("Please choose a difficulty level.");
      return;
    }

    setError("");

    // Save to context
    setDifficulty(selectedDifficulty);

    // Save difficulty to backend session
    try {
      const response = await api.post("/set-difficulty", { difficulty: selectedDifficulty });
      if (response.error) {
        console.warn("Backend not available, continuing without saving to session");
      }
    } catch (error) {
      console.warn("Backend not available, continuing without saving to session");
    }

    navigate("/interview");
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

            {/* Heading */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">
                Choose Difficulty
              </h1>
              <p className="text-gray-300">Select the challenge level for your interview</p>
            </div>

            {/* Difficulty Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {difficultyLevels.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDifficulty(item.value)}
                  className={`w-full p-5 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
                    selectedDifficulty === item.value
                      ? "bg-gray-800/70 border-cyan-400 text-white shadow-lg shadow-cyan-400/30"
                      : "bg-gray-800/50 border-cyan-400/50 text-gray-200 hover:bg-gray-800/70 hover:border-cyan-400"
                  }`}
                >
                  <h3 className="font-bold text-lg">{item.label}</h3>
                  <p
                    className={`text-sm mt-1 ${
                      selectedDifficulty === item.value
                        ? "text-gray-200"
                        : "text-gray-400"
                    }`}
                  >
                    {item.desc}
                  </p>
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

export default DifficultySelector;
