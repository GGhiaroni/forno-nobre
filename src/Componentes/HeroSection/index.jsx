import styled from "styled-components";
import imagemHeroSection from "../../assets/pizza-hero_section.png";

const HeroSectionEstilizado = styled.section`
  display: flex;
`;

const ImgHeroSectionEstilizada = styled.img`
  background-image: url(${imagemHeroSection});
`;

const HeroSection = () => {
  return (
    <HeroSectionEstilizado>
      <ImgHeroSectionEstilizada />
    </HeroSectionEstilizado>
  );
};

export default HeroSection;
