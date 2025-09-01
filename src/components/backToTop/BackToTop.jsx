import { useState, useEffect } from "react";
import styles from "./BackToTop.module.scss";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const toggleVisibility = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }, 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles['back-to-top']} ${isVisible ? styles['back-to-top--visible'] : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Tilbake til toppen"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

export default BackToTop;
