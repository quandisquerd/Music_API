const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorite");
const Music = require("../models/Music");
const User = require("../models/User");

const AddFavoriteSong = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { songId } = req.body;
    if (!songId) {
      return res.status(500).json({ message: "Song ID cannot be empty!" });
    }
    const favorite = await Favorite.create({ userId: userId, songId: songId });
    if (favorite) {
      await Music.increment("favorite", {
        by: 1,
        where: { id: songId },
      });
      return res.status(200).json({ message: "Add favorite success" });
    }
    return res.status(404).json({ message: "Favorite not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error add favorite song data" });
  }
};
const getAllFavoriteWithUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: Music,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log(favorites);
    
    if (favorites && favorites.length > 0) {
      const data = favorites.map((favorite) => ({
        id: favorite.id,
        userId: favorite.User?.id,
        songId: favorite.Music.id,
        createdAt: favorite.createdAt,
        updatedAt: favorite.updatedAt,
        Music: {
          id: favorite.Music.id,
          name: favorite.Music.name,
          file: favorite.Music.file,
          description: favorite.Music.description,
          view: favorite.Music.view,
          favorite: favorite.Music.favorite,
          repost: favorite.Music.repost,
          image: favorite.Music.image,
          status: favorite.Music.status,
          genreId: favorite.Music.genreId,
          userId: favorite.Music.userId,
          albumId: favorite.Music.albumId,
          createdAt: favorite.Music.createdAt,
          updatedAt: favorite.Music.updatedAt,
        },
        User: favorite.Music.User
          ? {
              id: favorite.Music.User.id,
              username: favorite.Music.User.username,
              avatar: favorite.Music.User.avatar,
              followersCount: favorite.Music.User.followersCount,
            }
          : null,
      }));

      return res
        .status(200)
        .json({ message: "Get all favorite success", data: data });
    }
    return res.status(404).json({ message: "Favorite not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error get all favorite song data" });
  }
};
const checkFavoriteWithUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { id } = req.params;
    const favorite = await Favorite.findOne({
      where: { userId, songId: id },
    });
    if (favorite) {
      return res.status(200).json({ status: true }); // Trả về true nếu tìm thấy
    } else {
      return res.status(200).json({ status: false }); // Trả về false nếu không tìm thấy
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error get all favorite song data" });
  }
};
const removeFavoriteSong = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { id } = req.params;
    const favorite = await Favorite.findOne({
      where: { userId, songId: id },
    });
    if (favorite) {
      await favorite.destroy();
      await Music.decrement("favorite", {
        by: 1,
        where: { userId, id: id },
      });
      return res.status(200).json({ message: "Remove favorite success" });
    }
    return res.status(404).json({ message: "Favorite not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error remove favorite song data" });
  }
};
module.exports = {
  AddFavoriteSong,
  getAllFavoriteWithUser,
  checkFavoriteWithUser,
  removeFavoriteSong,
};
