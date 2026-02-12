import { productos } from "../data/productos";
import ProductoCard from "./ProductCard";


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
}) {
  const productosFiltrados = productos.filter(p => {
    if (categoriaActiva === "gel") {
      return p.categoria === "gel";
    }

    if (categoriaActiva === "herramientas") {
      if (!subcategoriaActiva) {
        return p.categoria === "herramientas";
      }
      return (
        p.categoria === "herramientas" &&
        p.subcategoria === subcategoriaActiva
      );
    }

    return true;
  });

  const titulo = {
   gel: "Gel capilar",
   herramientas: "Herramientas para peinar",
  }[categoriaActiva] || "Productos";

  return (
    <section className="productos-section">
      <div className="productos-container">
        <nav className="breadcrumb">
         <span onClick={() => setPage("inicio")}>Inicio</span>
         <span>/</span>
         <span onClick={() => setPage("productos")}>Productos</span>
         <span>/</span>
         <span className="active">
         {categoriaActiva === "herramientas"
         ? "Herramientas para peinar"
         : "Gel capilar"}
         </span>
      </nav>


      <h2 className="productos-title">{titulo}</h2>

      {/* SUBCATEGORÍAS */}
      {categoriaActiva === "herramientas" && (
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

      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            setPage={setPage}
            setProductoSeleccionado={setProductoSeleccionado}
          />
        ))}
      </div>
      </div>
    </section>
  );
}