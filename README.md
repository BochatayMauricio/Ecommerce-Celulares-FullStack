Ecommerce-Celulares-FullStack
Este proyecto es una aplicación de comercio electrónico enfocada en la venta de celulares, desarrollada con una arquitectura Full Stack. Se divide en dos partes principales: el Frontend (desarrollado con Angular) y el Backend (basado en Express, Sequelize y MySQL).

Características
Catálogo de Productos: Visualización y gestión de los celulares disponibles para la venta.

Carrito de Compras: Permite a los usuarios agregar productos. (Actualmente, se ha notado que el carrito no se guarda al volver a la página principal.)

Gestión de Usuario: Registro y autenticación. Se encuentra pendiente la integración completa para modificar el perfil y mostrar “Mis Compras”.

Backend REST: API implementada con Express para la gestión de la base de datos y la lógica del negocio, usando Sequelize y MySQL.

Tecnologías Utilizadas
Frontend
Angular: Framework para construir aplicaciones web de una sola página.

Bootstrap 5.3.2: Framework CSS para estilos responsivos.

jQuery y Popper.js: Utilizados para algunos componentes y funcionalidades.

ngx-toastr: Para mostrar notificaciones en la interfaz.

Angular Animations: Para mejorar la experiencia de usuario con animaciones.

Backend
Node.js y Express: Entorno y framework para el servidor.

Sequelize: ORM para trabajar con MySQL.

MySQL2: Conector para la base de datos MySQL.

Nodemon y tsc-watch: Herramientas para el desarrollo que permiten reiniciar el servidor y recompilar cambios de TypeScript de forma automática.

Instalación
Requisitos Previos
Node.js instalado.

Angular CLI instalado globalmente.

Pasos de Instalación
Frontend
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/BochatayMauricio/Ecommerce-Celulares-FullStack.git
Ingresa al directorio del frontend:

bash
Copiar
Editar
cd Ecommerce-Celulares-FullStack/frontend
Instala las dependencias:

bash
Copiar
Editar
npm install
Instala Angular CLI globalmente (si aún no lo tienes):

bash
Copiar
Editar
npm install -g @angular/cli
Instala Bootstrap, jQuery, Popper.js, ngx-toastr y Angular Animations:

bash
Copiar
Editar
npm install bootstrap@5.3.2
npm install jquery @popperjs/core
npm install ngx-toastr --save
npm install @angular/animations --save
Backend
Ingresa al directorio del servidor:

bash
Copiar
Editar
cd Ecommerce-Celulares-FullStack/Server
Instala las dependencias:

bash
Copiar
Editar
npm install express sequelize mysql2
Instala las herramientas de desarrollo:

bash
Copiar
Editar
npm install -D nodemon
npm install tsc-watch --save-dev
Ejecución del Proyecto
Iniciar el Frontend
Desde el directorio frontend, ejecuta:

bash
Copiar
Editar
npm start
Esto levantará la aplicación Angular en el puerto por defecto (generalmente http://localhost:4200).

Iniciar el Backend
Desde el directorio Server, ejecuta:

bash
Copiar
Editar
npm start
Esto iniciará el servidor Express. Asegúrate de tener configurada la conexión a tu base de datos MySQL y las variables de entorno necesarias.

Pendientes y Mejoras
Persistencia del Carrito: Se ha identificado que el carrito no se guarda al volver a la página principal.

Integración de Perfil de Usuario y Compras: Falta implementar la lógica para traer la información del usuario y así poder modificar el perfil y visualizar el historial de compras.

Contribuciones
Las contribuciones son bienvenidas. Si deseas aportar mejoras al proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama para tu funcionalidad:

bash
Copiar
Editar
git checkout -b feature/nueva-funcionalidad
Realiza tus cambios y haz commit:

bash
Copiar
Editar
git commit -m "Agregar nueva funcionalidad"
Empuja tus cambios:

bash
Copiar
Editar
git push origin feature/nueva-funcionalidad
Abre un Pull Request para revisar e integrar tus cambios.
