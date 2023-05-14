const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const dirPath = path.join(__dirname, './', 'dist');

app.use(express.static(dirPath));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.API_PORT || PORT, function() {
  console.log(`Server listening port ${process.env.API_PORT || PORT}!`);
});
