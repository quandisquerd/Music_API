const Genre = require("../models/Genre");
const AddGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).json({ message: "Name field cannot be empty!" });
    }
    const genre = await Genre.create({ name });
    return res.status(200).json({ message: "Add genre success!" });
  } catch (error) {
    return res.status(500).json({ message: "Error added Genre!", error });
  }
};
const GetAllGenre = async (req, res) => {
  try {
    const genre = await Genre.findAll({ order: [["createdAt", "ASC"]] });
    return res
      .status(200)
      .json({ message: "Getall genre success!", data: genre });
  } catch (error) {
    return res.status(500).json({ message: "Error getall Genre!", error });
  }
};
const UpdateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(500).json({ message: "Name field cannot be empty!" });
    }
    const genre = await Genre.update({ name }, { where: { id } });
    if (genre) {
      const updatedGenre = await Genre.findByPk(id);
      return res.status(200).json({
        message: "Genre updated successfully",
        data: updatedGenre,
      });
    }
    return res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error update Genre!", error });
  }
};
const DeleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.destroy({ where: { id } });
    if (genre) {
      return res.status(200).json({ message: "Genre deleted successfully" });
    }
    return res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error delete Genre!", error });
  }
};
const GetOneGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findOne({ id });
    if (genre) {
      return res
        .status(200)
        .json({ message: "Genre getone successfully", data: genre });
    }
    return res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error getone Genre!", error });
  }
};
module.exports = {
  GetOneGenre,
  AddGenre,
  DeleteGenre,
  GetAllGenre,
  UpdateGenre,
};
