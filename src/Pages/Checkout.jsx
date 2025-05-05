import { observer } from "mobx-react-lite";
import { FaShoppingBag } from "react-icons/fa";
import { TiArrowLeft } from "react-icons/ti";
import styled from "styled-components";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
`;

const ContainerTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const IconeBag = styled(FaShoppingBag)`
  font-size: 2rem;
  color: var(--cor-icone-carrinho);
`;

const H3Estilizado = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
  line-height: 36px;
  font-weight: 600;
  color: var(--cor-icone-carrinho);
`;

const IconeSeta = styled(TiArrowLeft)`
  font-size: 2rem;
  color: var(--cor-cinza-medio);
  transition: color 0.3s ease, transform 0.3s ease;
`;

const TextoIconeSeta = styled.h3`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
  font-weight: 300;
  transition: color 0.3s ease;
`;

const ContainerIconeETexto = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${IconeSeta} {
      color: var(--cor-primaria);
      transform: translateX(-4px);
    }

    ${TextoIconeSeta} {
      color: var(--cor-primaria);
    }
  }
`;
const Checkout = observer(() => {
  const { carrinhoStore } = useStoreContext();

  return (
    <ContainerPrincipal>
      <ContainerTopo>
        <ContainerIconeETexto>
          <IconeBag />
          <H3Estilizado>Finalizar pedido</H3Estilizado>
        </ContainerIconeETexto>
        <ContainerIconeETexto>
          <IconeSeta />
          <TextoIconeSeta>Voltar para o carrinho</TextoIconeSeta>
        </ContainerIconeETexto>
      </ContainerTopo>
      <ResumoPedido carrinhoStore={carrinhoStore} />
    </ContainerPrincipal>
  );
});

export default Checkout;
