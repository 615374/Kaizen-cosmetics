export const productos = [


{
  id: "gel-capilar",
  nombre: "Gel Capilar Kaizen x 250 gr.",
  categoria: "gel",
  precio: 24799,
  precioAnterior: 31899,
  descuento: 22,
  sinStock: true,
  imagen: "/assets/productos/gel-flotante.png",
  imagenes: [
    "/assets/productos/gel-flotante.png",
    "/assets/productos/gel-1.jpg",
    "/assets/productos/gel-3.jpg",
    "/assets/productos/peinado-1.jpg",
    "/assets/productos/peinado-2.jpg",
    "/assets/productos/peinado-3.jpg"
  ],
  descripcion: {
    
    intro: "Aprobado por ANMAT 💜\nProducto registrado y habilitado.\n\nTextura pensada para trenzar\nPermite trabajar, dividir y peinar el pelo sin esfuerzo.",
    
    subtitulo: "Beneficios y usos", 
    
    items: [
      "Fijación real\nMantiene todo en su lugar.",
      "Apto para todo tipo de cabello\nFunciona en texturas naturales, rizadas, onduladas o alisadas.",
      "No se seca demasiado rápido\nTe da tiempo real para trabajar con precisión y detalle.",
      "Envase resistente y práctico"
    ],

    cierre: "Beneficios de los ingredientes\n\nAceite de Palta 🥑\nAporta suavidad y sensación de flexibilidad en la fibra.\n\nAceite de Almendras 🫘\nContribuye a una sensación final más sedosa.\n\nAceite de Jojoba 🍈\nAporta equilibrio sin dejar sensación grasosa.\n\nExtracto de Aloe Vera 🪴\nDeja una sensación de hidratación ligera y cómoda en la hebra.\n\nExtracto de Lino 💛\nAyuda a dejar el cabello más dócil y moldeable.\n\nLibre de Parabenos, Petrolato, Siliconas y Aceite Mineral."
  }
 },

 
 {
  id: 2,
  nombre: "Cepillo para baby hair",
  categoria: "herramientas",
  subcategoria: "cepillos",
  precio: 3300,
  precioAnterior: 4500,
  descuento: 26,
  sinStock: true,
  imagen: "/assets/productos/cepillo-baby-hair.jpg",
  imagenes: ["/assets/productos/cepillo-baby-hair.jpg" ],

      variantes: [
    {
      id: "negro",
      label: "Negro",
      color: "#000000ff",
      stock: 12,
      imagen: "/assets/productos/cepillo-baby-hair.jpg"
    },
    {
      id: "rosa",
      label: "Rosa",
      color: "#fd98c9ff",
      stock: 5,
      imagen: "/assets/productos/cepillo-baby-hair-rosa.jpg"
    }
  ],

  descripcion: {
  intro: "Ideal para definir y acomodar los baby hair con prolijidad y control.💜\n\nSu tamaño y forma permiten trabajar con precisión, sin marcar de más ni romper el peinado.✅",


  cierre: "Un complemento práctico para terminar peinados, colitas, trenzas o cualquier look que necesite detalle.✨ \n\nSimple, funcional y fácil de usar.😌"
  }
},
  {
    id: 3,
    nombre: "Espátula para gel",
    categoria: "herramientas",
    subcategoria: "espatulas",
    precio: 599.00,
    precioAnterior: 799.00,
    descuento: 25,
    sinStock: false,
    imagen: "/assets/productos/espatulasgel.jpg",
    imagenes: ["/assets/productos/espatulasgel.jpg"],

    variantes: [
    {
      id: "celeste",
      label: "Celeste",
      color: "#69c5f4ff",
      stock: 12,
      imagen: "/assets/productos/espatula-celeste.jpg"
    },
    {
      id: "rosa",
      label: "Rosa",
      color: "#fd98c9ff",
      stock: 5,
      imagen: "/assets/productos/espatula-rosa.jpg"
    },
    {
      id: "violeta",
      label: "Violeta",
      color: "#7E2DA1",
      stock: 5,
      imagen: "/assets/productos/espatula-violeta.jpg"
    },

    {
      id: "verde",
      label: "Verde agua",
      color: "#75e9d4ff",
      stock: 5,
      imagen: "/assets/productos/espatula-verde.jpg"
    }
  ],

    descripcion: {
    intro: "La espátula es el complemento ideal para aplicar el gel sin tocar el producto directamente, evitando contaminarlo con las manos, restos de otros productos o herramientas.",

    subtitulo: "Usarla te permite:",

    items: [
      "Mantener tu gel limpio por más tiempo.💜",
      "Evitar mezclar residuos de otros productos.🌀",
      "Trabajar de forma más prolija y profesional.✅",
      "Tomar la cantidad justa de producto sin desperdiciar.😉"
    ],

    cierre: "Es liviana, práctica y cómoda para el uso diario en trenzas, peinados y estilismo en general.\n\nDisponible en 4 colores para que elijas el que más te guste.🙌🏻\n\nUn accesorio simple que mejora tu forma de trabajar y ayuda a cuidar tus productos."
  }
  },

  {
    id: 4,
    nombre: "Espátula equilibrista",
    categoria: "herramientas",
    subcategoria: "espatulas",
    precio: 1200,
    precioAnterior: 2000,
    descuento: 40,
    sinStock: false,
    imagen: "/assets/productos/espatulaequilibrista.jpg",
    imagenes: ["/assets/productos/espatulaequilibrista.jpg"],


   variantes: [
    {
      id: "celeste",
      label: "Celeste",
      color: "#69c5f4ff",
      stock: 0,
      imagen: "/assets/productos/espatulaequilibristaceleste.jpg"
    },
    
    {
      id: "violeta",
      label: "Violeta",
      color: "#7E2DA1",
      stock: 5,
      imagen: "/assets/productos/espatulaequilibristavioleta.jpg"
    },

    {
      id: "verde",
      label: "Verde agua",
      color: "#75e9d4ff",
      stock: 5,
      imagen: "/assets/productos/espatulaequilibristaverde.jpg"
    },
    {
      id: "rosa",
      label: "Rosa",
      color: "#fd98c9ff",
      stock: 0,
      imagen: "/assets/productos/espatulaequilibrista.jpg"
    }
  ],

  
    descripcion: {
    intro: "La espátula equilibrista está pensado para quienes aman trabajar prolijo, rápido y sin contaminar el gel.💜\n\nGracias a su diseño con base elevada, la punta nunca toca la mesa: queda limpia y lista para volver al envase sin mezclar restos de otros productos.",
   
    subtitulo: "Es ideal ya que:",

    items: [
      "Evita el contacto del gel con superficies.♨️",
      "Mantiene tu herramienta siempre limpia.🫧",
      "Te permite apoyarla mientras peinás.😌",
      "Es liviana, cómoda y súper práctica.✅"
    ],

    cierre: "Es liviana, práctica y cómoda para el uso diario en trenzas, peinados y estilismo en general.\n\nDisponible en 4 colores para que elijas el que más te guste.🙌🏻\n\nUn accesorio simple que mejora tu forma de trabajar y ayuda a cuidar tus productos.😉"
  }
  },

  {
    id: 5,
    nombre: "Peine de cola clásico",
    categoria: "herramientas",
    subcategoria: "peines",
    precio: 2500,
    precioAnterior: 3000,
    descuento: 16,
    sinStock: false,
    imagen: "/assets/productos/peineclasico.jpg",
    imagenes: [
    "/assets/productos/peineclasico.jpg",
    "/assets/productos/peineclasico2.jpg"
  ],
    descripcion: {
    intro: "Un básico que no falla.😉\n\n Ideal para dividir, marcar rayas prolijas y acompañar cualquier peinado o trenzado.💜",

    cierre: "Liviano, cómodo y preciso.✅"
  }
  },
  
  {
    id: 6,
    nombre: "Peine de cola especial",
    categoria: "herramientas",
    subcategoria: "peines",
    precio: 2600,
    precioAnterior: 3500,
    descuento: 25,
    sinStock: true,
    imagen: "/assets/productos/peineespecial.jpg",
    imagenes: [
    "/assets/productos/peineespecial.jpg",
    "/assets/productos/peineespecial2.jpg"
  
  ],
    descripcion: {
    intro: "Peine de cola especial, pensado para trabajar con más precisión y comodidad.💜\n\nAl no tener las primeras cerdas, permite un mejor control al marcar líneas, separar mechones y acomodar el pelo sin que el peine se trabe.😉",


    cierre: "Ideal para trabajos detallados, trenzas prolijas y terminaciones más limpias.✅"
  }
  },


  {
    id: 7,
    nombre: "Pulsera para gel",
    categoria: "herramientas",
    subcategoria: "pulseras",
    precio: 10999,
    precioAnterior: 12999,
    descuento: 15,
    sinStock: false,
    imagen: "/assets/productos/pulseras.jpg",
    imagenes: ["/assets/productos/pulseras.jpg"],

    variantes: [
    {
      id: "negro",
      label: "Negro",
      color: "#000000ff",
      stock: 12,
      imagen: "/assets/productos/pulseras.jpg"
    },
    {
      id: "rojo",
      label: "Rojo",
      color: "#ff0000ff",
      stock: 0,
      imagen: "/assets/productos/pulseras.jpg"
    },
    {
      id: "fuxia",
      label: "Fuxia",
      color: "#ff0099ff",
      stock: 0,
      imagen: "/assets/productos/pulseras.jpg"
    },
    {
      id: "violeta",
      label: "Violeta",
      color: "#7E2DA1",
      stock: 5,
      imagen: "/assets/productos/pulseras.jpg"
    },
      {
      id: "violetapastel",
      label: "Violeta pastel",
      color: "#d18beeff",
      stock: 5,
      imagen: "/assets/productos/pulseras.jpg"
    },

     {
      id: "rosa",
      label: "Rosa",
      color: "#fd98c9ff",
      stock: 0,
      imagen: "/assets/productos/pulseras.jpg"
    }
  ],

    descripcion: {
    intro: "La pulsera imantada es el accesorio ideal para trabajar más cómoda y rápida mientras peinás o trenzás.💜\n\nAdemás de sostener elementos metálicos livianos como hebillas, ganchitos u horquillas, también es ideal para apoyar gel durante el peinado, manteniéndolo siempre a mano sin necesidad de apoyar utensilios en superficies externas.",

    subtitulo: "Te ayuda a:",

    items: [
      "Ganar tiempo en cada peinado.⏳",
      "Mantener tu espacio más ordenado.✨",
      "Evitar apoyar herramientas y producto sobre superficies sucias.🙂‍↔️",
      "Trabajar de manera más práctica y fluida.✅"
    ],

    cierre: "Es liviana, cómoda y se adapta fácilmente a la muñeca.\n\nIdeal para trenzadoras, peinadoras y estilistas que buscan organización y practicidad en su rutina."
  }
  },
];
