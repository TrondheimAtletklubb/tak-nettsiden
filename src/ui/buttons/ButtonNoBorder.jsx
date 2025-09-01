import { IoChevronForward } from "react-icons/io5";
import styles from "./Button.module.scss";

const ButtonNoBorder = ({
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
      className={`${styles.button} ${styles['button--no-border']} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      <IoChevronForward className={styles.button__arrow} />
    </button>
  );
};

export default ButtonNoBorder;
