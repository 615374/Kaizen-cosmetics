import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import visa from "/assets/pagos/visa.png";
import mastercard from "/assets/pagos/mastercard.png";
import cabal from "/assets/pagos/cabal.png";
import naranja from "/assets/pagos/naranjax.png";
import maestro from '/assets/pagos/maestro.png'
import nativa from '/assets/pagos/nativa.png'
import tarjetashopping from '/assets/pagos/tarjetashopping.png'
import argencard from '/assets/pagos/argencard.png'
import americanexpress from '/assets/pagos/americanexpress.png'
import diners from '/assets/pagos/diners.png'
import mercadopago from "/assets/pagos/mercadopago.png";
import transferencia from '/assets/pagos/transferencia.png'

import andreani from "/assets/envios/andreani.png";
import moto from "/assets/envios/moto.png";
import retiro from "/assets/envios/retiro.png";

export default function Footer() {
  return (
   <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div>
              <h4>MEDIOS DE PAGO</h4>
              <div className="payment-icons">
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="Mastercard" />
                <img src={americanexpress} alt="American Express" />
                <img src={maestro} alt="Maestro" />
                <img src={cabal} alt="Cabal" />
                <img src={naranja} alt="NaranjaX" />
                <img src={nativa} alt="Nativa" />
                <img src={tarjetashopping} alt="Tarjeta Shopping" />
                <img src={argencard} alt="Argencard" />
                <img src={diners} alt="Diners" />
                <img src={mercadopago} alt="Mercado Pago" />
                <img src={transferencia} alt="Transferencia bancaria" />
              </div>
            </div>

            <div>
              <h4>FORMAS DE ENVIO</h4>
              <div className="shipping-icons">
                <img src={andreani} alt="Andreani" />
                <img src={moto} alt="Moto mensajería" />
                <img src={retiro} alt="Retiro en punto" />
              </div>
            </div>

            <div>
              <h4>CONTACTANOS</h4>
              <div className="contact-info">
                <p>
                  <FontAwesomeIcon icon={faPhone} /> +54 11 5629-0605
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} /> kaizencosmetics33@gmail.com
                </p>
              </div>
            </div>

            <div>
              <h4>UBICACION</h4>
              <div className="map-container">
                <a href="https://maps.app.goo.gl/1577G6BXi41RAUvw8" target="_blank" rel="noopener noreferrer">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4839837442753!2d-58.44919792347179!3d-34.61834097295733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e11!2sCaballito%2C%20CABA!5e0!3m2!1ses!2sar!4v1234567890"
                    width="100%"
                    height="150"
                    style={{ border: 0, borderRadius: '8px', pointerEvents: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Kaizen Cosmetics"
                  ></iframe>
                </a>
              </div>
            </div>
          </div>
          
          <p className="footer-copyright">Kaizen Cosmetics - 2026 © Todos los derechos reservados</p>
        </div>
      
    </footer>

  );
}
