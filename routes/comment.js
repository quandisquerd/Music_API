const express = require("express");
const router = express.Router();
const { AddComment, GetCommentWithMusic } = require("../controllers/comment");

router.post("/comment", AddComment);
router.get("/comment/:id",GetCommentWithMusic )
module.exports = router;
