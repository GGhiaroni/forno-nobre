import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  font-family: "Poppins", sans-serif;
  font-optical-sizing: auto;

  --tamanho-fonte-nome-pizza: 1.25rem;
  --tamanho-fonte-categoria-pizza: .75rem;
  --tamanho-fonte-descricao-pizza: .875rem;
  --tamanho-fonte-xxxl: 2.5rem;
  --tamanho-fonte-xl: 1.5rem;
  --tamanho-fonte-l: 1.125rem;
  --tamanho-fonte-md: 1rem;
  --tamanho-fonte-s: .9rem;
  

  --cor-branca: #FFFFFF;
  --cor-primaria: #D22418;
  --cor-cinza-medio: #64748B;
  --cor-cinza-claro: #94A3B8;
  --cor-cinza-escuro: #1E293B;
  --cor-laranja: #F87415;
  --cor-amarelo: #FAE08D;
  --cor-background-input: #F7FAFC;
  --cor-icone-carrinho: #020817;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--cor-branca);
}

`;

export default GlobalStyle;
