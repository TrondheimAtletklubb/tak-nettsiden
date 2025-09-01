import logo from "../../assets/logo-tak-transparent.webp";
import Navigation from "../navigation/Navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header__logo-section']}>
        <img src={logo} alt="TAK Logo" className={styles['header__logo']} />
        <div className={styles['header__title-group']}>
          <h1 className={styles['header__title']}>TRONDHEIM ATLETKLUBB</h1>
          <p className={styles['header__subtitle']}>Olympisk vektløfting</p>
        </div>
      </div>
      <div className={styles['header__controls']}>
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
