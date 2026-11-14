# Librería Central — Desarrollo Frontend II

Proyecto académico de la Semana 4 de **Desarrollo Frontend II (PFY2202)**. Tienda de libros desarrollada con React que consume una API REST simulada mediante Mock Service Worker (MSW).

## Tecnologías

- React y Vite
- React Router
- Tailwind CSS
- JavaScript y Fetch API
- Mock Service Worker (MSW 3)
- GitHub Actions y GitHub Pages

## Funcionalidades

- Navegación entre inicio, categorías y libros mediante React Router.
- Consulta dinámica de categorías y libros mediante solicitudes REST.
- Filtrado de libros por categoría desde el servicio simulado.
- Indicadores de carga durante las peticiones.
- Manejo de errores HTTP 400, 404 y 500.
- Mensajes para categorías sin libros.
- Reintento de solicitudes y alternativas de navegación.
- Caché en memoria para evitar consultas repetidas innecesarias.
- Interfaz responsiva con Tailwind CSS.

## API REST simulada

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/categories` | Obtener categorías |
| GET | `/api/books?category=ficcion` | Obtener libros por categoría |

MSW intercepta las solicitudes HTTP en el navegador y devuelve datos JSON simulados. No requiere servidor backend ni base de datos.

## Pruebas de integración

- Categoría válida: respuesta HTTP 200.
- Categoría sin libros: array vacío.
- Categoría inexistente: respuesta HTTP 404.
- Error simulado: respuesta HTTP 500.
- Indicadores de carga y reintentos.
- Navegación y diseño responsivo.
- Compilación mediante `npm run build`.
- Análisis estático mediante `npx oxlint src`.

Para simular un error del servicio:

`/categorias/ficcion?simulateError=500`

## Ejecución local

Instalar dependencias:

    npm install

Iniciar el proyecto:

    npm run dev

Validar compilación y código:

    npm run build
    npx oxlint src

## Arquitectura

- `src/pages/`: páginas y navegación.
- `src/components/`: componentes reutilizables.
- `src/services/booksApi.js`: peticiones HTTP, errores y caché.
- `src/mocks/handlers.js`: endpoints REST simulados.
- `src/mocks/data.js`: datos de prueba.
- `src/mocks/browser.js`: configuración de MSW.

## Repositorio y aplicación

- Repositorio: https://github.com/mzunigacc/libreria-matias-zuniga
- Aplicación: https://mzunigacc.github.io/libreria-matias-zuniga/

**Alcance:** aplicación frontend académica con backend simulado. No implementa persistencia ni un servidor real.
