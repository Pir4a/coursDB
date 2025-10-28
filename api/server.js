const express = require('express');
const app = express();
const port = 8005;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API de l\'application',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});