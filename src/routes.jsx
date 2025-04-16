import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Componentes/Header";
import Home from "./Pages/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
