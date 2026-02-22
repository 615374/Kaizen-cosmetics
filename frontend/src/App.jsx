import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'

import PurchaseSection from "./components/PurchaseSection"
import Productos from './components/Products'
import ProductoDetalle from "./components/ProductDetail";
import ProductoDetalleGel from "./components/ProductDetailGel"

import GelFeatured from './components/GelFeatured';

import CartDrawer from './components/CartDrawer'

import PaymentSuccess from './pages/PaymentSuccess'

import Beneficios from "./components/Beneficios"
import VideoShowcase from "./components/VideoShowcase"

import UsosSection from "./components/UsosSection"
import { usos } from "./data/usos";
import RealUsageSection from "./components/RealUsageSection"

import Footer from './components/Footer'
import  WhatsAppButton from './components/WhatsAppButton'

import { useAuth0 } from '@auth0/auth0-react'

import productImg1 from '/assets/product-1.jpg'
import productImg3 from '/assets/product-3.jpg'

import video1 from '/assets/video.mp4'
import video2 from '/assets/video2.mp4'



// Producto con stock
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
     if (data && data.sandbox_init_point) {
       window.location.href = data.sandbox_init_point
       } else {
       alert("No se recibió sandbox_init_point");
       console.log(data);
      }
    } catch (err) {
      console.error(err)
      alert('Error en checkout.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  const path = window.location.pathname;

  if (path === "/success") {
    setPage("success");
  }

  if (path === "/failure") {
    setPage("failure");
  }

  if (path === "/pending") {
    setPage("pending");
  }
}, []);



  return (
  <div className="page-root">
    <Navbar
     setPage={setPage}
     setCategoriaActiva={setCategoriaActiva}
     setSubcategoriaActiva={setSubcategoriaActiva}
     setCartOpen={setCartOpen}
    />


    {page === 'login' && (
      <div style={{ marginTop: '60px', marginLeft: '20px' }}>
        <h2 style={{ color: 'var(--brand-purple)', fontWeight: '700' }}>
          Mi cuenta
        </h2>
        <div id="auth-login"></div>
      </div>
    )}

    {page === 'inicio' && (
      <main className="home"> 

        
        <Carousel />
        <Beneficios />

        {/* DIVISOR */}
        <div className="section-divider">
          <span>GEL KAIZEN</span>
        </div>

        <VideoShowcase 
         video1={video1} 
         video2={video2} 
         children={(
          <GelFeatured 
           precio={PRODUCT.price}
           onClick={() => {
           setProductoSeleccionado(PRODUCT);
           setPage('detalle');
      }}
    />
  )}
/>

        
        <UsosSection usos={usos} />

        <RealUsageSection />



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
      productoSeleccionado.tipo === "gelDetail" ? (
     <ProductoDetalleGel
       producto={productoSeleccionado}
       addToCart={addToCart}
      
      />
    ) : (
     <ProductoDetalle
       producto={productoSeleccionado}
       setPage={setPage}
       setCategoriaActiva={setCategoriaActiva}
       setSubcategoriaActiva={setSubcategoriaActiva}
      />
    )
  )}
    
    {cartOpen && <CartDrawer setCartOpen={setCartOpen} setPage={setPage} />}


    {page === 'nosotros' && (
      <div className="about card">
        <h2>Nuestra Historia</h2>
        <p>
          Kaizen Cosmetics nació de la pasión de <strong>@chinaze.trenzas</strong> por el arte de las trenzas.
        </p>
      </div>
    )}

    {page === "success" && (
     <PaymentSuccess
       setPage={setPage}
       clearCart={() => setCartOpen(false)}
    />
)}


    <Footer />

    <WhatsAppButton />



  </div>
)

}