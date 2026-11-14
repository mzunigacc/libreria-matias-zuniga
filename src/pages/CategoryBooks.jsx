import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";

import { getBooksByCategory } from "../services/booksApi";

function CategoryBooks() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const simulateError = searchParams.get("simulateError");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    getBooksByCategory(categoryId, {
      simulateError,
      force: retryCount > 0,
    })
      .then((data) => {
        if (active) {
          setBooks(data);
          setError(null);
        }
      })
      .catch((requestError) => {
        if (active) {
          setBooks([]);
          setError(requestError);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [categoryId, simulateError, retryCount]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/categorias"
        className="text-sm font-semibold text-amber-800 hover:underline"
      >
        Volver a categorías
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Libros de la categoría
      </h1>

      <p className="mt-3 text-slate-600">
        Categoría seleccionada: {categoryId}
      </p>

      {loading && (
        <section
          role="status"
          aria-live="polite"
          className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900"
        >
          Cargando libros...
        </section>
      )}

      {!loading && error && (
        <section
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="text-lg font-bold text-red-900">
            No pudimos consultar los libros
          </h2>

          <p className="mt-2 text-red-800">
            {error.message}
          </p>

          {error.status > 0 && (
            <p className="mt-2 text-sm text-red-700">
              Código HTTP: {error.status}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={retry}
              className="rounded-lg bg-red-800 px-5 py-3 font-semibold text-white hover:bg-red-900"
            >
              Reintentar
            </button>

            <Link
              to="/categorias"
              className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-900 hover:bg-red-100"
            >
              Elegir otra categoría
            </Link>

            {simulateError && (
              <Link
                to={`/categorias/${categoryId}`}
                className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Volver a la consulta normal
              </Link>
            )}
          </div>
        </section>
      )}

      {!loading && !error && books.length === 0 && (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            No hay libros disponibles
          </h2>

          <p className="mt-3 text-slate-600">
            Esta categoría todavía no tiene libros registrados.
          </p>

          <Link
            to="/categorias"
            className="mt-6 inline-block rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white hover:bg-amber-900"
          >
            Explorar otras categorías
          </Link>
        </section>
      )}

      {!loading && !error && books.length > 0 && (
        <section
          aria-label="Listado de libros"
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {books.map((book) => (
            <article
              key={book.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {book.title}
                </h2>

                <p className="mt-2 text-slate-600">
                  {book.author}
                </p>
              </div>

              <p className="mt-6 text-xl font-bold text-amber-900">
                ${book.price.toLocaleString("es-CL")}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default CategoryBooks;
