import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

const API_KEY = "api_key=186d9baec1b324bf9be9c70e44199ac3";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const App = () => {
  const [data, fetchData] = useState([]);
  // const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const OpenModal = (open) => setOpen(!open);
  const openCard = (movie) => {
    console.log("clicked");
    console.log(movie);
    OpenModal(open)
  };

  const getData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        fetchData(data.results);
        // showMovies(data.results);
      });
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
        </div>
      </div>
    );
  };

  const Modal = (movieClicked) => {
    return (
      <div className={open ? "card-modal" : "card-modal-close"}>
        <h3 className="title-modal">${movieClicked.title}</h3>
        <p className="overview-modal"> ${movieClicked.overview}</p>
        <img
          src={IMG_URL + movieClicked.poster_path}
          alt={movieClicked.title}
          className="img-modal"
        />
      </div>
    );
  };

  useEffect(() => {
    console.log("reload");
    getData(API_URL);
    console.log(data);
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="header-title">Movie Gallery</h1>
        <form id="form">
          <input type="text" placeholder="search" id="search" />
        </form>
      </header>

      <div className="overlay" id="myNav">
        <a href="#">x</a>
        {/*<div className="overlay-content" id="overlay-content"></div> */}
        <Modal className="overlay-content" style={{ width: "100%" }} />
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
