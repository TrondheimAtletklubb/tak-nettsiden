import heroImage from "../../assets/tak-juni-2025.jpg";
import heroImageMobile from "../../assets/lifters.png";
import { ButtonHighlight, ButtonBorder } from "../../ui/buttons";
import "./Hero.styles.scss";

const Hero = () => {
  return (
    <section className="hero">
      <img
        src={heroImage}
        alt="Trondheim Atletklubb weightlifting gym interior"
        className="hero__image hero__image--desktop"
      />
      <img
        src={heroImageMobile}
        alt="Trondheim Atletklubb weightlifters training"
        className="hero__image hero__image--mobile"
      />
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">Finn Styrken Din Hos Oss</h1>
        <p className="hero__subtitle">
          Trygt, sosialt og lærerik vektløfting treningsmiljø for alle i
          Trondheims sentrum.
        </p>
        <div className="hero__buttons">
          <ButtonHighlight>bli medlem</ButtonHighlight>
          <ButtonBorder>learn more</ButtonBorder>
        </div>
      </div>
    </section>
  );
};

export default Hero;
