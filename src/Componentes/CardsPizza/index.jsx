import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const CardsPizza = ({ categoriaAtiva }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Carregando pizzas...</p>;

  return (
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
              <BotaoAdicionar>
                <FaPlus size={20} />
              </BotaoAdicionar>
            </Footer>
          </Card>
        </LinkEstilizado>
      ))}
    </ContainerCards>
  );
};

export default CardsPizza;
