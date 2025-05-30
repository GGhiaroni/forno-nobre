import { motion } from "framer-motion";
import React, { useState } from "react";
import { CiCalendar, CiCreditCard2, CiLock, CiUser } from "react-icons/ci";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TiArrowLeft } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatarNumeroCartao } from "../../utils/formatarNumeroCartao";
import { formatarValidade } from "../../utils/formatarValidade";

const ContainerPrincipal = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2rem;
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
  margin-bottom: 0.1rem;
`;

const ContainerCartaoFormulario = styled.div`
  display: flex;
  gap: 6rem;
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
  margin-top: 0.1rem;
  margin-bottom: 2rem;
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

const CartaoContainer = styled.div`
  perspective: 1500px;
  width: 380px;
  height: 240px;
`;

const Cartao = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const BaseCartao = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  padding: 24px;
  backface-visibility: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Frente = styled(BaseCartao)`
  background: linear-gradient(135deg, var(--cor-primaria), #9563c8);
`;

const Verso = styled(BaseCartao)`
  background: linear-gradient(135deg, #232526, #414345);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 24px;
  gap: 16px;
`;

const LinhaPreta = styled.div`
  width: 100%;
  height: 40px;
  background: #000;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const CVVBox = styled.div`
  background: #fff;
  color: #000;
  padding: 10px;
  border-radius: 8px;
  width: 80px;
  font-weight: bold;
  text-align: center;
  align-self: flex-end;
`;

const TextoCartao = styled.p`
  margin: 6px 0;
  font-size: 1.1rem;
  letter-spacing: 2px;
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
`;

const TituloCartao = styled.h4`
  font-size: 0.75rem;
  margin-top: 12px;
  opacity: 0.85;
  font-weight: 500;
