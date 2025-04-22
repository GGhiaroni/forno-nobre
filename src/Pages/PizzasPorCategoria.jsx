import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaDetalhada from "../Componentes/PizzaDetalhada";

const PizzasPorCategoria = () => {
  const { categoria } = useParams();
  const [pizzasFiltradas, setPizzasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas")
      .then((res) => res.json())
      .then((data) => {
        const categoriaNormalizada = categoria.trim().toLowerCase();
        const filtradas = data.filter((pizza) =>
          pizza.categorias.some(
            (cat) => cat.toLowerCase() === categoriaNormalizada
          )
        );
        setPizzasFiltradas(filtradas);
        setLoading(false);
      });
  }, [categoria]);

  if (loading) return <p>Carregando...</p>;
  if (pizzasFiltradas.length === 0)
    return <p>Nenhuma pizza encontrada para essa categoria.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Pizzas da categoria: {categoria}</h2>
      {pizzasFiltradas.map((pizza) => (
        <PizzaDetalhada key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
};

export default PizzasPorCategoria;
