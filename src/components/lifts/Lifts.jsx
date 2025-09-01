import styles from "./Lifts.module.scss";
import { Section } from "../../ui/sections";
import { liftsData } from "../../data/liftsData";

const Lifts = () => {
  return (
    <Section className={styles.lifts} background="secondary" title="De to løftene">
      <div className={styles['lifts__container']}>
        {liftsData.map((lift) => (
          <figure key={lift.id} className={styles['lifts__figure']}>
            <div className={styles['lifts__video']}>
              <video
                controls
                preload="none"
                loading="lazy"
                poster={lift.thumbnail || `/images/${lift.id}-poster.jpg`}
                className={styles['lifts__video-element']}
              >
                <source src={lift.videoSrc} type="video/mp4" />
                Din nettleser støtter ikke video-avspilling.
              </video>
            </div>
            <figcaption className={styles['lifts__caption']}>
              <h3 className={styles['lifts__title']}>{lift.title}</h3>
              <p className={styles['lifts__description']}>{lift.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

export default Lifts;
