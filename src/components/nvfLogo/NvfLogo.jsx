import { useState } from "react";
import nvfLogo from "../../assets/nvf-logo.webp";
import styles from "./NvfLogo.module.scss";

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
      className={`${styles['nvf-logo']} ${isClicked ? styles['nvf-logo--clicked'] : ""}`}
      aria-label="Besøk Norges Vektløftingsforbund"
      title="Norges Vektløftingsforbund"
      onClick={handleClick}
    >
      <img src={nvfLogo} alt="NVF Logo" className={styles['nvf-logo__image']} />
    </a>
  );
};

export default NvfLogo;
