import { makeAutoObservable } from "mobx";

class BuscaStore {
  termo = "";

  constructor() {
    makeAutoObservable(this);
  }

  setTermo(novoTermo) {
    this.termo = novoTermo;
  }

  limpar() {
    this.termo = "";
  }
}

export const buscaStore = new BuscaStore();
