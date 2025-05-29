import styled from "styled-components";

const UlEstilizado = styled.ul`
  margin-top: 5rem;
  display: flex;
  gap: 15px;
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: hidden;
    gap: 20px;
  }
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
  padding: 0.8rem 1rem;
  border-radius: 1.8rem;
  min-width: 80px;
  text-align: center;
  transition: 0.3s ease;
  flex-shrink: 0;

  &:hover {
    ${(props) =>
      !props.$ativo &&
      `
      border-color: #f14236;
      background-color: var(--cor-background-input);
    `}
  }

  @media (min-width: 768px) {
    padding: 1rem 1.2rem;
    min-width: 50px;
  }
`;

const BtnEstilizado = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: "Poppins", sans-serif;
`;

const Categorias = ({ categoriaAtiva, setCategoriaAtiva }) => {
  const categorias = [
    "Todas",
    "Clássicas",
    "Vegetarianas",
    "Especiais",
    "Doces",
  ];

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
