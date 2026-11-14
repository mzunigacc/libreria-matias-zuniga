import { Link } from "react-router";

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="rounded-2xl bg-amber-50 px-8 py-14 md:px-14">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-700">
          Bienvenido a Librería Central
        </p>

        <h1 className="max-w-2xl text-4xl font-bold text-slate-900 md:text-5xl">
          Explora historias para todos los gustos
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Descubre libros de diferentes categorías mediante nuestro
          catálogo conectado a una API REST simulada.
        </p>

        <Link
          to="/categorias"
          className="mt-8 inline-block rounded-lg bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
        >
          Explorar categorías
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Catálogo por categorías
        </h2>

        <p className="mt-3 text-slate-600">
          Selecciona una categoría para consultar sus libros.
          La información se obtendrá desde un servicio REST mock.
        </p>
      </section>
    </main>
  );
}

export default Home;
