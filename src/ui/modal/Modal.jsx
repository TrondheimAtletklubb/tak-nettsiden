import { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, title, children, size = "medium" }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles['modal-overlay']} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${styles[`modal--${size}`]}`}>
        <div className={styles['modal__header']}>
          <h2 className={styles['modal__title']}>{title}</h2>
          <button
            className={styles['modal__close']}
            onClick={onClose}
            aria-label="Lukk modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles['modal__content']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;