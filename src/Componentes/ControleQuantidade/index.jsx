import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Botao = styled.button`
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const Quantidade = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 16px;
`;

const ControleQuantidade = ({ quantidade, onIncrementar, onDecrementar }) => {
  return (
    <Container>
      <Botao onClick={onDecrementar} disabled={quantidade <= 1}>
        −
      </Botao>
      <Quantidade>{quantidade}</Quantidade>
      <Botao onClick={onIncrementar}>+</Botao>
    </Container>
  );
};

export default ControleQuantidade;
