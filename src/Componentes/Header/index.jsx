import styled from "styled-components";
import Carrinho from "../Carrinho";
import Input from "../Input";
import Logomarca from "../Logomarca";

const HeaderEstilizado = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background-color: var(--cor-branca);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 1rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  gap: 4rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = () => {
  return (
    <HeaderEstilizado>
      <Container>
        <Logomarca modo="header" />
        <InputWrapper>
          <Input />
        </InputWrapper>
        <Carrinho />
      </Container>
    </HeaderEstilizado>
  );
};

export default Header;
