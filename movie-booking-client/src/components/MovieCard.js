import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.MovieID}`);
  };

  const handleBooking = (e) => {
    e.stopPropagation(); // Ngăn không cho click vào card
    navigate(`/booking/${movie.MovieID}`);
  };

  const formattedDate = movie.ReleaseDate
    ? new Date(movie.ReleaseDate).toLocaleDateString('vi-VN')
    : '';

  const imageUrl = `http://localhost/uploads/${movie.PosterUrl}`;

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={imageUrl}
        alt={movie.Title}
        className="movie-card-img"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
        }}
      />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p><b>Thể loại:</b> {movie.Genre}</p>
        <p><b>Thời lượng:</b> {movie.Duration} phút</p>
        <p><b>Ngày chiếu:</b> {formattedDate}</p>

        {/* Căn giữa nút trong thẻ div riêng */}
      </div>
    </div>
  );
}
