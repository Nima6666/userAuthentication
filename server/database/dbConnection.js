const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL_STR).then(() => {
  console.log("Connected to Database");
});
