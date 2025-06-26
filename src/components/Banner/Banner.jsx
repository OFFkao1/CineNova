
import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import requests from '../../request';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState([]);
  // const [movie, setMovie] = useState({
  //   title: "Squid Game",
  //   overview: "Hundreds of cash-strapped contestants accept an invitation to compete in games for a tempting prize, but the stakes are deadly.",
  //   backdrop_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg"
  // });

  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomMovie = request.data.results[
          Math.floor(Math.random() * request.data.results.length)
          ];
      console.log("🎬 Banner movie loaded:", randomMovie); // ADD THIS
      setMovie(randomMovie);
    }
    fetchData();
  }, []);


  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          })
          .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
      <div>
        <header
            className="banner"
            onClick={() => setTrailerUrl("")}
            style={{
              backgroundSize: "cover",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0,0,0,0.2)), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundPosition: "center center",
            }}
        >
          <div className="banner__contents">
            <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
            <p className="banner__description">{truncate(movie?.overview, 140)}</p>
            <div className="banner__buttons">
              <button onClick={() => handleClick(movie)} className="banner__button play">
                ▶ Play
              </button>
              <button className="banner__button list">+ My List</button>
            </div>
          </div>
          <div className="banner__fadeBottom" />
        </header>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
  );
}

export default Banner;
