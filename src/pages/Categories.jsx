function Categories() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Categorías de libros
      </h1>

      <p className="mt-3 text-slate-600">
        Aquí se mostrarán las categorías obtenidas desde la API REST.
      </p>

      <section className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Catálogo pendiente de conexión con MSW.
      </section>
    </main>
  );
}

export default Categories;
