const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const { connectDB } = require("./config/config");
const userRoutes = require("./routes/userRoutes");
var cookieParser = require("cookie-parser");

connectDB();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", userRoutes);
app.use('/uploads', express.static('uploads'))


app.use((err, req, res, next) => {
  let error = { ...err };
  if (err.name == `ValidatationError`) {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }
  if (err.name == `CastError`) {
    const message = ` Resouroce not found. Invalid ID `;
    error = new ErrorHandler(message, 400);
  }
  if (err.code == 11000) {
    const message = `Duplicate $(object.keys(err.keyValue))} entered`;
    error = new ErrorHandler(message, 400);
  }
  res.status(error.statusCode).json({
    error: error.message,
  });
});

app.listen(7000, () => {
  console.log("Listening on port 7000");
});
