import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Componentes/Footer";
import Header from "./Componentes/Header";
import Home from "./Pages/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
