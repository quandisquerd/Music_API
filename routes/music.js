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
  cancelUpload,
  CheckuploadFileUser,
} = require("../controllers/music");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.get("/topplay", GetMusicWithPlay);
router.get("/music/:id", GetMusicDetail);
router.post("/music/add", AddMusic);
router.delete("/musics/:id", checkPermission.check, musicController.remove);
router.post("/musics/search", musicController.search);
router.get("/music", getAllMusic);
router.put("/updateview/:id", UpdateViewMusic);

// API để tải lên tệp
router.post("/upload", upload.single("audio"), UploadFile);
router.post("/cancelupload", cancelUpload);
router.get("/checkuploaduser", CheckuploadFileUser);

module.exports = router;
