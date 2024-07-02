"use strict";

var mongoose = require("mongoose"); // Connect to the MongoDB database using mongoose.connect() method and specify the database URL and options


mongoose.connect("mongodb+srv://premyadav18520:premkumar412@cluster0.htzhdao.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Store the default connection in a variable named db

var db = mongoose.connection; // Listen for any errors that may occur in the database connection and log them to the console

db.on("error", function (error) {
  console.error("MongoDB connection error:", error);
}); // Once the connection is established, log a message to the console indicating the successful connection

db.once("open", function () {
  console.log("MongoDB connected");
}); // Export the db object for use in other files

module.exports = db;
//# sourceMappingURL=mongoose.dev.js.map
