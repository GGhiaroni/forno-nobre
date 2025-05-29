import { useRef, useState } from "react";
import styled from "styled-components";
import CardsPizza from "../Componentes/CardsPizza";
import Categorias from "../Componentes/Categorias";
import Header from "../Componentes/Header";
import HeroSection from "../Componentes/HeroSection";

const ContainerHome = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 4rem;
  }
`;

const SecaoCardapio = styled.section`
  scroll-margin-top: 100px;
`;

const Home = ({ busca, setBusca }) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const cardapioRef = useRef(null);

  const scrollParaCardapio = () => {
    const offset = 130;
    const top =
      cardapioRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header valorBusca={busca} onBuscaChange={setBusca} />
      <HeroSection scrollParaCardapio={scrollParaCardapio} />
      <ContainerHome>
        <Categorias
          categoriaAtiva={categoriaAtiva}
          setCategoriaAtiva={setCategoriaAtiva}
        />
        <SecaoCardapio ref={cardapioRef}>
          <CardsPizza
            categoriaAtiva={categoriaAtiva}
            busca={busca}
            setBusca={setBusca}
          />
        </SecaoCardapio>
      </ContainerHome>
    </>
  );
};

export default Home;
