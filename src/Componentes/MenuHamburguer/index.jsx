import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../Input";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 990;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100%;
  background: var(--cor-branca);
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 995;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--cor-cinza-escuro);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--cor-primaria);
  }
`;

const MenuHamburguer = ({
  menuAberto,
  toggleMenu,
  valorBusca,
  onBuscaChange,
}) => {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };

  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: { opacity: 0, transitionEnd: { display: "none" } },
  };

  return (
    <>
      {menuAberto && (
        <Overlay
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          onClick={toggleMenu}
        />
      )}
      <Sidebar
        initial="closed"
        animate={menuAberto ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <Input valorBusca={valorBusca} onBuscaChange={onBuscaChange} />

        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/pizzas" onClick={toggleMenu}>
          Pizzas
        </NavLink>
        <NavLink to="/contato" onClick={toggleMenu}>
          Contato
        </NavLink>
        <NavLink to="/sobre" onClick={toggleMenu}>
          Sobre
        </NavLink>
      </Sidebar>
    </>
  );
};

export default MenuHamburguer;
