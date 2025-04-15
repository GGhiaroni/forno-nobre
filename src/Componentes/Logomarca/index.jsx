import styled from "styled-components";
import logo from "/public/logo-forno-nobre.png";

const ContainerLogomarca = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const H1Estilizado = styled.h1`
  font-size: var(--tamanho-fonte-xl);
  color: var(--cor-primaria);
`;

const ImgEstilizada = styled.img`
  height: 50px;
  width: 50px;
`;

const Logomarca = () => {
  return (
    <ContainerLogomarca>
      <ImgEstilizada src={logo} />
      <H1Estilizado>Forno Nobre</H1Estilizado>
    </ContainerLogomarca>
  );
};

export default Logomarca;
