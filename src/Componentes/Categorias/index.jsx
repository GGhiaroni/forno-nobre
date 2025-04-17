import { useState } from "react";
import styled from "styled-components";

const UlEstilizado = styled.ul`
  margin-top: 5rem;
  display: flex;
  gap: 20px;
  list-style: none;
`;

const LiEstilizado = styled.li`
  border: ${(props) =>
    props.$ativo
      ? "1px solid var(--cor-primaria)"
      : "1px solid var(--cor-cinza-escuro)"};
  font-size: var(--tamanho-fonte-s);
  color: ${(props) =>
    props.$ativo ? "var(--cor-branca)" : "var(--cor-cinza-escuro)"};
  background-color: ${(props) =>
    props.$ativo ? "var(--cor-primaria)" : "transparent"};
  font-weight: 600;
  padding: 1rem 1.2rem;
  border-radius: 1.8rem;
  min-width: 50px;
  text-align: center;
  transition: 0.3s ease;
`;

const BtnEstilizado = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: "Poppins", sans-serif;
`;

const Categorias = () => {
  const categorias = [
    "Todas",
    "Clássicas",
    "Vegetarianas",
    "Mais bem avaliadas",
    "Mais pedidas",
  ];

  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0]);

  return (
    <UlEstilizado>
      {categorias.map((categoria, index) => (
        <BtnEstilizado key={index} onClick={() => setCategoriaAtiva(categoria)}>
          <LiEstilizado $ativo={categoria === categoriaAtiva}>
            {categoria}
          </LiEstilizado>
        </BtnEstilizado>
      ))}
    </UlEstilizado>
  );
};

export default Categorias;
