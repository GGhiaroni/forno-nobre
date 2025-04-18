import { useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const [pizzaEncontrada, setPizzaEncontrada] = useState();
  const [loading, setLoading] = useState(true);

  const parametro = useParams();

  fetch(
    `https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas/${parametro.id}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pizza não encontrada.");
      }
      return response.json();
    })
    .then((data) => {
      setPizzaEncontrada(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Erro:", error);
      setLoading(false);
    });

  if (loading) return <p>Carregando pizzas...</p>;

  return (
    <>
      <img src={pizzaEncontrada.fotoUm} />
      <h1>{pizzaEncontrada.sabor}</h1>
    </>
  );
};

export default Pizza;
