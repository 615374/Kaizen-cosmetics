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

import MayoristaForm from './components/MayoristaForm'

import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useAuth0 } from '@auth0/auth0-react'
import { useCart } from "./context/CartContext" // Importamos el hook del carrito

import productImg1 from '/assets/product-1.jpg'
import productImg3 from '/assets/product-3.jpg'
import video1 from '/assets/video.mp4'
import video2 from '/assets/video2.mp4'
import Testimonios from './components/Testimonios'

import { productos } from "./data/productos"
import ProductoCard from "./components/ProductCard"

export default function App() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState('inicio')
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const { cart } = useCart() // Obtenemos los productos reales del carrito
  
  const [categoriaActiva, setCategoriaActiva] = useState("gel");
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  // --- LÓGICA DE PRODUCTOS ALEATORIOS PARA "TAMBIÉN PODRÍA INTERESARTE" ---
  useEffect(() => {
    const soloHerramientas = productos.filter(p => p.id !== "gel-capilar");
    const shuffled = [...soloHerramientas].sort(() => 0.5 - Math.random()).slice(0, 4);
    setProductosAleatorios(shuffled);
  }, [page]);

  // --- FUNCIÓN DE CHECKOUT (MERCADO PAGO PRODUCCIÓN) ---
  async function checkout() {
    if (!isAuthenticated) {
      return loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    }

    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setLoading(true)
    try {
      // Mapeamos los productos actuales del carrito para Mercado Pago
      const itemsParaPago = cart.map(item => ({
        id: item.id,
        title: item.nombre,
        quantity: item.quantity,
        unit_price: item.precio
      }));

      // Si hay costo de envío, lo agregamos como un ítem adicional
      if (shippingCost > 0) {
        itemsParaPago.push({
          id: 'envio-shipnow',
          title: 'Envío Andreani (Shipnow)',
          quantity: 1,
          unit_price: Number(shippingCost)
        });
      }

      // Llamada al backend
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsParaPago })
      })

      const data = await res.json()

      // 4. Redirección (Usamos init_point para producción)
      if (data && data.init_point) {
        window.location.href = data.init_point;
      } else if (data && data.sandbox_init_point) {
        // Backup por si todavía estás en modo pruebas
        window.location.href = data.sandbox_init_point;
      } else {
        alert("Error: No se pudo generar el link de pago.");
      }
    } catch (err) {
      console.error("Error en checkout:", err)
      alert('Hubo un problema al procesar el pago.')
    } finally {
      setLoading(false)
    }
  }

  // --- MANEJO DE RUTAS POST-PAGO ---
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
        setTerminoBusqueda={setTerminoBusqueda}
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

          <section className="relacionados-section">
            <h2 className="relacionados-title">También podría interesarte</h2>
            <div className="relacionados-grid">
              {productosAleatorios.map((item) => (
                <ProductoCard 
                  key={item.id} 
                  producto={item} 
                  setPage={setPage} 
                  setProductoSeleccionado={setProductoSeleccionado} 
                />
              ))}
            </div>
          </section>

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
          terminoBusqueda={terminoBusqueda}
          setTerminoBusqueda={setTerminoBusqueda}
        />
      )}

      {page === "detalle" && productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          setPage={setPage}
          setProductoSeleccionado={setProductoSeleccionado}
          setCategoriaActiva={setCategoriaActiva}
          setSubcategoriaActiva={setSubcategoriaActiva}
        />
      )}
      
      {cartOpen && (
        <CartDrawer 
          setCartOpen={setCartOpen} 
          setPage={setPage} 
          onShippingChange={(costo) => setShippingCost(costo)}
          checkout={checkout} 
          loading={loading}
        />
      )}

      {page === "mayorista" && <MayoristaForm />}

      {page === "success" && (
        <PaymentSuccess setPage={setPage} clearCart={() => {
          setCartOpen(false);
          setShippingCost(0);
        }} />
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}