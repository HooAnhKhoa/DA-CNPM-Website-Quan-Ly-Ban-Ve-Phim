import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api';
import Header from '../components/Header';
import Banner from '../components/Banner';
import './MovieDetailPage.css';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovies().then(res => {
      const found = res.data.find(m => String(m.MovieID) === String(id));
      setMovie(found);
    });
  }, [id]);

  if (!movie) return <div>Đang tải...</div>;

  const imageUrl = `http://localhost/uploads/${movie.PosterUrl}`;

  return (
    <>
      <Header />
      <div className="movie-detail-container">
        <div className="movie-detail-row">
          <img
            src={imageUrl}
            alt={movie.Title}
            className="movie-card-img"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
            }}
          />
          <div className="movie-detail-info-block">
            <h2 className="movie-detail-title">{movie.Title}</h2>
            <p className="movie-detail-info"><strong>Thể loại:</strong> {movie.Genre}</p>
            <p className="movie-detail-info"><strong>Thời lượng:</strong> {movie.Duration} phút</p>
            <p className="movie-detail-info">
              <strong>Ngày chiếu:</strong> {movie.ReleaseDate ? new Date(movie.ReleaseDate).toLocaleDateString('vi-VN') : ''}
            </p>
          </div>
        </div>

        <div className="movie-detail-description">
          <strong>Mô tả:</strong> {movie.Description || 'Chưa có mô tả.'}
        </div>
      </div>
      <Banner />
    </>
  );
}
