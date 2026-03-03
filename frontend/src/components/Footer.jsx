import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTiktok, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

import visa from "/assets/pagos/visa.png";
import mastercard from "/assets/pagos/mastercard.png";
import americanexpress from "/assets/pagos/americanexpress.png";
import maestro from '/assets/pagos/maestro.png';
import cabal from "/assets/pagos/cabal.png";
import naranja from "/assets/pagos/naranjax.png";
import nativa from '/assets/pagos/nativa.png';
import tarjetashopping from '/assets/pagos/tarjetashopping.png';
import argencard from '/assets/pagos/argencard.png';
import diners from '/assets/pagos/diners.png';
import mercadopago from "/assets/pagos/mercadopago.png";
import transferencia from '/assets/pagos/transferencia.png';

import andreani from "/assets/envios/andreani.png";
import moto from "/assets/envios/moto.png";
import retiro from "/assets/envios/retiro.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          
          {/* COLUMNA 1: MEDIOS DE PAGO */}
          <div className="footer-col">
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

          {/* COLUMNA 2: FORMAS DE ENVIO Y REDES */}
          <div className="footer-col central-col">
            <div className="shipping-wrapper">
              <h4>FORMAS DE ENVIO</h4>
              <div className="shipping-icons">
                <img src={andreani} alt="Andreani" />
                <img src={moto} alt="Moto mensajería" />
                <img src={retiro} alt="Retiro en punto" />
              </div>
            </div>

            <div className="social-footer-section">
              <h4>SEGUINOS</h4>
              <div className="social-icons-row">
                <a href="https://www.instagram.com/kaizencosmetics_" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.tiktok.com/@kaizencosmetics_" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
                <a href="https://www.youtube.com/@KaizenCosmetics" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTANOS Y FIRMA DESARROLLADOR */}
          <div className="footer-col">
            <div className="contact-section">
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

            {/* Crédito con estética de sección oficial */}
            <div className="dev-footer-section">
              <h4>DESARROLLADO POR</h4>
              <div className="dev-icon-row">
                <a 
                  href="https://github.com/615374" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 4: UBICACION */}
          <div className="footer-col">
            <h4>UBICACION</h4>
            <div className="map-container">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.123!2d-58.520!3d-34.650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM5JzAwLjAiUyA1OMKwMzEnMTIuMCJX!5e0!3m2!1ses-419!2sar!4v1600000000000!5m2!1ses-419!2sar"
                  width="100%"
                  height="150"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Kaizen Cosmetics"
                ></iframe>
              </a>
            </div>
          </div>
        </div>

        <p className="footer-copyright">
          Kaizen Cosmetics - 2026 © Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}