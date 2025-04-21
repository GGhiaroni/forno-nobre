import { useParams } from "react-router-dom";
import CardsPizza from "../Componentes/CardsPizza";

const PizzasPorCategoria = () => {
  const { categoria } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pizzas da categoria: {categoria}</h2>
      <CardsPizza categoriaAtiva={categoria} />
    </div>
  );
};

export default PizzasPorCategoria;
