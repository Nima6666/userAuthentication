const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// database connection
require("./database/dbConnection");

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
