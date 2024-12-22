const express = require("express")
const { AddFavoriteSong, getAllFavoriteWithUser, checkFavoriteWithUser, removeFavoriteSong } = require("../controllers/favorite")

const router = express.Router()


router.post("/favorite", AddFavoriteSong)
router.get("/favorite", getAllFavoriteWithUser)
router.get("/checkfavorite/:id", checkFavoriteWithUser)
router.delete("/remove/:id", removeFavoriteSong)
module.exports = router