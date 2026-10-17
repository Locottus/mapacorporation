# MAPA Asesorías Migratorias: clon (prueba de concepto)

Este proyecto reproduce https://www.mapacorporation.com/ (sitio hecho en Wix) con **Angular 21** en el frontend y **Node.js + Express 5** en el backend. Usa los textos e imágenes originales, con permiso del propietario.

```
C:\angular\mapa
├── frontend\                 Angular 21 (standalone, zoneless, Vitest)
│   ├── proxy.conf.json       Redirige /api y /media/video al backend en desarrollo
│   ├── public\media\img\     52 imágenes originales (banners, textos, posters de video)
│   ├── public\media\video\   (opcional) MP4 locales, ver la sección "Videos"
│   └── src\app\
│       ├── core\             Servicio Api, modelos y utilidades de YouTube
│       ├── layout\           header (menú) y footer
│       ├── shared\           video-player y schedule (horario de atención)
│       └── pages\            home, about, services, locations, contact, testimonials, discover-usa
│                             (cada componente tiene .ts, .html, .css y .spec.ts por separado)
├── backend\                  Express 5
│   ├── src\app.js            API, archivos estáticos /media y SPA compilada
│   ├── src\routes\           videos.js y contact.js
│   ├── data\videos.json      Catálogo de los 14 videos (títulos, descripciones, duración)
│   ├── data\messages.json    Mensajes del formulario (se crea al enviar el primero)
│   └── test\                 Pruebas (node:test + supertest)
├── tools\download_assets.py  Vuelve a descargar las imágenes del sitio original
└── MANUAL.md
```

## 1. Requisitos

| Herramienta | Versión probada |
|---|---|
| Node.js | 20 o superior (probado con v24.13) |
| npm | 10 o superior |
| Angular CLI | 21 (opcional, ya viene en `node_modules` del frontend) |
| Python + Pillow | Solo para `tools/download_assets.py` |

## 2. Instalación (una sola vez)

```powershell
cd C:\angular\mapa\backend
npm install

cd C:\angular\mapa\frontend
npm install
```

## 3. Levantar en modo desarrollo (dos terminales)

**Terminal 1, backend** (API en el puerto 3000):

```powershell
cd C:\angular\mapa\backend
npm start          # o "npm run dev" para que se reinicie al guardar cambios
```

**Terminal 2, frontend** (puerto 4200, recarga automática):

```powershell
cd C:\angular\mapa\frontend
npm start
```

Abre http://localhost:4200. `ng serve` usa `proxy.conf.json` para enviar `/api/*` al backend.

> Si el backend no está levantado, el sitio se ve igual, pero no cargan los videos y el formulario de contacto muestra un error.

## 4. Levantar en modo producción (un solo proceso)

```powershell
cd C:\angular\mapa\frontend
npm run build                       # genera dist\frontend\browser

cd C:\angular\mapa\backend
npm start
```

Abre http://localhost:3000. El backend sirve la API, las imágenes y la SPA compilada, y devuelve `index.html` en cualquier ruta.

Para usar otro puerto: `$env:PORT=8080; npm start`.

## 5. Pruebas

```powershell
cd C:\angular\mapa\backend;  npm test                     # 10 pruebas (API)
cd C:\angular\mapa\frontend; npx ng test --watch=false    # 35 pruebas (componentes)
```

## 6. Rutas del sitio (las mismas URLs que el original)

| Menú | Ruta | Componente |
|---|---|---|
| Inicio | `/` | `pages/home` |
| Acerca de | `/about-3` | `pages/about` |
| Servicios | `/services-9` | `pages/services` |
| Ubicaciones | `/ubicaciónes` | `pages/locations` |
| Contacto | `/contact-4` | `pages/contact` |
| Testimonios | `/testimonios` | `pages/testimonials` |
| Descubre USA | `/copia-de-contacto` | `pages/discover-usa` |

