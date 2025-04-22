import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaDetalhada from "../Componentes/PizzaDetalhada";

const Pizza = () => {
  const [pizzaEncontrada, setPizzaEncontrada] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pizza não encontrada");
        return res.json();
      })
      .then((data) => {
        setPizzaEncontrada(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando pizza...</p>;
  if (!pizzaEncontrada) return <p>Pizza não encontrada</p>;

  return <PizzaDetalhada pizza={pizzaEncontrada} />;
};

export default Pizza;
