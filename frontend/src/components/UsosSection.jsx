import { useState } from "react";

export default function UsosSection({ usos }) {
  return (
    <section className="usos-section">
      <div className="usos-container">
        <h2 className="usos-title">
          NO ES PROMESA <span>·</span> ES FIJACIÓN
        </h2>

        <div className="usos-strip">
          {usos.map((uso, i) => (
            <UsoItem key={i} uso={uso} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-componente corregido para usar las imágenes del data
function UsoItem({ uso }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="uso-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mantenemos la estructura de clases original */}
      <img 
        src={hovered ? uso.hoverImage : uso.image} 
        alt={uso.text} 
        style={{ transition: 'opacity 0.3s ease' }} // Suavizado opcional inline
      />
      <p>{uso.text}</p>
    </div>
  );
}