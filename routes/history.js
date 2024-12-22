const express = require("express")
const { AddHistory, GetHistoryWithUser } = require("../controllers/history")
const router = express.Router()


router.post("/history", AddHistory)
router.get("/history", GetHistoryWithUser)

module.exports = router