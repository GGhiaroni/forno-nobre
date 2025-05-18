import { LuQrCode } from "react-icons/lu";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
`;

const H3Estilizado = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
  line-height: 36px;
  font-weight: 600;
  color: var(--cor-icone-carrinho);
  text-align: start;
`;

const QrCodeEstilizado = styled(LuQrCode)`
  font-size: 2rem;
  color: var(--cor-icone-carrinho);
  justify-content: center;
`;

const ContainerTitulo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconeSeta = styled(TiArrowLeft)`
  font-size: 2rem;
  color: var(--cor-cinza-medio);
  transition: color 0.3s ease, transform 0.3s ease;
`;

const TextoIconeSeta = styled.h3`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
  font-weight: 300;
  transition: color 0.3s ease;
  width: auto;
`;

const ContainerIconeETexto = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  width: 250px;

  &:hover {
    ${IconeSeta} {
      color: var(--cor-primaria);
      transform: translateX(-4px);
    }

    ${TextoIconeSeta} {
      color: var(--cor-primaria);
    }
  }
`;

const LinkEstilizado = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  width: fit-content;
`;

const PagamentoPix = () => {
  return (
    <ContainerPrincipal>
      <ContainerTitulo>
        <QrCodeEstilizado />
        <H3Estilizado>Pagamento via PIX</H3Estilizado>
      </ContainerTitulo>
      <ContainerIconeETexto>
        <LinkEstilizado to="/checkout">
          <IconeSeta />
          <TextoIconeSeta>Voltar para o checkout</TextoIconeSeta>
        </LinkEstilizado>
      </ContainerIconeETexto>
    </ContainerPrincipal>
  );
};

export default PagamentoPix;
