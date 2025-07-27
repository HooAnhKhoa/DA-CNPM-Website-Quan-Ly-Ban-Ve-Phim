import React, { useEffect, useState } from 'react';
import './AddShowtime.css';

export default function AddShowtime() {
  const [formData, setFormData] = useState({
    MovieID: '',
    Room: '',
    ShowDate: '',
    StartTime: '',
    Price: ''
  });

  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');

  // 🔄 Lấy danh sách phim từ API
  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(() => setMovies([]));
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/showtimes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Suất chiếu đã được thêm!');
        setFormData({ MovieID: '', Room: '', ShowDate: '', StartTime: '', Price: '' });
      } else {
        setMessage(`❌ Lỗi: ${data.error}`);
      }
    } catch (err) {
      setMessage('❌ Không kết nối được server.');
    }
  };

  return (
    <div className="add-movie-container">
      <h2>🎬 Thêm Suất Chiếu</h2>
      <form onSubmit={handleSubmit}>
        {/* 🔽 Chọn phim */}
        <label>
          Tên phim:
          <select name="MovieID" value={formData.MovieID} onChange={handleChange} required>
            <option value="">-- Chọn phim --</option>
            {movies.map(movie => (
              <option key={movie.MovieID} value={movie.MovieID}>
                {movie.Title}
              </option>
            ))}
          </select>
        </label>

        {/* 🔽 Chọn phòng cố định */}
        <label>
          Phòng chiếu:
          <select name="Room" value={formData.Room} onChange={handleChange} required>
            <option value="">-- Chọn phòng --</option>
            <option value="Phòng 1">Phòng 1</option>
            <option value="Phòng 2">Phòng 2</option>
            <option value="Phòng 3">Phòng 3</option>
          </select>
        </label>

        <input
          type="date"
          name="ShowDate"
          value={formData.ShowDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="StartTime"
          value={formData.StartTime}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Price"
          placeholder="Giá vé"
          value={formData.Price}
          onChange={handleChange}
          required
        />

        <button type="submit">Thêm Suất Chiếu</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
