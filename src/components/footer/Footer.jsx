import { useState } from "react";
import { takInfoData } from "../../data/takInfoData";
import { navigationItems } from "../../data/navigation";
import LegalModal from "../legalModal/LegalModal";
import "./Footer.styles.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  const handleLegalLinkClick = (e, contentType) => {
    e.preventDefault();
    setActiveModal(contentType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Info Section - TAK Contact Data */}
        <div className="footer__info">
          <h3 className="footer__section-title">Kontakt Informasjon</h3>
          <div className="footer__contact-item">
            <i className="fas fa-envelope"></i>
            <a
              href={`mailto:${takInfoData.epost}`}
              className="footer__contact-link"
            >
              {takInfoData.epost}
            </a>
          </div>
          {/* <div className="footer__contact-item">
            <i className="fas fa-phone"></i>
            <a
              href={`tel:${takInfoData.telefon.replace(/\s/g, "")}`}
              className="footer__contact-link"
            >
              {takInfoData.telefon}
            </a>
          </div> */}
          <div className="footer__contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span className="footer__contact-text">{takInfoData.sted}</span>
          </div>
        </div>

        {/* Nav Section - Vertical Navigation */}
        <div className="footer__nav-section">
          <h3 className="footer__section-title">Navigasjon</h3>
          <nav className="footer__nav">
            {navigationItems.map((item) => (
              <a key={item.id} href={item.href} className="footer__nav-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Logos Section - Social Media */}
        <div className="footer__logos">
          <h3 className="footer__section-title">Følg Oss</h3>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/Atletklubben"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/trondheimak/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <div className="footer__bottom-left">
            <p className="footer__copyright">
              © {currentYear} TAK Weightlifting Club. All rights reserved.
            </p>
          </div>

          <div className="footer__bottom-center">
            <p className="footer__created-by">
              Powered by:
              <a
                href="https://solsidentech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__created-link"
              >
                Solsiden Tech Creations
              </a>
            </p>
          </div>

          <div className="footer__bottom-right">
            <div className="footer__legal">
              <a
                href="#privacy"
                className="footer__legal-link"
                onClick={(e) => handleLegalLinkClick(e, "privacyPolicy")}
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="footer__legal-link"
                onClick={(e) => handleLegalLinkClick(e, "termsOfUse")}
              >
                Terms of Use
              </a>
              <a
                href="#cookies"
                className="footer__legal-link"
                onClick={(e) => handleLegalLinkClick(e, "cookiePolicy")}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={!!activeModal}
        onClose={closeModal}
        contentType={activeModal}
      />
    </footer>
  );
};

export default Footer;
