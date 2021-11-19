import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Favorites from "../src/pages/Favorites";

const API_KEY = "api_key=186d9baec1b324bf9be9c70e44199ac3";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const App = () => {
  const [data, fetchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    title: "",
    poster_path: "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    overview: "",
  });

  const [favorites, setFavorites] = useState([]);

  const addFavorites = (movie) => {
    console.log(movie);
    setFavorites(movie);
    console.log("davorites", favorites);
  };

  const getData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        fetchData(data.results);
      });
  };

  const openCard = (movie) => {
    setModal(movie);
    console.log(modal);
    setOpen(!open);
  };

  const inputRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const Card = (movie) => {
    return (
      <div className="movie">
        <img
          src={`${IMG_URL + movie.poster_path}`}
          alt={movie.title}
          className="movie-img"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-rating">Rating: {movie.vote_average}/10</div>
          <div className="movie-desc">{movie.overview}</div>
          <button
            className="movie-button"
            id={movie.id}
            onClick={() => openCard(movie)}
          >
            See More
          </button>
          <button className="movie-button" onClick={() => addFavorites(movie)}>
            Add to Favorites
          </button>
        </div>
      </div>
    );
  };

  const searchStart = (e) => {
    e.preventDefault();
    console.log(searchInput);
    if (searchInput) {
      getData(searchURL + "&query=" + searchInput);
    } else {
      getData(API_URL);
    }
  };

  useEffect(() => {
    getData(API_URL);
  }, []);

  useEffect(() => {
    setSearchInput("");
  }, []);

  return (
    <div className="App">
      <Header />
      <header>
        <h1 className="header-title" onClick={() => getData(API_URL)}>
          Movie Gallery
        </h1>
        <form id="form" onSubmit={searchStart}>
          <input
            onChange={handleChange}
            value={searchInput}
            ref={inputRef}
            type="text"
            placeholder="search"
            id="search"
          />
        </form>
      </header>

      <div className="popup" style={{ left: `${open ? "0" : "-100vw"}` }}>
        <button className="popup-button" onClick={() => setOpen(!open)}>
          x
        </button>
        <div className="popup-content">
          <h3 className="popup-title">{modal.title}</h3>
          <img
            src={`${IMG_URL + modal.poster_path}`}
            alt=""
            className="popup-image"
          />
          <p className="popup-overview">{modal.overview}</p>
        </div>
      </div>

      <main id="main">
        {data.map((item, i) => {
          return (
            <Card
              key={i}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              overview={item.overview}
              id={item.id}
            />
          );
        })}
      </main>
    </div>
  );
};

export default App;
