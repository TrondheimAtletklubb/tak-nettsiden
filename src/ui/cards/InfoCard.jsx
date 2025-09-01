import styles from "./InfoCard.module.scss";

const InfoCard = ({
  icon,
  title,
  subtitle,
  content,
  link,
  linkText,
  isClickable = false,
  onClick,
  className = "",
  openInNewTab = false,
}) => {
  const cardClass = `${styles['info-card']} ${
    isClickable ? styles['info-card--clickable'] : ""
  } ${className}`;

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <i className={icon}></i>
      <div>
        <h3>{title}</h3>
        {subtitle && <p className={styles['info-card__subtitle']}>{subtitle}</p>}
        {content && <p className={styles['info-card__content']}>{content}</p>}
        {link && linkText && (
          <a
            id="info-card-link"
            href={link}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            onClick={(e) => isClickable && e.stopPropagation()}
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
