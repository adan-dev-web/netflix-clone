import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import play_icon from "../../assets/play_icon.png";
import { FaPlus } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import strangerThingsData from "../../components/StrangerThings/StrangerThingsData";
import "./Player.css";

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // --- 1. Cas Stranger Things ---
  if (id === "stranger-things") {
    const stranger = location.state?.stranger || strangerThingsData;
    const trailerOnly =
      location.state?.trailerOnly || location.search.includes("trailerOnly=1");

    if (!stranger || !stranger.trailerKey) {
      return (
        <div style={{ color: "white", padding: "2rem" }}>
          Erreur : Données Stranger Things manquantes.
        </div>
      );
    }

    if (trailerOnly) {
      return (
        <div className="player-trailer">
          <img
            src={back_arrow_icon}
            alt="Retour"
            className="player-trailer-back-arrow"
            onClick={() => navigate(-1)}
          />
          <iframe
            src={`https://www.youtube.com/embed/${stranger.trailerKey}?autoplay=1&rel=0&controls=1`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            className="player-trailer-iframe"
          ></iframe>
        </div>
      );
    }

    return (
      <div className="player-detail-page">
        <div className="player-banner-video-bg">
          <iframe
            src={`https://www.youtube.com/embed/${stranger.trailerKey}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=${stranger.trailerKey}&modestbranding=1`}
            title="trailer-bg"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            tabIndex={-1}
          ></iframe>
        </div>
        <img
          src={back_arrow_icon}
          alt="Retour"
          className="player-back-arrow"
          onClick={() => navigate(-1)}
        />
        <div className="player-banner">
          <div className="player-banner-bg"></div>
          <div className="player-banner-content">
            <h1 className="player-detail-title">{stranger.title}</h1>
            <div className="player-detail-meta">
              <span className="player-detail-date">{stranger.year}</span>
              <span className="player-detail-genres">
                {Array.isArray(stranger.genres)
                  ? stranger.genres.join(", ")
                  : stranger.genres}
              </span>
            </div>
            <p className="player-detail-desc">{stranger.overview}</p>
            <div className="player-detail-btns">
              <button
                className="player-play-btn"
                onClick={() =>
                  navigate("/player/stranger-things?trailerOnly=1", {
                    state: { stranger, trailerOnly: true },
                  })
                }
              >
                <img src={play_icon} alt="Lecture" />
                Lecture
              </button>
              <button
                className="player-action-btn"
                aria-label="Ajouter à ma liste"
              >
                <FaPlus size={22} />
              </button>
              <button className="player-action-btn" aria-label="J'aime">
                <SlLike size={22} />
              </button>
              <button className="player-action-btn" aria-label="Je n'aime pas">
                <SlDislike size={22} />
              </button>
            </div>
          </div>
          <img
            className="player-detail-poster"
            src="/src/assets/strangerthingsposter.jpg"
            alt={stranger.title}
          />
        </div>
      </div>
    );
  }

  // --- 2. Cas général (autres films/séries) ---
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDI5MzJhOTRjMTk2YTFkYTc0ZTE0ZDEyMjQxYTNkYyIsIm5iZiI6MTc1ODE4ODU4NC4xMDYsInN1YiI6IjY4Y2JkNDI4MGVlNWYxZDRlNTA3Mzk1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3KR2_VtkIXzEHswWm4bQbw_2q2WMM5cA0glGrrKu7-I",
    },
  };

  useEffect(() => {
    if (!id || id === "stranger-things") return;

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.status_code) {
          setMovie(null);
        } else {
          setMovie(data);
        }
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=fr-FR`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const yt = res.results?.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(yt);
      });
  }, [id]);

  if (!movie) {
    return <div className="player-detail-loading">Chargement...</div>;
  }

  if (movie === null) {
    return (
      <div
        className="player-detail-loading"
        style={{ color: "white", padding: "2rem" }}
      >
        Film ou série introuvable.
      </div>
    );
  }

  return (
    <div className="player-detail-page">
      {/* Trailer en fond, FIXED */}
      {trailer && (
        <div className="player-banner-video-bg">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=${trailer.key}&modestbranding=1`}
            title="trailer-bg"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            tabIndex={-1}
          ></iframe>
        </div>
      )}

      <img
        src={back_arrow_icon}
        alt="Retour"
        className="player-back-arrow"
        onClick={() => navigate(-1)}
      />

      {/* Modal trailer */}
      {showTrailer && trailer && (
        <div className="player-trailer-modal">
          <img
            src={back_arrow_icon}
            alt="Retour"
            className="player-trailer-back-arrow"
            onClick={() => setShowTrailer(false)}
          />
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&controls=1`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            className="player-trailer-iframe"
          ></iframe>
        </div>
      )}

      {/* Bandeau principal */}
      <div className="player-banner">
        <div className="player-banner-bg">
          {!trailer && movie && (movie.backdrop_path || movie.poster_path) && (
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : null
              }
              alt={movie.title}
              className="player-banner-img"
            />
          )}
          <div className="player-banner-overlay"></div>
        </div>
        <div className="player-banner-content">
          <h1 className="player-detail-title">{movie.title}</h1>
          <div className="player-detail-meta">
            <span className="player-detail-date">
              {movie.release_date?.slice(0, 4)}
            </span>
            <span className="player-detail-duration">
              {movie.runtime ? `${movie.runtime} min` : ""}
            </span>
            <span className="player-detail-genres">
              {movie.genres?.map((g) => g.name).join(", ")}
            </span>
          </div>
          <p className="player-detail-desc">{movie.overview}</p>
          <div className="player-detail-btns">
            {trailer && (
              <button
                className="player-play-btn"
                onClick={() => setShowTrailer(true)}
              >
                <img src={play_icon} alt="Lecture" />
                Lecture
              </button>
            )}
            <button
              className="player-action-btn"
              aria-label="Ajouter à ma liste"
            >
              <FaPlus size={22} />
            </button>
            <button className="player-action-btn" aria-label="J'aime">
              <SlLike size={22} />
            </button>
            <button className="player-action-btn" aria-label="Je n'aime pas">
              <SlDislike size={22} />
            </button>
          </div>
        </div>
        {movie && movie.poster_path && (
          <img
            className="player-detail-poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
