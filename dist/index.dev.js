"use strict";

// to access environment variables
require('dotenv').config(); // third-party modules


var express = require('express');

var morgan = require('morgan'); // importing database connection file


var db = require('./config/mongoose'); // starting a new express application


var app = express(); // port on which server will listen

var port = process.env.PORT || 4000; // middlewares
// morgan() to handle logs

app.use(morgan('dev')); // express.urlencoded() parses incoming requests with urlencoded payloads

app.use(express.urlencoded({
  extended: false
})); // express.json() parses incoming requests with JSON payloads

app.use(express.json()); // for handling routes

app.use('/', require('./routes')); // for handling incorrect routes

app.use(function (req, res, next) {
  var error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
}); // binds and listens for connections on the specified host and port

app.listen(port, function (err) {
  if (err) {
    console.log("There is an error in starting the server.", err);
    return;
  }

  console.log("Server is running on the port ", port);
});
//# sourceMappingURL=index.dev.js.map
