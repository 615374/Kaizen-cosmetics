import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { testimoniosData } from "../data/testimonios"; 

export default function Testimonios() {
  return (
    <section className="testimonios-section">
      <div className="testimonios-container">
        <h2 className="testimonios-title">TESTIMONIOS · KAIZEN GEL</h2>
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}      // En mobile asoman los costados
          centeredSlides={false}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: 3500, 
            disableOnInteraction: false 
          }}
          breakpoints={{
            // A partir de 769px (Desktop) se ven los 3 fijos
            769: {
              slidesPerView: 3,
              centeredSlides: false,
              allowTouchMove: false,
              pagination: false,
              spaceBetween: 36
            }
          }}
          className="testimonios-swiper"
        >
          {testimoniosData.map((testimonio) => (
            <SwiperSlide key={testimonio.id}>
              <div className="testimonio-card">
                <img 
                  src={testimonio.src} 
                  alt={testimonio.alt} 
                  loading="lazy" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}