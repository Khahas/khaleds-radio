express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const port = 3001;
const db = require("../database.js");
const md5 = require("md5");
const channelRoutes = require("./routes/channelRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use("/api/v1/channels", channelRoutes);

app.use("/api/createuser", (req, res) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };
  var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  var params = [data.name, data.email, data.password];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

// The url here should just be /api/user or /api/user/login, but must be app.post
app.get("/api/user/:email", (req, res) => {
  var sql = "select * from user where email = ?"; // Correct
  var params = [req.params.email]; // Correct
  db.get(sql, params, (err, row) => { // Correct
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    // Somewhere here should the password check be. If it is okey, res.json the row otherwiese res.json an error.
    // please see createuser row 19
    res.json({
      message: "success",
      data: row,
    });
  });
});
app.post("/api/favprog", (req, res) => {
  var data = {
    programid: req.body.programid,
    programname: req.body.programname,
  };
  var sql = "INSERT INTO favprog (programid, programname) VALUES (?,?)";
  var params = [data.programid, data.programname];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.get("/api/favprog", (req, res, next) => {
  var sql = "select * from favprog";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.delete("/api/favprog/:programid", (req, res) => {
  var sql = "delete from favprog where programid = ?";
  var params = [req.params.programid];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});



app.post("/api/favchannel", (req, res) => {
  var data = {
    useremail: req.body.user,
    channelid: req.body.channelid,
    channelname: req.body.channelname,
  };
  var sql =
    "INSERT INTO favchannel (useremail, channelid, channelname) VALUES (?,?,?)";
  var params = [data.useremail, data.channelid, data.channelname];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.get("/api/favchannel/:useremail", (req, res) => {
  var sql = "select distinct channelid, channelname from favchannel where useremail = ?";
  var params = [req.params.useremail];
  db.all(sql, params, (err, rows) => {

    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/favchannel", (req, res, next) => {
  var sql = "select * from favchannel";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.delete("/api/favchannel/:channelid", (req, res) => {
  var sql = "delete from favchannel where channelid = ?";
  var params = [req.params.channelid];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
