import { useParams } from "react-router-dom";
import CardsPizza from "../Componentes/CardsPizza";

const PizzasPorCategoria = () => {
  const { categoria } = useParams();

  console.log(
    `Categoria: ${
      categoria.trim().charAt(0).toUpperCase() + categoria.trim().slice(1)
    }`
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pizzas da categoria: {categoria}</h2>
      <CardsPizza
        categoriaAtiva={
          categoria.trim().charAt(0).toUpperCase() + categoria.trim().slice(1)
        }
      />
    </div>
  );
};

export default PizzasPorCategoria;
