import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./Componentes/Footer";
import Header from "./Componentes/Header";
import Home from "./Pages/Home";
import PaginaCarrinho from "./Pages/PaginaCarrinho";
import Pizza from "./Pages/Pizza";
import PizzasPorCategoria from "./Pages/PizzasPorCategoria";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/pizza/:id/:sabor" element={<Pizza />} />
        <Route path="/categorias/:categoria" element={<PizzasPorCategoria />} />
        <Route path="/carrinho" element={<PaginaCarrinho />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default AppRoutes;
