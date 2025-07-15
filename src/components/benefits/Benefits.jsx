import "./Benefits.styles.scss";
import benefits from "./benefitsData";

const Benefits = () => {
  return (
    <section className="benefits">
      <div className="container">
        <h2 className="benefits__section-title">Fordeler med vektløfting</h2>
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
      </div>
    </section>
  );
};

export default Benefits;
