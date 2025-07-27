const db = require('../db');

exports.getShowtimes = async (req, res) => {
  try {
    // Lấy tất cả showtimes
    const [rows] = await db.query('SELECT * FROM showtimes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShowtimeById = async (req, res) => {
  try {
    // Lấy showtime theo ID
    const [rows] = await db.query('SELECT * FROM showtimes WHERE ShowtimeID = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Showtime not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createShowtime = async (req, res) => {
  const { MovieID, Room, ShowDate, StartTime, Price } = req.body;
  try {
    // Tạo showtime mới
    const [result] = await db.query(
      'INSERT INTO showtimes (MovieID, Room, ShowDate, StartTime, Price) VALUES (?, ?, ?, ?, ?)',
      [MovieID, Room, ShowDate, StartTime, Price]
    );
    res.status(201).json({ ShowtimeID: result.insertId, MovieID, Room, ShowDate, StartTime, Price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShowtime = async (req, res) => {
  const { MovieID, Room, ShowDate, StartTime, Price } = req.body;
  try {
    // Cập nhật showtime
    const [result] = await db.query(
      'UPDATE showtimes SET MovieID = ?, Room = ?, ShowDate = ?, StartTime = ?, Price = ? WHERE ShowtimeID = ?',
      [MovieID, Room, ShowDate, StartTime, Price, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Showtime not found' });
    res.json({ ShowtimeID: req.params.id, MovieID, Room, ShowDate, StartTime, Price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteShowtime = async (req, res) => {
  try {
    // Xóa showtime
    const [result] = await db.query('DELETE FROM showtimes WHERE ShowtimeID = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Showtime not found' });
    res.json({ message: 'Showtime deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
