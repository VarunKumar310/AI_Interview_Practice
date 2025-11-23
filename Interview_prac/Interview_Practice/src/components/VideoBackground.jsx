import React from "react";
import backgroundVideo from "../assets/background-video.mp4";

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover z-0"
    >
      <source src={backgroundVideo} type="video/mp4" />
    </video>
  );
}
