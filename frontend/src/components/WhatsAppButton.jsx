import whatsappIcon from "/assets/whatsapp.png";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5491161050878"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
}

