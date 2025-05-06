import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import cupons from "../../db/cupons";
import { formatarPreco } from "../../utils/formatarPreco";

const CardResumoPedido = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--cor-cinza-claro-extra);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const H3ResumoPedido = styled.div`
  font-size: var(--tamanho-fonte-xl);
  line-height: 30px;
  font-weight: 600;
  color: var(--cor-cinza-escuro);
  margin-bottom: 1.5rem;
`;

const SpanQuantidadePizzaNoCarrinho = styled.span`
  color: var(--cor-primaria);
  font-weight: 600;
`;

const SpanPrecoItemNoCarrinho = styled.span`
  font-weight: 600;
  color: var(--cor-cinza-escuro);
`;

const ContainerResumoPedido = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnProsseguirCheckout = styled.button`
  background-color: var(--cor-primaria);
  color: var(--cor-branca);
  font-weight: 600;
  line-height: 24px;
  font-size: var(--tamanho-fonte-l);
  padding: 1rem 3.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: var(--cor-hover);
  }
`;

const LinhaCinza = styled.div`
  height: 1.2px;
  background-color: var(--cor-cinza-claro-extra);
  margin: 1rem 0;
  margin-bottom: 2rem;
`;

const ContainerInputCupomBotao = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;

const InputCupomDesconto = styled.input`
  border: 1px solid var(--cor-cinza-claro-extra);
  padding: 1rem 2rem 1rem 1rem;
  border-radius: 8px 0 0 8px;
  font-family: "Poppins";
  font-size: 1rem;
  color: var(--cor-cinza-medio);

  ::placeholder {
    color: #e2e8f0;
  }

  &:focus {
    border: 1px solid var(--cor-primaria);
    outline: none;
  }
`;

const ButtonInputDesconto = styled.button`
  background-color: var(--cor-primaria);
  border: none;
  color: var(--cor-branca);
  font-weight: bold;
  border-radius: 0 8px 8px 0;
  font-size: 1.1rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--cor-hover);
  }
`;

const ContainerSubtotalTaxa = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContainerSubtotal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Subtotal = styled.span`
  color: var(--cor-cinza-medio);
`;

const Total = styled.span`
  font-size: var(--tamanho-fonte-l);
  font-weight: bold;
`;

const ResumoPedido = ({
  carrinhoStore,
  cupomAplicado,
  setCupomAplicado,
  codigoCupom,
  setCodigoCupom,
}) => {
  const valorTaxaEntregaOriginal = carrinhoStore.totalPrecoDoCarrinho * 0.05;
  let desconto = cupomAplicado ? cupomAplicado.valor : 0;
  const taxaEntregaFinal =
    cupomAplicado?.codigo === "FRETEGRATIS" ? 0 : valorTaxaEntregaOriginal;
  const totalComDescontoETaxa = Math.max(
    carrinhoStore.totalPrecoDoCarrinho + taxaEntregaFinal - desconto,
    0
  );

  const aplicarCupom = (codigoInserido) => {
    if (cupomAplicado) {
      toast.error("Você já aplicou um cupom.", {
        duration: 1200,
      });
      return;
    }

    const cupomEncontrado = cupons.find(
      (cupom) => cupom.codigo.toLowerCase() === codigoInserido.toLowerCase()
    );

    if (!cupomEncontrado) {
      toast.error("Cupom não encontrado.", {
        duration: 1200,
      });
      return;
    }

    setCupomAplicado(cupomEncontrado);

    toast.success(`Cupom ${cupomEncontrado.codigo} aplicado com sucesso!`, {
      duration: 1500,
    });
  };

  const removerCupom = () => {
    setCupomAplicado(null);
    setCodigoCupom("");
    desconto = 0;
  };
  return (
    <ContainerResumoPedido>
      <CardResumoPedido>
        <H3ResumoPedido>Resumo do pedido</H3ResumoPedido>
        <div>
          {carrinhoStore.itensNoCarrinho.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <SpanQuantidadePizzaNoCarrinho>
                  {item.quantidade}
                </SpanQuantidadePizzaNoCarrinho>
                <SpanQuantidadePizzaNoCarrinho
                  style={{ color: "var(--cor-cinza-escuro)" }}
                >
                  {item.sabor}
                </SpanQuantidadePizzaNoCarrinho>
              </div>
              <SpanPrecoItemNoCarrinho>
                {formatarPreco(item.preco * item.quantidade)}
              </SpanPrecoItemNoCarrinho>
            </div>
          ))}
          <LinhaCinza style={{ marginTop: "2rem" }}></LinhaCinza>
          <LinhaCinza></LinhaCinza>
        </div>
        <span style={{ fontWeight: "bold" }}>Cupom de desconto</span>
        <ContainerInputCupomBotao>
          <InputCupomDesconto
            placeholder="Digite seu cupom"
            value={codigoCupom}
            onChange={(e) => setCodigoCupom(e.target.value)}
          />
          <ButtonInputDesconto onClick={() => aplicarCupom(codigoCupom)}>
            Aplicar
          </ButtonInputDesconto>
        </ContainerInputCupomBotao>
        {cupomAplicado && (
          <p style={{ marginTop: "0.5rem" }}>
            Cupom "
            <span style={{ color: "var(--cor-primaria)" }}>
              {cupomAplicado.codigo}
            </span>
            " aplicado.
            <FaTimes
              style={{
                cursor: "pointer",
                color: "var(--cor-primaria)",
                marginLeft: "10px",
              }}
              onClick={() => removerCupom()}
            />
          </p>
        )}
        <ContainerSubtotalTaxa>
          <ContainerSubtotal>
            <Subtotal>Subtotal</Subtotal>
            <Subtotal>
              {formatarPreco(carrinhoStore.totalPrecoDoCarrinho)}
            </Subtotal>
          </ContainerSubtotal>
          <ContainerSubtotal>
            <Subtotal>Taxa de Entrega</Subtotal>
            <Subtotal>{formatarPreco(taxaEntregaFinal)}</Subtotal>
          </ContainerSubtotal>
        </ContainerSubtotalTaxa>
        {cupomAplicado && cupomAplicado.codigo !== "FRETEGRATIS" && (
          <ContainerSubtotal>
            <Subtotal style={{ color: "#00C205" }}>Desconto</Subtotal>
            <Subtotal style={{ color: "#00C205" }}>
              - {formatarPreco(desconto)}
            </Subtotal>
          </ContainerSubtotal>
        )}
        <LinhaCinza style={{ marginBottom: ".5rem" }}></LinhaCinza>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Total>Total:</Total>
          <Total>{formatarPreco(totalComDescontoETaxa)}</Total>
        </div>
      </CardResumoPedido>
      <Link
        to="/checkout"
        style={{ textDecoration: "none", color: "var(--cor-branca)" }}
      >
        <BtnProsseguirCheckout>
          Prosseguir para o pagamento
        </BtnProsseguirCheckout>
      </Link>
    </ContainerResumoPedido>
  );
};

export default ResumoPedido;
