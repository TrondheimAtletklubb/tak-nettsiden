import heroImage from "../../assets/tak-juni-2025-sm.webp";
import heroImageMobile from "../../assets/lifters-sm.webp";
import { ButtonHighlight, ButtonBorder } from "../../ui/buttons";
import styles from "./Hero.module.scss";

const Hero = () => {
  const handleLearnMore = () => {
    document.getElementById("priser")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBliMedlem = () => {
    window.open("https://medlemskap.nif.no/Start/Index/26467");
  };

  return (
    <section className={styles.hero}>
      <img
        src={heroImage}
        alt="Trondheim Atletklubb weightlifting gym interior"
        className={`${styles.hero__image} ${styles['hero__image--desktop']}`}
        loading="eager"
        fetchpriority="high"
        decoding="sync"
      />
      <img
        src={heroImageMobile}
        alt="Trondheim Atletklubb weightlifters training"
        className={`${styles.hero__image} ${styles['hero__image--mobile']}`}
        loading="eager"
        fetchpriority="high"
        decoding="sync"
      />
      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>Finn styrken din hos oss</h1>
        <p className={styles.hero__subtitle}>
          Trygt, sosialt og lærerikt treningsmiljø i olympisk vektløfting for
          alle i Trondheim.
        </p>
        <div className={styles.hero__buttons}>
          <ButtonHighlight type="button" onClick={handleBliMedlem}>
            bli medlem
          </ButtonHighlight>
          <ButtonBorder type="button" onClick={handleLearnMore}>
            lær mer
          </ButtonBorder>
        </div>
      </div>
    </section>
  );
};

export default Hero;
