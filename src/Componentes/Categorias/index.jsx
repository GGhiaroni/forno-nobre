import styled from "styled-components";

const UlEstilizado = styled.ul`
  margin-top: 5rem;
  display: flex;
  gap: 20px;
  list-style: none;
`;

const LiEstilizado = styled.li`
  border: 1px solid var(--cor-cinza-claro);
  font-size: var(--tamanho-fonte-s);
  color: var(--cor-cinza-escuro);
  font-weight: 500;
  padding: 1rem 1.2rem;
  border-radius: 1.8rem;
  min-width: 50px;
  text-align: center;
`;

const Categorias = () => {
  const categorias = [
    "Todas",
    "Clássicas",
    "Vegetarianas",
    "Mais bem avaliadas",
    "Mais pedidas",
  ];

  return (
    <UlEstilizado>
      {categorias.map((categoria, index) => (
        <LiEstilizado key={index}>{categoria}</LiEstilizado>
      ))}
    </UlEstilizado>
  );
};

export default Categorias;
