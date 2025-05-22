import { observer } from "mobx-react-lite";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useStoreContext } from "../../mobx/StoreContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--cor-background-input);
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  width: 100%;
`;

const IconeLupa = styled(FiSearch)`
  font-size: 1.5rem;
  color: var(--cor-cinza-medio);
  margin-right: 0.75rem;
`;

const InputEstilizado = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--cor-cinza-escuro);
  width: 100%;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: var(--cor-cinza-medio);
  }
`;

const Input = observer(() => {
  const { buscaStore } = useStoreContext();
  return (
    <Container>
      <IconeLupa />
      <InputEstilizado
        type="text"
        placeholder="Buscar pizzas..."
        value={buscaStore.termo}
        onChange={(e) => buscaStore.setTermo(e.target.value)}
      />
    </Container>
  );
});

export default Input;
