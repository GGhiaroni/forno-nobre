import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  FaMoneyBillWave,
  FaRegCreditCard,
  FaShoppingBag,
} from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { TiArrowLeft } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ResumoPedido from "../Componentes/ResumoPedido";
import { useStoreContext } from "../mobx/StoreContext";
import buscarCep from "../utils/buscarCep";
import { formatarCep } from "../utils/formatarCep";
import { formatarTelefone } from "../utils/formatarTelefone";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
`;

const ContainerTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const IconeBag = styled(FaShoppingBag)`
  font-size: 2rem;
  color: var(--cor-icone-carrinho);
`;

const H3Estilizado = styled.h3`
  font-size: var(--tamanho-fonte-xxl);
  line-height: 36px;
  font-weight: 600;
  color: var(--cor-icone-carrinho);
`;

const H4Estilizado = styled.h4`
  font-size: var(--tamanho-fonte-xl);
  line-height: 36px;
  font-weight: 600;
  color: var(--cor-icone-carrinho);
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
`;

const ContainerIconeETexto = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

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
`;

const GridCheckout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormularioEntrega = styled.form`
  background-color: #fff;
  padding: 0 2rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--cor-cinza-claro-extra);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: "Poppins";

    &:focus {
      border: 1px solid var(--cor-primaria);
      outline: none;
    }
  }

  .metodo-pagamento {
    display: flex;
    gap: 1rem;

    button {
      flex: 1;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      background: #ffffff;
      cursor: pointer;
      font-weight: 500;

      &.ativo {
        border-color: var(--cor-primaria);
        background: #ffffff;
        color: var(--cor-primaria);
      }
    }
  }

  .btn-finalizar {
    padding: 1rem;
    background-color: var(--cor-primaria);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
      background-color: var(--cor-hover);
    }
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  display: inline-block;
  color: var(--cor-cinza-escuro);
  margin-top: 1rem;

  &.label_metodo-pagamento {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const ContainerLabelInput = styled.div`
  display: flex;
  flex-direction: column;

  &.metodos_pagamento {
    margin-top: 0.5rem;
  }
`;

const LinhaDupla = styled.div`
  display: flex;
  gap: 1rem;

  ${ContainerLabelInput} {
    flex: 1;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BtnPagamento = styled.button`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  font-size: 1.5rem;
  color: var(--cor-cinza-escuro);
  font-family: "Poppins";

  span {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 21px;
  }
`;

const TextoErro = styled.span`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const LabelFormaPagamento = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-block;
  color: var(--cor-cinza-escuro);
  margin-top: 1rem;

  &.label_metodo-pagamento {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const ContainerFormaPagamento = styled.div`
  display: flex;
  gap: 1rem;
`;

const BtnFormaPagamento = styled.button`
  padding: 1rem;
  background-color: var(--cor-primaria);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--cor-hover);
  }
