import heroImage from "../../assets/tak-juni-2025.jpg";
import heroImageMobile from "../../assets/lifters.png";
import { ButtonHighlight, ButtonBorder } from "../../ui/buttons";
import "./Hero.styles.scss";

const Hero = () => {
  const handleLearnMore = () => {
    document.getElementById("priser")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBliMedlem = () => {
    window.open("https://medlemskap.nif.no/Start/Index/26467");
  };

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
        <h1 className="hero__title">Finn styrken din hos oss</h1>
        <p className="hero__subtitle">
          Trygt, sosialt og lærerikt treningsmiljø i olympisk vektløfting for
          alle i Trondheim.
        </p>
        <div className="hero__buttons">
          <ButtonHighlight type="button" onClick={handleBliMedlem}>
            bli medlem
          </ButtonHighlight>
          <ButtonBorder type="button" onClick={handleLearnMore}>
            lær mer
          </ButtonBorder>
        </div>
      </div>
    </section>
  );
};

export default Hero;
