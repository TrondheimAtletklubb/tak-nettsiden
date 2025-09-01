import styles from "./Button.module.scss";

const ButtonHighlight = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles['button--highlight']} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonHighlight;
