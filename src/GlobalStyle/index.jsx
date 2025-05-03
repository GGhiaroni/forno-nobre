import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  font-family: "Poppins", sans-serif;
  font-optical-sizing: auto;

  --tamanho-fonte-nome-pizza: 1.25rem; //20px
  --tamanho-fonte-categoria-pizza: .75rem; //12px
  --tamanho-fonte-descricao-pizza: .875rem; //14px
  --tamanho-fonte-xxxl: 2.5rem; //40px
  --tamanho-fonte-xxl: 1.875rem; //30px
  --tamanho-fonte-xl: 1.5rem; //24px
  --tamanho-fonte-l: 1.125rem; //18px
  --tamanho-fonte-md: 1rem; //16px
  --tamanho-fonte-s: .9rem; //14.5px
  

  --cor-branca: #FFFFFF;
  --cor-primaria: #D22418;
  --cor-cinza-medio: #64748B;
  --cor-cinza-claro: #94A3B8;
  --cor-cinza-claro-extra: #E2E8F0;
  --cor-cinza-escuro: #1E293B;
  --cor-laranja: #F87415;
  --cor-amarelo-claro: #FAE08D;
   --cor-amarelo-escuro: #FAB92D;
  --cor-background-input: #F7FAFC;
  --cor-icone-carrinho: #020817;
  --cor-hover: #de2f22;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--cor-branca);
}

[data-sonner-toast] {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  padding: 16px;
  border-radius: 12px;
}

html, body, #root {
  height: 100%;
  margin: 0;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo {
  flex: 1;
}
`;

export default GlobalStyle;
