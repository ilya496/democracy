const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// Configuraion
require("dotenv").config({
  path: path.resolve(__dirname, "config/config.env"),
});
connectDB();

// Getting vars from config
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/news", require("./routes/news.routes"));

// Error handler
app.use(require("./middlewares/error.middleware"));

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
