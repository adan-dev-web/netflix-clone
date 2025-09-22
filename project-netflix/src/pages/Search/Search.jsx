import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          search
        )}&language=fr-FR&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDI5MzJhOTRjMTk2YTFkYTc0ZTE0ZDEyMjQxYTNkYyIsIm5iZiI6MTc1ODE4ODU4NC4xMDYsInN1YiI6IjY4Y2JkNDI4MGVlNWYxZDRlNTA3Mzk1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3KR2_VtkIXzEHswWm4bQbw_2q2WMM5cA0glGrrKu7-I",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setShowResults(false);
          setTimeout(() => {
            setResults(res.results || []);
            setShowResults(true);
          }, 100); // petit délai pour l'animation
        });
    } else {
      setShowResults(false);
      setTimeout(() => {
        setResults([]);
        setShowResults(true);
      }, 100);
    }
  }, [search]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <div className="search-page">
      <img
        src={back_arrow_icon}
        alt="Retour"
        className="back-arrow-global"
        onClick={() => navigate(-1)}
      />
      <div className="search-header search-header-centered">
        <input
          ref={inputRef}
          className="search-bar search-bar-tall"
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button
            className="clear-search"
            aria-label="Effacer"
            onClick={() => setSearch("")}
            tabIndex={0}
            type="button"
          >
            ×
          </button>
        )}
      </div>
      <div className="search-results-zone search-results-wide">
        {search.length === 0 ? (
          <div className="search-empty">Veuillez rechercher un film</div>
        ) : results.length === 0 ? (
          <div className="search-empty">Aucun résultat</div>
        ) : (
          <div
            className={`search-results-list fade-in ${
              showResults ? "visible" : ""
            }`}
          >
            {results.map((movie) => (
              <Link
                to={`/player/${movie.id}`}
                className="search-result-card"
                key={movie.id}
                style={{ textDecoration: "none" }}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-poster" />
                )}
                <span>{movie.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
