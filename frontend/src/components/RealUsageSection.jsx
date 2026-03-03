import React, { useState, useRef } from 'react';
import resultadoVideo from "/assets/peinado-full-red.mp4";
import resultadoVideo2 from "/assets/resultadoVideo2.mp4";
import usoVideo from "/assets/usoVideo.mp4";

export default function RealUsageSection() {
  // Estados independientes para el mute de cada video
  const [muted1, setMuted1] = useState(true);
  const [muted2, setMuted2] = useState(true);
  const [muted3, setMuted3] = useState(true);

  // Referencias para cada elemento de video
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  // Funciones de toggle independientes
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

  const toggleMute3 = () => {
    if (videoRef3.current) {
      videoRef3.current.muted = !videoRef3.current.muted;
      setMuted3(videoRef3.current.muted);
    }
  };

  return (
    <section className="real-usage-section">
      <h2 className="real-usage-title">
        USO REAL <span>·</span> RESULTADO REAL
      </h2>

      <div className="real-usage-videos">
        {/* ITEM 1 */}
        <div className="real-usage-item">
          <p className="real-usage-label">❤️‍🔥TESTIMONIO · USO ❤️‍🔥</p>
          <div className="real-usage-video">
            <video
              ref={videoRef1}
              src={resultadoVideo2}
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
        </div>

        {/* ITEM 2 */}
        <div className="real-usage-item">
          <p className="real-usage-label">🔥PEINADO · KAIZEN 😏🔥</p>
          <div className="real-usage-video">
            <video
              ref={videoRef2}
              src={resultadoVideo}
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
        </div>

        {/* ITEM 3 */}
        <div className="real-usage-item">
          <p className="real-usage-label">💜TESTIMONIO · DURACIÓN 💜</p>
          <div className="real-usage-video">
            <video
              ref={videoRef3}
              src={usoVideo}
              autoPlay
              muted={muted3}
              loop
              playsInline
              preload="auto"
            />
            <button className="video-volume-btn" onClick={toggleMute3}>
              {muted3 ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}