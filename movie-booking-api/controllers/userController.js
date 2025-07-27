const db = require('../db');

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE UserID = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { FullName, Email, PasswordHash } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO users (FullName, Email, PasswordHash) VALUES (?, ?, ?)',
      [FullName, Email, PasswordHash]
    );
    res.status(201).json({ UserID: result.insertId, FullName, Email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { FullName, Email, PasswordHash } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE users SET FullName = ?, Email = ?, PasswordHash = ? WHERE UserID = ?',
      [FullName, Email, PasswordHash, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ UserID: req.params.id, FullName, Email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE UserID = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
