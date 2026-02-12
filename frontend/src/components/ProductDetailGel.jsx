import { useState, useRef } from "react"

export default function ProductoDetalleGel({ producto, addToCart }) {
  const [imagenActiva, setImagenActiva] = useState(producto.images[0])
  const [cantidad, setCantidad] = useState(1)

  const galeriaRef = useRef(null)

  const scrollGaleria = (dir) => {
    if (!galeriaRef.current) return
    galeriaRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    })
  }

  return (
    <section className="producto-detalle-wrapper">
      <section className="producto-detalle">

        {/* IMAGEN + GALERÍA */}
        <div className="detalle-img-wrapper">
          <img
            src={imagenActiva}
            alt={producto.name}
            className="detalle-img-principal"
          />

          <div className="detalle-galeria-wrapper">
            <button
              className="galeria-arrow left"
              onClick={() => scrollGaleria("left")}
            >
              ‹
            </button>

            <div className="detalle-galeria" ref={galeriaRef}>
              {producto.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumb ${
                    imagenActiva === img ? "active" : ""
                  }`}
                  onClick={() => setImagenActiva(img)}
                >
                  <img src={img} alt={`Vista ${index + 1}`} />
                </button>
              ))}
            </div>

            <button
              className="galeria-arrow right"
              onClick={() => scrollGaleria("right")}
            >
              ›
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="detalle-info">
          <h1>{producto.name}</h1>

          <div className="detalle-precios">
            <span className="detalle-precio-actual">
              ${producto.price.toLocaleString()}
            </span>

            {producto.precioAnterior && (
              <span className="detalle-precio-anterior">
                ${producto.precioAnterior.toLocaleString()}
              </span>
            )}
          </div>

          <p className="detalle-efectivo">
            💳 ${Math.round(producto.price * 0.9).toLocaleString()} pagando con
            efectivo
          </p>

          {producto.stock === 0 ? (
            <button className="btn-disabled" disabled>
              No disponible
            </button>
          ) : (
            <>
              <div className="cantidad-selector">
                <button
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  onClick={() =>
                    cantidad < producto.stock &&
                    setCantidad(cantidad + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="btn-primary"
                onClick={() => addToCart(cantidad)}
              >
                Agregar al carrito
              </button>
            </>
          )}

          <section className="producto-descripcion-extendida">
            {producto.descripcion?.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </section>
        </div>
      </section>
    </section>
  )
}
