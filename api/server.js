require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8005;
const { connectToMongoDB } = require('../config/database');
const articleRoutes = require('../routes/articles');

connectToMongoDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API de l\'application',
  });
});

app.use('/api/articles', articleRoutes);

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();