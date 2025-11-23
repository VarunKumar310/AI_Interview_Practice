import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../utils/InterviewContext.jsx";
import { api } from "../api.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import backgroundVideo from "../assets/background-video.mp4";

// Use worker from node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeUpload() {
  const navigate = useNavigate();
  const { setResumeText, setResumeFile } = useInterview();

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const extractTextFromPDF = async (file) => {
    setLoading(true);
    setProgress(20);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Validate file is not empty
      if (arrayBuffer.byteLength === 0) {
        setError("File is empty. Please upload a valid PDF.");
        setLoading(false);
        return;
      }
      
      setProgress(40);

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Validate PDF has pages
      if (!pdf.numPages || pdf.numPages === 0) {
        setError("PDF has no pages. Please upload a valid PDF.");
        setLoading(false);
        return;
      }
      
      setProgress(60);

      // Extract text from all pages
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + "\n\n";
        } catch (pageErr) {
          console.warn(`Warning: Could not extract text from page ${i}:`, pageErr);
          // Continue with other pages instead of failing
        }
        setProgress(60 + (i / pdf.numPages) * 35);
      }

      // Validate extracted text is not empty
      const trimmedText = text.trim();
      if (!trimmedText || trimmedText.length < 10) {
        setError("No text found in PDF. It might be a scanned image. Try uploading a text-based PDF or use 'Build Resume' instead.");
        setLoading(false);
        return;
      }

      setProgress(90);
      setResumeText(trimmedText);
      setResumeFile(file);
      
      // Save resume text to localStorage for ResumeScore page
      localStorage.setItem('resumeText', trimmedText);
      
      // Send resume to preview endpoint to show what will be extracted
      try {
        console.log("📤 Sending resume to backend for preview...");
        const previewResponse = await api.post("/preview-interview", {
          role: "Software Engineer", // Default role for preview
          experience: "2-3",
          difficulty: "Medium",
          resume_text: trimmedText,
          user_message: "start",
          conversation_history: null
        });
        
        if (previewResponse.success) {
          console.log("✅ Resume preview received!");
          console.log("📝 Summary:", previewResponse.resume_summary);
          console.log("🛠️  Skills:", previewResponse.skills);
          console.log("🚀 Projects:", previewResponse.projects);
          console.log("💼 Experience:", previewResponse.experience);
          console.log("❓ First Question:", previewResponse.first_question);
        }
      } catch (previewErr) {
        console.warn("Preview request failed (non-critical):", previewErr);
      }
      
      setProgress(100);
      setUploadSuccess(true);
      // Don't automatically navigate - let user click Start Interview button
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      
      // Provide specific error messages based on error type
      if (err.message.includes("Invalid PDF")) {
        setError("Invalid PDF file. Please ensure the file is a valid PDF.");
      } else if (err.message.includes("Corrupted")) {
        setError("PDF file appears to be corrupted. Try re-saving it.");
      } else if (err.message.includes("worker")) {
        setError("PDF worker failed to load. Check your internet connection and try again.");
      } else if (err.message.includes("CORS")) {
        setError("CORS error: Cannot load PDF worker. Try using 'Build Resume' instead.");
      } else {
        setError(`Failed to read PDF: ${err.message || "Unknown error"}. Try 'Build Resume' instead.`);
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) return setError("File too large");
    if (file.type !== "application/pdf") return setError("Only PDF allowed");
    setFileName(file.name);
    setUploadSuccess(false); // Reset success state for new file
    extractTextFromPDF(file);
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
                Upload Your Resume
              </h1>
              <p className="text-gray-300">PDF file to personalize your interview experience</p>
            </div>

            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-cyan-400/50 rounded-xl p-12 hover:border-cyan-400 hover:bg-gray-800/30 transition-all cursor-pointer relative mb-6"
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-xl font-bold text-cyan-300 mb-2">
                  {loading ? "Reading PDF..." : "Drop your PDF here"}
                </p>
                <p className="text-gray-400 text-sm">or click to browse</p>
                {fileName && (
                  <p className="text-green-400 font-semibold mt-4">✅ Selected: {fileName}</p>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="mb-6">
                <div className="bg-gray-800/50 border border-cyan-400/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-300" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <p className="text-center text-cyan-300 text-sm mt-2 font-semibold">{progress}%</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/50 border border-red-400/50 rounded-lg text-red-200 text-sm font-medium mb-6 text-center">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={() => navigate("/difficulty")}
                className="flex-1 py-3 border-2 border-cyan-400/50 text-cyan-300 font-bold rounded-xl hover:bg-gray-800/50 hover:border-cyan-400 transition transform hover:scale-105"
              >
                Skip for Now
              </button>
              <button
                onClick={() => navigate("/build-resume")}
                className="flex-1 py-3 bg-cyan-400 text-gray-900 font-bold rounded-xl hover:bg-cyan-300 transition transform hover:scale-105 shadow-lg shadow-cyan-400/30"
              >
                Build Resume
              </button>
            </div>

            {/* Resume Score Checker Button */}
            {fileName && !loading && (
              <button
                onClick={() => navigate("/resume-score")}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-400 hover:to-pink-500 transition transform hover:scale-105 shadow-lg shadow-purple-400/30 mt-4"
              >
                📊 Check Resume Score
              </button>
            )}

            {/* Start Interview Button - Only show after successful upload */}
            {uploadSuccess && (
              <button
                onClick={() => navigate("/difficulty")}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition transform hover:scale-105 shadow-lg shadow-green-400/30 mt-4"
              >
                🚀 Continue to Difficulty Selection
              </button>
            )}

            {/* Info Text */}
            <p className="text-center text-gray-400 text-xs mt-6">
              Max file size: 5MB • PDF format only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}