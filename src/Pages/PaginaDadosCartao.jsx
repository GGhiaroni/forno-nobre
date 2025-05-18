import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";
import DadosCartao from "../Componentes/DadosCartao";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginaDadosCartao = observer(() => {
  const { carrinhoStore } = useStoreContext();
  const [codigoCupom, setCodigoCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);

  return (
    <ContainerPrincipal>
      <DadosCartao />
      <ResumoPedido
        carrinhoStore={carrinhoStore}
        exibirBotao={false}
        codigoCupom={codigoCupom}
        setCodigoCupom={setCodigoCupom}
        cupomAplicado={cupomAplicado}
        setCupomAplicado={setCupomAplicado}
      />
    </ContainerPrincipal>
  );
});

export default PaginaDadosCartao;
