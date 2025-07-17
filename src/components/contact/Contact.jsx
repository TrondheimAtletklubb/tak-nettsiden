import { useState } from "react";
import { takInfoData } from "../../data/takInfoData";
import { InfoCard } from "../../ui/cards";
import "./Contact.styles.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit form to Netlify form handler
      await fetch("https://tak-forms.netlify.app/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="contact">
      <div className="container">
        <h2 className="contact__title">Kontakt oss</h2>
        <p className="contact__subtitle">
          Ta kontakt hvis du har spørsmål eller bekymringer. Vi gleder oss til å
          komme i kontakt med deg.
        </p>

        <div className="contact__content">
          <div className="contact__info">
            <InfoCard
              icon="fas fa-envelope"
              title="E-post"
              content="Ta kontakt med oss"
              link={`mailto:${takInfoData.epost}`}
              linkText={takInfoData.epost}
            />

            <InfoCard
              icon="fas fa-phone"
              title="Telefon"
              content="Ring oss når som helst"
              link={`tel:${takInfoData.telefon.replace(/\s/g, "")}`}
              linkText={takInfoData.telefon}
            />

            <InfoCard
              icon="fas fa-map-marker-alt"
              title="Kontor"
              content={takInfoData.sted}
            />
          </div>

          {/* Contact Form */}
          <div className="contact__form-container">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="contact__form"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="contact__form-row">
                <div className="contact__form-group">
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

                <div className="contact__form-group">
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

              <div className="contact__form-group">
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

              <div className="contact__form-group">
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

              <div className="contact__form-group">
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

              <button
                type="submit"
                className="contact__submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sender..." : "Send melding"}
              </button>

              {submitStatus === "success" && (
                <div className="contact__message contact__message--success">
                  <i className="fas fa-check-circle"></i>
                  Takk for din melding! Vi kommer tilbake til deg snart.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="contact__message contact__message--error">
                  <i className="fas fa-exclamation-circle"></i>
                  Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
