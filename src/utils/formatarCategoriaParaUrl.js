export const formatarCategoriaParaURL = (categoria) => {
  return categoria
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};
