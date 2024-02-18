import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${movieId}`, {
          headers: {
            'X-RapidAPI-Key': 'b4d0956dadmshf3d0156ceacbd59p148ff8jsn448ab9901f1a',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        });
        setMovieDetails(response.data.results);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleReviewSubmit = (review) => {
    // Implement functionality to submit review
    console.log('Review submitted:', review);
  };

  return (
    <div className="container">
      {movieDetails ? (
        <div className="movie-details">
          <img className="movie-image" src={movieDetails.primaryImage.url} alt={movieDetails.titleText.text} />
          <div className="movie-info">
            <h1 className="title">{movieDetails.titleText.text}</h1>
            <p className="release-date">Release Date: {movieDetails.releaseDate.month}/{movieDetails.releaseDate.day}/{movieDetails.releaseDate.year}</p>
            <p className="description">{movieDetails.description}</p>
            <div className="review-form">
              <h2>Add Your Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <textarea rows="4" cols="50" placeholder="Write your review here..." required></textarea>
                <button type="submit">Submit Review</button>
              </form>
            </div>
            <Link to={`/movies/booking/${movieId}`} className="book-show-button">Book Show</Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
