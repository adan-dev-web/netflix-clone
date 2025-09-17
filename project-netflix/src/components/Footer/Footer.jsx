import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={youtube_icon} alt="Footer icons" />
        <img src={twitter_icon} alt="Footer icons" />
        <img src={instagram_icon} alt="Footer icons" />
        <img src={facebook_icon} alt="Footer icons" />
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
