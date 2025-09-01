import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { takInfoData } from "../../data/takInfoData";
import { InfoCard } from "../../ui/cards";
import { ButtonHighlight } from "../../ui/buttons";
import { Section } from "../../ui/sections";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if captcha is completed
    if (!captchaValue) {
      setSubmitStatus("captcha_error");
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Trondheim Atletklubb",
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="kontakt"
      className={styles.contact}
      background="secondary"
      title="Kontakt oss"
      subtitle="Ta kontakt hvis du har spørsmål eller bekymringer. Vi gleder oss til å komme i kontakt med deg."
    >
      <div className={styles['contact__content']}>
          <div className={styles['contact__info']}>
            <InfoCard
              icon="fas fa-envelope"
              title="E-post"
              content="Ta kontakt med oss"
              link={`mailto:${takInfoData.epost}`}
              linkText={takInfoData.epost}
            />

            {/* <InfoCard
              icon="fas fa-phone"
              title="Telefon"
              content="Ring oss når som helst"
              link={`tel:${takInfoData.telefon.replace(/\\s/g, "")}`}
              linkText={takInfoData.telefon}
            /> */}

            <InfoCard
              icon="fas fa-map-marker-alt"
              title="Sted"
              content={takInfoData.sted}
            />

            <InfoCard
              icon="fab fa-facebook"
              title="Facebook"
              content="Følg oss på Facebook"
              link={takInfoData.facebookUrl}
              linkText={takInfoData.facebook}
              openInNewTab={true}
            />

            <InfoCard
              icon="fab fa-instagram"
              title="Instagram"
              content="Følg oss på Instagram"
              link={takInfoData.instagramUrl}
              linkText={takInfoData.instagram}
              openInNewTab={true}
            />
          </div>

          {/* Contact Form */}
          <div className={styles['contact__form-wrapper']}>
            <form onSubmit={handleSubmit} className={styles['contact__form']}>
              <div className={styles['contact__form-row']}>
                <div className={styles['contact__form-group']}>
                  <label htmlFor="firstName">Fornavn</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles['contact__form-group']}>
                  <label htmlFor="lastName">Etternavn</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles['contact__form-group']}>
                <label htmlFor="email">E-post</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles['contact__form-group']}>
                <label htmlFor="subject">Emne</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles['contact__form-group']}>
                <label htmlFor="message">Melding</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Skriv din melding..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* reCAPTCHA */}
              <div className={`${styles['contact__form-group']} ${styles.contact__captcha}`}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  theme="light"
                />
              </div>

              <ButtonHighlight
                type="submit"
                disabled={isSubmitting || !captchaValue}
              >
                {isSubmitting ? "Sender..." : "Send melding"}
              </ButtonHighlight>

              {submitStatus === "success" && (
                <div className={`${styles.contact__message} ${styles['contact__message--success']}`}>
                  <i className="fas fa-check-circle"></i>
                  Takk for din melding! Vi kommer tilbake til deg snart.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`${styles.contact__message} ${styles['contact__message--error']}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.
                </div>
              )}

              {submitStatus === "captcha_error" && (
                <div className={`${styles.contact__message} ${styles['contact__message--error']}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  Vennligst bekreft at du ikke er en robot ved å fylle ut reCAPTCHA.
                </div>
              )}
            </form>
          </div>
        </div>
    </Section>
  );
};

export default Contact;
