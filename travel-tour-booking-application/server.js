const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
// app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.json({ msg: "Hi" });
});

app.get("/*", function (req, res) {
  return res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
