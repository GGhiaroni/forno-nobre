import { useRef, useState } from "react";
import styled from "styled-components";
import CardsPizza from "../Componentes/CardsPizza";
import Categorias from "../Componentes/Categorias";
import HeroSection from "../Componentes/HeroSection";

const ContainerHome = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
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
