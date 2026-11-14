import { Link } from "react-router";

function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        Página no encontrada
      </h1>

      <p className="mt-4 text-slate-600">
        La dirección solicitada no existe en la librería.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-amber-800 px-6 py-3 font-semibold text-white hover:bg-amber-900"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
