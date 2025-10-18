import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import productImg1 from '/assets/product-1.jpg'
import productImg2 from '/assets/product-2.jpg'
import uso1 from '/assets/uso1.jpeg'
import uso2 from '/assets/uso2.jpeg'
import uso3 from '/assets/uso3.jpeg'
import demoVideo from '/assets/video.mp4'
import logo from '/assets/logo.png' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faHouse, faBuilding, faUser, faShoppingCart, faTruck, faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons'
import trueno from '/assets/trueno.jpeg'
import joaqui from '/assets/joaqui.jpeg'
import insua from '/assets/insua.jpeg'
import jfquintero from '/assets/jfquintero.jpeg'
import nairabraids from '/assets/nairabraids.jpeg'
import trenzasbutterfly from '/assets/trenzasbutterfly.jpeg'
import trenzasconamor from '/assets/trenzasconamor.jpeg'
import kamitrenzas from '/assets/kamitrenzas.jpeg'
import bannergel1 from '/assets/bannergel1.jpeg'
import bannergel2 from '/assets/bannergel2.jpeg'
import bannergel3 from '/assets/bannergel3.jpeg'
import bannergel4 from '/assets/bannergel4.jpeg'

// Producto con stock
const PRODUCT = {
  id: 'kaizen-gel-500g',
  name: 'Kaizen — Gel Capilar 500g',
  description: 'Gel para trenzas. Fijación duradera, sin residuos. 500 g. Ideal para styling y trenzados.',
  price: 3500,
  currency: 'ARS',
  stock: 10,
  images: [productImg1, productImg2]
}

// Componente demo 360
function Product360({ src, alt }) {
  const [rotation, setRotation] = useState(0)

  const handleMove = (x, width) => {
    const percent = x / width
    setRotation((percent - 0.5) * 30)
  }

  return (
    <div
      onMouseMove={(e) => handleMove(e.nativeEvent.offsetX, e.currentTarget.offsetWidth)}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left, e.currentTarget.offsetWidth)
        }
      }}
      style={{
        perspective: '1000px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '18px 0'
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '360px',
          maxWidth: '100%',
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.12s linear',
          borderRadius: 14,
          boxShadow: '0 18px 40px rgba(0,0,0,0.18)'
        }}
      />
    </div>
  )
}

function Navbar({ setPage, cartQty }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  return (
    <>
      {/* Banner promocional animado */}
      <div className="promo-banner">
        <div className="promo-text">
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
        </div>
      </div>

      <header className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-left">
          {/* Logo irá acá cuando lo tengas */}
        </div>
        
        <div className="nav-center">
          <h1 className="nav-title">KAIZEN COSMETICS</h1>
          <p className="nav-slogan">No es promesa, es fijación</p>
        </div>

        <div className="nav-right">
          <button className="nav-btn big" onClick={() => setPage('inicio')}>
            <FontAwesomeIcon icon={faHouse} />
            <span>Inicio</span>
          </button>
          <button className="nav-btn big" onClick={() => setPage('nosotros')}>
            <FontAwesomeIcon icon={faBuilding} />
            <span>Nosotros</span>
          </button>
          
        
          {isAuthenticated ? (
            <button className="nav-btn big" onClick={() => logout({ returnTo: window.location.origin })}>
              <FontAwesomeIcon icon={faUser} />
              <span>Logout</span>
            </button>
          ) : (
            <button className="nav-btn big" onClick={() => loginWithRedirect()}>
              <FontAwesomeIcon icon={faUser} />
              <span>Cuenta</span>
            </button>
          )}

          {/* Icono de carrito */}
          <button className="nav-btn cart-btn">
            <div className="cart-icon-wrapper">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartQty > 0 && <span className="cart-badge">{cartQty}</span>}
            </div>
            <span>Carrito</span>
          </button>

        </div>
      </header>
    </>
  )
}

