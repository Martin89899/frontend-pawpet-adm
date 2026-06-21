# PawPet Frontend

Frontend de PawPet construido con React, Vite y Tailwind CSS.

## Características

- **React 18** con Vite para un desarrollo rápido
- **React Router DOM** para el enrutamiento
- **Rutas Protegidas** para usuarios con rol ADMIN
- **Autenticación JWT** con gestión de tokens
- **Dashboard Administrativo** con visualización de datos
- **Alertas de Stock Crítico** para vacunas y remedios
- **Tailwind CSS** para estilos modernos

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Build

```bash
npm run build
```

## API

El frontend se conecta al BFF en `http://localhost:8085`

### Endpoints

- `GET /api/bff/admin/dashboard` - Obtiene datos del dashboard (requiere token JWT y rol ADMIN)

## Autenticación

Para acceder al dashboard administrativo:

- Email: `admin@pawpet.com`
- Contraseña: `admin123`

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── ProtectedRoute.jsx
│   ├── StockAlert.jsx
│   ├── StatCard.jsx
│   └── PatientSummary.jsx
├── context/          # Contextos de React
│   └── AuthContext.jsx
├── pages/            # Páginas de la aplicación
│   ├── Login.jsx
│   └── Dashboard.jsx
├── App.jsx           # Componente principal con rutas
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## Tecnologías

- React 18.3.1
- Vite 5.4.1
- React Router DOM 6.26.1
- Axios 1.7.7
- Tailwind CSS 3.4.10
