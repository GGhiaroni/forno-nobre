import { useEffect, useState } from "react";
import { LuQrCode } from "react-icons/lu";
import { TiArrowLeft } from "react-icons/ti";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";

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
  align-items: center;
  border: 1px solid var(--cor-cinza-claro-extra);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 80%;
`;

const ContainerCards = styled.div`
  display: flex;
  gap: 2rem;
`;

const ParagrafoEstilizado = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--cor-cinza-escuro);
`;

const ParagrafoEstilizadoSecundario = styled.span`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
  margin-bottom: 1rem;
`;

const ParagrafoEstilizadoInstrucoes = styled.span`
  font-size: 1rem;
  color: var(--cor-cinza-medio);
  margin-bottom: 0.5rem;
  font-weight: 300;
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
  font-weight: 400;
  transition: background-color 0.3s ease;
  font-family: "Poppins";
  font-size: 1rem;
  color: var(--cor-cinza-medio);
  margin-bottom: 2rem;

  &:hover {
    background-color: var(--cor-cinza-claro-extra);
  }
`;

const ContainerQrCodeImagem = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid var(--cor-cinza-claro-extra);
  padding: 1rem;
  border-radius: 8px;
  max-width: fit-content;
  margin-bottom: 1rem;
`;

const ContainerInstrucoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  width: 100%;
`;

const BotaoFinalizar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: var(--cor-primaria);
  color: #fff;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: var(--cor-hover);
  }
`;

const PagamentoPix = () => {
  const [codigoPix, setCodigoPix] = useState("");
  const { carrinhoStore } = useStoreContext();
  const [codigoCupom, setCodigoCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);

  useEffect(() => {
    const gerarCodigoPix = () => {
      const random = Math.floor(Math.random() * 1000000000);
      const codigo =
        `00020101021226720014BR.GOV.BCB.PIX0114+55219876543` +
        `5204000053039865405${(Math.random() * 50 + 10)
          .toFixed(2)
          .replace(".", "")}` +
        `5802BR5913FornoNobre6008RiodeJaneiro62070503***6304` +
        random.toString().padStart(10, "0");
      return codigo;
    };

    setCodigoPix(gerarCodigoPix());
  }, []);

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
          <ContainerQrCodeImagem>
            <QRCode value={codigoPix} size={180} />
          </ContainerQrCodeImagem>
          <ParagrafoEstilizadoSecundario>
            Ou copie e cole o código PIX
          </ParagrafoEstilizadoSecundario>
          <CodigoPix>{codigoPix}</CodigoPix>
          <BotaoCopiar
            onClick={(e) => {
              e.preventDefault();
              copiarCodigoPix();
              toast.success(`Código pix copiado!`, {
                duration: 1200,
              });
            }}
          >
            Copiar código
          </BotaoCopiar>
          <ContainerInstrucoes>
            <ParagrafoEstilizado style={{ marginBottom: "1rem" }}>
              Como pagar com PIX
            </ParagrafoEstilizado>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>1.</b> Abra o aplicativo do seu
              banco
            </ParagrafoEstilizadoInstrucoes>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>2.</b> Escolha a opção PIX
            </ParagrafoEstilizadoInstrucoes>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>3.</b> Escaneie o QR Code ou cole
              o código copiado
            </ParagrafoEstilizadoInstrucoes>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>4.</b> Confirme as informações e
              valor
            </ParagrafoEstilizadoInstrucoes>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>5.</b> Finalize o pagamento no
              aplicativo do seu banco
            </ParagrafoEstilizadoInstrucoes>
            <ParagrafoEstilizadoInstrucoes>
              <b style={{ fontWeight: "500" }}>6.</b> Após pagar, clique em
              "Confirmar Pagamento" abaixo
            </ParagrafoEstilizadoInstrucoes>
          </ContainerInstrucoes>
          <BotaoFinalizar>Confirmar pagamento</BotaoFinalizar>
        </ContainerQrCode>
        <ResumoPedido
          carrinhoStore={carrinhoStore}
          exibirBotao={false}
          codigoCupom={codigoCupom}
          setCodigoCupom={setCodigoCupom}
          cupomAplicado={cupomAplicado}
          setCupomAplicado={setCupomAplicado}
        />
      </ContainerCards>
    </ContainerPrincipal>
  );
};

export default PagamentoPix;
