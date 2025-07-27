const db = require('../db');

// Lấy tất cả phim
exports.getAllMovies = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy phim theo ID
exports.getMovieById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movies WHERE MovieID = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo phim mới
exports.createMovie = async (req, res) => {
  try {
    const { Title, Duration, Genre, PosterUrl, ReleaseDate, Description } = req.body;
    const [result] = await db.query(
      'INSERT INTO movies (Title, Duration, Genre, PosterUrl, ReleaseDate, Description) VALUES (?, ?, ?, ?, ?, ?)',
      [Title, Duration, Genre, PosterUrl, ReleaseDate, Description]
    );
    res.status(201).json({
      MovieID: result.insertId,
      Title,
      Duration,
      Genre,
      PosterUrl,
      ReleaseDate,
      Description,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật phim
exports.updateMovie = async (req, res) => {
  try {
    const { Title, Duration, Genre, PosterUrl, ReleaseDate, Description } = req.body;
    const [result] = await db.query(
      'UPDATE movies SET Title = ?, Duration = ?, Genre = ?, PosterUrl = ?, ReleaseDate = ?, Description = ? WHERE MovieID = ?',
      [Title, Duration, Genre, PosterUrl, ReleaseDate, Description, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({
      MovieID: req.params.id,
      Title,
      Duration,
      Genre,
      PosterUrl,
      ReleaseDate,
      Description,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa phim
exports.deleteMovie = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM movies WHERE MovieID = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
