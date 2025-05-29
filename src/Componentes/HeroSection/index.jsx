import styled from "styled-components";
import imagemHeroSection from "../../assets/pizza-hero_section.jpeg";
import logoBranca from "/public/logo-forno-nobre-branco.png";

const HeroSectionEstilizado = styled.section`
  position: relative;
  width: 100%;
  min-height: 40vh;
  background-image: url(${imagemHeroSection});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-top: 6rem;
  color: var(--cor-branca);
  box-sizing: border-box;
  overflow: hidden;

  img {
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  @media (min-width: 480px) {
    min-height: 50vh;
    padding: 2rem;
  }

  @media (min-width: 768px) {
    min-height: 50vh;
    padding: 3rem;
  }

  @media (min-width: 1024px) {
    min-height: 60vh;
    padding: 4rem;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
  max-width: 90%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 70%;
    margin: 0;
  }

  h1 {
    font-size: var(--tamanho-fonte-l);
    font-weight: 700;

    @media (min-width: 480px) {
      font-size: 2.2rem;
    }

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: var(--tamanho-fonte-s);
    font-weight: 300;
    margin-top: 1rem;
    line-height: 1.6;
    width: 100%;

    @media (min-width: 480px) {
      font-size: 1.05rem;
    }

    @media (min-width: 768px) {
      width: 60%;
      font-size: 1.2rem;
    }

    @media (min-width: 1024px) {
      width: 50%;
    }
  }

  button {
    margin-top: 1.5rem;
    background: var(--cor-primaria);
    color: var(--cor-branca);
    font-weight: 700;
    padding: 0.8rem 1.6rem;
    border: none;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    justify-content: center;
    font-family: "Poppins", sans-serif;

    @media (min-width: 480px) {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
`;

const LogoBranca = styled.img`
  width: 30px;
  height: 30px;
`;

const HeroSection = ({ scrollParaCardapio }) => {
  return (
    <HeroSectionEstilizado>
      <HeroContent>
        <h1>Sabores inigualáveis em cada pedaço.</h1>
        <p>
          As melhores pizzas da região, feitas com ingredientes selecionados e
          muito amor. Experimente nossa variedade de sabores exclusivos.
        </p>
        <button onClick={scrollParaCardapio}>
          <LogoBranca src={logoBranca} />
          Ver Cardápio
        </button>
      </HeroContent>
    </HeroSectionEstilizado>
  );
};

export default HeroSection;
