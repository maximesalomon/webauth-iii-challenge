const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json(), cors());

// ENDPOINTS

server.get('/*', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT = 7000, () => {
  console.log(`Server is running on port ${PORT}`);
});