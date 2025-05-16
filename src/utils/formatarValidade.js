export const formatarValidade = (validade) => {
  const apenasNumeros = validade.replace(/\D/g, "");
  const maximoDigitos = apenasNumeros.slice(0, 4);
  const formatado = maximoDigitos.replace(/(\d{2})(?=\d)/g, "$1/");
  return formatado;
};
