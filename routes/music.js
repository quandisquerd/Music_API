const express = require("express")
const router = express.Router()
const checkPermission = require("../middleware/checkPermission")
const {musicController, getAllMusic, AddMusic, GetMusicDetail, GetMusicWithPlay, UpdateViewMusic} = require('../controllers/music')

router.get("/topplay", GetMusicWithPlay)
router.get("/music/:id", GetMusicDetail)
router.post("/music/add" , AddMusic)
router.delete("/musics/:id", checkPermission.check, musicController.remove)
router.post("/musics/search", musicController.search)
router.get("/music", getAllMusic)
router.put("/updateview/:id", UpdateViewMusic)
module.exports = router