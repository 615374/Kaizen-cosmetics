import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTruck,
  faCreditCard,
  faLock,
} from "@fortawesome/free-solid-svg-icons"

export default function Beneficios() {
  return (
    <section className="beneficios-container">
      <div className="beneficio-item">
        <div className="beneficio-icon">
          <FontAwesomeIcon icon={faTruck} />
        </div>
        <div className="beneficio-content">
          <h3>ENVÍOS A TODO EL PAÍS</h3>
          <p>Gratis a partir de $50.000</p>
        </div>
      </div>

      <div className="beneficio-item">
        <div className="beneficio-icon">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
        <div className="beneficio-content">
          <h3>HASTA 3 CUOTAS SIN INTERÉS</h3>
          <p>En tarjetas de crédito</p>
        </div>
      </div>

      <div className="beneficio-item">
        <div className="beneficio-icon">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <div className="beneficio-content">
          <h3>COMPRÁ CON SEGURIDAD</h3>
          <p>Tus datos siempre protegidos</p>
        </div>
      </div>
    </section>
  )
}
