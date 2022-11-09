let express = require("express");
let mongoose = require("mongoose");
const path = require("path");
let cors = require("cors");
let bodyParser = require("body-parser");
let createError = require("http-errors");
const port = process.env.PORT || 4000;

const studentRoute = require("./routes/student.route");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

// app.use(bodyParser.json());

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

// app.use(cors());

app.use("/students", studentRoute);


// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log("Connected to port" + port);
});