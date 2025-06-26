import React, { useEffect, useState } from 'react';
import './Row.css'; // Correct import path for CSS
import axios from '../../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

const youtubeOpts = {
  height: "370",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailerNotFound, setShowTrailerNotFound] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('❌ Error fetching movies:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie, index) => {
    if (playingIndex === index) {
      // If same movie is clicked, toggle trailer off
      setTrailerUrl("");
      setPlayingIndex(null);
      return;
    }

    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        if (!url) throw new Error('No trailer found');
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setShowTrailerNotFound(false);
        setPlayingIndex(index);
      })
      .catch(() => {
        setTrailerUrl("");
        setShowTrailerNotFound(true);
        setTimeout(() => setShowTrailerNotFound(false), 2000);
      });
  };

  const handleCutTrailer = () => {
    setTrailerUrl("");
    setPlayingIndex(null);
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie, index) => {
          const imagePath = isLargeRow ? movie?.poster_path : movie?.backdrop_path;
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie, index)}
              className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
              src={`${baseUrl}${imagePath}`}
              alt={movie?.name || movie?.title || "Movie Poster"}
              loading="lazy"
            />
          );
        })}
      </div>

      <div className="trailerUrl-container">
        {trailerUrl ? (
          <div key={`youtube-${trailerUrl}`}>
            <YouTube videoId={trailerUrl} opts={youtubeOpts} className="youtube" />
            <button className="cutButton" onClick={handleCutTrailer}>
              Cut Trailer
            </button>
          </div>
        ) : (
          showTrailerNotFound && (
            <div id="not-found">
              <h3>Trailer not found</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Row;
