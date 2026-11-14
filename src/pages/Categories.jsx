import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { getCategories } from "../services/booksApi";

function Categories() {
  const [searchParams] = useSearchParams();
  const simulateError = searchParams.get("simulateError");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    getCategories({
      simulateError,
      force: retryCount > 0,
    })
      .then((data) => {
        if (active) {
          setCategories(data);
          setError(null);
        }
      })
      .catch((requestError) => {
        if (active) {
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
  }, [simulateError, retryCount]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Categorías de libros
      </h1>

      <p className="mt-3 text-slate-600">
        Explora nuestro catálogo organizado por categorías.
        La información se obtiene desde una API REST simulada.
      </p>

      {loading && (
        <section
          role="status"
          aria-live="polite"
          className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900"
        >
          Cargando categorías...
        </section>
      )}

      {!loading && error && (
        <section
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="text-lg font-bold text-red-900">
            No pudimos cargar las categorías
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

            {simulateError && (
              <Link
                to="/categorias"
                className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-900 hover:bg-red-100"
              >
                Volver a la consulta normal
              </Link>
            )}
          </div>
        </section>
      )}

      {!loading && !error && categories.length === 0 && (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">
            No hay categorías disponibles actualmente.
          </p>
        </section>
      )}

      {!loading && !error && categories.length > 0 && (
        <section
          aria-label="Listado de categorías"
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categorias/${category.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-amber-900 group-hover:underline">
                {category.name}
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Explorar libros de esta categoría
              </p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

export default Categories;
