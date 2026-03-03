export default function GelFeatured({ 
  precio, 
  onClick, 
  hideButton = false, 
  hidePrice = false, // Nueva prop para controlar el signo $
  showHint = false 
}) {
  const imagePath = "/assets/productos/gel-flotante.png";

  return (
    <div className="gel-featured-container" onClick={onClick} style={{ cursor: 'pointer' }}>
      
      {/*FLECHA (HINT) */}
      {showHint && (
        <div className="gel-hint-wrapper">
          <svg className="curvy-arrow" width="80" height="80" viewBox="0 0 100 100">
            <path 
              d="M20,20 Q50,0 80,40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>
          </svg>
          <p className="hint-text">Click para ver<br/>detalles</p>
        </div>
      )}

      {/* PRODUCTO Y SOMBRA */}
      <div className="gel-floating-wrapper">
        <img src={imagePath} alt="Gel Kaizen Pro" className="gel-featured-image" />
        <div className="gel-shadow"></div>
      </div>

      {/* INFO (PRECIO Y BOTÓN) */}
      <div className="gel-featured-info">
        {/* Solo mostramos el precio si NO está oculto */}
        {!hidePrice && (
          <span className="gel-featured-price">${precio?.toLocaleString()}</span>
        )}

        {/* El botón se mantiene si hideButton es false */}
        {!hideButton && (
          <button 
            className="gel-featured-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            LO QUIERO
          </button>
        )}
      </div>
    </div>
  );
}