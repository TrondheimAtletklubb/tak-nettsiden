import { Modal } from "../../ui/modal";
import { legalContent } from "../../data/legalContent";
import styles from "./LegalModal.module.scss";

const LegalModal = ({ isOpen, onClose, contentType }) => {
  if (!contentType || !legalContent[contentType]) {
    return null;
  }

  const content = legalContent[contentType];

  // Convert markdown-like content to JSX
  const formatContent = (text) => {
    const lines = text.trim().split("\n");
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        elements.push(<h1 key={key++}>{line.substring(2)}</h1>);
      } else if (line.startsWith("## ")) {
        elements.push(<h2 key={key++}>{line.substring(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={key++}>{line.substring(4)}</h3>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={key++}>
            <strong>{line.substring(2, line.length - 2)}</strong>
          </p>
        );
      } else if (line.startsWith("- ")) {
        // Handle bullet points
        const listItems = [line];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith("- ")) {
          listItems.push(lines[j]);
          j++;
        }
        elements.push(
          <ul key={key++}>
            {listItems.map((item, idx) => (
              <li key={idx}>{item.substring(2)}</li>
            ))}
          </ul>
        );
        i = j - 1; // Skip processed lines
      } else if (line.trim() !== "") {
        // Handle links in text
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        if (linkRegex.test(line)) {
          const parts = line.split(linkRegex);
          const formattedLine = [];
          for (let k = 0; k < parts.length; k += 3) {
            if (parts[k]) formattedLine.push(parts[k]);
            if (parts[k + 1] && parts[k + 2]) {
              formattedLine.push(
                <a
                  key={k}
                  href={parts[k + 2]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {parts[k + 1]}
                </a>
              );
            }
          }
          elements.push(<p key={key++}>{formattedLine}</p>);
        } else {
          elements.push(<p key={key++}>{line}</p>);
        }
      }
    }

    return elements;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={content.title} size="large">
      <div className={styles['legal-modal']}>
        <p className={styles['legal-modal__last-updated']}>
          <em>{content.lastUpdated}</em>
        </p>
        <div className={styles['legal-modal__content']}>
          {formatContent(content.content)}
        </div>
      </div>
    </Modal>
  );
};

export default LegalModal;