`;

const Checkout = observer(() => {
  const { carrinhoStore } = useStoreContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [tipoDePagamento, setTipoDePagamento] = useState("");

  const [codigoCupom, setCodigoCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);

  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroCep, setErroCep] = useState("");
  const [erroNumero, setErroNumero] = useState("");
  const [erroComplemento, setErroComplemento] = useState("");

  const navigate = useNavigate();

  const validarFormulario = () => {
    let valido = true;

    if (!nome.trim()) {
      setErroNome("Nome é obrigatório");
      valido = false;
    } else {
      setErroNome("");
    }

    if (!email.trim()) {
      setErroEmail("Email é obrigatório");
      valido = false;
    } else {
      setErroEmail("");
    }

    if (!telefone.trim()) {
      setErroTelefone("Telefone é obrigatório");
      valido = false;
    } else {
      setErroTelefone("");
    }

    if (!cep.trim()) {
      setErroCep("CEP é obrigatório");
      valido = false;
    } else {
      setErroCep("");
    }

    if (!numero.trim()) {
      setErroNumero("Número é obrigatório");
      valido = false;
    } else {
      setErroNumero("");
    }

    const complemento = document.getElementById("complemento")?.value;
    if (!complemento.trim()) {
      setErroComplemento("Complemento é obrigatório");
      valido = false;
    } else {
      setErroComplemento("");
    }

    return valido;
  };

  return (
    <ContainerPrincipal>
      <ContainerTopo>
        <ContainerIconeETexto>
          <IconeBag />
          <H3Estilizado>Finalizar pedido</H3Estilizado>
        </ContainerIconeETexto>
        <ContainerIconeETexto>
          <LinkEstilizado to="/carrinho">
            <IconeSeta />
            <TextoIconeSeta>Voltar para o carrinho</TextoIconeSeta>
          </LinkEstilizado>
        </ContainerIconeETexto>
      </ContainerTopo>

      <GridCheckout>
        <FormularioEntrega
          onSubmit={(e) => {
            e.preventDefault();

            const formularioValido = validarFormulario();
            if (!formularioValido) return;

            const dadosPedido = {
              nome,
              email,
              telefone,
              cep,
              rua,
              numero,
              complemento: document.getElementById("complemento")?.value,
              bairro,
              cidade,
              metodoPagamento,
              itens: carrinhoStore.itens,
              total: carrinhoStore.total,
              cupom: cupomAplicado,
            };

            console.log("Pedido finalizado:", dadosPedido);

            if (tipoDePagamento === "online" && metodoPagamento === "credito") {
              navigate("/dados-cartao");
            } else if (tipoDePagamento === "entrega") {
              navigate("/pedido-realiza");
            }
          }}
        >
          <ContainerLabelInput>
            <H4Estilizado>Informações de entrega</H4Estilizado>
            <Label htmlFor="nome">Nome completo</Label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            {erroNome && <TextoErro>{erroNome}</TextoErro>}
          </ContainerLabelInput>

          <LinhaDupla>
            <ContainerLabelInput>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {erroEmail && <TextoErro>{erroEmail}</TextoErro>}
            </ContainerLabelInput>

            <ContainerLabelInput>
              <Label htmlFor="telefone">Telefone</Label>
              <input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => {
                  const telefoneFormatado = formatarTelefone(e.target.value);
                  setTelefone(telefoneFormatado);
                }}
              />
              {erroTelefone && <TextoErro>{erroTelefone}</TextoErro>}
            </ContainerLabelInput>
          </LinhaDupla>

          <LinhaDupla>
            <ContainerLabelInput>
              <Label htmlFor="cep">CEP</Label>
              <input
                id="cep"
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => {
                  const cepFormatado = formatarCep(e.target.value);
                  setCep(cepFormatado);
                }}
                onBlur={async () => {
                  const dadosCep = await buscarCep(cep);
                  if (dadosCep) {
                    setRua(dadosCep.logradouro || "");
                    setCidade(dadosCep.localidade || "");
                    setBairro(dadosCep.bairro || "");
                  }
                }}
              />
              {erroCep && <TextoErro>{erroCep}</TextoErro>}
            </ContainerLabelInput>

            <ContainerLabelInput>
              <Label htmlFor="cidade">Cidade</Label>
              <input
                id="cidade"
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                readOnly
              />
            </ContainerLabelInput>
          </LinhaDupla>

          <LinhaDupla>
            <ContainerLabelInput>
              <Label htmlFor="rua">Rua</Label>
              <input
                id="rua"
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                readOnly
              />
            </ContainerLabelInput>

            <ContainerLabelInput>
              <Label htmlFor="endereco">Bairro</Label>
              <input
                id="bairro"
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                readOnly
              />
            </ContainerLabelInput>
          </LinhaDupla>

          <LinhaDupla>
            <ContainerLabelInput>
              <Label htmlFor="numero">Número</Label>
              <input
                id="numero"
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              {erroNumero && <TextoErro>{erroNumero}</TextoErro>}
            </ContainerLabelInput>
            <ContainerLabelInput>
              <Label htmlFor="complemento">Complemento</Label>
              <input id="complemento" type="text" placeholder="Complemento" />
              {erroComplemento && <TextoErro>{erroComplemento}</TextoErro>}
            </ContainerLabelInput>
          </LinhaDupla>

          <LabelFormaPagamento className="label_metodo-pagamento">
            Forma de pagamento
          </LabelFormaPagamento>

          <ContainerFormaPagamento>
            <BtnFormaPagamento
              type="button"
              onClick={() => setTipoDePagamento("online")}
            >
              Pagar online
            </BtnFormaPagamento>
            <BtnFormaPagamento
              type="button"
              onClick={() => setTipoDePagamento("entrega")}
            >
              Pagar na entrega
            </BtnFormaPagamento>
          </ContainerFormaPagamento>

          {tipoDePagamento && tipoDePagamento === "online" && (
            <ContainerLabelInput className="metodos_pagamento">
              <Label className="label_metodo-pagamento">
                Método de pagamento
              </Label>
              <div className="metodo-pagamento">
                <BtnPagamento
                  type="button"
                  className={metodoPagamento === "credito" ? "ativo" : ""}
                  onClick={() => setMetodoPagamento("credito")}
                >
                  <FaRegCreditCard />
                  <span>Cartão de crédito</span>
                </BtnPagamento>
                <BtnPagamento
                  type="button"
                  className={metodoPagamento === "pix" ? "ativo" : ""}
                  onClick={() => setMetodoPagamento("pix")}
                >
                  <FaPix />
                  <span>Pix</span>
                </BtnPagamento>
              </div>
            </ContainerLabelInput>
          )}

          {tipoDePagamento && tipoDePagamento === "entrega" && (
            <ContainerLabelInput className="metodos_pagamento">
              <Label className="label_metodo-pagamento">
                Método de pagamento
              </Label>
              <div className="metodo-pagamento">
                <BtnPagamento
                  type="button"
                  className={metodoPagamento === "debito" ? "ativo" : ""}
                  onClick={() => setMetodoPagamento("debito")}
                >
                  <FaRegCreditCard />
                  <span>Cartão de débito</span>
                </BtnPagamento>
                <BtnPagamento
                  type="button"
                  className={metodoPagamento === "dinheiro" ? "ativo" : ""}
                  onClick={() => setMetodoPagamento("dinheiro")}
                >
                  <FaMoneyBillWave />
                  <span>Dinheiro</span>
                </BtnPagamento>
              </div>
            </ContainerLabelInput>
          )}

          <button type="submit" className="btn-finalizar">
            Finalizar pedido
          </button>
        </FormularioEntrega>

        <ResumoPedido
          carrinhoStore={carrinhoStore}
          exibirBotao={false}
          codigoCupom={codigoCupom}
          setCodigoCupom={setCodigoCupom}
          cupomAplicado={cupomAplicado}
          setCupomAplicado={setCupomAplicado}
        />
      </GridCheckout>
    </ContainerPrincipal>
  );
});

export default Checkout;
