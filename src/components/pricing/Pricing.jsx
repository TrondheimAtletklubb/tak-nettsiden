import { Section } from "../../ui/sections";
import { ButtonHighlight } from "../../ui/buttons";
import takCommunityImage from "../../assets/tak-community-2.WebP";
import { membershipPricing } from "../../data/pricingData";
import "./Pricing.styles.scss";

const Pricing = () => {
  const handleBliMedlem = () => {
    window.open("https://medlemskap.nif.no/Start/Index/26467");
  };

  return (
    <Section
      id="priser"
      className="pricing"
      background="neutral"
      title="Medlemsskap og priser"
      subtitle="Vi ønsker nye medlemmer og besøkende som har lyst til å prøve sporten,
        velkommen. Følgende medlems- og treningskontingenter gjelder for inneværende år:"
    >
      <div className="pricing__content">
        <div className="pricing__info">
          <div className="pricing__table">
            {membershipPricing.map((membership) => (
              <div key={membership.id} className="pricing__row">
                <span className="pricing__description">
                  {membership.description}
                </span>
                <span className="pricing__price">{membership.price}</span>
              </div>
            ))}
          </div>

          <div className="pricing__access-info">
            <p>
              Ved inngangsdøren til klubben har vi også et nøkkelkortsystem,
              slik at våre medlemmer kan trene når mellom 16.00 og 23.00 på
              hverdager og 07.00 og 23.00 i helger.
            </p>
          </div>

          <div className="pricing__cta">
            <ButtonHighlight onClick={handleBliMedlem}>
              Bli Medlem
            </ButtonHighlight>
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
