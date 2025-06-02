# React Auth Challenge

![Vite](https://img.shields.io/badge/Vite-%2335495e.svg?style=flat&logo=vite&logoColor=yellow)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-%23C21325.svg?style=flat&logo=jest&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)

---

## ¿De qué se trata este proyecto?

Esta app es una demo hecha con *React + Vite + TypeScript* que muestra cómo manejar autenticación y consumir una API pública utilizando cutom hooks para dejar los componentes mas simples, reutilizables y testeables.

*¿Qué vas a encontrar?*
- Un login que simula autenticación (te da un token fake y responde como si fuera real).
- El login se guarda en el navegador y dura 10 minutos. Cuando se vence, aparece un modal que te obliga a volver a iniciar sesión.
- Una pantalla principal (Home) donde ves una lista paginada de 2000 elementos traídos de una API pública.
- Un botón para salir (logout) que borra la sesión(token) y te lleva de nuevo al login.
- Todo el diseño es responsivo.
- El código está pensado para que se pueda agregar más módulos públicos o privados fácilmente.
- Axios se usa para todas las llamadas a la API y siempre manda el token (aunque la API no lo use).
- La lista usa paginación para que la app sea rápida y el usuario tengo mayor control de lo que ve.

---

## Demo

![alt text](<Captura de pantalla 2025-06-02 001556.png>)


## ¿Cómo lo uso?

1. *Cloná el repo:*
   ```bash

   git clone https://github.com/famosity/react-auth-challenge.git
   cd react-auth-challenge
   
   ```

2. *Instalá las dependencias:*
   ```bash

   npm i o npm install

   ```

   

3. *Arrancá la app:*
   ```bash

   npm run dev

   ```
   

4. *Si querés correr los tests:*
   ```bash

   npm test

   ```   

---

## ¿Cómo está armado?

### Contextos Público y Privado

- Uso un *AuthContext* para manejar si el usuario está logueado persistiendo el token por un tiempo dado.
- El token y la fecha/hora de login se guardan en localStorage. Así, aunque cierres el navegador, seguís logueado hasta que pasen 10 minutos.
- Cuando se vence la sesión, aparece un modal que te obliga a cerrar sesión y volver a loguearte.
- Hay rutas públicas (login y error 404) y privadas (home y error 500).
- Si querés agregar más pantallas públicas o privadas, es posible hacerlo. 

### Llamadas a la API y paginación

- Todas las llamadas a la API usan Axios, que ya está configurado para mandar el token.
- La lista de la home se muestra paginada: ves 15 elementos por página y podés navegar con los botones. El número de página se ve en la URL.
- Solo se cargan los elementos de la página actual.
- Ademas a modo simulación se agrego 2 segundos de retraso a la respuesta del endpoint para renderizar un loading representando que los datos se estan cargando.


## ¿Por qué elegí estas herramientas y cómo podría mejorar?

- *Context API* es ideal para proyectos chicos o medianos: es simple, liviano y no suma dependencias.
- Si el proyecto crece mucho, se recomienda usar un manejador de estado como *Zustand* o *Redux Toolkit* para organizar mejor el código y manejar datos globales.
- Una mejora para el usuario sería dejar que elija cuántas cards ver por página (por ejemplo: 15, 30 o 50).
- Si la lista fuera aún más grande, se podria usar "infinite scroll" para cargar más elementos a medida que el usuario baja.
- También se puede mejorar la gestión de errores para mostrar mensajes más claros si algo falla con la/las API/S.

---

## ¿Cómo está organizado el código?


```bash
src/
  components/
  context/
  hook/
  pages/
  schema/
  services/
  types/
  utils/
  App.tsx
  main.tsx
  
```

---

## Cosas a tener en cuenta

- El código está preparado para sumar nuevas pantallas.
- Se sumaron test unitarios a la mayoria de los componentes.
- Se utilizo custom hooks para el manejo de llamados asincronicos y del contexto.