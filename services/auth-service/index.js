const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8001;

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Auth service healthy' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth Service running on port ${PORT}`);
});
