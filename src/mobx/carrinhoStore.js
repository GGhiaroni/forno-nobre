import { makeAutoObservable } from "mobx";

class CarrinhoStore {
  itensNoCarrinho = [];

  constructor() {
    makeAutoObservable(this);
  }

  adicionarAoCarrinho(pizza) {
    const itemExistente = this.itensNoCarrinho.find(
      (item) => item.id === pizza.id
    );

    itemExistente
      ? (itemExistente.quantidade += 1)
      : this.itensNoCarrinho.push({ ...pizza, quantidade: 1 });
  }

  removerDoCarrinho(id) {
    this.itensNoCarrinho = this.itensNoCarrinho.filter((p) => p.id !== id);
  }

  limparCarrinho() {
    this.itensNoCarrinho = [];
  }

  incrementarQuantidade(id) {
    const item = this.itensNoCarrinho.find((item) => item.id === id);
    if (item) item.quantidade += 1;
  }

  decrementarQuantidade(id) {
    const item = this.itensNoCarrinho.find((item) => item.id === id);
    if (item && item.quantidade > 1) {
      item.quantidade -= 1;
    }
  }

  get totalItensNoCarrinho() {
    return this.itensNoCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }

  get totalPrecoDoCarrinho() {
    return this.itensNoCarrinho.reduce(
      (acc, item) => acc + item.quantidade * item.preco,
      0
    );
  }
}

export const carrinhoStore = new CarrinhoStore();
