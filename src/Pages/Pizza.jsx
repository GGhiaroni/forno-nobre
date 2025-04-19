import { useEffect, useState } from "react";
import { LuPizza } from "react-icons/lu";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContainerPagina = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ContainerPrincipal = styled.div`
  display: flex;
  gap: 2rem;
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ContainerDetalhes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
`;

const ImagemPizza = styled.img`
  width: 600px;
  height: 400px;
  border-radius: 12px;
  object-fit: cover;
`;

const ContainerMaisFotos = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;

  img {
    border-radius: 8px;
    width: 100px;
    height: auto;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Miniatura = styled.img`
  border-radius: 8px;
  width: 100px;
  height: auto;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 3px solid transparent;
  transition: border 0.3s ease;

  &.selecionada {
    border: 3px solid var(--cor-primaria);
  }
`;

const H3Estilizado = styled.h3`
  font-size: 2rem;
  color: #111;
  margin: 0;
`;

const Categoria = styled.h4`
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-weight: bold;
  width: fit-content;
  font-size: var(--tamanho-fonte-descricao-pizza);
  background-color: #ffedd5;
  color: #c1410b;
`;

const IngredientesTitulo = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const UlEstilizado = styled.ul`
  list-style: none;
  font-size: var(--tamanho-fonte-nome-pizza);
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const LiEstilizado = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cor-cinza-medio);
  font-size: 1rem;
  margin-bottom: 0.6rem;
`;

const ContainerInferior = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Preco = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cor-cinza-escuro);
`;

const BtnAdicionar = styled.button`
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

const ContainerImagensPizza = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pizza = () => {
  const [pizzaEncontrada, setPizzaEncontrada] = useState();
  const [loading, setLoading] = useState(true);
  const [fotoPizzaSelecionada, setFotoPizzaSelecionada] = useState(1);

  const parametro = useParams();

  useEffect(() => {
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
  }, [parametro.id]);

  if (loading) return <p>Carregando pizza...</p>;

  const ingredientes = pizzaEncontrada.descricao;

  const ingredientesSeparados = ingredientes.split(",");

  const selecionarFoto = (id) => {
    setFotoPizzaSelecionada(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ContainerPagina>
      <ContainerPrincipal>
        <ContainerImagensPizza>
          <ImagemPizza
            src={
              fotoPizzaSelecionada === 1
                ? pizzaEncontrada.fotoUm
                : fotoPizzaSelecionada === 2
                ? pizzaEncontrada.fotoDois
                : pizzaEncontrada.fotoTres
            }
          />
          <ContainerMaisFotos>
            {pizzaEncontrada.fotoUm && (
              <Miniatura
                src={pizzaEncontrada.fotoUm}
                alt={`Foto 1 pizza ${pizzaEncontrada.sabor}`}
                onClick={() => selecionarFoto(1)}
                className={fotoPizzaSelecionada === 1 ? "selecionada" : ""}
              />
            )}
            {pizzaEncontrada.fotoDois && (
              <Miniatura
                src={pizzaEncontrada.fotoDois}
                alt={`Foto 2 pizza ${pizzaEncontrada.sabor}`}
                onClick={() => selecionarFoto(2)}
                className={fotoPizzaSelecionada === 2 ? "selecionada" : ""}
              />
            )}
            {pizzaEncontrada.fotoTres && (
              <Miniatura
                src={pizzaEncontrada.fotoTres}
                alt={`Foto 3 pizza ${pizzaEncontrada.sabor}`}
                onClick={() => selecionarFoto(3)}
                className={fotoPizzaSelecionada === 3 ? "selecionada" : ""}
              />
            )}
          </ContainerMaisFotos>
        </ContainerImagensPizza>
        <ContainerDetalhes>
          <Categoria>{pizzaEncontrada.categoria}</Categoria>
          <H3Estilizado>{pizzaEncontrada.sabor}</H3Estilizado>
          <IngredientesTitulo>Ingredientes:</IngredientesTitulo>
          <UlEstilizado>
            {ingredientesSeparados.map((ingrediente, index) => (
              <LiEstilizado key={index}>
                <LuPizza color="#D22418" />
                <span>
                  {ingrediente.trim().charAt(0).toUpperCase() +
                    ingrediente.trim().slice(1)}
                </span>
              </LiEstilizado>
            ))}
          </UlEstilizado>
          <ContainerInferior>
            <Preco>
              R$ {pizzaEncontrada.preco.toFixed(2).replace(".", ",")}
            </Preco>
            <BtnAdicionar>Adicionar ao carrinho</BtnAdicionar>
          </ContainerInferior>
        </ContainerDetalhes>
      </ContainerPrincipal>
    </ContainerPagina>
  );
};

export default Pizza;
