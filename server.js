require('dotenv').config();
const express = require('express');
const indexRoute = require('./routes/indexRoute.js');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/api', indexRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});