import "./Lifts.styles.scss";
import { Section } from "../../ui/sections";
import { liftsData } from "../../data/liftsData";

const Lifts = () => {
  return (
    <Section className="lifts" background="secondary" title="De to løftene">
      <div className="lifts__container">
        {liftsData.map((lift) => (
          <figure key={lift.id} className="lifts__figure">
            <div className="lifts__video">
              <video
                controls
                preload="none"
                loading="lazy"
                poster={lift.thumbnail || `/images/${lift.id}-poster.jpg`}
                className="lifts__video-element"
              >
                <source src={lift.videoSrc} type="video/mp4" />
                Din nettleser støtter ikke video-avspilling.
              </video>
            </div>
            <figcaption className="lifts__caption">
              <h3 className="lifts__title">{lift.title}</h3>
              <p className="lifts__description">{lift.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

export default Lifts;
