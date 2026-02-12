import Product360 from "./Product360";
import { useCart } from "../context/CartContext";



export default function PurchaseSection({ product }) {

  

  return (
    <section className="purchase-section">
      <div className="purchase-grid">

        {/* PRODUCTO */}
        <div className="purchase-product card">

          <div className="purchase-image">
            <Product360
              src={product.images[0]}
              alt={product.name}
            />
          </div>

          <div className="purchase-info">
            <h2 className="purchase-title">{product.name}</h2>

            <p className="purchase-description">
              {product.description}
            </p>

            <div className="purchase-price">
              {product.currency} ${product.price.toLocaleString()}
            </div>

            <div className="purchase-actions">
              <label className="small">Cantidad</label>

              <input
                type="number"
                value={1}
                min={1}
                disabled
              />

              <button className="btn primary" disabled>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

        {/* RESUMEN */}
        <aside className="purchase-summary card">
          <h3>Resumen de compra</h3>

          <p className="small">
            Próximamente disponible
          </p>

          <button className="btn primary" disabled>
            Pagar con Mercado Pago
          </button>

          <img
            src="/assets/resumen.jpg"
            alt="Resumen de compra"
            className="summary-image"
          />
        </aside>

      </div>
    </section>
  );
}

