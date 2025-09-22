import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import play_icon from "../../assets/play_icon.png";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options)
      .then((res) => res.json())
      .then(setMovie);

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

  return (
    <div className="player-detail-page">
      <img
        src={back_arrow_icon}
        alt="Retour"
        className="player-back-arrow"
        onClick={() => navigate(-1)}
      />

      {/* Modal trailer */}
      {showTrailer && trailer && (
        <div
          className="player-trailer-modal"
          onClick={() => setShowTrailer(false)}
        >
          <div className="player-trailer-modal-bg" />
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&controls=1`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* Bandeau principal */}
      <div className="player-banner">
        <div className="player-banner-bg">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : ""
            }
            alt={movie.title}
            className="player-banner-img"
          />
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
            <button className="player-add-btn">+ Ma liste</button>
            <button className="player-share-btn">Partager</button>
          </div>
        </div>
        {movie.poster_path && (
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
