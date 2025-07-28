import { useState } from "react";
import nvfLogo from "../../assets/nvf-logo.WebP";
import "./NvfLogo.styles.scss";

const NvfLogo = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <a
      href="https://vektlofting.no/"
      target="_blank"
      rel="noopener noreferrer"
      className={`nvf-logo ${isClicked ? "nvf-logo--clicked" : ""}`}
      aria-label="Besøk Norges Vektløftingsforbund"
      title="Norges Vektløftingsforbund"
      onClick={handleClick}
    >
      <img src={nvfLogo} alt="NVF Logo" className="nvf-logo__image" />
    </a>
  );
};

export default NvfLogo;
