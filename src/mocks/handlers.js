import { http, HttpResponse } from "msw/http";
import { delay } from "msw/utils/delay";

import { categories, books } from "./data";

export const handlers = [
  http.get("*/api/categories", async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);

    if (url.searchParams.get("simulateError") === "500") {
      return HttpResponse.json(
        { message: "Error interno al consultar categorías." },
        { status: 500 }
      );
    }

    return HttpResponse.json(categories);
  }),

  http.get("*/api/books", async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const categoryId = url.searchParams.get("category");

    if (url.searchParams.get("simulateError") === "500") {
      return HttpResponse.json(
        { message: "Error interno al consultar libros." },
        { status: 500 }
      );
    }

    if (!categoryId) {
      return HttpResponse.json(
        { message: "Debes indicar una categoría." },
        { status: 400 }
      );
    }

    const categoryExists = categories.some(
      (category) => category.id === categoryId
    );

    if (!categoryExists) {
      return HttpResponse.json(
        { message: "La categoría solicitada no existe." },
        { status: 404 }
      );
    }

    const filteredBooks = books.filter(
      (book) => book.category === categoryId
    );

    return HttpResponse.json(filteredBooks);
  }),
];
