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
  const [cantidad, setCantidad] = useState(1);
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

        <div className={`productos-grid ${categoriaActiva === "gel" && !soloCard ? "layout-gel-triple" : ""}`}>
          
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="grid-item-kaizen">
              {producto.categoria === "gel" ? (
                <>
                  {/* COLUMNA 1: PEINADO */}
                  <div className="peinado-vertical-wrapper">
                    <img src="/assets/peinado-1.jpg" alt="Peinado" className="img-peinado-vertical" />
                  </div>

                  {/* COLUMNA 2: INFO Y GEL */}
                  <div className="info-compra-wrapper">
                    <div className="wrapper-gel-premium">
                      <GelFeatured 
                        precio={producto.precio}
                        onClick={() => { setProductoSeleccionado(producto); setPage('detalle'); }}
                        hideButton={true}
                        hidePrice={true} 
                        showHint={!soloCard} 
                      />
                    </div>

                    <div className="acciones-compra-inicio">
                      {/* PRECIO CON AIRE */}
                      <span className="gel-featured-price">${producto.precio?.toLocaleString()}</span>
                      
                      {!producto.sinStock && (
                        <div className="selector-cantidad-home">
                          <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                          <span>{cantidad}</span>
                          <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                        </div>
                      )}
                      
                      <button 
                        className={`btn-agregar-home ${producto.sinStock ? 'btn-disabled' : ''}`}
                        disabled={producto.sinStock}
                        onClick={() => !producto.sinStock && addToCart(producto, cantidad)}
                      >
                        {producto.sinStock ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
                      </button>

                      {/* SELLOS CON MÁS MARGEN ABAJO */}
                      <div className="gel-trust-badges">
                        <img src="/assets/cruelty-free.png" alt="Sellos" className="img-sellos-calidad" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <ProductoCard producto={producto} setPage={setPage} setProductoSeleccionado={setProductoSeleccionado} />
              )}
            </div>
          ))}

          {/* COLUMNA 3: VIDEO */}
          {categoriaActiva === "gel" && !soloCard && (
            <div className="video-suelto-match vertical-mode">
              <div className="video-wrapper-home">
                <video ref={videoRef} src="/assets/productos/video-gel.mp4" autoPlay muted={isMuted} loop playsInline className="video-content-home" />
                <button className="video-volume-btn" onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
              </div>
              <div className="video-info-home">
                <h3 className="video-nombre-home">Fijación Profesional</h3>
                <p className="video-desc-home">Textura ideal para trenzas y peinados de alta precisión.</p>
                <div className="badge-wrapper-anmat"><span className="badge-anmat-violeta">Aprobado por ANMAT</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}