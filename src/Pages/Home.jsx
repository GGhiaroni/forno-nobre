import { useState } from "react";
import styled from "styled-components";
import CardsPizza from "../Componentes/CardsPizza";
import Categorias from "../Componentes/Categorias";
import HeroSection from "../Componentes/HeroSection";

const ContainerHome = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Home = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  return (
    <>
      <HeroSection />
      <ContainerHome>
        <Categorias
          categoriaAtiva={categoriaAtiva}
          setCategoriaAtiva={setCategoriaAtiva}
        />
        <CardsPizza categoriaAtiva={categoriaAtiva} />
      </ContainerHome>
    </>
  );
};

export default Home;
