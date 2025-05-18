import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./Componentes/Footer";
import Header from "./Componentes/Header";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import PaginaCarrinho from "./Pages/PaginaCarrinho";
import PaginaDadosCartao from "./Pages/PaginaDadosCartao";
import Pizza from "./Pages/Pizza";
import PizzasPorCategoria from "./Pages/PizzasPorCategoria";
import Sucesso from "./Pages/Sucesso";

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
        <main className="conteudo">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/pizza/:id/:sabor" element={<Pizza />} />
            <Route
              path="/categorias/:categoria"
              element={<PizzasPorCategoria />}
            />
            <Route path="/carrinho" element={<PaginaCarrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dados-cartao" element={<PaginaDadosCartao />} />
            <Route path="/pedido-realizado" element={<Sucesso />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default AppRoutes;
