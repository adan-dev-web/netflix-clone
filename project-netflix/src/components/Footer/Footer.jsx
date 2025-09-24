import React from "react";
import "./Footer.css";
import linkedin_icon from "../../assets/linkedin_logo.webp";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/adan-nancel-32383a36b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin_icon} alt="LinkedIn" />
        </a>
      </div>
      <ul>
        <li>Audio description</li>
        <li>Centre d'aide</li>
        <li>Cartes cadeaux</li>
        <li>Centre de media</li>
        <li>Relations avec les investisseurs</li>
        <li>Conditions d'utilisation</li>
        <li>Politique de confidentialité</li>
        <li>Notions légales</li>
        <li>Préférences de cookies</li>
        <li>Informations sur les publicités</li>
        <li>Contactez-nous</li>
      </ul>
      <p className="copyright-text">
        © 2025 Netflix Clone by AdanDev. Tous droits réservés.
      </p>
    </div>
  );
};

export default Footer;
