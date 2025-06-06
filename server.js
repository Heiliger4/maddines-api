require('dotenv').config();
const express = require('express');
const indexRoute = require('./routes/indexRoute.js');
const path = require('path');
const { sequelize, testConnection } = require('./config/database'); 

const app = express();

app.use(express.json());
app.use('/api', indexRoute);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); 
  }
};

startServer();
