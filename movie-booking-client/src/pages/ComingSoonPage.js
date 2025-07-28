import React, { useEffect, useState } from 'react';
import { getMovies } from '../api';
import Header from '../components/Header';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';

export default function ComingSoonPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies().then(res => setMovies(res.data));
  }, []);
  return (
    <div>
      <Header />
      <MovieList movies={movies} mode="coming-soon" />
      <Banner />
    </div>
  );
}
