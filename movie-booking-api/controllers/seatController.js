const db = require('../db');

// Lấy tất cả booking seat
exports.getSeats = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookingseats');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy 1 seat theo BookingSeatID
exports.getSeatById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM bookingseats WHERE BookingSeatID = ?',
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Seat not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo seat mới (chọn ghế cho 1 Booking)
exports.createSeat = async (req, res) => {
  const { BookingID, SeatNumber } = req.body;

  try {
    // Lấy ShowtimeID từ BookingID
    const [booking] = await db.query(
      'SELECT ShowtimeID FROM bookings WHERE BookingID = ?',
      [BookingID]
    );
    if (booking.length === 0)
      return res.status(400).json({ error: 'Invalid BookingID' });

    const ShowtimeID = booking[0].ShowtimeID;

    // Kiểm tra ghế đã được đặt trong cùng suất chiếu chưa
    const [exists] = await db.query(
      `SELECT bs.*
       FROM bookingseats bs
       JOIN bookings b ON bs.BookingID = b.BookingID
       WHERE bs.SeatNumber = ? AND b.ShowtimeID = ?`,
      [SeatNumber, ShowtimeID]
    );
    if (exists.length > 0)
      return res.status(400).json({ error: 'Seat already booked for this showtime' });

    // Thêm ghế mới
    const [result] = await db.query(
      'INSERT INTO bookingseats (BookingID, SeatNumber) VALUES (?, ?)',
      [BookingID, SeatNumber]
    );

    res.status(201).json({
      BookingSeatID: result.insertId,
      BookingID,
      SeatNumber
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật seat (ví dụ chuyển ghế cho booking)
exports.updateSeat = async (req, res) => {
  const { BookingID, SeatNumber } = req.body;
  const BookingSeatID = req.params.id;

  try {
    // Lấy ShowtimeID từ BookingID
    const [booking] = await db.query(
      'SELECT ShowtimeID FROM bookings WHERE BookingID = ?',
      [BookingID]
    );
    if (booking.length === 0)
      return res.status(400).json({ error: 'Invalid BookingID' });

    const ShowtimeID = booking[0].ShowtimeID;

    // Kiểm tra trùng ghế (trừ chính mình ra)
    const [exists] = await db.query(
      `SELECT bs.*
       FROM bookingseats bs
       JOIN bookings b ON bs.BookingID = b.BookingID
       WHERE bs.SeatNumber = ? AND b.ShowtimeID = ? AND bs.BookingSeatID != ?`,
      [SeatNumber, ShowtimeID, BookingSeatID]
    );
    if (exists.length > 0)
      return res.status(400).json({ error: 'Seat already booked for this showtime' });

    // Cập nhật
    const [result] = await db.query(
      'UPDATE bookingseats SET BookingID = ?, SeatNumber = ? WHERE BookingSeatID = ?',
      [BookingID, SeatNumber, BookingSeatID]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Seat not found' });

    res.json({ BookingSeatID, BookingID, SeatNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa seat
exports.deleteSeat = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM bookingseats WHERE BookingSeatID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Seat not found' });

    res.json({ message: 'Seat deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách ghế đã đặt theo ShowtimeID
// Lấy danh sách ghế đã đặt theo ShowtimeID
exports.getBookedSeatsByShowtime = async (req, res) => {
  const { showtimeId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT bs.SeatNumber
       FROM bookingseats bs
       JOIN bookings b ON bs.BookingID = b.BookingID
       WHERE b.ShowtimeID = ?`,
      [showtimeId]
    );
    const bookedSeats = rows.map(row => row.SeatNumber);
    res.json(bookedSeats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

