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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp'); // Sử dụng /tmp thay vì uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/topplay", GetMusicWithPlay);
router.get("/music/:id", GetMusicDetail);
router.post("/music/add", AddMusic);
router.delete("/musics/:id", checkPermission.check, musicController.remove);
router.post("/musics/search", musicController.search);
router.get("/music", getAllMusic);
router.put("/updateview/:id", UpdateViewMusic);
router.post("/upload", upload.single("audio"), UploadFile);
module.exports = router;
