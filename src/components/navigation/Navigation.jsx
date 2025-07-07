import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navigation.styles.scss";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const menuItems = [
    { label: "Contact", href: "#contact" },
    { label: "Location", href: "#location" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
  ];

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
        {menuItems.map((item) => (
          <li key={item.label} className="navigation__item">
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
      >
        {isMenuOpen ? <HiX size={40} /> : <HiMenu size={40} />}
      </button>

      <ul
        className={`navigation__menu navigation__menu--mobile ${
          isMenuOpen ? "navigation__menu--open" : ""
        }`}
      >
        {menuItems.map((item) => (
          <li key={item.label} className="navigation__item">
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
