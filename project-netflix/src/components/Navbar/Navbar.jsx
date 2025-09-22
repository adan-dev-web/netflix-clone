import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaUserFriends, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAccountCircle, MdHelpOutline } from "react-icons/md";

const sections = [
  { label: "Accueil", id: "home-section" },
  { label: "Séries", id: "series-section" },
  { label: "Films", id: "films-section" },
  { label: "Jeux", id: "jeux-section" },
  { label: "Nouveautés les plus regardées", id: "top-section" },
  { label: "Ma liste", id: "list-section" },
  { label: "Explorer par langue", id: "lang-section" },
];

const fakeProfiles = [
  { name: "Lilisette", img: profile_img },
  { name: "Phénix", img: profile_img },
];

const Navbar = () => {
  const navRef = useRef();
  const [active, setActive] = useState(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
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
        <img src={bell_icon} alt="Icone de notification" className="icons" />
        <div
          className="navbar-profile"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <img src={profile_img} alt="Image de profil" className="profile" />
          <img
            src={caret_icon}
            alt="Icone de flèche"
            className={`caret-icon ${menuOpen ? "open" : ""}`}
          />
          <div className={`dropdown${menuOpen ? " open" : ""}`}>
            {/* Profils fictifs */}
            <div className="dropdown-profiles">
              {fakeProfiles.map((profile) => (
                <div className="dropdown-profile-row" key={profile.name}>
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="profile"
                  />
                  <span>{profile.name}</span>
                </div>
              ))}
            </div>
            <div className="dropdown-divider" />
            {/* Liens menu */}
            <div className="dropdown-menu-item">
              <FaUserEdit className="dropdown-icon" />
              <span>Gérer les profils</span>
            </div>
            <div className="dropdown-menu-item">
              <FaUserFriends className="dropdown-icon" />
              <span>Transférer un profil</span>
            </div>
            <div className="dropdown-menu-item">
              <MdOutlineAccountCircle className="dropdown-icon" />
              <span>Compte</span>
            </div>
            <div className="dropdown-menu-item">
              <MdHelpOutline className="dropdown-icon" />
              <span>Centre d'aide</span>
            </div>
            <div className="dropdown-divider" />
            {/* Déconnexion */}
            <p className="dropdown-logout" onClick={logout}>
              Se déconnecter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
