import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Checkout = observer(() => {
  const { carrinhoStore } = useStoreContext();

  return (
    <ContainerPrincipal>
      <ResumoPedido carrinhoStore={carrinhoStore} />
    </ContainerPrincipal>
  );
});

export default Checkout;
