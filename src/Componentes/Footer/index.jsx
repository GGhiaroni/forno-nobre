import styled from "styled-components";
import Logomarca from "../Logomarca";

const FooterEstilizado = styled.footer`
  display: flex;
  background-color: var(--cor-primaria);
  padding: 2rem 3rem;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const ParagrafoFooter = styled.p`
  color: var(--cor-branca);
`;

const Footer = () => {
  return (
    <FooterEstilizado>
      <Logomarca modo="footer" />
      <ParagrafoFooter>
        © 2025 Forno Nobre. Todos os direitos reservados.
      </ParagrafoFooter>
      <ParagrafoFooter>
        Rua Dias Ferreira, 32 - Leblon - Rio de Janeiro
      </ParagrafoFooter>
    </FooterEstilizado>
  );
};

export default Footer;
