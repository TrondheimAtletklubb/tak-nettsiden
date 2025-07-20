import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { navigationItems } from "../../data/navigation";
import "./Navigation.styles.scss";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");


  const handleMenuItemClick = (item) => {
    setActiveItem(item.label);
    // Close mobile menu when item is clicked
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <ul className="navigation__menu navigation__menu--desktop">
        {navigationItems.map((item) => (
          <li key={item.id} className="navigation__item">
            <a
              href={item.href}
              className={`navigation__link ${
                activeItem === item.label ? "navigation__link--active" : ""
              }`}
              onClick={() => handleMenuItemClick(item)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Burger Button */}
      <button
        className="navigation__burger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <HiX size={40} /> : <HiMenu size={40} />}
      </button>

      <ul
        className={`navigation__menu navigation__menu--mobile ${
          isMenuOpen ? "navigation__menu--open" : ""
        }`}
      >
        {navigationItems.map((item) => (
          <li key={item.id} className="navigation__item">
            <a
              href={item.href}
              className={`navigation__link ${
                activeItem === item.label ? "navigation__link--active" : ""
              }`}
              onClick={() => handleMenuItemClick(item)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
