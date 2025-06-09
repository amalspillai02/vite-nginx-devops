const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8002;

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Product service healthy' });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
