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

// POST /api/login

server.post("/api/login", (req, res) => {
    const creds = req.body;
    db.findUserByName(creds.username)
        .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = mw.generateToken(creds);
            res.status(200).json({ message: `Hello and welcome ${user.username}`, token });
        } else {
            res.status(401).send("Please, do not enter. Thank you, very much.");
        }
        })
        .catch(err => {
        res.status(500).send(err);
        });
    });
      
// GET /api/users

server.get("/api/users", mw.protected, (req, res) => {
db.findUsers()
    .then(users => {
    res.json(users);
    })
    .catch(err => {
    res.send(err);
    });
});

server.get('/', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT = 7000, () => {
  console.log(`Server is running on port ${PORT}`);
});