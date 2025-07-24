import { takInfoData } from "../../data/takInfoData";
import { InfoCard } from "../../ui/cards";
import { Section } from "../../ui/sections";
import "./Location.styles.scss";

const Location = () => {
  const address = takInfoData.sted;
  const mapUrl = "https://maps.app.goo.gl/MhtfakC5fx2b4sfa7";
  const directionsUrl =
    "https://www.google.com/maps/dir//Trondheim+Atletklubb,+Mellomveien+5,+7067+Trondheim,+Norway/@63.4377478,10.4303218,690m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x466d31003d97f87f:0x5a1182235900f0f7!2m2!1d10.4304247!2d63.4377513!3e0?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D";

  const handleMapClick = () => {
    window.open(mapUrl, "_blank");
  };

  const handleDirectionsClick = () => {
    window.open(directionsUrl, "_blank");
  };

  return (
    <Section
      id="sted"
      className="locations"
      background="secondary"
      title="Finn oss"
      subtitle="Klikk på kartet for å få veibeskrivelse på mobil eller i nettleseren din."
    >
      <div className="locations__content">
          <div className="locations__info">
            <InfoCard
              icon="fas fa-envelope"
              title="E-post"
              link={`mailto:${takInfoData.epost}`}
              linkText={takInfoData.epost}
            />

            <InfoCard
              icon="fas fa-map-marker-alt"
              title="Sted"
              content={address}
            />

            <InfoCard
              icon="fas fa-directions"
              title="Veibeskrivelse"
              content="Få veibeskrivelse direkte til lokalet vårt"
              isClickable={true}
              onClick={handleDirectionsClick}
              className="locations__directions-card"
            />

            <InfoCard
              icon="fab fa-facebook"
              title="Facebook"
              content="Følg oss på Facebook"
              link={takInfoData.facebookUrl}
              linkText={takInfoData.facebook}
              openInNewTab={true}
            />

            <InfoCard
              icon="fab fa-instagram"
              title="Instagram"
              content="Følg oss på Instagram"
              link={takInfoData.instagramUrl}
              linkText={takInfoData.instagram}
              openInNewTab={true}
            />
          </div>

          <div className="locations__map-container">
            <div
              className="locations__map"
              onClick={handleMapClick}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleMapClick();
                }
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1879.5447089524944!2d10.428333516236227!3d63.43774783536707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d31003d97f87f%3A0x5a1182235900f0f7!2sTrondheim%20Atletklubb!5e0!3m2!1sen!2sno!4v1642086743234!5m2!1sen!2sno"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trondheim Atletklubb Location"
              ></iframe>
              <div className="locations__map-click-overlay"></div>
              <div className="locations__map-overlay">
                <p>
                  Trykk på kartet for å åpne i Google Maps og få veibeskrivelse
                </p>
              </div>
            </div>
          </div>
        </div>
    </Section>
  );
};

export default Location;
