import React from "react";
import { testimoniosData } from "../data/testimonios"; 


export default function Testimonios() {
  return (
    <section className="testimonios-section">
      <div className="testimonios-container">
        <h2 className="testimonios-title">TESTIMONIOS · KAIZEN GEL </h2>
        
        <div className="testimonios-grid">
          {testimoniosData.map((testimonio) => (
            <div key={testimonio.id} className="testimonio-card">
              <img 
                src={testimonio.src} 
                alt={testimonio.alt} 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}