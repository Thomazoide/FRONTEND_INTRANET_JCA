# Intranet JCA Security – Frontend

Aplicación web que permite a los colaboradores de JCA Security acceder a su información laboral y a las herramientas que necesitan a diario. Este repositorio contiene el frontend construido con React Router Remix; el backend en Go vive en un repositorio separado y expone los servicios REST usados aquí.

## 🌐 ¿Qué ofrece la intranet?

- **Contratos y liquidaciones:** los empleados pueden consultar su documentación vigente y solicitar nuevas liquidaciones con un par de clics.
- **Celebraciones del equipo:** un panel ligero muestra los cumpleaños próximos para fomentar el compañerismo.
- **Supervisión de guardias:** los supervisores visualizan rápidamente qué equipos de guardias tienen asignados y su estado actual.

## 🧱 Arquitectura en breve

| Capa | Descripción |
| --- | --- |
| Frontend (este repo) | React 19 + Remix/React Router 7 sobre Vite. Tailwind CSS 4 para estilos utilitarios. |
| Backend | API REST escrita en Go (repositorio separado) que maneja autenticación, gestión documental y datos de personal. |
| Entorno | Variables `VITE_` controlan endpoints; la aplicación se construye como SSR estático con `react-router build`. |

## 🚀 Puesta en marcha

```powershell
npm install
npm run dev
```

El servidor local queda disponible en `http://localhost:5173`. Por defecto el frontend espera que la API responda en `http://localhost:8888` (configurable vía `.env`).

### Variables de entorno

```
VITE_BACKENDURL=http://localhost:8888
```

Remix expone automáticamente los valores prefijados con `VITE_` al código del navegador: se consumen como `import.meta.env.VITE_BACKENDURL`.

## 📁 Estructura clave

```
app/
	routes/                 # Rutas Remix (home, solicitar-cuenta, manejar errores)
	components/             # Componentes reutilizables (formularios, vistas)
	constants/              # Endpoints, imágenes y configuración de peticiones
	root.tsx                # Shell de la app, metadatos y error boundary
app.css                   # Tailwind base + tokens del tema
```

## 🧭 Flujos destacados

- **Inicio / Login:** pantalla principal con acceso de RUT y contraseña.
- **Solicitud de cuenta:** formulario que envía RUT y correo a la API (`POST /solicitudes`), redirigiendo a una ruta de error parametrizable en caso de problemas.
- **Errores amigables:** la ruta `/solicitar-cuenta/error/:mensaje` renderiza el mensaje decodificado y ofrece retorno al formulario.

## 🔧 Scripts disponibles

```json
npm run dev       # desarrollo con HMR
npm run build     # genera artefactos de producción
npm run start     # sirve el build con react-router-serve
npm run typecheck # genera tipos Remix y ejecuta tsc
```

## 🤝 Contribución

1. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`).
2. Ejecuta `npm run typecheck` antes de subir cambios.
3. Abre un PR describiendo el flujo afectado y los endpoints del backend involucrados.

## 📚 Próximos pasos

- Integrar autenticación real con el servicio de identidad de Go.
- Ampliar paneles para supervisores (alertas en tiempo real, KPIs de guardias).
- Añadir pruebas end-to-end que cubran solicitud de documento y navegación por cumpleaños.