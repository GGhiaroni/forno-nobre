import { LuQrCode } from "react-icons/lu";
import { TiArrowLeft } from "react-icons/ti";
import QRCode from "react-qr-code";
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

const ContainerQrCode = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--cor-cinza-claro-extra);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ContainerCards = styled.div`
  display: flex;
`;

const ParagrafoEstilizado = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cor-cinza-escuro);
`;

const ParagrafoEstilizadoSecundario = styled.div`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
`;

const CodigoPix = styled.div`
  background: #f0f4f8;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  word-break: break-word;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 100%;
`;

const BotaoCopiar = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: white;
  border: 1px solid var(--cor-cinza-claro);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--cor-cinza-claro-extra);
  }
`;

const PagamentoPix = () => {
  const codigoPix =
    "00020101021226720014BR.GOV.BCB.PIX0114+5521987654352052040000530398654052905802BR5913PizzaDelivery6008Sao Paulo62070503***63041234";

  const copiarCodigoPix = () => {
    navigator.clipboard.writeText(codigoPix);
  };

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
      <ContainerCards>
        <ContainerQrCode>
          <ParagrafoEstilizado>
            Escaneie o QR Code para pagar
          </ParagrafoEstilizado>
          <ParagrafoEstilizadoSecundario>
            Use o app do seu banco para escanear o código PIX abaixo
          </ParagrafoEstilizadoSecundario>
          <div>
            <QRCode value={codigoPix} size={180} />
          </div>
          <ParagrafoEstilizadoSecundario>
            Ou copie e cole o código PIX
          </ParagrafoEstilizadoSecundario>
          <CodigoPix>{codigoPix}</CodigoPix>
          <BotaoCopiar onClick={copiarCodigoPix}>Copiar código</BotaoCopiar>
        </ContainerQrCode>
      </ContainerCards>
    </ContainerPrincipal>
  );
};

export default PagamentoPix;
