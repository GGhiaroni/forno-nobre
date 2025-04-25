import { observer } from "mobx-react-lite";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStoreContext } from "../../mobx/StoreContext";

const CarrinhoContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--cor-primaria);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Carrinho = observer(() => {
  const { carrinhoStore } = useStoreContext();
  return (
    <CarrinhoContainer>
      <Link to="carrinho">
        <IoCartSharp size={30} color="#333" />
        {carrinhoStore.totalItensNoCarrinho > 0 && (
          <Badge>{carrinhoStore.totalItensNoCarrinho}</Badge>
        )}
      </Link>
    </CarrinhoContainer>
  );
});

export default Carrinho;
