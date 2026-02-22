import React from 'react';

export default function GelFeatured({ precio, onClick, hideButton = false }) {
  // Ruta directa a tu carpeta public
  const imagePath = "/assets/productos/gel-flotante.png";

  return (
    <div className="gel-featured-container" onClick={onClick}>
      <div className="gel-floating-wrapper">
        {/* Usamos la imagen de tu carpeta public */}
        <img 
          src={imagePath} 
          alt="Gel Kaizen Pro" 
          className="gel-featured-image" 
        />
        {/* Sombra proyectada */}
        <div className="gel-shadow"></div>
      </div>

      <div className="gel-featured-info">
        <span className="gel-featured-price">${precio?.toLocaleString()}</span>
        {/* Solo mostramos el botón si NO pasamos hideButton */}
        {!hideButton && <button className="gel-featured-btn">LO QUIERO</button>}
      </div>
    </div>
  );
}