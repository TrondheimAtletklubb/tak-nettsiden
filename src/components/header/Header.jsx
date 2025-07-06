import logo from "../../assets/logo-tak-transparent.png";
import "./Header.styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-section">
        <img src={logo} alt="TAK Logo" className="header__logo" />
        <h1 className="header__title">TRONDHEIM ATLETKLUBB</h1>
      </div>
    </header>
  );
};

export default Header;