export const recuperarNomeOriginalCategoria = (urlCategoria) => {
  const mapa = {
    todas: "Todas",
    classicas: "Clássicas",
    especiais: "Especiais",
    vegetarianas: "Vegetarianas",
    doces: "Doces",
  };

  return mapa[urlCategoria] || urlCategoria;
};
