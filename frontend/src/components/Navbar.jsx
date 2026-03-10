import React, { useState, useEffect, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useCart } from "../context/CartContext";
import isologo from '/assets/isologo.png' 
import logo from '/assets/logo.png'

export default function Navbar({ 
  setPage, 
  setCategoriaActiva, 
  setSubcategoriaActiva, 
  setCartOpen, 
  setTerminoBusqueda 
}) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const [visible, setVisible] = useState(true)
  const [searchTerm, setSearchTerm] = useState("") 
  const [menuOpen, setMenuOpen] = useState(false) 
  const lastY = useRef(0)
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const delta = y - lastY.current
      if (y < 60) setVisible(true)
      else if (delta > 10) setVisible(false)
      else if (delta < -10) setVisible(true)
      lastY.current = Math.max(0, y)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navegarYLimpiar = (pagina, categoria = null) => {
    if (setTerminoBusqueda) setTerminoBusqueda(""); 
    setSearchTerm(""); 
    setPage(pagina);
    setCategoriaActiva(categoria);
    setSubcategoriaActiva(null);
    setMenuOpen(false); 
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCategoriaActiva(null);
      setSubcategoriaActiva(null);
      if (setTerminoBusqueda) setTerminoBusqueda(searchTerm); 
      setPage("productos");
      setMenuOpen(false); 
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="promo-banner">
        <div className="promo-text">
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
          <span>ENVÍO GRATIS EN COMPRAS DE $50.000 - HASTA 3 CUOTAS SIN INTERÉS</span>
        </div>
      </div>

      <header className={`navbar ${visible ? "nav-visible" : "nav-hidden"}`}>
        
        {/* BOTÓN HAMBURGUESA */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* IZQUIERDA */}
        <div className="nav-left">
          <button className="logo-btn" onClick={() => navegarYLimpiar("inicio")}>
            <img src={isologo} alt="Kaizen Cosmetics" className="nav-logo" />
          </button>
          
          <form className="nav-search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>

        {/* CENTRO */}
        <div className="nav-center">
          <button className="logo-btn center" onClick={() => navegarYLimpiar("inicio")}>
            <img src={logo} alt="Kaizen Cosmetics" className="nav-logo-center" />
          </button>
        </div>

        {/* DERECHA */}
        <div className={`nav-right ${menuOpen ? "nav-mobile-open" : ""}`}>
          <button className="nav-btn big" onClick={() => navegarYLimpiar("inicio")}>
            Inicio
          </button>

          <div className="nav-item productos">
            <button className="nav-btn big">
              Productos <span className="arrow">▾</span>
            </button>
            <div className="dropdown">
              <button onClick={() => navegarYLimpiar("productos", "gel")}>
                Gel capilar
              </button>
              <button onClick={() => navegarYLimpiar("productos", "herramientas")}>
                Herramientas para peinar
              </button>
            </div>
          </div>

          <button className="nav-btn big" onClick={() => navegarYLimpiar("mayorista")}>
            Mayorista
          </button>

          {isAuthenticated ? (
            <button className="nav-btn big" onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </button>
          ) : (
            <button className="nav-btn big" onClick={() => loginWithRedirect()}>
              Cuenta
            </button>
          )}

          <button className="nav-btn cart-btn" onClick={() => {setCartOpen(true); setMenuOpen(false);}}>
            <div className="cart-icon-wrapper">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </button>
        </div>
      </header>
    </>
  )
}