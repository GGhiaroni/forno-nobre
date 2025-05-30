import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import Carrinho from "../Carrinho";
import Input from "../Input";
import Logomarca from "../Logomarca";
import MenuHamburguer from "../MenuHamburguer";

const HeaderEstilizado = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: var(--cor-branca);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 1.5rem 1rem;
    display: block;
  }
`;

const ContainerDesktop = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    gap: 4rem;
  }
`;

const ContainerMobile = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IconeMenu = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--cor-cinza-escuro);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  z-index: 1001;

  &:hover {
    color: var(--cor-primaria);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = ({ valorBusca, onBuscaChange }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <HeaderEstilizado>
        <ContainerMobile>
          <Logomarca modo="header" />
          <Carrinho />
          <IconeMenu onClick={toggleMenu}>
            {menuAberto ? <FaTimes /> : <FaBars />}
          </IconeMenu>
        </ContainerMobile>

        <MenuHamburguer
          menuAberto={menuAberto}
          toggleMenu={toggleMenu}
          valorBusca={valorBusca}
          onBuscaChange={onBuscaChange}
        />

        <ContainerDesktop>
          <Logomarca modo="header" />
          <Input valorBusca={valorBusca} onBuscaChange={onBuscaChange} />
          <Carrinho />
        </ContainerDesktop>
      </HeaderEstilizado>
    </>
  );
};

export default Header;
