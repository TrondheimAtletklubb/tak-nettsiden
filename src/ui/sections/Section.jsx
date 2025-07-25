import PropTypes from "prop-types";
import "./Section.styles.scss";

/**
 * A reusable section component that provides consistent layout and styling
 * for main content sections across the application.
 *
 * @component
 * @example
 * // Basic usage with title and content
 * <Section title="My Section" background="neutral">
 *   <p>Section content goes here</p>
 * </Section>
 *
 * @example
 * // With subtitle and custom ID
 * <Section
 *   id="contact"
 *   title="Contact Us"
 *   subtitle="Get in touch with our team"
 *   background="secondary"
 * >
 *   <ContactForm />
 * </Section>
 */
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

Section.propTypes = {
  /** HTML id attribute for the section element */
  id: PropTypes.string,

  /** Additional CSS classes to apply to the section */
  className: PropTypes.string,

  /**
   * Background style variant for the section.
   * Available options:
   * - 'neutral': Default neutral background
   * - 'secondary': Secondary background color
   * - 'primary': Primary background color
   */
  background: PropTypes.oneOf(["neutral", "secondary", "primary"]),

  /** Main title text for the section */
  title: PropTypes.string,

  /** Subtitle text displayed below the title */
  subtitle: PropTypes.string,

  /** Content to be rendered inside the section */
  children: PropTypes.node,
};

export default Section;
