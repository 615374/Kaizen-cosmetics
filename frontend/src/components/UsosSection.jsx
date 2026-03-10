import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

export default function UsosSection({ usos }) {
  return (
    <section className="usos-section">
      <div className="usos-container">
        <h2 className="usos-title">
          NO ES PROMESA <span>·</span> ES FIJACIÓN
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={2} // En mobile se ve uno y una pista del otro
          centeredSlides={false}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 3,
              centeredSlides: false,
              allowTouchMove: false, // Bloqueamos el carrusel en PC
              pagination: false,     // Ocultamos puntos en PC
              spaceBetween: 36      
            }
          }}
          className="usos-swiper"
        >
          {usos.map((uso, i) => (
            <SwiperSlide key={i}>
              <UsoItem uso={uso} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function UsoItem({ uso }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="uso-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img 
        src={hovered ? uso.hoverImage : uso.image} 
        alt={uso.text} 
        style={{ transition: 'opacity 0.3s ease' }}
      />
      <p>{uso.text}</p>
    </div>
  );
}