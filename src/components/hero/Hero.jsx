import heroImage from "../../assets/tak-juni-2025.jpg";
import {
  ButtonHighlight,
  ButtonBorder,
  ButtonNoBorder,
} from "../../ui/buttons";
import "./Hero.styles.scss";

const Hero = () => {
  return (
    <section className="hero">
      <img
        src={heroImage}
        alt="Trondheim Atletklubb weightlifting gym interior"
        className="hero__image"
      />
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">Join Trondheim's weightlifting community</h1>
        <p className="hero__subtitle">learn and train Olympic Weightlifting</p>
        <div className="hero__buttons">
          <ButtonHighlight>Join</ButtonHighlight>
          <ButtonBorder>Learn More</ButtonBorder>
        </div>
      </div>
    </section>
  );
};

export default Hero;
