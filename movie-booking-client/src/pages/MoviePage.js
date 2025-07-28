import React, { useEffect, useState } from 'react';
import { getMovies } from '../api';
import Header from '../components/Header';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';
import './MoviePage.css';

export default function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(res => setMovies(res.data));
  }, []);

  const today = new Date();
  const showing = movies.filter(movie => new Date(movie.ReleaseDate) <= today);
  const coming = movies.filter(movie => new Date(movie.ReleaseDate) > today);

  return (
    <>
      <Header />
      <div className="movie-page">
        <MovieList movies={showing} mode="now-showing" />
        <MovieList movies={coming} mode="coming-soon" />
      </div>
      <Banner />
    </>
  );
}
