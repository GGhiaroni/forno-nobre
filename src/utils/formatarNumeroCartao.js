export const formatarNumeroCartao = (cartao) => {
  const apenasNumeros = cartao.replace(/\D/g, "");
  const maximoDigitos = apenasNumeros.slice(0, 16);

  const comEspacos = maximoDigitos.replace(/(\d{4})(?=\d)/g, "$1 ");
  return comEspacos;
};
