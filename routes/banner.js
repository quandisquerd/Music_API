const express = require("express")
const { addBanner, getAllBanerActive, getAllBaner, updateBanner } = require("../controllers/banner")
const router = express.Router()

router.post("/addbanner", addBanner)
router.get("/getbanneractive", getAllBanerActive)
router.get("/getallbanner", getAllBaner)
router.put("/updatebanner/:id",updateBanner)

module.exports = router