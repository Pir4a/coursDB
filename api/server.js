require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8005;
const { connectToMongoDB, closeDB } = require('../config/database');

connectToMongoDB();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API de l\'application',
  });
});

 async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await closeDB();
  }
}
startServer();