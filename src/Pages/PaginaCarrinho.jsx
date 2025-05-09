import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imagemCarrinhoVazio from "../../src/assets/carrinho-vazio.png";
import ControleQuantidade from "../Componentes/ControleQuantidade";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";
import { formatarPreco } from "../utils/formatarPreco";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContainerTopo = styled.div`
  margin-top: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconeCarrinho = styled(IoCartSharp)`
  font-size: 2rem;
  color: var(--cor-icone-carrinho);
`;

const IconeSeta = styled(TiArrowLeft)`
  font-size: 2rem;
  color: var(--cor-cinza-medio);
  transition: color 0.3s ease, transform 0.3s ease;
`;

const IconeLixeira = styled(FaTrash)`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
`;

const TextoIconeCarrinho = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
  line-height: 36px;
  font-weight: 600;
  color: var(--cor-icone-carrinho);
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
`;

const ContainerIconeETextoSeta = styled.div`
  display: flex;
  gap: 1px;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${IconeSeta} {
      color: var(--cor-primaria);
      transform: translateX(-4px);
    }

    ${IconeLixeira} {
      color: var(--cor-primaria);
    }

    ${TextoIconeSeta} {
      color: var(--cor-primaria);
    }
  }
`;

const LinkEstilizado = styled(Link)`
  text-decoration: none;
`;

const DivEstilizada = styled.div`
  margin-top: 5rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const H3Estilizado = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
  font-weight: 600;
  color: var(--cor-cinza-escuro);
  line-height: 1.2;
  margin: 0;
`;

const TextoSecundario = styled.p`
  font-size: var(--tamanho-fonte-l);
  font-weight: 300;
  color: var(--cor-cinza-medio);
  margin: 0;
  line-height: 1.4;
`;

const Btn = styled.button`
  background-color: var(--cor-primaria);
  color: var(--cor-branca);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: var(--cor-hover);
  }
`;

const DivEstilizadaCarrinhoComItens = styled.div`
  display: flex;
  gap: 2rem;
  border: 1px solid var(--cinza-claro-extra);
  border-radius: 5px;
`;

const ImgCarrinhoVazio = styled.img`
  width: 250px;
`;

const PizzasNoCarrinho = styled.div`
  margin-top: 1rem;
  display: flex;
  padding: 1.5rem;
  border: 1px solid var(--cor-cinza-claro-extra);
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const CardEsquerdoResumo = styled.div`
  flex: 2;
  border-radius: 25px;
`;

const ContainerQuantidadePreco = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

const PrecoContainerQuantidade = styled.span`
  font-size: var(--tamanho-fonte-l);
  font-weight: bold;
  line-height: 24px;
  width: 110px;
`;

const PaginaCarrinho = observer(() => {
  const { carrinhoStore } = useStoreContext();
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [codigoCupom, setCodigoCupom] = useState("");

  const limparCarrinho = () => {
    carrinhoStore.limparCarrinho();
  };

  const removerItemDoCarrinho = (id) => {
    carrinhoStore.removerDoCarrinho(id);
  };

  return (
    <ContainerPrincipal>
      <ContainerTopo>
        <ContainerIconeETexto>
          <IconeCarrinho />
          <TextoIconeCarrinho>Carrinho de compras</TextoIconeCarrinho>
        </ContainerIconeETexto>

        {carrinhoStore.totalItensNoCarrinho === 0 ? (
          <LinkEstilizado to="/">
            <ContainerIconeETextoSeta>
              <IconeSeta />
              <TextoIconeSeta>Continuar comprando</TextoIconeSeta>
            </ContainerIconeETextoSeta>
          </LinkEstilizado>
        ) : (
          <>
            <DivEstilizadaCarrinhoComItens>
              <LinkEstilizado to="/">
                <ContainerIconeETextoSeta>
                  <IconeSeta />
                  <TextoIconeSeta>Continuar comprando</TextoIconeSeta>
                </ContainerIconeETextoSeta>
              </LinkEstilizado>
              <ContainerIconeETextoSeta style={{ gap: "5px" }}>
                <IconeLixeira />
                <TextoIconeSeta onClick={limparCarrinho}>
                  Limpar carrinho
                </TextoIconeSeta>
              </ContainerIconeETextoSeta>
            </DivEstilizadaCarrinhoComItens>
          </>
        )}
      </ContainerTopo>

      {carrinhoStore.totalItensNoCarrinho > 0 ? (
        <DivEstilizadaCarrinhoComItens>
          <CardEsquerdoResumo>
            {carrinhoStore.itensNoCarrinho.map((item, index) => (
              <PizzasNoCarrinho key={index}>
                <img
                  src={item.fotoUm}
                  alt={item.nome}
                  style={{
                    width: "100px",
                    marginRight: "1rem",
                    borderRadius: "10px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3>{item.sabor}</h3>
                  <p>{formatarPreco(item.preco)} cada</p>
                </div>
                <ContainerQuantidadePreco>
                  <ControleQuantidade
                    quantidade={item.quantidade}
                    onIncrementar={() =>
                      carrinhoStore.incrementarQuantidade(item.id)
                    }
                    onDecrementar={() =>
                      carrinhoStore.decrementarQuantidade(item.id)
                    }
                  />
                  <FaTrash
                    style={{
                      color: "var(--cor-primaria)",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                    }}
                    onClick={() => removerItemDoCarrinho(item.id)}
                  />
                  <PrecoContainerQuantidade>
                    {formatarPreco(item.preco * item.quantidade)}
                  </PrecoContainerQuantidade>
                </ContainerQuantidadePreco>
              </PizzasNoCarrinho>
            ))}
          </CardEsquerdoResumo>
          <ResumoPedido
            carrinhoStore={carrinhoStore}
            cupomAplicado={cupomAplicado}
            setCupomAplicado={setCupomAplicado}
            codigoCupom={codigoCupom}
            setCodigoCupom={setCodigoCupom}
          />
        </DivEstilizadaCarrinhoComItens>
      ) : (
        <DivEstilizada>
          <H3Estilizado>Ops, seu carrinho está vazio.</H3Estilizado>
          <ImgCarrinhoVazio
            src={imagemCarrinhoVazio}
            alt="imagem carrinho vazio"
          />
          <TextoSecundario>
            Adicione alguma pizza para prosseguir com o checkout.
          </TextoSecundario>
          <Link to="/">
            <Btn>Ver cardápio</Btn>
          </Link>
        </DivEstilizada>
      )}
    </ContainerPrincipal>
  );
});

export default PaginaCarrinho;
