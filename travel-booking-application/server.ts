/* eslint @typescript-eslint/no-var-requires: "off" */
const express = require("express");
require("dotenv").config();
const path = require("path");
require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require("morgan");
const jwt = require("jsonwebtoken");

const tourRoute = require("./routes/tour.ts");
const userRoute = require("./routes/user.ts");
const authRoute = require("./routes/auth.ts");
const reviewsRoute = require("./routes/reviews.ts");
const bookingsRoute = require("./routes/bookings.ts");

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "dist")));
// app.use(express.urlencoded());

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/bookings", bookingsRoute);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
