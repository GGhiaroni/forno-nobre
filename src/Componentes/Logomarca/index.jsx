import { Link } from "react-router-dom";
import styled from "styled-components";
import logoBranca from "/public/logo-forno-nobre-branco.png";
import logoVermelha from "/public/logo-forno-nobre.png";

const ContainerLogomarca = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
`;

const H1Estilizado = styled.h1`
  font-size: ${(props) =>
    props.$modo === "header"
      ? "var(--tamanho-fonte-xl)"
      : "var(--tamanho-fonte-l)"};
  color: ${(props) =>
    props.$modo === "header" ? "var(--cor-primaria)" : "var(--cor-branca)"};
`;

const ImgEstilizada = styled.img`
  height: 50px;
  width: 50px;
`;

const Logomarca = ({ modo = "header" }) => {
  return (
    <ContainerLogomarca to="/">
      <ImgEstilizada src={modo === "header" ? logoVermelha : logoBranca} />
      <H1Estilizado $modo={modo}>Forno Nobre</H1Estilizado>
    </ContainerLogomarca>
  );
};

export default Logomarca;
