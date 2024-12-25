const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: "*", // Bạn có thể thay "*" bằng URL cụ thể như 'http://localhost:5173' hoặc 'https://your-frontend-url.vercel.app'
  methods: ["GET", "POST", "PUT", "DELETE"], // Phương thức HTTP được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Header được phép
  credentials: true, // Cho phép credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
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
