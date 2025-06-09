const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8003;

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Order service healthy' });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
