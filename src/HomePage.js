// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?page=1', {
          headers: {
            'X-RapidAPI-Key': 'b4d0956dadmshf3d0156ceacbd59p148ff8jsn448ab9901f1a',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
    <h1 className="title">Upcoming Movies</h1>
    <div className="movies">
      {movies.map(movie => (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie">
          <div className="movie-content">
            <h2 className="movie-title">{movie.titleText.text}</h2>
            <p className="release-date">Release Date: {movie.releaseDate.month}/{movie.releaseDate.day}/{movie.releaseDate.year}</p>
            {movie.primaryImage && <img className="movie-image" src={movie.primaryImage.url} alt={movie.titleText.text} />}
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default HomePage;
