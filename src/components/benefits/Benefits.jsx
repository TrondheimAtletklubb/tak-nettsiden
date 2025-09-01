import styles from "./Benefits.module.scss";
import benefits from "./benefitsData";
import { Section } from "../../ui/sections";

const Benefits = () => {
  return (
    <Section
      className={styles.benefits}
      background="primary"
      title="Fordeler med Olympisk vektløfting"
    >
      <div className={styles['benefits__grid']}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles['benefits__card']}>
            <div className={styles['benefits__icon']}>
              <i className={benefit.icon}></i>
            </div>
            <h2 className={styles['benefits__title']}>{benefit.title}</h2>
            <p className={styles['benefits__description']}>{benefit.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Benefits;
