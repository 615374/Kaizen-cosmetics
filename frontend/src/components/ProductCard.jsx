export default function ProductoCard({ producto, setPage, setProductoSeleccionado }) {
  return (
    <div
      className="producto-card"
      onClick={() => {
        setProductoSeleccionado(producto);
        setPage("detalle");
      }}
    >
      {/* IMAGEN */}
      <div className="producto-img-wrapper">
        <img src={producto.imagen} alt={producto.nombre} />

        {/* BADGE SIN STOCK */}
        {producto.sinStock && (
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
          <span className="precio-anterior">
            ${producto.precioAnterior.toLocaleString()}
          </span>

          <span className="producto-precio">
            ${producto.precio.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}




