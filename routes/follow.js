const express = require("express")
const { AddFollow, UnFollow, getUserTopFollow, checkFollowUser } = require("../controllers/follow")
const router = express.Router()


router.post("/follow", AddFollow)
router.post("/unfollow", UnFollow)
router.get("/topfollow" , getUserTopFollow)
router.get("/checkFollow/:id", checkFollowUser)
module.exports = router