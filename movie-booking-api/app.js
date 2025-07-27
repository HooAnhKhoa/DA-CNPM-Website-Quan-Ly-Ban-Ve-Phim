const express = require('express');
const cors = require('cors'); // Thêm dòng này
const db = require('./db'); // đường dẫn tới db.js

const app = express();

app.use(cors()); // Thêm dòng này
app.use(express.json()); // Thêm dòng này

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.json(rows); // Kết quả: [{ now: '2025-07-26T15:00:00.000Z' }]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Server chạy tại http://localhost:3000');
});

app.use('/api', require('./routes/apiRoutes'));
app.use('/uploads', express.static('uploads'));