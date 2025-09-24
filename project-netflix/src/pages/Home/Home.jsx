import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/strangerthingssteve.jpg";
import hero_title from "../../assets/strangersthingstitle.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import strangerThingsData from "../../components/StrangerThings/StrangerThingsData";

const Home = () => {
  const navigate = useNavigate();

  const goToStrangerTrailer = (onlyTrailer = false) => {
    navigate(`/player/stranger-things${onlyTrailer ? "?trailerOnly=1" : ""}`, {
      state: {
        stranger: strangerThingsData,
        trailerOnly: onlyTrailer,
      },
    });
  };

  return (
    <div className="home" id="home-section">
      <Navbar />
      <div className="hero" id="series-section">
        <img src={hero_banner} alt="Hero" className="banner-img" />
        <div className="hero-banner-gradient"></div>
        <div className="hero-caption">
          <img src={hero_title} alt="Hero" className="caption-img" />
          <p className="caption-text">
            Un soir de novembre 1983 dans la ville américaine fictive d'Hawkins
            en Indiana, le jeune Will Byers, âgé de douze ans, disparaît
            brusquement sans laisser de traces, hormis son vélo. Plusieurs
            personnages vont alors tenter de le retrouver : sa mère Joyce, ses
            amis : Lucas Sinclair, Dustin Henderson et Mike Wheeler, guidés par
            la mystérieuse Eleven, une jeune fille ayant des pouvoirs
            psychiques, ainsi que le chef de la police Jim Hopper.
          </p>
          <div className="hero-btns">
            <button className="btn" onClick={() => goToStrangerTrailer(true)}>
              <img src={play_icon} alt="Play" />
              Lecture
            </button>

            <button
              className="btn dark-btn"
              onClick={() => goToStrangerTrailer(false)}
            >
              <img src={info_icon} alt="Info" />
              Plus d'infos
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <div id="films-section">
          <TitleCards title={"Films à succés"} category={"top_rated"} />
        </div>
        <div id="jeux-section">
          <TitleCards title={"Seulement sur Netflix"} category={"popular"} />
        </div>
        <div id="top-section">
          <TitleCards title={"À venir"} category={"upcoming"} />
        </div>
        <div id="list-section">
          <TitleCards
            title={"Séléctionnés pour toi"}
            category={"now_playing"}
          />
        </div>
        <div id="lang-section"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
