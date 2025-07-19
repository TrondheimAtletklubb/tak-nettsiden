import "./Benefits.styles.scss";
import benefits from "./benefitsData";
import { Section } from "../../ui/sections";

const Benefits = () => {
  return (
    <Section
      className="benefits"
      background="neutral"
      title="Fordeler med vektløfting"
    >
      <div className="benefits__grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefits__card">
              <div className="benefits__icon">
                <i className={benefit.icon}></i>
              </div>
              <h2 className="benefits__title">{benefit.title}</h2>
              <p className="benefits__description">{benefit.description}</p>
            </div>
          ))}
        </div>
    </Section>
  );
};

export default Benefits;
