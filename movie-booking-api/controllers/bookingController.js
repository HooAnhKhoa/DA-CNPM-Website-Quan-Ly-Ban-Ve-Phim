const db = require('../db');

exports.getBookings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE BookingID = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  const { UserID, ShowtimeID, SeatNumbers, Status = 'confirmed' } = req.body;
  if (!SeatNumbers || !SeatNumbers.length) {
    return res.status(400).json({ error: 'SeatNumbers is required' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [priceResult] = await conn.query('SELECT Price FROM showtimes WHERE ShowtimeID = ?', [ShowtimeID]);
    const seatPrice = priceResult[0]?.Price || 0;
    const totalPrice = seatPrice * SeatNumbers.length;

    const [result] = await conn.query(
      'INSERT INTO bookings (UserID, ShowtimeID, TotalPrice, Status) VALUES (?, ?, ?, ?)',
      [UserID, ShowtimeID, totalPrice, Status]
    );

    const BookingID = result.insertId;

    for (const seat of SeatNumbers) {
      await conn.query(
        'INSERT INTO bookingseats (BookingID, SeatNumber) VALUES (?, ?)',
        [BookingID, seat]
      );
    }

    await conn.commit();
    res.status(201).json({ success: true, BookingID });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};

exports.updateBooking = async (req, res) => {
  const { UserID, ShowtimeID, TotalPrice, Status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE bookings SET UserID = ?, ShowtimeID = ?, TotalPrice = ?, Status = ? WHERE BookingID = ?',
      [UserID, ShowtimeID, TotalPrice, Status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ success: true, BookingID: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE BookingID = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT 
        b.BookingID,
        b.UserID,
        b.TotalPrice,
        b.Status,
        b.BookingTime,
        s.ShowtimeID,
        s.Room,
        s.ShowDate,
        s.StartTime,
        s.Price,
        m.MovieID,
        m.Title AS MovieTitle,
        GROUP_CONCAT(bs.SeatNumber) AS Seats
      FROM bookings b
      JOIN showtimes s ON b.ShowtimeID = s.ShowtimeID
      JOIN movies m ON s.MovieID = m.MovieID
      JOIN bookingseats bs ON b.BookingID = bs.BookingID
      WHERE b.UserID = ?
      GROUP BY b.BookingID
      ORDER BY b.BookingTime DESC
    `, [id]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
