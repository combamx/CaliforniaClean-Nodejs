# 🧼 CaliforniaClean API - Node.js

API RESTful construida con **Node.js** y **Express** para la gestión de proyectos, órdenes de trabajo y clientes en una empresa de limpieza profesional. Esta versión replica la funcionalidad del sistema original en .NET Core.

---

## 🚀 Tecnologías

- Node.js + Express
- SQL Server (`mssql`)
- JWT Authentication
- Nodemailer (alertas)
- Swagger con `swagger-ui-express`
- Middleware de seguridad
- Paginación y ordenamiento dinámico

---

## 📁 Estructura del proyecto

california-clean-api/
├── controllers/ # Lógica de negocio por entidad
├── routes/ # Definición de rutas
├── middleware/ # Autenticación, seguridad, paginación
├── config/ # Configuración de DB y correo
├── models/ # Esquemas y mapeos
├── utils/ # JWT, helpers
├── .env # Variables de entorno
├── server.js # Entrada principal

## Instala las dependencias:
npm install

## Crea un archivo .env:
PORT=3000

# SQL Server
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_SERVER=localhost
DB_DATABASE=california_db

# JWT
JWT_SECRET=clave_super_secreta
JWT_EXPIRES=1d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=clave_correo
EMAIL_TO=alertas@tuempresa.com

## Ejecuta el servidor:
npm run dev

## Autenticación
POST /api/login

Y usa el token en el header:
Authorization: Bearer {token}

## Licencia
Distribuido bajo la MIT License.
