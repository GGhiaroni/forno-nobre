import { observer } from "mobx-react-lite";
import styled from "styled-components";
import DadosCartao from "../Componentes/DadosCartao";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
`;

const PaginaDadosCartao = observer(() => {
  return (
    <ContainerPrincipal>
      <div>
        <DadosCartao />
      </div>
    </ContainerPrincipal>
  );
});

export default PaginaDadosCartao;
