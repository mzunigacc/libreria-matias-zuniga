import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/Header";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryBooks from "./pages/CategoryBooks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categories />} />
          <Route
            path="/categorias/:categoryId"
            element={<CategoryBooks />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
