import { Section } from "../../ui/sections";
import takCommunityImage from "../../assets/tak-community.WebP";
import "./Pricing.styles.scss";

const Pricing = () => {
  return (
    <Section
      id="priser"
      className="pricing"
      background="neutral"
      title="Medlemsskap og priser"
      subtitle="Følgende medlems- og treningskontingenter gjelder for 2018 og 2019:"
    >
      <div className="pricing__content">
        <div className="pricing__info">
          <div className="pricing__table">
            <div className="pricing__row">
              <span className="pricing__description">
                Treningsavgift t.o.m. året man fyller 20
                år/studenter/pensjonister:
              </span>
              <span className="pricing__price">2.400,- per år</span>
            </div>

            <div className="pricing__row">
              <span className="pricing__description">
                Treningsavgift f.o.m. året man fyller 21 år:
              </span>
              <span className="pricing__price">3.600,- per år</span>
            </div>

            <div className="pricing__row">
              <span className="pricing__description">
                Familie (samme husstand):
              </span>
              <span className="pricing__price">4.800,- per år</span>
            </div>

            <div className="pricing__row">
              <span className="pricing__description">Medlemsavgift</span>
              <span className="pricing__price">100,- per år</span>
            </div>
          </div>

          <div className="pricing__access-info">
            <p>
              Ved inngangsdøren til klubben har vi også et nøkkelkortsystem,
              slik at våre medlemmer kan trene når mellom 16.00 og 23.00 på
              hverdager og 07.00 og 23.00 i helger.
            </p>
          </div>
        </div>

        <div className="pricing__image">
          <img
            src={takCommunityImage}
            alt="Trondheim Atletklubb community"
            className="pricing__image-img"
          />
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
