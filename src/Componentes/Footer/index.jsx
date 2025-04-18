import styled from "styled-components";
import Logomarca from "../Logomarca";

const FooterEstilizado = styled.footer`
  display: flex;
  background-color: var(--cor-primaria);
`;

const Footer = () => {
  return (
    <FooterEstilizado>
      <Logomarca modo="footer" />
    </FooterEstilizado>
  );
};

export default Footer;
