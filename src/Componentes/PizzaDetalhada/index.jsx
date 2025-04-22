import { useState } from "react";
import { LuPizza } from "react-icons/lu";
import { Link } from "react-router-dom";
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

const ContainerCategorias = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
`;

const LinkCategorias = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const PizzaDetalhada = ({ pizza }) => {
  const [fotoSelecionada, setFotoSelecionada] = useState(1);

  const ingredientesSeparados = pizza.descricao.split(",");

  const selecionarFoto = (id) => {
    setFotoSelecionada(id);
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
              fotoSelecionada === 1
                ? pizza.fotoUm
                : fotoSelecionada === 2
                ? pizza.fotoDois
                : pizza.fotoTres
            }
          />
          <ContainerMaisFotos>
            {pizza.fotoUm && (
              <Miniatura
                src={pizza.fotoUm}
                alt="Foto 1"
                onClick={() => selecionarFoto(1)}
                className={fotoSelecionada === 1 ? "selecionada" : ""}
              />
            )}
            {pizza.fotoDois && (
              <Miniatura
                src={pizza.fotoDois}
                alt="Foto 2"
                onClick={() => selecionarFoto(2)}
                className={fotoSelecionada === 2 ? "selecionada" : ""}
              />
            )}
            {pizza.fotoTres && (
              <Miniatura
                src={pizza.fotoTres}
                alt="Foto 3"
                onClick={() => selecionarFoto(3)}
                className={fotoSelecionada === 3 ? "selecionada" : ""}
              />
            )}
          </ContainerMaisFotos>
        </ContainerImagensPizza>
        <ContainerDetalhes>
          <ContainerCategorias>
            {pizza.categorias.map((cat, index) => (
              <LinkCategorias to={`/categorias/${cat}`} key={index}>
                <Categoria>{cat}</Categoria>
              </LinkCategorias>
            ))}
          </ContainerCategorias>
          <H3Estilizado>{pizza.sabor}</H3Estilizado>
          <IngredientesTitulo>Ingredientes:</IngredientesTitulo>
          <UlEstilizado>
            {ingredientesSeparados.map((ing, i) => (
              <LiEstilizado key={i}>
                <LuPizza color="#D22418" />
                <span>{ing.trim()}</span>
              </LiEstilizado>
            ))}
          </UlEstilizado>
          <ContainerInferior>
            <Preco>R$ {pizza.preco.toFixed(2).replace(".", ",")}</Preco>
            <BtnAdicionar>Adicionar ao carrinho</BtnAdicionar>
          </ContainerInferior>
        </ContainerDetalhes>
      </ContainerPrincipal>
    </ContainerPagina>
  );
};

export default PizzaDetalhada;
