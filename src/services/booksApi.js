const requestCache = new Map();

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function fetchJson(path, { force = false } = {}) {
  const url = `${import.meta.env.BASE_URL}${path}`;

  if (!force && requestCache.has(url)) {
    return requestCache.get(url);
  }

  const request = (async () => {
    let response;

    try {
      response = await fetch(url);
    } catch {
      throw new ApiError(
        "No fue posible conectar con el servicio de libros."
      );
    }

    let data;

    try {
      data = await response.json();
    } catch {
      throw new ApiError(
        "El servicio devolvió una respuesta no válida.",
        response.status
      );
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || "No fue posible completar la consulta.",
        response.status
      );
    }

    return data;
  })();

  requestCache.set(url, request);

  // No conservamos errores en caché: podrán reintentarse.
  request.catch(() => {
    if (requestCache.get(url) === request) {
      requestCache.delete(url);
    }
  });

  return request;
}

export function getCategories(options = {}) {
  const params = new URLSearchParams();

  if (options.simulateError) {
    params.set("simulateError", options.simulateError);
  }

  const query = params.toString();

  return fetchJson(
    `api/categories${query ? `?${query}` : ""}`,
    options
  );
}

export function getBooksByCategory(categoryId, options = {}) {
  const params = new URLSearchParams({
    category: categoryId,
  });

  if (options.simulateError) {
    params.set("simulateError", options.simulateError);
  }

  return fetchJson(
    `api/books?${params.toString()}`,
    options
  );
}
