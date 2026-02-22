import { useState, useRef, useEffect } from "react";

export default function ProductoDetalleGel({ producto, addToCart }) {
  const [imagenActiva, setImagenActiva] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const galeriaRef = useRef(null);

  useEffect(() => {
    if (producto) {
      // Priorizamos el array 'imagenes' para la miniatura inicial
      const inicial = producto.imagenes?.[0] || producto.imagen || "";
      setImagenActiva(inicial);
      setCantidad(1);
    }
  }, [producto]);

  if (!producto) return null;

  // CORRECCIÓN AQUÍ: Definimos qué vamos a mapear en la galería
  // Si existe el array 'imagenes', usamos ese. Si no, usamos la 'imagen' única en un array.
  const imagenesParaGaleria = producto.imagenes && producto.imagenes.length > 0 
    ? producto.imagenes 
    : [producto.imagen].filter(Boolean);

  const scrollGaleria = (dir) => {
    if (!galeriaRef.current) return;
    galeriaRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="producto-detalle-wrapper">
      <section className="producto-detalle">
        
        <div className="detalle-img-wrapper">
          <div className="contenedor-principal-fix">
            <img
              src={imagenActiva}
              alt={producto.nombre}
              className="detalle-img-principal"
            />
            {producto.sinStock && <span className="badge-sin-stock">Sin stock</span>}
          </div>

          {/* GALERÍA CORREGIDA */}
          {imagenesParaGaleria.length > 0 && (
            <div className="detalle-galeria-wrapper">
              <button className="galeria-arrow left" onClick={() => scrollGaleria("left")}>‹</button>

              <div className="detalle-galeria" ref={galeriaRef}>
                {imagenesParaGaleria.map((img, index) => (
                  <button
                    key={index}
                    className={`thumb ${imagenActiva === img ? "active" : ""}`}
                    onClick={() => setImagenActiva(img)}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} />
                  </button>
                ))}
              </div>

              <button className="galeria-arrow right" onClick={() => scrollGaleria("right")}>›</button>
            </div>
          )}
        </div>

        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <div className="detalle-precios">
            <span className="detalle-precio-actual">${producto.precio?.toLocaleString()}</span>
            {producto.precioAnterior && (
              <span className="detalle-precio-anterior">${producto.precioAnterior.toLocaleString()}</span>
            )}
          </div>

          <p className="detalle-efectivo">
            💳 ${Math.round(producto.precio * 0.9).toLocaleString()} pagando con efectivo
          </p>

          {producto.sinStock ? (
            <button className="btn-disabled" disabled>SIN STOCK</button>
          ) : (
            <>
              <div className="cantidad-selector">
                <button onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}>-</button>
                <span>{cantidad}</span>
                <button onClick={() => setCantidad(cantidad + 1)}>+</button>
              </div>
              <button className="btn-primary" onClick={() => addToCart(producto, cantidad)}>
                AGREGAR AL CARRITO
              </button>
            </>
          )}

          <section className="producto-descripcion-extendida">
            {producto.descripcion?.encabezado?.map((txt, i) => (
              <p key={i}><strong>{txt}</strong></p>
            ))}
            {producto.descripcion?.intro && <p>{producto.descripcion.intro}</p>}
            {producto.descripcion?.subtitulo && <h4>{producto.descripcion.subtitulo}</h4>}
            {producto.descripcion?.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </section>
        </div>
      </section>
    </section>
  );
}
