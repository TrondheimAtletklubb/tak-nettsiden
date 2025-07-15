import "./Location.styles.scss";

const Location = () => {
  const address = "Mellomveien 5, 7067 Trondheim, Norway";
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
    <section id="sted" className="locations">
      <div className="container">
        <h2 className="locations__title">Finn oss</h2>
        <p className="locations__subtitle">
          Klikk på kartet for å få veibeskrivelse på mobil eller i nettleseren
          din.
        </p>

        <div className="locations__content">
          <div className="locations__info">
            <div className="locations__contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>E-posten</h3>
                <a href="mailto:info@takweightlifting.org">
                  info@takweightlifting.org
                </a>
              </div>
            </div>

            <div className="locations__contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Organisasjonsnummer</h3>
                <a href="tel:+4712345678">+47 123 45 678</a>
              </div>
            </div>

            <div className="locations__contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Sted</h3>
                <p>{address}</p>
              </div>
            </div>

            <div
              className="locations__contact-item locations__contact-item--clickable"
              onClick={handleDirectionsClick}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleDirectionsClick();
                }
              }}
            >
              <i className="fas fa-directions"></i>
              <div>
                <h3>Veibeskrivelse</h3>
                <p>Få veibeskrivelse direkte til lokalet vårt</p>
              </div>
            </div>
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
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trondheim Atletklubb Location"
              ></iframe>
              <div className="locations__map-overlay">
                <p>
                  Trykk på kartet for å åpne i Google Maps og få veibeskrivelse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
