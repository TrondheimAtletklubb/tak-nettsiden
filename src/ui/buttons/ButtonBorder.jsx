import styles from "./Button.module.scss";

const ButtonBorder = ({
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
      className={`${styles.button} ${styles['button--border']} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBorder;
