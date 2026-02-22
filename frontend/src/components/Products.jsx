import { useState, useRef } from "react";
import { productos } from "../data/productos";
import ProductoCard from "./ProductCard";
import GelFeatured from "./GelFeatured"; 
import { useCart } from "../context/CartContext";

const SUBCATEGORIAS_HERRAMIENTAS = [
  { id: "cepillos", label: "Cepillos baby hair" },
  { id: "espatulas", label: "Espátulas" },
  { id: "peines", label: "Peines" },
  { id: "pulseras", label: "Pulseras" },
];

export default function Productos({
  categoriaActiva,
  subcategoriaActiva,
  setSubcategoriaActiva,
  setPage,
  setProductoSeleccionado,
  soloCard = false,
}) {
  const { addToCart } = useCart();
  
  // Estado para la cantidad seleccionada en esta pantalla
  const [cantidad, setCantidad] = useState(1);

  // Lógica de Volumen para el Video lateral
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const productosFiltrados = productos.filter(p => {
    if (categoriaActiva === "gel") return p.categoria === "gel";
    if (categoriaActiva === "herramientas") {
      if (!subcategoriaActiva) return p.categoria === "herramientas";
      return p.categoria === "herramientas" && p.subcategoria === subcategoriaActiva;
    }
    return true;
  });

  const titulo = {
    gel: "Gel Kaizen",
    herramientas: "Herramientas para peinar",
  }[categoriaActiva] || "Productos";

  return (
    <section className={`productos-section ${soloCard ? "modo-minimalista" : ""}`}>
      <div className="productos-container">
        {!soloCard && (
          <>
            <nav className="breadcrumb">
              <span onClick={() => setPage("inicio")}>Inicio</span>
              <span>/</span>
              <span onClick={() => setPage("productos")}>Productos</span>
              <span>/</span>
              <span className="active">{categoriaActiva === "gel" ? "Gel capilar" : "Herramientas"}</span>
            </nav>
            <h2 className="productos-title">{titulo}</h2>
          </>
        )}

        {/* SUBCATEGORÍAS (Solo visible en herramientas y si no es soloCard) */}
        {categoriaActiva === "herramientas" && !soloCard && (
          <div className="subcategorias">
            <button
              className={!subcategoriaActiva ? "active" : ""}
              onClick={() => setSubcategoriaActiva(null)}
            >
              Todas
            </button>
            {SUBCATEGORIAS_HERRAMIENTAS.map(sub => (
              <button
                key={sub.id}
                className={subcategoriaActiva === sub.id ? "active" : ""}
                onClick={() => setSubcategoriaActiva(sub.id)}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        <div className={`productos-grid ${categoriaActiva === "gel" && !soloCard ? "layout-gel-simetrico" : ""}`}>
          
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="columna-producto-gel">
              
              {/* RENDERIZADO DEL PRODUCTO: Gel Premium*/}
              {producto.categoria === "gel" ? (
                <div className="wrapper-gel-premium">
                  <GelFeatured 
                    precio={producto.precio}
                    onClick={() => {
                    setProductoSeleccionado(producto);
                    setPage('detalle');
                  }}
                 hideButton={true}
                 // IMPORTANTE: Solo mostramos la flecha si NO es soloCard (o sea, si estamos en la sección productos)
                showHint={!soloCard} 
               />
                </div>
              ) : (
                <ProductoCard
                  producto={producto}
                  setPage={setPage}
                  setProductoSeleccionado={setProductoSeleccionado}
                />
              )}
              
              {/* ACCIONES DE COMPRA*/}
              {categoriaActiva === "gel" && (
                <div className="acciones-compra-inicio">
                  {!producto.sinStock && (
                  <div className="selector-cantidad-home">
                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                  </div>
                  )}
                   
                   {producto.sinStock ? (
                   <button className="btn-agregar-home btn-disabled" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                   SIN STOCK
                  </button>
                   ) : (
                  <button 
                    className="btn-agregar-home"
                    onClick={() => {
                      addToCart(producto, cantidad);
                    }}
                  >
                    AGREGAR AL CARRITO
                  </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* VIDEO LATERAL*/}
          {categoriaActiva === "gel" && !soloCard && (
            <div className="video-suelto-match vertical-mode">
              <div className="video-wrapper-home">
                <video
                  ref={videoRef}
                  src="/assets/productos/video-gel.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="video-content-home"
                />
                <button className="video-volume-btn" onClick={toggleMute}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
              </div>
              <div className="video-info-home">
                <h3 className="video-nombre-home">Fijación Profesional</h3>
                <p className="video-desc-home">
                  Textura ideal para trenzas y peinados de alta precisión.
                </p>
                <div className="badge-wrapper-anmat">
                   <span className="badge-anmat-violeta">Aprobado por ANMAT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}