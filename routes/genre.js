const express = require("express");
const router = express.Router();
const { AddGenre, GetAllGenre, UpdateGenre, DeleteGenre, GetOneGenre } = require("../controllers/genre");

router.post("/addgenre", AddGenre);
router.get("/getallgenre", GetAllGenre);
router.get("/genre/:id", GetOneGenre);
router.put("/updategenre/:id", UpdateGenre);
router.delete("/deletegenre/:id",DeleteGenre)

module.exports = router;
