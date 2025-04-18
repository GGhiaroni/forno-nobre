import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

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

const CardsPizza = () => {
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

  if (loading) return <p>Carregando pizzas...</p>;

  return (
    <ContainerCards>
      {pizzas.map((pizza, index) => (
        <Card key={index}>
          <ImagemPizza src={pizza.fotoUm} />
          <Content>
            <Categoria>{pizza.categoria}</Categoria>
            <Sabor>{pizza.sabor}</Sabor>
            <Descricao>{pizza.descricao}</Descricao>
          </Content>
          <Footer>
            <Preco>R$ {Number(pizza.preco).toFixed(2).replace(".", ",")}</Preco>
            <BotaoAdicionar>
              <FaPlus size={20} />
            </BotaoAdicionar>
          </Footer>
        </Card>
      ))}
    </ContainerCards>
  );
};

export default CardsPizza;
