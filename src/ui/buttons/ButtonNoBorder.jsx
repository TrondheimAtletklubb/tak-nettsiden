import { IoChevronForward } from "react-icons/io5";
import "./Button.styles.scss";

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
      className={`button button--no-border ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      <IoChevronForward className="button__arrow" />
    </button>
  );
};

export default ButtonNoBorder;
