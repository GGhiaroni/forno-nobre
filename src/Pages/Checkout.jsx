import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
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
  padding: 2rem;
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
      background: #f9f9f9;
      cursor: pointer;
      font-weight: 500;

      &.ativo {
        border-color: var(--cor-primaria);
        background: #fff3f3;
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
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  display: inline-block;
`;

const ContainerLabelInput = styled.div`
  display: flex;
  flex-direction: column;
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
        <FormularioEntrega>
          <ContainerLabelInput>
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
            </ContainerLabelInput>
            <ContainerLabelInput>
              <Label htmlFor="complemento">Complemento</Label>
              <input id="complemento" type="text" placeholder="Complemento" />
            </ContainerLabelInput>
          </LinhaDupla>

          <ContainerLabelInput>
            <Label>Método de pagamento</Label>
            <div className="metodo-pagamento">
              <button type="button" className="ativo">
                Cartão de crédito
              </button>
              <button type="button">Cartão de débito</button>
              <button type="button">Dinheiro</button>
            </div>
          </ContainerLabelInput>

          <button type="submit" className="btn-finalizar">
            Finalizar pedido
          </button>
        </FormularioEntrega>

        <ResumoPedido carrinhoStore={carrinhoStore} />
      </GridCheckout>
    </ContainerPrincipal>
  );
});

export default Checkout;
