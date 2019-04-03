const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig");
const mw = require("./middleware");

const server = express();

server.use(express.json(), cors());

// ENDPOINTS

server.get('/*', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT = 7000, () => {
  console.log(`Server is running on port ${PORT}`);
});