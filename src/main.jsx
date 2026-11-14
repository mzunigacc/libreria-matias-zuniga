import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: "bypass",
  });
}

async function startApplication() {
  await enableMocking();

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApplication().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);

  document.getElementById("root").textContent =
    "No fue posible iniciar la librería. Recarga la página.";
});
