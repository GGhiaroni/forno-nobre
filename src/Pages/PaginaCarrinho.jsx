import { observer } from "mobx-react-lite";
import { FaTrash } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imagemCarrinhoVazio from "../../src/assets/carrinho-vazio.png";
import { useStoreContext } from "../mobx/StoreContext";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContainerTopo = styled.div`
  margin-top: 8rem;
  display: flex;
  justify-content: space-around;
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
  gap: 1rem;
`;

const ImgCarrinhoVazio = styled.img`
  width: 250px;
`;

const PizzasNoCarrinho = styled.div`
  margin-top: 1rem;
  display: flex;
  padding: 1.5rem;
  border: 1px solid var(--cinza-claro);
`;

const PaginaCarrinho = observer(() => {
  const { carrinhoStore } = useStoreContext();

  const limparCarrinho = () => {
    carrinhoStore.limparCarrinho();
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
        <DivEstilizadaCarrinhoComItens style={{ marginTop: "2rem" }}>
          <div style={{ flex: 2 }}>
            {carrinhoStore.itensNoCarrinho.map((item) => (
              <PizzasNoCarrinho key={item.id}>
                <img
                  src={item.imagem}
                  alt={item.nome}
                  style={{ width: "100px", marginRight: "1rem" }}
                />
                <div style={{ flex: 1 }}>
                  <h3>{item.nome}</h3>
                  <p>R$ {item.preco.toFixed(2)} cada</p>
                  <p>Quantidade: {item.quantidade}</p>
                </div>
                <div>
                  <strong>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </strong>
                </div>
              </PizzasNoCarrinho>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              border: "1px solid var(--cinza-claro)",
              padding: "1.5rem",
              borderRadius: "8px",
              height: "fit-content",
            }}
          >
            <h3>Resumo do pedido</h3>
            <div style={{ marginBottom: "1rem" }}>
              {carrinhoStore.itensNoCarrinho.map((item) => (
                <div
                  key={item.id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {item.quantidade}x {item.nome}
                  </span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <strong>Total:</strong>
              <strong>
                R$ {carrinhoStore.totalPrecoDoCarrinho.toFixed(2)}
              </strong>
            </div>
            <button
              style={{
                marginTop: "1.5rem",
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "var(--cor-primaria)",
                color: "white",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Finalizar Pedido
            </button>
          </div>
        </DivEstilizadaCarrinhoComItens>
      ) : (
        // Carrinho vazio
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
