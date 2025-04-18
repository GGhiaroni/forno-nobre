import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContainerPagina = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ContainerPrincipal = styled.div`
  display: flex;
  gap: 2rem;
`;

const ContainerDetalhes = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImagemPizza = styled.img`
  width: 600px;
`;

const ContainerMaisFotos = styled.div`
  display: flex;
`;

const H3Estilizado = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
`;

const Categoria = styled.h4`
  font-size: var(--tamanho-fonte-descricao-pizza);
`;

const Pizza = () => {
  const [pizzaEncontrada, setPizzaEncontrada] = useState();
  const [loading, setLoading] = useState(true);

  const parametro = useParams();

  fetch(
    `https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas/${parametro.id}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pizza não encontrada.");
      }
      return response.json();
    })
    .then((data) => {
      setPizzaEncontrada(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Erro:", error);
      setLoading(false);
    });

  if (loading) return <p>Carregando pizza...</p>;

  return (
    <ContainerPagina>
      <ContainerPrincipal>
        <ImagemPizza src={pizzaEncontrada.fotoUm} />
        <ContainerDetalhes>
          <Categoria>{pizzaEncontrada.categoria}</Categoria>
          <H3Estilizado>{pizzaEncontrada.sabor}</H3Estilizado>
        </ContainerDetalhes>
      </ContainerPrincipal>
    </ContainerPagina>
  );
};

export default Pizza;
