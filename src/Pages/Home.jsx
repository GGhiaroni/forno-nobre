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
  return (
    <>
      <HeroSection />
      <ContainerHome>
        <Categorias />
        <CardsPizza />
      </ContainerHome>
    </>
  );
};

export default Home;
