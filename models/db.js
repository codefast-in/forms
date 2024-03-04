const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/formdata")

  .then(() => {
    console.log("Database connected successful");
  })
  .catch((err) => {
    console.log(err);
  });
