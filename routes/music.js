const express = require("express");
const router = express.Router();
const checkPermission = require("../middleware/checkPermission");
const {
  musicController,
  getAllMusic,
  AddMusic,
  GetMusicDetail,
  GetMusicWithPlay,
  UpdateViewMusic,
  UploadFile,
} = require("../controllers/music");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu tệp vào thư mục tạm thời
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // Thư mục ghi tạm thời
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file duy nhất
  },
});

// Cấu hình multer với giới hạn kích thước file
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn kích thước file lên tới 50MB
}).single("audio");

router.get("/topplay", GetMusicWithPlay);
router.get("/music/:id", GetMusicDetail);
router.post("/music/add", AddMusic);
router.delete("/musics/:id", checkPermission.check, musicController.remove);
router.post("/musics/search", musicController.search);
router.get("/music", getAllMusic);
router.put("/updateview/:id", UpdateViewMusic);

// API để tải lên tệp
router.post("/upload", upload, UploadFile);

module.exports = router;
