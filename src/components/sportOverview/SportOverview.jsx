import "./SportOverview.styles.scss";
import { Section } from "../../ui/sections";

const SportOverview = () => {
  return (
    <Section
      className="sport-overview"
      background="primary"
      title="Hva er Olympisk vektløfting?"
    >
      <div className="sport-overview__content">
        <div className="sport-overview__description">
          <p>
            Olympisk vektløfting er en kraftsport som består av to løft:
            <strong> Rykk</strong> og <strong>Støt</strong>. Sporten krever en
            kombinasjon av styrke, teknikk, fleksibilitet og mental fokus.
          </p>
          <p>
            I konkurranse får hver løfter tre forsøk på hvert løft. Den høyeste
            vekten i rykk legges sammen med den høyeste vekten i støt for å gi
            den totale poengsummen. Den løfteren med høyest totalsum vinner sin
            vektklasse.
          </p>
          <p>
            Olympisk vektløfting er en av de eldste idrettene i de moderne
            olympiske leker og krever flere år med trening for å mestre
            teknikken og utvikle den nødvendige styrken.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default SportOverview;
