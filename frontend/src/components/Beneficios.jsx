import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCreditCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

export default function Beneficios() {
  return (
    <section className="beneficios-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1} 
        pagination={{ clickable: true }} 
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          // Desktop: >= 768px
          768: {
            slidesPerView: 3,
            allowTouchMove: false, 
            autoplay: false,     
          }
        }}
        className="beneficios-container"
      >
        <SwiperSlide>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className="beneficio-content">
              <h3>ENVÍOS A TODO EL PAÍS</h3>
              <p>Gratis a partir de $50.000</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="beneficio-content">
              <h3>HASTA 3 CUOTAS SIN INTERÉS</h3>
              <p>En tarjetas de crédito</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="beneficio-content">
              <h3>COMPRÁ CON SEGURIDAD</h3>
              <p>Tus datos siempre protegidos</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}