function Carousel() {
  const [current, setCurrent] = useState(0)
  const slides = [bannergel1, bannergel2, bannergel3, bannergel4]

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1)
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1)
  const goToSlide = (index) => setCurrent(index)

  // Auto-play cada 5 segundos
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="carousel-container">
      <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>‹</button>
      <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>›</button>
      
      <div className="carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === current ? 'carousel-slide active' : 'carousel-slide'}
          >
            {index === current && <img src={slide} alt={`Banner ${index + 1}`} />}
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [qty, setQty] = useState(1)
  const [cartQty, setCartQty] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState('inicio')
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  function addToCart() {
    if (qty + cartQty > PRODUCT.stock) {
      return alert('No hay suficiente stock disponible.')
    }
    setCartQty(cartQty + qty)
  }

  async function checkout() {
    if (!isAuthenticated) {
      return loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    }
    if (cartQty <= 0) return alert('Agrega el producto al carrito antes de continuar.')
    setLoading(true)
    try {
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: PRODUCT.id, title: PRODUCT.name, quantity: cartQty, unit_price: PRODUCT.price }]
        })
      })
      const data = await res.json()
      if (data && data.init_point) {
        window.location.href = data.init_point
      } else {
        alert('Error creando la preferencia.')
        console.log(data)
      }
    } catch (err) {
      console.error(err)
      alert('Error en checkout. Ver consola.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-root">
      <Navbar setPage={setPage} cartQty={cartQty} />

      {page === 'login' && (
        <div style={{ marginTop: '60px', marginLeft: '20px' }}>
          <h2 style={{ color: 'var(--brand-purple)', fontWeight: '700' }}>Mi cuenta</h2>
          <div id="auth-login"></div>
        </div>
      )}

      {/* CARRUSEL HERO */}
            <Carousel />

      {/* Beneficios */}
<div className="beneficios-container">
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
      <h3>HASTA 3 CUOTAS SIN INTERÉS!</h3>
      <p>En Tarjetas de crédito</p>
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
</div>

{/* Divisor con título */}
<div className="section-divider">
  <span>GEL CAPILAR</span>
</div>

      <div className="container">
        {page === 'inicio' && (
          <>
            
            {/* GRID */}
            <div className="grid">
              
               {/* Lateral */}
<aside className="uso-lateral">
  <div>
    <div className="uso-card">
      <img src={uso1} alt="Uso 1" className="uso-img" />
    </div>
    <p className="uso-text">Fijación firme y duradera</p>
  </div>
  
  <div>
    <div className="uso-card">
      <img src={uso2} alt="Uso 2" className="uso-img" />
    </div>
    <p className="uso-text">Control del frizz</p>
  </div>
  
  <div>
    <div className="uso-card">
      <img src={uso3} alt="Uso 3" className="uso-img" />
    </div>
    <p className="uso-text">No deja residuos</p>
  </div>
</aside>

              {/* Producto */}
              <div className="card product-card">
                <Product360 src={PRODUCT.images[1]} alt={PRODUCT.name} />
                <div className="title">{PRODUCT.name}</div>
                <div className="small">{PRODUCT.description}</div>
                <div className="price">{PRODUCT.currency} ${PRODUCT.price.toLocaleString()}</div>
                <div className="small">Stock disponible: {PRODUCT.stock - cartQty}</div>
                <div className="card-actions">
                  <label className="small">Cantidad</label>
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    max={Math.max(1, PRODUCT.stock - cartQty)}
                    onChange={e => setQty(Math.max(1, Math.min(PRODUCT.stock - cartQty, Number(e.target.value))))}
                  />
                  <button className="btn" onClick={addToCart}>Agregar al carrito</button>
                </div>
              </div>

              {/* Resumen */}
              <aside className="card summary-card">
                <div className="summary-header">
                  <div style={{ fontWeight: 700 }}>Resumen</div>
                  <div className="small">1 producto</div>
                </div>
                <div className="cart-items">
                  {cartQty === 0 ? (
                    <div className="small">Tu carrito está vacío.</div>
                  ) : (
                    <div className="cart-row">
                      <div>
                        <div style={{ fontWeight: 700 }}>{PRODUCT.name}</div>
                        <div className="small">x {cartQty}</div>
                      </div>
                      <div style={{ fontWeight: 700 }}>
                        {PRODUCT.currency} ${(PRODUCT.price * cartQty).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                <div className="checkout">
                  <button className="btn" onClick={checkout} disabled={cartQty === 0 || loading}>
                    {loading ? 'Redirigiendo...' : 'Pagar con Mercado Pago'}
                  </button>
                  <video controls width="100%" style={{ borderRadius: 10, marginTop: 12 }}>
                    <source src={demoVideo} type="video/mp4" />
                  </video>
                </div>
              </aside>
            </div>

            {/* Sección Quienes nos eligen */}
            <div className="section-card">
              <section className="clientes-section">
                <h2 className="clientes-title">QUIENES NOS ELIGEN</h2>
                <div className="clientes-grid">
                  <div className="cliente-item">
                    <img src={trueno} alt="Trueno" className="cliente-avatar" />
                    <p className="cliente-name">TRUENO</p>
                  </div>
                  <div className="cliente-item">
                    <img src={joaqui} alt="Joaqui" className="cliente-avatar" />
                    <p className="cliente-name">JOAQUI</p>
                  </div>
                  <div className="cliente-item">
                    <img src={insua} alt="Insúa" className="cliente-avatar" />
                    <p className="cliente-name">INSÚA</p>
                  </div>
                  <div className="cliente-item">
                    <img src={jfquintero} alt="JF Quintero" className="cliente-avatar" />
                    <p className="cliente-name">JF QUINTERO</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sección Quienes nos recomiendan */}
            <div className="section-card">
              <section className="recomiendan-section">
                <h2 className="recomiendan-title">QUIENES NOS RECOMIENDAN</h2>
                <div className="recomiendan-grid">
                  <div className="recomiendan-item">
                    <img src={nairabraids} alt="Naira Braids" className="recomiendan-avatar" />
                    <p className="recomiendan-name">@nairabraids</p>
                  </div>
                  <div className="recomiendan-item">
                    <img src={trenzasconamor} alt="Trenzas con Amor" className="recomiendan-avatar" />
                    <p className="recomiendan-name">@trenzasconamor</p>
                  </div>
                  <div className="recomiendan-item">
                    <img src={trenzasbutterfly} alt="Trenzas Butterfly" className="recomiendan-avatar" />
                    <p className="recomiendan-name">@trenzasbutterfly</p>
                  </div>
                  <div className="recomiendan-item">
                    <img src={kamitrenzas} alt="Kami Trenzas" className="recomiendan-avatar" />
                    <p className="recomiendan-name">@kamitrenzas</p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {page === 'nosotros' && (
          <div className="about card">
            <h2>Nuestra Historia</h2>
            <p>
              Kaizen Cosmetics nació de la pasión de <strong>@chinaze.trenzas</strong> por el arte de las trenzas.
              Después de años de experiencia, creó un producto único para estilizar el cabello con fijación duradera,
              respetando la salud del pelo y potenciando la creatividad de quienes lo usan.
            </p>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div>
              <h4>MEDIOS DE PAGO</h4>
              <div className="payment-icons">
                <img src="/icons/cash.png" alt="Efectivo" />
                <img src="/icons/mercadopago.png" alt="Mercado Pago" />
              </div>
            </div>

            <div>
              <h4>FORMAS DE ENVIO</h4>
              <div className="shipping-icons">
                <img src="/icons/moto.png" alt="Moto" />
                <img src="/icons/andreani.png" alt="Andreani" />
              </div>
            </div>

            <div>
              <h4>CONTACTANOS</h4>
              <div className="contact-info">
                <p>
                  <FontAwesomeIcon icon={faPhone} /> +54 11 6105-0878
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} /> ventas@kaizencosmetics.com
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
          
          <p className="footer-copyright">Kaizen Cosmetics - 2025 © Todos los derechos reservados</p>
        </div>
      </footer>

      {/* WhatsApp */}
      
      <a  href="https://wa.me/5491161050878"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.9 5 2.3 7L4 29l7-2.3C12 27.1 14 27.8 16 27.8c6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22c-1.7 0-3.3-.5-4.8-1.4l-.3-.2-4.1 1.3 1.3-4-.2-.3C7.6 18.9 7 17 7 15c0-5 4-9 9-9s9 4 9 9-4 10-9 10zm5.1-7.4c-.3-.2-1.7-.9-2-1s-.5-.2-.8.2c-.2.3-.9 1-1.1 1.2s-.4.2-.7.1c-.3-.2-1.2-.5-2.2-1.5-1-1-1.5-2-1.7-2.3s0-.5.1-.6c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.8-1.9-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.5.1-.7.3-.2.2-.9.8-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.7 4.2 3.8.6.3 1.1.5 1.5.6.6.2 1.1.2 1.5.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.3-.3-.4-.6-.5z" />
        </svg>
      </a>
    </div>
  )
}
