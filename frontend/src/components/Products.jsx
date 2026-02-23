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

  const productosFiltrados = productos.filter((p) => {
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

  const esModoGel = categoriaActiva === "gel" && !soloCard;

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
              <span className="active">
                {categoriaActiva === "gel" ? "Gel capilar" : "Herramientas"}
              </span>
            </nav>
            <h2 className="productos-title">{titulo}</h2>

            {/* BARRA RECUPERADA CON TU CLASE ORIGINAL */}
            {categoriaActiva === "herramientas" && (
              <div className="subcategorias">
                <button 
                  className={!subcategoriaActiva ? "active" : ""} 
                  onClick={() => setSubcategoriaActiva(null)}
                >
                  Todos
                </button>
                {SUBCATEGORIAS_HERRAMIENTAS.map((sub) => (
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
          </>
        )}

        <div className={`productos-grid ${esModoGel ? "layout-gel-triple" : "grid-herramientas-estandar"}`}>
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className={esModoGel ? "grid-item-kaizen" : "producto-card-wrapper"}>
              {producto.categoria === "gel" ? (
                <>
                  <div className="peinado-vertical-wrapper">
                    <img src="/assets/peinado-1.jpg" alt="Peinado" className="img-peinado-vertical" />
                    <div className="video-info-home" style={{ marginTop: "15px" }}>
                      <h3 className="video-nombre-home">Fijación Profesional</h3>
                      <p className="video-desc-home">Textura ideal para trenzas y peinados de alta precisión.</p>
                    </div>
                  </div>

                  <div className="info-compra-wrapper">
                    <div className="wrapper-gel-premium">
                      <GelFeatured
                        precio={producto.precio}
                        onClick={() => { setProductoSeleccionado(producto); setPage("detalle"); }}
                        hideButton={true} hidePrice={true} showHint={!soloCard}
                      />
                    </div>
                    <div className="acciones-compra-inicio">
                      <span className="gel-featured-price">${producto.precio?.toLocaleString()}</span>
                      {!producto.sinStock && (
                        <div className="selector-cantidad-home">
                          <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                          <span>{cantidad}</span>
                          <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                        </div>
                      )}
                      <button 
                        className={`btn-agregar-home ${producto.sinStock ? "btn-disabled" : ""}`}
                        disabled={producto.sinStock}
                        onClick={() => !producto.sinStock && addToCart(producto, cantidad)}
                      >
                        {producto.sinStock ? "SIN STOCK" : "AGREGAR AL CARRITO"}
                      </button>
                      <div className="gel-trust-badges">
                        <img src="/assets/cruelty-free.png" alt="Sellos" className="img-sellos-calidad" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <ProductoCard
                  producto={producto}
                  setPage={setPage}
                  setProductoSeleccionado={setProductoSeleccionado}
                />
              )}
            </div>
          ))}

          {esModoGel && (
            <div className="video-suelto-match vertical-mode">
              <div className="video-wrapper-home" style={{ height: "480px" }}>
                <video ref={videoRef} src="/assets/productos/video-gel.mp4" autoPlay muted={isMuted} loop playsInline className="video-content-home" />
                <button className="video-volume-btn" onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
              </div>
              <div className="video-info-home" style={{ marginTop: "15px" }}>
                <h3 className="video-nombre-home" style={{ color: "var(--brand-purple)" }}>Libre de crueldad animal</h3>
                <p className="video-desc-home">Libre de Parabenos, Petrolato, Siliconas y Aceite Mineral.</p>
                <div className="badge-wrapper-anmat" style={{ marginTop: "10px" }}>
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