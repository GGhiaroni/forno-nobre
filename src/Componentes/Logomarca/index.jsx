import styled from "styled-components";
import logoBranca from "/public/logo-forno-nobre-branco.png";
import logoVermelha from "/public/logo-forno-nobre.png";

const ContainerLogomarca = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const H1Estilizado = styled.h1`
  font-size: var(--tamanho-fonte-xl);
  color: ${(props) =>
    props.$modo === "header" ? "var(--cor-primaria)" : "var(--cor-branca)"};
`;

const ImgEstilizada = styled.img`
  height: 50px;
  width: 50px;
`;

const Logomarca = ({ modo = "header" }) => {
  return (
    <ContainerLogomarca>
      <ImgEstilizada src={modo === "header" ? logoVermelha : logoBranca} />
      <H1Estilizado $modo={modo}>Forno Nobre</H1Estilizado>
    </ContainerLogomarca>
  );
};

export default Logomarca;
