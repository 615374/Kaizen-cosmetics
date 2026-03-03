import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'

import Carousel from './components/Carousel'

import PurchaseSection from "./components/PurchaseSection"
import Productos from './components/Products'
import ProductoDetalle from "./components/ProductDetail";
import GelFeatured from './components/GelFeatured';

import CartDrawer from './components/CartDrawer'
import PaymentSuccess from './pages/PaymentSuccess'

import Beneficios from "./components/Beneficios"
import VideoShowcase from "./components/VideoShowcase"
import UsosSection from "./components/UsosSection"
import { usos } from "./data/usos";
import RealUsageSection from "./components/RealUsageSection"

import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useAuth0 } from '@auth0/auth0-react'

import productImg1 from '/assets/product-1.jpg'
import productImg3 from '/assets/product-3.jpg'
import video1 from '/assets/video.mp4'
import video2 from '/assets/video2.mp4'
import Testimonios from './components/Testimonios'

const PRODUCT = {
  id: 'kaizen-gel-500g',
  name: 'Kaizen — Gel Capilar 500g',
  description: 'Gel para trenzas. Fijación duradera, sin residuos. 500 g. Ideal para styling y trenzados.',
  price: 24799,
  currency: 'ARS',
  stock: 10,
  images: [productImg1, productImg3]
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState('inicio')
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const [categoriaActiva, setCategoriaActiva] = useState("gel");
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // --- LOGÍSTICA: ESTADO PARA EL ENVÍO ---
  const [shippingCost, setShippingCost] = useState(0); 
  const [cartQty, setCartQty] = useState(1); // Control de cantidad

  async function checkout() {
    if (!isAuthenticated) {
      return loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    }
    
    setLoading(true)
    try {
      // Preparamos el array de ítems para Mercado Pago
      const itemsParaPago = [
        { 
          id: PRODUCT.id, 
          title: PRODUCT.name, 
          quantity: cartQty, 
          unit_price: PRODUCT.price 
        }
      ];

      // Si el usuario seleccionó un envío, lo sumamos como un ítem más
      if (shippingCost > 0) {
        itemsParaPago.push({
          id: 'envio-shipnow',
          title: 'Envío Andreani (Shipnow)',
          quantity: 1,
          unit_price: Number(shippingCost)
        });
      }

      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsParaPago })
      })

      const data = await res.json()
      
      if (data && data.sandbox_init_point) {
        window.location.href = data.sandbox_init_point
      } else {
        alert("Error: No se pudo generar el link de pago.");
      }
    } catch (err) {
      console.error(err)
      alert('Error en el proceso de pago.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/success") setPage("success");
    if (path === "/failure") setPage("failure");
    if (path === "/pending") setPage("pending");
  }, []);

  return (
    <div className="page-root">
      <Navbar
        setPage={setPage}
        setCategoriaActiva={setCategoriaActiva}
        setSubcategoriaActiva={setSubcategoriaActiva}
        setCartOpen={setCartOpen}
      />

      {page === 'inicio' && (
        <main className="home"> 
          <Carousel />
          <Beneficios />
          <div className="section-divider">
            <span>GEL KAIZEN</span>
          </div>
          <VideoShowcase 
            video1={video1} 
            video2={video2} 
            children={(
              <GelFeatured 
                showHint={false} 
                hidePrice={true}
                hideButton={false}
                onClick={() => {
                  setPage('productos'); 
                  setCategoriaActiva('gel'); 
                  window.scrollTo(0, 0);
                }}
              />
            )}
          />     
          <UsosSection usos={usos} />
          <RealUsageSection />
          <Testimonios/>
        </main>
      )}

      {page === "productos" && (
        <Productos
          categoriaActiva={categoriaActiva}
          subcategoriaActiva={subcategoriaActiva}
          setSubcategoriaActiva={setSubcategoriaActiva}
          setPage={setPage}
          setProductoSeleccionado={setProductoSeleccionado}
        />
      )}

      {page === "detalle" && productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          setPage={setPage}
          setCategoriaActiva={setCategoriaActiva}
          setSubcategoriaActiva={setSubcategoriaActiva}
        />
      )}
      
      {/* --- CART DRAWER CONECTADO --- */}
      {cartOpen && (
        <CartDrawer 
          setCartOpen={setCartOpen} 
          setPage={setPage} 
          // Actualiza el costo de envío en App.jsx cuando el usuario elige Andreani
          onShippingChange={(costo) => setShippingCost(costo)}
          // Le pasamos la función de checkout para que el botón del drawer funcione
          checkout={checkout} 
        />
      )}

      {page === 'nosotros' && (
        <div className="about card">
          <div className="section-nosotros">
            <span>Nosotros</span>
          </div>
          <p>Kaizen Cosmetics nació de la pasión de <strong>@chinaze.trenzas</strong>.</p>
        </div>
      )}

      {page === "success" && (
        <PaymentSuccess setPage={setPage} clearCart={() => {
          setCartOpen(false);
          setShippingCost(0); // Limpiamos el envío al finalizar
        }} />
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}