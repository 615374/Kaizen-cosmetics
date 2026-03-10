import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import resultadoVideo from "/assets/peinado-full-red.mp4";
import resultadoVideo2 from "/assets/resultadoVideo2.mp4";
import usoVideo from "/assets/usoVideo.mp4";

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

export default function RealUsageSection() {
  const [muted1, setMuted1] = useState(true);
  const [muted2, setMuted2] = useState(true);
  const [muted3, setMuted3] = useState(true);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  const toggleMute = (ref, setMuted) => {
    if (ref.current) {
      ref.current.muted = !ref.current.muted;
      setMuted(ref.current.muted);
    }
  };

  const videos = [
    { id: 1, src: resultadoVideo2, label: "❤️‍🔥TESTIMONIO · USO ❤️‍🔥", ref: videoRef1, muted: muted1, setMuted: setMuted1 },
    { id: 2, src: resultadoVideo, label: "🔥PEINADO · KAIZEN 😏🔥", ref: videoRef2, muted: muted2, setMuted: setMuted2 },
    { id: 3, src: usoVideo, label: "💜TESTIMONIO · DURACIÓN 💜", ref: videoRef3, muted: muted3, setMuted: setMuted3 },
  ];

  return (
    <section className="real-usage-section">
      <h2 className="real-usage-title">
        USO REAL <span>·</span> RESULTADO REAL
      </h2>

      <div className="real-usage-container">
        <Swiper
          modules={[Pagination, Autoplay]} 
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ 
            delay: 4500, 
            disableOnInteraction: false ,
            pauseOnMouseEnter: false 
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            600: {
              slidesPerView: 3,
              centeredSlides: false,
              allowTouchMove: false,
              pagination: false,
              spaceBetween: 36,
              autoplay: false // En Desktop lo dejamos quieto 
            }
          }}
          className="real-usage-swiper"
        >
          {videos.map((vid) => (
            <SwiperSlide key={vid.id}>
              <div className="real-usage-item">
                <p className="real-usage-label">{vid.label}</p>
                <div className="real-usage-video">
                  <video
                    ref={vid.ref}
                    src={vid.src}
                    autoPlay
                    muted={vid.muted}
                    loop
                    playsInline
                    preload="auto"
                  />
                  <button className="video-volume-btn" onClick={() => toggleMute(vid.ref, vid.setMuted)}>
                    {vid.muted ? "🔇" : "🔊"}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}