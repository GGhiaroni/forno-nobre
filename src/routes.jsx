import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Componentes/Footer";
import Header from "./Componentes/Header";
import Home from "./Pages/Home";
import Pizza from "./Pages/Pizza";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/pizza/:id/:sabor" element={<Pizza />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
