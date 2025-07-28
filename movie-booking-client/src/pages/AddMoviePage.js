import React, { useState } from 'react';
import { addMovie } from '../api';
import Banner from '../components/Banner';
import Header from '../components/Header';
import './AddMoviePage.css'; // Giả sử bạn có file CSS này để định dạng

export default function AddMoviePage() {
  // Giả sử userID lấy từ localStorage hoặc context
  const userID = Number(localStorage.getItem('userID'));
  const [movie, setMovie] = useState({ Title: '', Duration: '', Genre: '', PosterUrl: '', ReleaseDate: '', Description: '' });

  if (userID !== 0) return <div>Bạn không có quyền thêm phim!</div>;

   const handleAdd = async () => {
    if (!movie.Title.trim()) {
      alert('Vui lòng nhập tên phim!');
      return;
    }

    try {
      await addMovie(movie);
      alert('Thêm phim thành công!');
      setMovie({  // 👈 Reset lại form
      Title: '',
      Duration: '',
      Genre: '',
      PosterUrl: '',
      ReleaseDate: '',
      Description: '',
    });
    } catch (error) {
      alert('Thêm phim thất bại!');
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="add-movie-container">
        <h2>Thêm phim mới</h2>
        <input placeholder="Tên phim" value={movie.Title} onChange={e => setMovie({ ...movie, Title: e.target.value })} />
        <input placeholder="Thời lượng (phút)" value={movie.Duration} onChange={e => setMovie({ ...movie, Duration: e.target.value })} />
        <input placeholder="Thể loại" value={movie.Genre} onChange={e => setMovie({ ...movie, Genre: e.target.value })} />
        <input placeholder="Tên ảnh (VD: poster.webp)" value={movie.PosterUrl} onChange={e => setMovie({ ...movie, PosterUrl: e.target.value })} />
        <input placeholder="Ngày chiếu" type="date" value={movie.ReleaseDate} onChange={e => setMovie({ ...movie, ReleaseDate: e.target.value })} />
        <textarea placeholder="Mô tả phim" value={movie.Description} onChange={e => setMovie({ ...movie, Description: e.target.value })} rows={4} />
        <button onClick={handleAdd}>Thêm phim</button>
      </div>
      <Banner />
    </div>
  );
}
