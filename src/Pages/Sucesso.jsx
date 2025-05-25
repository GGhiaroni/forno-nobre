import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStoreContext } from "../mobx/StoreContext";
import logoBranca from "/public/logo-forno-nobre-branco.png";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const H2Estilizado = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0;
  color: var(--cor-cinza-escuro);
`;

const ParagrafoEstilizado = styled.p`
  font-size: 1.1rem;
  color: var(--cor-cinza-escuro);
  margin-bottom: 2rem;
`;

const IconeCheck = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #11b981;
`;

const Container = styled.div`
  border: 1px solid var(--cor-cinza-claro-extra);
  padding: 2rem 2rem 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.09);
  margin: 0 auto;
`;

const H4Estilizado = styled.h4`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--cor-cinza-escuro);
  text-align: center;
  margin-top: 0;
`;

const ContainerInformacoes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10rem;
`;

const TextoEsquerdo = styled.p`
  font-size: 1.1rem;
  color: var(--cor-cinza-medio);
`;

const TextoDireito = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--cor-cinza-escuro);
`;

const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-top: 1px solid var(--cor-cinza-claro);

  &:first-of-type {
    border-top: none;
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--cor-primaria);
  color: var(--cor-branca);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 2rem;

  &:hover {
    background-color: var(--cor-hover);
  }
`;

const LogoBranca = styled.img`
  width: 40px;
  height: 40px;
`;

const LinkEstilizado = styled(Link)`
  text-decoration: none;
`;

const ContainerItens = styled.div`
  width: 100%;
`;

const ItemLinha = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--cor-cinza-claro);

  &:last-of-type {
    border-bottom: none;
  }
`;

const NomeItem = styled.p`
  font-size: 1.1rem;
  color: var(--cor-cinza-escuro);
`;

const QuantidadeItem = styled.p`
  font-size: 1.1rem;
  color: var(--cor-cinza-medio);
`;

const PrecoItem = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--cor-cinza-escuro);
`;

const TotalLinha = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 0.5rem 0;
  border-top: 2px solid var(--cor-cinza-claro-extra);
`;

const Sucesso = observer(() => {
  const { carrinhoStore } = useStoreContext();

  const [itensPedido, setItensPedido] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    setItensPedido(carrinhoStore.itensNoCarrinho);
    setTotalPedido(carrinhoStore.totalPrecoDoCarrinho);
  }, []);

  if (itensPedido !== undefined) carrinhoStore.limparCarrinho;

  const numeroPedido = Math.floor(100000 + Math.random() * 900000);
  const dataAtual = new Date().toLocaleDateString();

  const agora = new Date();
  const minutosExtras = Math.floor(45 + Math.random() * 15);
  const previsaoInicio = new Date(agora.getTime() + minutosExtras * 60000);

  const previsaoFim = new Date(previsaoInicio.getTime() + 15 * 60000);

  const formatarHora = (data) =>
    data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ContainerPrincipal>
      <IconeCheck />
      <H2Estilizado>Pedido realizado com sucesso!</H2Estilizado>
      <ParagrafoEstilizado>
        Estamos preparando sua pizza com muito carinho e logo ela estará a
        caminho.
      </ParagrafoEstilizado>
      <Container>
        <H4Estilizado>Detalhes do pedido</H4Estilizado>
        <ContainerInformacoes>
          <TextoEsquerdo>Número do pedido</TextoEsquerdo>
          <TextoDireito>PED-{numeroPedido}</TextoDireito>
        </ContainerInformacoes>
        <Linha />
        <ContainerInformacoes>
          <TextoEsquerdo>Data</TextoEsquerdo>
          <TextoDireito>{dataAtual}</TextoDireito>
        </ContainerInformacoes>
        <Linha />
        <ContainerInformacoes>
          <TextoEsquerdo>Previsão de entrega</TextoEsquerdo>
          <TextoDireito>
            Entre {formatarHora(previsaoInicio)} e {formatarHora(previsaoFim)}
          </TextoDireito>
        </ContainerInformacoes>
        <Linha />
        <ContainerInformacoes>
          <TextoEsquerdo>Status</TextoEsquerdo>
          <TextoDireito style={{ color: "#36C190" }}>Em preparo</TextoDireito>
        </ContainerInformacoes>
        <Linha />
        <h3 style={{ margin: "0px" }}>Resumo do Pedido</h3>
        <ContainerInformacoes>
          <ContainerItens>
            {itensPedido.map((item) => (
              <ItemLinha key={item.id}>
                <div>
                  <NomeItem>{item.sabor}</NomeItem>
                  <QuantidadeItem>Quantidade: {item.quantidade}</QuantidadeItem>
                </div>
                <PrecoItem>
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </PrecoItem>
              </ItemLinha>
            ))}
            <TotalLinha>
              <NomeItem>Total</NomeItem>
              <PrecoItem>R$ {totalPedido.toFixed(2)}</PrecoItem>
            </TotalLinha>
          </ContainerItens>
        </ContainerInformacoes>
      </Container>
      <LinkEstilizado to="/">
        <Btn>
          <LogoBranca src={logoBranca} /> Voltar ao cardápio
        </Btn>
      </LinkEstilizado>
    </ContainerPrincipal>
  );
});

export default Sucesso;
