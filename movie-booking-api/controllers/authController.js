const db = require('../db');

exports.login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE Email = ? AND PasswordHash = ?',
      [Email, Password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        message: 'Đăng nhập thành công',
        UserID: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
        CreatedAt: user.CreatedAt
      });
    } else {
      res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
