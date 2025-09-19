import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="Hero" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="Hero" className="caption-img" />
          <p>
            Avec l'aide d'un ancien ordre secret, un jeune homme doit lutter
            contre des ennemis immortels pour sauver la ville d'Istanbul.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="Play" />
              Lecture
            </button>

            <button className="btn dark-btn">
              <img src={info_icon} alt="Info" />
              Plus d'infos
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Films à succés"} category={"top_rated"} />
        <TitleCards title={"Seulement sur Netflix"} category={"popular"} />
        <TitleCards title={"À venir"} category={"upcoming"} />
        <TitleCards title={"Séléctionnés pour toi"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
