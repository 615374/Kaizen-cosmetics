import React, { useState, useRef } from 'react';

export default function VideoShowcase({ video1, video2, children }) {
  // Estados para el audio de cada video de forma independiente
  const [muted1, setMuted1] = useState(true);
  const [muted2, setMuted2] = useState(true);

  // Referencias para controlar los elementos de video
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const toggleMute1 = () => {
    if (videoRef1.current) {
      videoRef1.current.muted = !videoRef1.current.muted;
      setMuted1(videoRef1.current.muted);
    }
  };

  const toggleMute2 = () => {
    if (videoRef2.current) {
      videoRef2.current.muted = !videoRef2.current.muted;
      setMuted2(videoRef2.current.muted);
    }
  };

  return (
    <section className="video-showcase">
      {/* VIDEO IZQUIERDO */}
      <div className="video-box">
        <video
          ref={videoRef1}
          src={video1}
          autoPlay
          muted={muted1}
          loop
          playsInline
          preload="auto"
        />
        <button className="video-volume-btn" onClick={toggleMute1}>
          {muted1 ? "🔇" : "🔊"}
        </button>
      </div>

      {/* PRODUCTO (CENTRO) - Mantenemos el hueco para el children */}
      <div className="product-column-center">
        {children}
      </div>

      {/* VIDEO DERECHO */}
      <div className="video-box">
        <video
          ref={videoRef2}
          src={video2}
          autoPlay
          muted={muted2}
          loop
          playsInline
          preload="auto"
        />
        <button className="video-volume-btn" onClick={toggleMute2}>
          {muted2 ? "🔇" : "🔊"}
        </button>
      </div>
    </section>
  );
}