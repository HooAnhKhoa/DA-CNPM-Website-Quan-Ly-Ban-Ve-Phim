import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';

export default function BookedTickets() {
  const [tickets, setTickets] = useState([]);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) return;
    fetch(`http://localhost:3000/api/bookings/user/${userID}`)
      .then(res => res.json())
      .then(data => {
        console.log('Dữ liệu vé:', data);
        setTickets(data);
      });
  }, [userID]);

  if (!userID) {
    return <p style={{ textAlign: 'center' }}>Bạn cần đăng nhập để xem vé đã đặt.</p>;
  }

  return (
    <div>
      <Header />
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>🎟️ Vé đã đặt</h2>
      {tickets.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Chưa có vé nào được đặt.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={thStyle}>Mã vé</th>
              <th style={thStyle}>Phim</th>
              <th style={thStyle}>Phòng</th>
              <th style={thStyle}>Ngày</th>
              <th style={thStyle}>Giờ</th>
              <th style={thStyle}>Ghế</th>
              <th style={thStyle}>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.BookingID}>
                <td style={tdStyle}>{ticket.BookingID}</td>
                <td style={tdStyle}>{ticket.MovieTitle}</td>
                <td style={tdStyle}>{ticket.Room}</td>
                <td style={tdStyle}>{new Date(ticket.ShowDate).toLocaleDateString()}</td>
                <td style={tdStyle}>{ticket.StartTime.slice(0, 5)}</td>
                <td style={tdStyle}>{ticket.Seats}</td>
                <td style={tdStyle}>{Number(ticket.TotalPrice).toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      <Banner />
    </div>
  );
}

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};
