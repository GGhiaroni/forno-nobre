import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import { useStoreContext } from "../../mobx/StoreContext";
import { formatarTextoParaUrl } from "../../utils/formatarTextoParaUrl";

const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
`;

const Card = styled.div`
  background-color: var(--cor-branca);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  height: 100%;
  width: 100%;

  &:hover {
    img {
      transition: ease 0.3s;
      transform: scale(1.1);
    }
  }
`;

const ImagemPizza = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 30px 16px 0px;
  min-height: 120px;
  flex-grow: 1;
`;

const Categoria = styled.p`
  color: var(--cor-laranja);
  font-weight: 600;
  margin: 0;
  font-size: var(--tamanho-fonte-categoria-pizza);
`;

const ContainerCategorias = styled.div`
  display: flex;
  gap: 8px;
`;

const Sabor = styled.h3`
  margin: 8px 0 4px;
  font-size: var(--tamanho-fonte-nome-pizza);
  color: var(--cor-cinza-escuro);
  line-height: 30px;
  font-weight: 600;
`;

const Descricao = styled.p`
  font-size: var(--tamanho-fonte-descricao-pizza);
  color: var(--cor-cinza-claro);
  line-height: 20px;
`;

const Footer = styled.div`
  padding: 0 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const Preco = styled.span`
  font-size: var(--tamanho-fonte-nome-pizza);
  font-weight: 700;
  line-height: 30px;
  color: var(--cor-cinza-escuro);
`;

const BotaoAdicionar = styled.button`
  background-color: var(--cor-primaria);
  border: none;
  border-radius: 50%;
  color: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transition: ease 0.3s;
    transform: scale(1.1);
  }
`;

const ContainerSaborAvaliacao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContainerAvaliacao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Avaliacao = styled.p`
  color: var(--cor-amarelo-escuro);
  font-size: var(--tamanho-fonte-descricao);
`;

const IconeEstrela = styled(IoIosStar)`
  color: var(--cor-amarelo-escuro);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const LinkEstilizado = styled(Link)`
  text-decoration: none;
`;

const ListaSugestoes = styled.ul`
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
  list-style: none;
  padding: 10px;
`;

const ItemSugestao = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: black;
  text-decoration: none;
  border-radius: 6px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ImagemSugestao = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
`;

const CardsPizza = observer(({ categoriaAtiva }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const { carrinhoStore, buscaStore } = useStoreContext();

  useEffect(() => {
    fetch("https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar pizzas");
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setLoading(false);
      });
  }, []);

  const pizzasFiltradas =
    categoriaAtiva === "Todas"
      ? pizzas
      : pizzas.filter((p) => p.categorias.includes(categoriaAtiva));

  const sugestoes = pizzas.filter((p) =>
    p.sabor.toLowerCase().includes(buscaStore.termo.toLowerCase())
  );

  if (loading) return <p>Carregando pizzas...</p>;

  return (
    <>
      {buscaStore.termo.length > 0 && sugestoes.length > 0 && (
        <ListaSugestoes>
          {sugestoes.map((pizza) => (
            <li key={pizza.id}>
              <ItemSugestao
                to={`/pizza/${pizza.id}/${formatarTextoParaUrl(pizza.sabor)}`}
                onClick={() => buscaStore.setTermo("")}
              >
                <ImagemSugestao
                  src={pizza.fotoUm}
                  alt={`Pizza ${pizza.sabor}`}
                />
                <span>{pizza.sabor}</span>
              </ItemSugestao>
            </li>
          ))}
        </ListaSugestoes>
      )}
      <ContainerCards>
        {pizzasFiltradas.map((pizza, index) => (
          <LinkEstilizado
            to={`/pizza/${pizza.id}/${formatarTextoParaUrl(pizza.sabor)}`}
          >
            <Card key={index}>
              <ImagemPizza src={pizza.fotoUm} />
              <Content>
                <ContainerCategorias>
                  {pizza.categorias.map((cat, index) => (
                    <Categoria key={index}>{cat}</Categoria>
                  ))}
                </ContainerCategorias>
                <ContainerSaborAvaliacao>
                  <Sabor>{pizza.sabor}</Sabor>
                  <ContainerAvaliacao>
                    <IconeEstrela />
                    <Avaliacao>{pizza.avaliacao}</Avaliacao>
                  </ContainerAvaliacao>
                </ContainerSaborAvaliacao>
                <Descricao>{pizza.descricao}</Descricao>
              </Content>
              <Footer>
                <Preco>
                  R$ {Number(pizza.preco).toFixed(2).replace(".", ",")}
                </Preco>
                <BotaoAdicionar
                  onClick={(e) => {
                    e.preventDefault();
                    carrinhoStore.adicionarAoCarrinho(pizza);
                    toast.success(
                      `Pizza sabor ${pizza.sabor} adicionada com sucesso! 🍕`,
                      {
                        duration: 1200,
                      }
                    );
                    console.log(
                      "Carrinho atualizado:",
                      toJS(carrinhoStore.itensNoCarrinho)
                    );
                  }}
                >
                  <FaPlus size={20} />
                </BotaoAdicionar>
              </Footer>
            </Card>
          </LinkEstilizado>
        ))}
      </ContainerCards>
    </>
  );
});

export default CardsPizza;
