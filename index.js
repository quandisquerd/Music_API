const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
const musicRouter = require("./routes/music");
const albumRouter = require("./routes/album");
const authRouter = require("./routes/auth");
const genreRouter = require("./routes/genre");
const historyRouter = require("./routes/history");
const favoriteRouter = require("./routes/favorite");
const followRouter = require("./routes/follow");
const commentRouter = require("./routes/comment");
app.use("/api", musicRouter);
app.use("/api", albumRouter);
app.use("/api", authRouter);
app.use("/api", genreRouter);
app.use("/api", historyRouter);
app.use("/api", favoriteRouter);
app.use("/api", followRouter);
app.use("/api", commentRouter);
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
