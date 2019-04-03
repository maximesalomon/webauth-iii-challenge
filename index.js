const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig");
const mw = require("./middleware");

const server = express();

server.use(express.json(), cors());

// ENDPOINTS

// POST	/api/register

server.post("/api/register", (req, res) => {
    const creds = req.body;
    if (mw.passCheck(creds)) {
      creds.password = bcrypt.hashSync(creds.password, 12);
      db.addUser(creds)
        .then(ids => {
          const id = ids[0];
          db.findUserByID(id)
            .then(user => {
              const token = mw.generateToken(user);
              res.status(201).json({ id: user.id, token });
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => {
          res
            .status(500)
            .json({ err: `There was an error adding that user: ${err}` });
        });
    } else {
      res
        .status(406)
        .send("Please structure your password according to the proper rules");
    }
});

server.get('/*', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT = 7000, () => {
  console.log(`Server is running on port ${PORT}`);
});