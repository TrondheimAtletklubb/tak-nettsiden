import { useState, useEffect } from "react";
import "./BackToTop.styles.scss";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "back-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Tilbake til toppen"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

export default BackToTop;