`;

const CampoInput = styled.input`
  width: 90%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  text-transform: uppercase;
  background-color: #fff;
  &:focus {
    border-color: var(--cor-primaria);
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 6px;
  color: #444;
  font-weight: 500;
`;

const Formulario = styled.form`
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border: solid 1px var(--cor-primaria);
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

const TituloFormulario = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #333;
  font-weight: 600;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const GrupoCampo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Chip = styled.div`
  width: 60px;
  height: 40px;
  background: linear-gradient(145deg, #d4af37, #b8860b);
  border-radius: 8px;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
`;

const DetalheDecorativo = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: 20px;
  right: 20px;
`;

const CVVContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  background: linear-gradient(135deg, var(--cor-primaria), #9563c8);
  color: #fff;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: linear-gradient(135deg, var(--cor-primaria), #8d51c8);
  }
`;

const TextoErro = styled.span`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const InputComIconeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
`;

const IconeCartaoDeCredito = styled(CiCreditCard2)`
  position: absolute;
  left: 10px;
  font-size: 1.3rem;
  color: var(--cor-cinza-medio);
`;

const IconeUsuario = styled(CiUser)`
  position: absolute;
  left: 10px;
  font-size: 1.3rem;
  color: var(--cor-cinza-medio);
`;

const IconeCalendario = styled(CiCalendar)`
  position: absolute;
  left: 10px;
  font-size: 1.3rem;
  color: var(--cor-cinza-medio);
`;

const IconeCadeadoEstilizado = styled(CiLock)`
  position: absolute;
  left: 10px;
  font-size: 1.3rem;
  color: var(--cor-cinza-medio);
`;

const IconeSetasDuplas = styled(MdKeyboardDoubleArrowRight)`
  font-size: 1.3rem;
  color: var(--cor-branca);
`;

const CampoInputComPadding = styled(CampoInput)`
  padding-left: 35px;
`;

const DadosCartao = () => {
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [virado, setVirado] = useState(false);

  const [erroNumeroCartao, setErroNumeroCartao] = useState("");
  const [erroNomeTitular, setErroNomeTitular] = useState("");
  const [erroValidade, setErroValidade] = useState("");
  const [erroCvv, setErroCvv] = useState("");

  const navigate = useNavigate();

  const validarFormulario = () => {
    let valido = true;

    if (!numero.trim()) {
      setErroNumeroCartao("Numero é obrigatório");
      valido = false;
    } else {
      setErroNumeroCartao("");
    }

    if (!nome.trim()) {
      setErroNomeTitular("Nome do titular é obrigatório");
      valido = false;
    } else if (nome.trim().length < 15) {
      setErroNomeTitular("O nome do titular deve ter no mínimo 15 caracteres.");
      valido = false;
    } else {
      setErroNomeTitular("");
    }

    if (!validade.trim()) {
      setErroValidade("Validade é obrigatório");
      valido = false;
    } else {
      setErroValidade("");
    }

    if (!cvv.trim()) {
      setErroCvv("CVV é obrigatório");
      valido = false;
    } else {
      setErroCvv("");
    }

    return valido;
  };

  return (
    <ContainerPrincipal>
      <H3Estilizado>Pagamento com Cartão de Crédito</H3Estilizado>
      <ContainerIconeETexto>
        <LinkEstilizado to="/checkout">
          <IconeSeta />
          <TextoIconeSeta>Voltar para o carrinho</TextoIconeSeta>
        </LinkEstilizado>
      </ContainerIconeETexto>
      <ContainerCartaoFormulario>
        <CartaoContainer>
          <Cartao
            animate={{ rotateY: virado ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Frente>
              <div>
                <Chip />
                <TituloCartao>Número do Cartão</TituloCartao>
                <TextoCartao>{numero || "**** **** **** ****"}</TextoCartao>

                <TituloCartao>Nome do Titular</TituloCartao>
                <TextoCartao>{nome || "SEU NOME AQUI"}</TextoCartao>

                <TituloCartao>Validade</TituloCartao>
                <TextoCartao>{validade || "MM/AA"}</TextoCartao>
              </div>
              <DetalheDecorativo />
            </Frente>

            <Verso>
              <LinhaPreta />
              <CVVContainer>
                <TituloCartao style={{ color: "#fff" }}>CVV</TituloCartao>
                <CVVBox>{cvv || "•••"}</CVVBox>
              </CVVContainer>
            </Verso>
          </Cartao>
        </CartaoContainer>

        <Formulario
          onSubmit={(e) => {
            e.preventDefault();
            const formularioValido = validarFormulario();
            if (!formularioValido) return;
            navigate("/pedido-realizado");
          }}
        >
          <TituloFormulario>Informações do Cartão</TituloFormulario>
          <GrupoCampo>
            <Label>Número do Cartão</Label>
            <InputComIconeContainer>
              <IconeCartaoDeCredito />
              <CampoInputComPadding
                type="text"
                maxLength={19}
                onFocus={() => setVirado(false)}
                value={numero}
                onChange={(e) => {
                  const value = formatarNumeroCartao(e.target.value);
                  setNumero(value);
                  setErroNumeroCartao("");
                }}
                placeholder="0000 0000 0000 0000"
              />
            </InputComIconeContainer>
            {erroNumeroCartao && <TextoErro>{erroNumeroCartao}</TextoErro>}
          </GrupoCampo>

          <GrupoCampo>
            <Label>Nome do Titular</Label>
            <InputComIconeContainer>
              <IconeUsuario />
              <CampoInputComPadding
                type="text"
                onFocus={() => setVirado(false)}
                value={nome}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-zÀ-ÿ\s]/g, "")
                    .slice(0, 26);
                  setNome(value);
                  if (value.trim().length >= 15) {
                    setErroNomeTitular("");
                  }
                }}
                placeholder="Seu nome completo"
              />
            </InputComIconeContainer>
            {erroNomeTitular && <TextoErro>{erroNomeTitular}</TextoErro>}
          </GrupoCampo>

          <GrupoCampo>
            <Label>Validade</Label>
            <InputComIconeContainer>
              <IconeCalendario />
              <CampoInputComPadding
                type="text"
                maxLength={5}
                onFocus={() => setVirado(false)}
                value={validade}
                onChange={(e) => {
                  const value = formatarValidade(e.target.value);
                  setValidade(value);
                  setErroValidade("");
                }}
                placeholder="MM/AA"
              />
            </InputComIconeContainer>
            {erroValidade && <TextoErro>{erroValidade}</TextoErro>}
          </GrupoCampo>

          <GrupoCampo>
            <Label>CVV</Label>
            <InputComIconeContainer>
              <IconeCadeadoEstilizado />
              <CampoInputComPadding
                type="password"
                maxLength={3}
                onFocus={() => setVirado(true)}
                onBlur={() => setVirado(false)}
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setCvv(value);
                  setErroCvv("");
                }}
                placeholder="•••"
              />
            </InputComIconeContainer>
            {erroCvv && <TextoErro>{erroCvv}</TextoErro>}
          </GrupoCampo>
          <BotaoFinalizar type="submit">
            Finalizar Pagamento <IconeSetasDuplas />{" "}
          </BotaoFinalizar>
        </Formulario>
      </ContainerCartaoFormulario>
    </ContainerPrincipal>
  );
};

export default DadosCartao;
