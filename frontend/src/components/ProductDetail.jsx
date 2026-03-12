import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { productos } from "../data/productos";
import ProductoCard from "./ProductCard";

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
  setProductoSeleccionado,
  setCategoriaActiva,
  setSubcategoriaActiva,
}) {
  if (!producto) return null;

  const { addToCart } = useCart();
  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [varianteActiva, setVarianteActiva] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // Determinamos si el producto globalmente no tiene stock
  const sinStockGlobal = producto.variantes 
    ? !producto.variantes.some(v => v.stock > 0) 
    : producto.stock === 0;

  const relacionados = productos
    .filter(p => p.id !== producto.id)
    .slice(0, 4);

  useEffect(() => {
    const unifiedGallery = buildGallery(producto);
    setGallery(unifiedGallery);

    if (producto.variantes?.length) {
      setVarianteActiva(null);
      setActiveIndex(-1);
    } else {
      setVarianteActiva(null);
      setActiveIndex(0);
    }
    setCantidad(1);
    window.scrollTo(0, 0);
  }, [producto]);

  const requiereVariante = producto.variantes?.length > 0;
  const stockFinal = requiereVariante
    ? varianteActiva?.stock ?? 0
    : producto.stock ?? 0;

  const incrementar = () => { if (cantidad < stockFinal) setCantidad(cantidad + 1); };
  const decrementar = () => { if (cantidad > 1) setCantidad(cantidad - 1); };

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
        imagen: activeIndex === -1 ? producto.imagen : gallery[activeIndex]?.src,
        variant: varianteActiva ? varianteActiva.label : null,
        stock: stockFinal,
      },
      cantidad
    );
    setCantidad(1);
  };

  const imagenPrincipal = activeIndex === -1 ? producto.imagen : gallery[activeIndex]?.src;

  const renderContenidoLimpio = (texto) => {
    if (!texto) return null;
    const colores = { "ANMAT": "#c469d4", "Palta": "#30ad36", "Almendras": "#b67963", "Jojoba": "#4e1b69", "Aloe Vera": "#00bcd4", "Lino": "#ff9800", "Textura": "#4e1b69" };
    if (producto.id !== "gel-capilar") return <span>{texto}</span>;
    const [titulo, ...detalle] = texto.split('\n');
    let colorFinal = "#4b4949";
    Object.keys(colores).forEach(key => { if (titulo.includes(key)) colorFinal = colores[key]; });
    return (
      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <strong style={{ color: colorFinal, fontWeight: '900', fontSize: '1rem', display: 'block', lineHeight: '1.2' }}>{titulo}</strong>
        {detalle.length > 0 && (
          <span style={{ color: '#666', fontSize: '0.92rem', marginTop: '3px', display: 'block', lineHeight: '1.4' }}>{detalle.join('\n')}</span>
        )}
      </div>
    );
  };

  return (
    <section className="producto-detalle-wrapper">
      <section className="producto-detalle">

        {/* IMAGEN PRINCIPAL */}
        <div className="detalle-img-wrapper">
          <div className="contenedor-principal-fix">
            <img src={imagenPrincipal} alt={producto.nombre} className="detalle-img-principal" />
            {/* Badge sin stock */}
            {sinStockGlobal && <span className="badge-sin-stock">Sin stock</span>}
          </div>

          {gallery.length > 1 && (
            <div className="detalle-galeria-wrapper">
              <div className={`detalle-galeria ${gallery.length > 4 ? "con-scroll" : ""}`}>
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    className={`thumb ${activeIndex === index ? "active" : ""}`}
                    onClick={() => {
                      setActiveIndex(index);
                      if (img.variantId) {
                        const v = producto.variantes.find(v => v.id === img.variantId);
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

        {/* INFO Y COMPRA */}
        <div className="detalle-info">
          <nav className="breadcrumb">
            <span onClick={() => setPage("inicio")}>Inicio</span> / 
            <span onClick={() => { setCategoriaActiva(null); setSubcategoriaActiva(null); setPage("productos"); }}> Productos</span> / 
            <span className="active">{producto.nombre}</span>
          </nav>

          <h1>{producto.nombre}</h1>

          <div className="detalle-precios">
            <span className="detalle-precio-actual">${producto.precio.toLocaleString()}</span>
            {producto.precioAnterior && <span className="detalle-precio-anterior">${producto.precioAnterior.toLocaleString()}</span>}
          </div>

          <p className="detalle-efectivo">
            💳 ${Math.round(producto.precio * 0.9).toLocaleString()} pagando con Efectivo (solo Retiro)
          </p>

          {/* VARIANTES */}
          {producto.variantes && (
            <div className="variantes">
              <p className="variantes-label">COLOR: <strong>{varianteActiva ? varianteActiva.label : "SELECCIONAR"}</strong></p>
              <div className="variantes-colores">
                {producto.variantes.map(v => (
                  <button
                    key={v.id}
                    className={`color-dot ${varianteActiva?.id === v.id ? "active" : ""} ${v.stock === 0 ? "sin-stock" : ""}`}
                    style={{ backgroundColor: v.color }}
                    onClick={() => { 
                      if (v.stock > 0) { 
                        setVarianteActiva(v); 
                        const idx = gallery.findIndex(img => img.variantId === v.id); 
                        if (idx !== -1) setActiveIndex(idx); 
                        setCantidad(1); 
                      } 
                    }}
                    title={v.label}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA SECCIÓN ACTUALIZADA */}
          <div className="compra-acciones-container">
            {!requiereVariante || varianteActiva ? (
              <>
                <div className="cantidad-selector">
                  <button onClick={decrementar} disabled={stockFinal === 0}>-</button>
                  <span>{cantidad}</span>
                  <button onClick={incrementar} disabled={stockFinal === 0}>+</button>
                </div>
                {/* Botón dinámico: si no hay stock del color elegido o del producto, se bloquea */}
                <button 
                  className={stockFinal === 0 ? "btn-disabled" : "btn-primary"} 
                  onClick={handleAddToCart} 
                  disabled={stockFinal === 0}
                >
                  {stockFinal === 0 ? "SIN STOCK" : "AGREGAR AL CARRITO"}
                </button>
              </>
            ) : (
              <button className="btn-disabled" disabled>SELECCIONÁ UN COLOR</button>
            )}
          </div>

          {/* DESCRIPCIÓN DINÁMICA... (Sin cambios) */}
          <section className="producto-descripcion-extendida">
            {producto.descripcion?.intro && (
              <div className="desc-bloque">
                {producto.descripcion.intro.split('\n\n').map((p, i) => (
                  <div key={i}>{renderContenidoLimpio(p)}</div>
                ))}
              </div>
            )}
            {producto.descripcion?.subtitulo && (
              <h4 style={{ color: '#4e1b69', fontWeight: '900', margin: '25px 0 15px' }}>
                {producto.descripcion.subtitulo}
              </h4>
            )}
            {producto.descripcion?.items && (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {producto.descripcion.items.map((item, index) => (
                  <li key={index} style={{ position: 'relative', paddingLeft: producto.id === "gel-capilar" ? '20px' : '0' }}>
                    {producto.id === "gel-capilar" && (
                      <span style={{ position: 'absolute', left: 0, top: 0, color: '#4e1b69', fontWeight: 'bold' }}>•</span>
                    )}
                    {renderContenidoLimpio(item)}
                  </li>
                ))}
              </ul>
            )}
            {producto.descripcion?.cierre && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                {producto.descripcion.cierre.split('\n\n').map((p, i) => (
                  <div key={i}>{renderContenidoLimpio(p)}</div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      {/* SECCIÓN RELACIONADOS... (Sin cambios) */}
      <section className="relacionados-section">
        <h2 className="relacionados-title">También podría interesarte</h2>
        <div className="relacionados-grid">
          {relacionados.map((item) => (
            <ProductoCard 
              key={item.id} 
              producto={item} 
              setPage={setPage} 
              setProductoSeleccionado={setProductoSeleccionado} 
            />
          ))}
        </div>
      </section>
    </section>
  );
}