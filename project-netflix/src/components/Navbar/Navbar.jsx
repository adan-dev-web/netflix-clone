import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo Netflix" />
        <ul>
          <li>Accueil</li>
          <li>Séries</li>
          <li>Films</li>
          <li>Nouveautés populaires</li>
          <li>Ma liste</li>
          <li>Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Icone de recherche" className="icons" />
        <p>Enfants</p>
        <img src={bell_icon} alt="Icone de notification" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Image de profil" className="profile" />
          <img src={caret_icon} alt="Icone de flèche" />
          <div className="dropdown">
            <p>Déconnexion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
