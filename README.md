# Portafolio Web — TuNombre

Sitio web personal para mostrar proyectos de desarrollo web.
Hecho 100% con HTML, CSS y JavaScript puro — sin frameworks.

## Estructura de archivos

```
portafolio/
├── index.html   → estructura y contenido de la página
├── style.css    → todos los estilos visuales
├── script.js    → navegación, filtros y formulario
├── README.md    → este archivo
└── img/         → pon aquí las capturas de tus proyectos
    ├── proyecto1.jpg
    ├── proyecto2.jpg
    └── proyecto3.jpg
```

## Cómo usar en VSCode

1. Instala la extensión **Live Server**
2. Clic derecho en `index.html` → **Open with Live Server**
3. Se abre en el navegador automáticamente

## Cómo personalizar

### Tu nombre
Busca `TuNombre` en `index.html` y reemplázalo en:
- El logo del nav (línea del `.logo`)
- El título "Hola, soy TuNombre" en Sobre mí
- El footer al final

### Tus datos de contacto
En la sección Contacto, cambia:
- `tuemail@email.com`
- `+57 300 000 0000` (formato internacional para WhatsApp)
- `linkedin.com/in/tunombre`

### Agregar un proyecto
1. Copia un bloque `<div class="project-card">` en `index.html`
2. Cambia `data-cat` por: `landing`, `corporativo` o `portafolio`
3. Agrega tu imagen en la carpeta `img/` y cambia el `src`
4. Actualiza el título, descripción, link y tags

### Agregar imagen a un proyecto
Reemplaza el bloque `.project-placeholder` por:
```html
<img src="img/tunombre.jpg" alt="Descripción del proyecto" />
```

## Envío real del formulario

Conecta con [Formspree](https://formspree.io) (gratis):
1. Crea una cuenta en formspree.io
2. Crea un formulario y copia tu ID
3. En `script.js`, descomenta el `fetch` y pega tu ID

## Publicar gratis

- **GitHub Pages**: sube los archivos a un repositorio y activa Pages
- **Netlify**: arrastra la carpeta a netlify.com
- **Vercel**: importa desde GitHub con un clic
