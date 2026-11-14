import { Link, useParams } from "react-router";

function CategoryBooks() {
  const { categoryId } = useParams();

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

      <section className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        El listado se conectará a la API REST en el siguiente bloque.
      </section>
    </main>
  );
}

export default CategoryBooks;
