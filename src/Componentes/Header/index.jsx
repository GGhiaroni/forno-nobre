import styled from "styled-components";
import Logomarca from "../Logomarca";

const HeaderEstilizado = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderEstilizado>
      <Logomarca />
    </HeaderEstilizado>
  );
};

export default Header;
