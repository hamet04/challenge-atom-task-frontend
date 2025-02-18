# ChallangeTaskAtomFe

## Challange Task Atom Frontend

## Tecnologías Utilizadas

Angular 16+: Framework para el desarrollo de aplicaciones frontend.

RxJS: Programación reactiva y manejo de flujos asíncronos.

Zone.js: Gestión del contexto de ejecución.

Angular Material: Conjunto de componentes UI con el diseño de Material Design.

## Scripts Disponibles

ng serve: Inicia el servidor de desarrollo en http://localhost:4200/.

ng build: Compila la aplicación para producción en la carpeta dist/.

ng test: Ejecuta las pruebas unitarias.

## Estructura del Proyecto

src/
 ├── app/
 │    ├── core/
 │    │    ├── animations/
 │    │    ├── guards/
 │    │    ├── models/
 │    │    └── servicios/
 │    ├── layouts/
 │    └── app.component.ts
 ├── index.html
 ├── main.ts
 └── styles.scss

## Decisiones de Diseño

Modularización: Se utiliza una estructura modular para mantener el código organizado y facilitar su mantenibilidad.

Guardias de Autenticación: Se implementaron auth.guard.ts y notauth.guard.ts para gestionar el acceso a las rutas protegidas.

Servicios centralizados: Servicios como auth.service.ts y task.service.ts permiten una mejor reutilización del código.

## Notas Adicionales

Se utilizaron interceptores para agregar el uid a las solicitudes HTTP.

Las animaciones de navegación están centralizadas en navigation.service.ts.

## Link del Proyecto

Puedes acceder a la aplicación en el siguiente enlace: [Challange Task Atom](https://listtaskchallenge.web.app/login)

