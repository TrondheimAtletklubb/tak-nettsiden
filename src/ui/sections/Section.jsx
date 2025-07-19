import "./Section.styles.scss";

const Section = ({
  id,
  className = "",
  background = "neutral",
  title,
  subtitle,
  children,
  ...props
}) => {
  return (
    <section
      id={id}
      className={`section section--${background} ${className}`}
      {...props}
    >
      <div className="section__container">
        {title && <h2 className="section__title">{title}</h2>}
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Section;