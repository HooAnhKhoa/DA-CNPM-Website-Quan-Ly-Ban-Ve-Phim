import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css'; // 👈 Import CSS riêng

export default function MovieList({ movies, mode }) {
  const today = new Date();

  const showingMovies = movies.filter(movie => new Date(movie.ReleaseDate) <= today);
  const comingSoonMovies = movies.filter(movie => new Date(movie.ReleaseDate) > today);

  let content;
  if (mode === 'now-showing') {
    content = (
      <div className="movie-section">
        <h2>🎬 Phim đang chiếu</h2>
        <div className="movie-grid">
          {showingMovies.map(movie => (
            <MovieCard key={movie.MovieID} movie={movie} />
          ))}
        </div>
      </div>
    );
  } else if (mode === 'coming-soon') {
    content = (
      <div className="movie-section">
        <h2>📅 Phim sắp chiếu</h2>
        <div className="movie-grid">
          {comingSoonMovies.map(movie => (
            <MovieCard key={movie.MovieID} movie={movie} />
          ))}
        </div>
      </div>
    );
  } else {
    content = (
      <>
        <div className="movie-section">
          <h2>🎬 Phim đang chiếu</h2>
          <div className="movie-grid">
            {showingMovies.map(movie => (
              <MovieCard key={movie.MovieID} movie={movie} />
            ))}
          </div>
        </div>
        <div className="movie-section">
          <h2>📅 Phim sắp chiếu</h2>
          <div className="movie-grid">
            {comingSoonMovies.map(movie => (
              <MovieCard key={movie.MovieID} movie={movie} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
}
