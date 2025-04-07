# Ecommerce-Celulares-FullStack

Este proyecto es una aplicación de comercio electrónico enfocada en la venta de celulares, desarrollada con una arquitectura Full Stack. Se divide en dos partes principales: el **Frontend** (desarrollado con Angular) y el **Backend** (basado en Express, Sequelize y MySQL).

## Características

- **Catálogo de Productos:** Visualización y gestión de los celulares disponibles para la venta.
- **Carrito de Compras:** Permite a los usuarios agregar productos. *(Actualmente, se ha notado que el carrito no se guarda al volver a la página principal.)*
- **Gestión de Usuario:** Registro y autenticación. Se encuentra pendiente la integración completa para modificar el perfil y mostrar “Mis Compras”.
- **Backend REST:** API implementada con Express para la gestión de la base de datos y la lógica del negocio, usando Sequelize y MySQL.

## Tecnologías Utilizadas

### Frontend

- **Angular:** Framework para construir aplicaciones web de una sola página.
- **Bootstrap 5.3.2:** Framework CSS para estilos responsivos.
- **jQuery y Popper.js:** Utilizados para algunos componentes y funcionalidades.
- **ngx-toastr:** Para mostrar notificaciones en la interfaz.
- **Angular Animations:** Para mejorar la experiencia de usuario con animaciones.

### Backend

- **Node.js y Express:** Entorno y framework para el servidor.
- **Sequelize:** ORM para trabajar con MySQL.
- **MySQL2:** Conector para la base de datos MySQL.
- **Nodemon y tsc-watch:** Herramientas para el desarrollo que permiten reiniciar el servidor y recompilar cambios de TypeScript de forma automática.

## Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.
- [Angular CLI](https://angular.io/cli) instalado globalmente.

### Pasos de Instalación

#### Frontend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/BochatayMauricio/Ecommerce-Celulares-FullStack.git
2. Ingresa al directorio del frontend: cd Ecommerce-Celulares-FullStack/frontend
3. Instala las dependencias:npm install
4. Instala Angular CLI globalmente (si aún no lo tienes): npm install -g @angular/cli
5. Instala Bootstrap, jQuery, Popper.js, ngx-toastr y Angular Animations:
    npm install bootstrap@5.3.2
    npm install jquery @popperjs/core
    npm install ngx-toastr --save
    npm install @angular/animations --save
#### Backend
1. Ingresa al directorio del servidor: cd Ecommerce-Celulares-FullStack/Server
2. Instala las dependencias: npm install express sequelize mysql2
3. Instala las herramientas de desarrollo:
  npm install -D nodemon
  npm install tsc-watch --save-dev


## Ejecución del Proyecto
### Iniciar el Frontend: npm start

### Iniciar el Backend: npm start
