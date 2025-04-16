import styled from "styled-components";
import Categorias from "../Componentes/Categorias";
import HeroSection from "../Componentes/HeroSection";

const ContainerHome = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Home = () => {
  return (
    <>
      <HeroSection />
      <ContainerHome>
        <Categorias />
      </ContainerHome>
    </>
  );
};

export default Home;
