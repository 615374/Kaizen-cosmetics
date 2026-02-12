import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function buildGallery(producto) {
  if (producto.variantes && producto.variantes.length > 0) {
    return producto.variantes.map(v => ({
      src: v.imagen,
      variantId: v.id,
    }));
  }

  if (producto.imagenes && producto.imagenes.length > 0) {
    return producto.imagenes.map(img => ({
      src: img,
      variantId: null,
    }));
  }

  return [];
}


const formatLabel = text =>
  text
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

export default function ProductoDetalle({
  producto,
  setPage,
  setCategoriaActiva,
  setSubcategoriaActiva,
}) {
  if (!producto) return null;

  const { addToCart } = useCart();

  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [varianteActiva, setVarianteActiva] = useState(null);
  const [cantidad, setCantidad] = useState(1);

 useEffect(() => {
  const unifiedGallery = buildGallery(producto);
  setGallery(unifiedGallery);

  // 🔑 IMAGEN PRINCIPAL INICIAL
  if (producto.variantes?.length) {
    // Producto con variantes
    setVarianteActiva(null);
    setActiveIndex(-1); // <- estado especial: imagen general
  } else {
    // Producto sin variantes
    setVarianteActiva(null);
    setActiveIndex(0);
  }

  setCantidad(1);
}, [producto]);


  const requiereVariante = producto.variantes?.length > 0;

  const stockFinal = requiereVariante
    ? varianteActiva?.stock ?? 0
    : producto.stock ?? 0;

  const incrementar = () => {
    if (cantidad < stockFinal) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    if (requiereVariante && !varianteActiva) {
      alert("Seleccioná una variante");
      return;
    }

    addToCart(
      {
        id: varianteActiva ? varianteActiva.id : producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: gallery[activeIndex]?.src,
        variant: varianteActiva ? varianteActiva.label : null,
        stock: stockFinal,
      },
      cantidad
    );

    setCantidad(1);
  };

  const imagenPrincipal =
  activeIndex === -1
    ? producto.imagen
    : gallery[activeIndex]?.src;


  return (
    <section className="producto-detalle-wrapper">
      <section className="producto-detalle">

        {/* IMAGEN */}
        <div className="detalle-img-wrapper">
          <img src={imagenPrincipal} alt={producto.nombre} />

          {producto.sinStock && (
            <span className="badge-sin-stock">Sin stock</span>
          )}

          {/* GALERÍA */}
          {gallery.length > 1 && (
            <div className="detalle-galeria-wrapper">
              <div className={`detalle-galeria ${ gallery.length > 4 ? "con-scroll" : ""}`}>                
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`thumb ${activeIndex === index ? "active" : ""}`}
                    onClick={() => {
                      setActiveIndex(index);

                      if (img.variantId) {
                        const v = producto.variantes.find(
                          v => v.id === img.variantId
                        );
                        setVarianteActiva(v);
                      }

                      setCantidad(1);
                    }}
                  >
                    <img src={img.src} alt={`Vista ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="detalle-info">

          {/* BREADCRUMB */}
          <nav className="breadcrumb">
            <span onClick={() => setPage("inicio")}>Inicio</span>
            <span>/</span>

            <span
              onClick={() => {
                setCategoriaActiva(null);
                setSubcategoriaActiva(null);
                setPage("productos");
              }}
            >
              Productos
            </span>
            <span>/</span>

            {producto.categoria === "herramientas" && (
              <>
                <span
                  onClick={() => {
                    setCategoriaActiva("herramientas");
                    setSubcategoriaActiva(null);
                    setPage("productos");
                  }}
                >
                  Herramientas para peinar
                </span>

                {producto.subcategoria && (
                  <>
                    <span>/</span>
                    <span
                      onClick={() => {
                        setCategoriaActiva("herramientas");
                        setSubcategoriaActiva(producto.subcategoria);
                        setPage("productos");
                      }}
                    >
                      {formatLabel(producto.subcategoria)}
                    </span>
                  </>
                )}
                <span>/</span>
              </>
            )}

            <span className="active">{producto.nombre}</span>
          </nav>

          <h1>{producto.nombre}</h1>

          {/* PRECIOS */}
          <div className="detalle-precios">
            <span className="detalle-precio-actual">
              ${producto.precio.toLocaleString()}
            </span>

            {producto.precioAnterior && (
              <span className="detalle-precio-anterior">
                ${producto.precioAnterior.toLocaleString()}
              </span>
            )}
          </div>

          <p className="detalle-efectivo">
            💳 ${Math.round(producto.precio * 0.9).toLocaleString()} pagando con Efectivo (solo disponible para RETIRAR)
          </p>

          {/* VARIANTES */}
          {producto.variantes && (
            <div className="variantes">
              <p className="variantes-label">
                COLOR:{" "}
                <strong>
                  {varianteActiva ? varianteActiva.label : "SELECCIONAR"}
                </strong>
              </p>

              <div className="variantes-colores">
                {producto.variantes.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    className={`color-dot ${
                      varianteActiva?.id === v.id ? "active" : ""
                    } ${v.stock === 0 ? "sin-stock" : ""}`}
                    style={{ backgroundColor: v.color }}
                    onClick={() => {
                      if (v.stock === 0) return;

                      setVarianteActiva(v);

                      const index = gallery.findIndex(
                        img => img.variantId === v.id
                      );
                      if (index !== -1) setActiveIndex(index);

                      setCantidad(1);
                    }}
                    title={v.label}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CANTIDAD + CTA */}
          
{requiereVariante && !varianteActiva ? (
  <>
    <div className="cantidad-selector">
      <button disabled>-</button>
      <span>1</span>
      <button disabled>+</button>
    </div>

    <button className="btn-disabled" disabled>
      SELECCIONÁ UN COLOR PARA AGREGAR
    </button>
  </>
) : producto.sinStock || stockFinal === 0 ? (
  <>
    <div className="cantidad-selector">
      <button disabled>-</button>
      <span>1</span>
      <button disabled>+</button>
    </div>

    <button className="btn-disabled" disabled>
      SIN STOCK
    </button>
  </>
) : (
  <>
    <div className="cantidad-selector">
      <button onClick={decrementar}>-</button>
      <span>{cantidad}</span>
      <button onClick={incrementar}>+</button>
    </div>

    <button className="btn-primary" onClick={handleAddToCart}>
      AGREGAR AL CARRITO
    </button>
  </>
)}


          {/* DESCRIPCIÓN */}
          <section className="producto-descripcion-extendida">
            {producto.descripcion?.intro && <p>{producto.descripcion.intro}</p>}
            {producto.descripcion?.subtitulo && (
              <h4>{producto.descripcion.subtitulo}</h4>
            )}
            {producto.descripcion?.items && (
              <ul>
                {producto.descripcion.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {producto.descripcion?.cierre && (
              <p>{producto.descripcion.cierre}</p>
            )}
          </section>
        </div>
      </section>
    </section>
  );
}