## 7. API del backend

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servidor |
| GET | `/api/channels/:id` | Canal de video (`testimonios`, `descubre-usa`) con título, categorías y URL original |
| GET | `/api/videos?channel=&category=&q=` | Lista de videos, con filtros opcionales |
| GET | `/api/videos/:id` | Un video |
| POST | `/api/contact` | Recibe `{nombre, apellido, telefono, email, mensaje}`. Solo `email` es obligatorio. Guarda el mensaje en `data/messages.json` |

## 8. Cómo se logró la fidelidad visual

- Con REA y Playwright se midió la posición exacta (x, y, ancho y alto) de cada elemento en las 7 páginas del sitio original, con una ventana de 1265 px.
- Igual que Wix, cada página se divide en **franjas** (`.strip`) de ancho completo con imagen de fondo. Dentro de cada franja hay un **lienzo** (`.stage`) de 980 px centrado, con los elementos posicionados de forma absoluta en las mismas coordenadas.
- En pantallas de menos de 980 px, todo el lienzo se escala proporcionalmente con la variable CSS `--scale` (`zoom`). Debajo de 768 px el menú pasa a ser un botón hamburguesa.
- Wix muestra las imágenes en modo "fill"; aquí se reproduce con `object-fit: cover`. Las dos imágenes que Wix recorta (`crop`) se recortaron igual al descargarlas.
- Colores originales: dorado `#958350`, crema `#FFF1E7`, azul marino `#111E42` y fondo `#161B2E`.
- Fuentes:
  - **Marcellus** es la misma que usa el original (Google Fonts).
  - **Jost** reemplaza a Futura/Avenir.
  - **Montserrat 800** reemplaza a *Lulo Clean*, que es una fuente comercial con licencia exclusiva de Wix.

  Por eso el menú puede verse ligeramente distinto.

## 9. Videos

El sitio original **no usa YouTube**. Sus 14 videos (1 en Testimonios y 13 en Descubre USA) están alojados en **Wix Video** y se entregan por streaming HLS protegido con un token firmado. Las URLs directas responden `401/403`, así que no se pueden enlazar ni descargar desde fuera de Wix sin saltarse ese control de acceso, y eso no se hizo.

El clon conserva el catálogo completo: títulos, descripciones, duración, categorías y posters originales. El reproductor elige la fuente en este orden:

1. **MP4 local**: si existe `frontend/public/media/video/<id>.mp4`, se reproduce con `<video>`. Los MP4 se exportan desde el panel de Wix (Video Library → Descargar) con la cuenta del propietario.
2. **YouTube**: si en `backend/data/videos.json` el campo `"youtubeUrl"` del video tiene un enlace (por ejemplo `"https://www.youtube.com/watch?v=XXXXXXXXXXX"` o `https://youtu.be/...`), se incrusta con `youtube-nocookie.com`.
3. **Sin fuente**: se muestra el poster con un botón "Ver en el sitio original".

Ejemplo para enlazar un video a YouTube:

```json
{
  "id": "30f4b3_e69e6e84feb449179324777b6af7861d",
  "title": "Pensé que nunca más volvería a tener una visa...",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

El backend lee el archivo en cada petición, así que no hace falta reiniciarlo.

## 10. Volver a descargar las imágenes

```powershell
pip install pillow
cd C:\angular\mapa
python tools\download_assets.py
```

Solo descarga lo que falta y vuelve a aplicar los recortes de Wix.

## 11. Limitaciones conocidas (prueba de concepto)

- Casi todo el texto del sitio original está dentro de **imágenes PNG**, así que en el clon también son imágenes. Para la accesibilidad y el SEO, el texto se copió en los atributos `alt` y en encabezados ocultos.
- En móvil, el original usa un diseño propio de Wix; el clon escala el diseño de escritorio.
- El formulario guarda los mensajes en un archivo JSON. No envía correo, porque eso requiere configurar SMTP.
- El botón de compartir del widget de testimonios es solo decorativo.
