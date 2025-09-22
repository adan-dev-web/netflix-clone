import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const sections = [
  { label: "Accueil", id: "home-section" },
  { label: "Séries", id: "series-section" },
  { label: "Films", id: "films-section" },
  { label: "Jeux", id: "jeux-section" },
  { label: "Nouveautés les plus regardées", id: "top-section" },
  { label: "Ma liste", id: "list-section" },
  { label: "Explorer par langue", id: "lang-section" },
];

const Navbar = () => {
  const navRef = useRef();
  const [active, setActive] = useState(sections[0].id);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
      // Detect active section
      let found = sections[0].id;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && window.scrollY >= el.offsetTop - 80) {
          found = sec.id;
        }
      }
      setActive(found);
    });
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo Netflix" />
        <ul>
          {sections.map((sec) => (
            <li
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              style={{ fontWeight: active === sec.id ? "bold" : "normal" }}
            >
              {sec.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-right">
        <img
          src={search_icon}
          alt="Icone de recherche"
          className="icons"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/search")}
        />
        <p>Enfants</p>
        <img src={bell_icon} alt="Icone de notification" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Image de profil" className="profile" />
          <img src={caret_icon} alt="Icone de flèche" />
          <div className="dropdown">
            <p onClick={logout}>Déconnexion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
