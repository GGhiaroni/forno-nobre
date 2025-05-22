import { createContext, useContext } from "react";
import { buscaStore } from "./buscaStore";
import { carrinhoStore } from "./carrinhoStore";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ carrinhoStore, buscaStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    return new Error("Contexto não definido!");
  }

  return context;
};
