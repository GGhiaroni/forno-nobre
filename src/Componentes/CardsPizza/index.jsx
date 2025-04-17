import { useEffect, useState } from "react";

const CardsPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://6801135281c7e9fbcc416de2.mockapi.io/fornonobre/pizzas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar pizzas");
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando pizzas...</p>;

  return (
    <div>
      <h2>Pizzas disponíveis:</h2>
      {pizzas.map((pizza) => (
        <div key={pizza.id}>
          <h3>{pizza.sabor}</h3>
          <p>{pizza.descricao}</p>
          <img src={pizza.fotoUm} alt={pizza.sabor} width={200} />
        </div>
      ))}
    </div>
  );
};

export default CardsPizza;
