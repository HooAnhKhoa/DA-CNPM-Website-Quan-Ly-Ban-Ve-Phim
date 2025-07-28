import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import './BookingPage.css';

export default function BookingPage() {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [movies, setMovies] = useState([]);
 const userString = localStorage.getItem("user");
let userID = null;

try {
  const user = userString ? JSON.parse(userString) : null;
  console.log("🧠 Dữ liệu user từ localStorage:", user);
  userID = user?.UserID || null;
} catch (err) {
  console.error("❌ Lỗi khi parse user từ localStorage:", err);
}

  useEffect(() => {
    fetch('http://localhost:3000/api/showtimes')
      .then(res => res.json())
      .then(setShowtimes);

    fetch('http://localhost:3000/api/movies')
      .then(res => res.json())
      .then(setMovies);
  }, []);

  useEffect(() => {
    if (!selectedShowtime) return;

    const allSeats = generateSeatList();
    fetch(`http://localhost:3000/api/booked-seats/${selectedShowtime}`)
      .then(res => res.json())
      .then(booked => {
        setBookedSeats(booked);
      });

    setSelectedSeats([]);
    const info = showtimes.find(st => st.ShowtimeID === Number(selectedShowtime));
    setSelectedInfo(info);
  }, [selectedShowtime, showtimes]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      alert('Vui lòng chọn suất chiếu và ghế.');
      return;
    }

    const res = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        UserID: userID,
        ShowtimeID: selectedShowtime,
        SeatNumbers: selectedSeats,
        Status: 'confirmed'
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      alert(`\uD83C\uDF89 Đặt vé thành công! Mã vé: ${data.BookingID}`);
      setSelectedSeats([]);
      setBookedSeats(prev => [...prev, ...selectedSeats]);
    } else {
      alert(`Lỗi đặt vé: ${data.error}`);
    }
  };

  const getMovieName = (id) => {
    const movie = movies.find(m => m.MovieID === id);
    return movie ? movie.Title : `Phim ${id}`;
  };

  return (
    <>
      <Header />
      <div className="booking-container">
        <h2 className="title">Đặt vé xem phim</h2>

        <label className="label">Chọn suất chiếu:</label>
        <select
          className="select"
          value={selectedShowtime}
          onChange={(e) => setSelectedShowtime(e.target.value)}
        >
          <option value="">-- Chọn suất chiếu --</option>
          {showtimes.map(st => (
            <option key={st.ShowtimeID} value={st.ShowtimeID}>
              {st.ShowtimeID} - {getMovieName(st.MovieID)} | Phòng {st.Room} | {st.ShowDate} | {new Date(st.StartTime).toLocaleTimeString()} | {st.Price}đ
            </option>
          ))}
        </select>

        {selectedInfo && (
          <>
            <div className="showtime-info">
              <p><strong>Suất chiếu:</strong> {selectedInfo.ShowtimeID}</p>
              <p><strong>Phim:</strong> {getMovieName(selectedInfo.MovieID)}</p>
              <p><strong>Phòng:</strong> {selectedInfo.Room}</p>
              <p><strong>Ngày:</strong> {selectedInfo.ShowDate}</p>
              <p><strong>Giờ bắt đầu:</strong> {new Date(selectedInfo.StartTime).toLocaleTimeString()}</p>
              <p><strong>Giá vé:</strong> {selectedInfo.Price.toLocaleString()}đ</p>
            </div>

            <div className="legend">
              <div><span className="legend-box available" /> Ghế trống</div>
              <div><span className="legend-box selected" /> Đã chọn</div>
              <div><span className="legend-box unavailable" /> Đã đặt</div>
            </div>

            <h3 className="seat-label">Chọn ghế:</h3>
            <div className="seat-grid">
              {generateSeatList().map(seat => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    className={`seat-button ${
                      isBooked ? "unavailable" : isSelected ? "selected" : "available"
                    }`}
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>

            <div className="selected-info">
              Ghế đã chọn:
              <span> {selectedSeats.join(', ') || 'Không có'}</span>
            </div>
            <div className="total-price">
              Tổng tiền: <strong>{(selectedSeats.length * selectedInfo.Price).toLocaleString()}đ</strong>
            </div>
            <button onClick={handleBooking} className="confirm-btn">
              ✅ Xác nhận đặt vé
            </button>
          </>
        )}
      </div>
      <Banner />
    </>
  );
}

function generateSeatList() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = 10;
  let seats = [];
  rows.forEach(r => {
    for (let i = 1; i <= cols; i++) {
      seats.push(`${r}${i}`);
    }
  });
  return seats;
}
