import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NowShowingPage from './pages/NowShowingPage';
import ComingSoonPage from './pages/ComingSoonPage';
import AddMoviePage from './pages/AddMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import MoviePage from './pages/MoviePage';
import BookedTickets from './pages/BookedTickets';
import AddShowtimePage from './pages/AddShowtimePage';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMovies = () => axios.get(`${API_URL}/movies`);
export const addMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
// Thêm các hàm khác nếu cần

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movies/now-showing" element={<NowShowingPage />} />
        <Route path="/movies/coming-soon" element={<ComingSoonPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-movie" element={<AddMoviePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booked-tickets" element={<BookedTickets />} />
        <Route path="/add-showtime" element={<AddShowtimePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;