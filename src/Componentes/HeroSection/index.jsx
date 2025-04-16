import styled from "styled-components";
import imagemHeroSection from "../../assets/pizza-hero_section.jpeg";
import logoBranca from "/public/logo-forno-nobre-branco.png";

const HeroSectionEstilizado = styled.section`
  position: relative;
  width: 100%;
  height: 40vh;
  background-image: url(${imagemHeroSection});
  background-size: cover;
  display: flex;
  align-items: center;
  padding: 4rem;
  color: var(--cor-branca);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  z-index: 2;

  h1 {
    font-size: var(--tamanho-fonte-xxxl);
    font-weight: 700;
  }

  p {
    font-size: var(--tamanho-fonte-l);
    font-weight: 400;
    margin-top: 1rem;
    line-height: 1.6;
    width: 50%;
  }

  button {
    margin-top: 2rem;
    background: var(--cor-primaria);
    color: var(--cor-branca);
    font-weight: 700;
    padding: 1rem 2rem;
    border: none;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: var(--tamanho-fonte-md);
    justify-content: center;
    font-family: "Poppins", sans-serif;
    line-height: 24px;
  }
`;

const LogoBranca = styled.img`
  width: 30px;
  height: 30px;
`;

const HeroSection = () => {
  return (
    <HeroSectionEstilizado>
      <HeroContent>
        <h1>Sabores inigualáveis em cada pedaço</h1>
        <p>
          As melhores pizzas da região, feitas com ingredientes selecionados e
          muito amor. Experimente nossa variedade de sabores exclusivos.
        </p>
        <button>
          {" "}
          <LogoBranca src={logoBranca} />
          Ver Cardápio
        </button>
      </HeroContent>
    </HeroSectionEstilizado>
  );
};

export default HeroSection;
