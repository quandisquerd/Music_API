const express = require("express")
const { SignUp, testDecre, SignIn } = require("../controllers/auth")
const router = express.Router()

router.post("/signup", SignUp)
router.post("/signin", SignIn)
router.get("/test", testDecre)

module.exports = router