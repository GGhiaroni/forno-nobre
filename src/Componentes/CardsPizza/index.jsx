const ContainerCardsPizzas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px;
  padding: 30px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
`;

const CardPizza = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #d4d8de;
  width: 100%;
  overflow: hidden;
  padding-bottom: 20px;
`;

const ImgPizza = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

const TextoCardPizza = styled.div`
  width: 100%;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
`;

const SaborPizza = styled.h4`
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

const DescricaoPizza = styled.span`
  font-size: 1rem;
  color: #6b7280;
`;

const CardsPizza = () => {
  <ContainerCardsPizzas>
    {cachorrosFiltradosPeloInput.map((cachorro, index) => (
      <CardPizza key={index}>
        <ImgPizza src={cachorro.foto} alt={`Cachorro ${cachorro.nome}`} />
        <TextoCardPizza>
          <SaborPizza>{cachorro.nome}</SaborPizza>
          <DescricaoPizza>Raça: {cachorro.raca}</DescricaoPizza>
        </TextoCardPizza>
        <BotaoEstilizado>Ver detalhes</BotaoEstilizado>
      </CardPizza>
    ))}
  </ContainerCardsPizzas>;
};

export default CardsPizza;
