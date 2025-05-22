import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStoreContext } from "../../mobx/StoreContext";
import { formatarTextoParaUrl } from "../../utils/formatarTextoParaUrl";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--cor-background-input);
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  width: 100%;
`;

const IconeLupa = styled(FiSearch)`
  font-size: 1.5rem;
  color: var(--cor-cinza-medio);
  margin-right: 0.75rem;
`;

const InputEstilizado = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--cor-cinza-escuro);
  width: 100%;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: var(--cor-cinza-medio);
  }
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

const Input = observer(() => {
  const { buscaStore } = useStoreContext();

  const [pizzas, setPizzas] = useState([]);

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
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, []);

  const sugestoes = pizzas.filter((p) =>
    p.sabor.toLowerCase().includes(buscaStore.termo.toLowerCase())
  );

  return (
    <Container>
      <IconeLupa />
      <InputEstilizado
        type="text"
        placeholder="Buscar pizzas..."
        value={buscaStore.termo}
        onChange={(e) => buscaStore.setTermo(e.target.value)}
      />
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
    </Container>
  );
});

export default Input;
