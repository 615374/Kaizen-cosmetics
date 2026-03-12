export default function ProductoCard({ producto, setPage, setProductoSeleccionado }) {
  
  // Si tiene variantes, chequea que al menos una tenga stock > 0.
  // Si no tiene variantes, chequea el stock directo del producto.
  const sinStockReal = producto.variantes 
    ? !producto.variantes.some(v => v.stock > 0) 
    : producto.stock === 0;

  return (
    <div
      className="producto-card"
      onClick={() => {
        setProductoSeleccionado(producto);
        setPage("detalle");
        window.scrollTo(0, 0);
      }}
    >
      {/* IMAGEN */}
      <div className="producto-img-wrapper">
        <img src={producto.imagen} alt={producto.nombre} />

        {/* BADGE SIN STOCK */}
        {sinStockReal && (
          <span className="badge-sin-stock">Sin stock</span>
        )}

        {/* BADGE DESCUENTO */}
        {producto.descuento && (
          <span className="badge-descuento">{producto.descuento}% OFF</span>
        )}
      </div>

      {/* INFO */}
      <div className="producto-info">
        <h3 className="producto-nombre">{producto.nombre}</h3>

        <div className="producto-precios">
          {/* Mostramos el precio anterior solo si existe */}
          {producto.precioAnterior && (
            <span className="precio-anterior">
              ${producto.precioAnterior.toLocaleString()}
            </span>
          )}

          <span className="producto-precio">
            ${producto.precio.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}