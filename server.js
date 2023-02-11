const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const dirPath = path.join(__dirname, './', 'dist');

app.use(express.static(dirPath));

app.listen(PORT, function () {
  console.log(`Server listening port ${PORT}!`);
}); 