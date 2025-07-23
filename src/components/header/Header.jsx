import logo from "../../assets/logo-tak-transparent.png";
import Navigation from "../navigation/Navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import "./Header.styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-section">
        <img src={logo} alt="TAK Logo" className="header__logo" />
        <div className="header__title-group">
          <h1 className="header__title">TRONDHEIM ATLETKLUBB</h1>
          <p className="header__subtitle">Olympisk vektløfting</p>
        </div>
      </div>
      <div className="header__controls">
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
