import styled from "styled-components";
import Carrinho from "../Carrinho";
import Input from "../Input";
import Logomarca from "../Logomarca";

const HeaderEstilizado = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  align-items: center;
  gap: 4rem;
`;

const InputWrapper = styled.div`
  flex: 1;
  max-width: 1000px;
`;

const Header = () => {
  return (
    <HeaderEstilizado>
      <Logomarca />
      <InputWrapper>
        <Input />
      </InputWrapper>
      <Carrinho />
    </HeaderEstilizado>
  );
};

export default Header;
