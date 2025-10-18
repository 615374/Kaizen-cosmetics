# Kaizen Cosmetics - E-commerce

E-commerce moderno y responsive para Kaizen Cosmetics, especializado en productos capilares para trenzas y styling profesional.

## 🌟 Descripción

Plataforma de comercio electrónico desarrollada para Kaizen Cosmetics, marca argentina dedicada a productos capilares de alta calidad. El sitio ofrece una experiencia de compra fluida con integración de Mercado Pago y diseño optimizado para conversión.

## ✨ Características Principales

- **Diseño Responsive**: Adaptado para desktop, tablet y mobile
- **Carrusel de Productos**: Banner automático con imágenes de alta calidad
- **Integración Mercado Pago**: Sistema de pagos seguro con soporte para cuotas sin interés
- **Autenticación**: Login mediante Auth0
- **Gestión de Stock**: Control en tiempo real de inventario
- **Carrito de Compras**: Sistema de carrito con contador visible
- **Secciones Destacadas**:
  - Beneficios (Envíos, Cuotas, Seguridad)
  - Quienes nos eligen (Clientes destacados)
  - Quienes nos recomiendan (Trenzadoras profesionales)
- **Mapa de Ubicación**: Google Maps integrado
- **WhatsApp Flotante**: Contacto directo con el negocio

## 🛠️ Tecnologías

### Frontend
- **React** 18.x
- **Vite** - Build tool
- **FontAwesome** - Iconografía
- **Auth0** - Autenticación de usuarios
- **CSS3** - Estilos personalizados con variables CSS

### Backend
- **Node.js** + **Express**
- **Mercado Pago SDK** - Procesamiento de pagos
- **dotenv** - Gestión de variables de entorno
- **CORS** - Configuración de seguridad

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Mercado Pago (para pagos)
- Cuenta de Auth0 (para autenticación)

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/kaizen-ecommerce.git
cd kaizen-ecommerce
```

### Configurar el Frontend
```bash
cd frontend
npm install
```

Crear archivo `.env.local`:
```env
VITE_AUTH0_DOMAIN=tu-dominio.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id
```

### Configurar el Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-access-token
PORT=3001
BACK_URL_SUCCESS=http://localhost:5173/success
BACK_URL_FAILURE=http://localhost:5173/failure
BACK_URL_PENDING=http://localhost:5173/pending
```

## 🚀 Uso

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
node index.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`
El backend estará disponible en `http://localhost:3001`

### Producción

**Build del Frontend:**
```bash
cd frontend
npm run build
```

**Deploy del Backend:**
```bash
cd backend
node index.js
```

## 🎨 Estructura del Proyecto
```
kaizen-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Componente principal
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Estilos globales
│   ├── assets/               # Imágenes y recursos
│   ├── public/               # Archivos estáticos
│   └── vite.config.js        # Configuración Vite
├── backend/
│   ├── index.js              # Servidor Express
│   ├── .env                  # Variables de entorno
│   └── package.json
└── README.md
```

## 💳 Configuración de Mercado Pago

1. Crear cuenta en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Crear una aplicación
3. Obtener el Access Token de TEST para desarrollo
4. Agregar el token al archivo `.env` del backend
5. Para producción, cambiar al Access Token de PRODUCCIÓN

## 🔐 Configuración de Auth0

1. Crear cuenta en [Auth0](https://auth0.com)
2. Crear una aplicación tipo "Single Page Application"
3. Configurar Allowed Callback URLs: `http://localhost:5173`
4. Configurar Allowed Logout URLs: `http://localhost:5173`
5. Agregar credenciales al `.env.local` del frontend

## 📱 Características Responsivas

- **Desktop**: Grid de 3 columnas (lateral, producto, resumen)
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna con prioridad en producto

## 🎨 Paleta de Colores

- **Violeta Principal**: `#7e2da1`
- **Menta/Verde Agua**: `#b7f0d1`
- **Oscuro**: `#1e1e1e`
- **Fondo Claro**: `#faf6ff`

## 📄 Licencia

Este proyecto es privado y propiedad de Kaizen Cosmetics.

## 👥 Autores

- **Desarrollador Frontend/Backend**: Gisela Lanzillotta
- **Cliente**: Kaizen Cosmetics - @chinaze.trenzas

## 📞 Contacto

- **WhatsApp**: +54 11 6105-0878
- **Instagram**: @chinaze.trenzas

## 🐛 Reportar Problemas

Para reportar bugs o solicitar nuevas funcionalidades, contactar directamente con el equipo de desarrollo.

---

Desarrollado con ❤️ para Kaizen Cosmetics - 2025
