const express = require("express")
const router = express.Router()

const albumController = require('../controllers/album')

router.get("/album", albumController.getAll)


module.exports = router