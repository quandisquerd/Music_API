const jwt = require("jsonwebtoken");
const Banner = require("../models/Banner");
const User = require("../models/User");
const Music = require("../models/Music");
const { where } = require("sequelize");

const addBanner = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const user = await User.findOne({ where: { id: userId } });
    const userRole = user.role;
    if (userRole != 0) {
      return res
        .status(401)
        .json({ message: "You do not have permission to use this api!" });
    }
    const { title, image, musicId, description } = req.body;
    const banner = await Banner.create({
      image: image,
      title: title,
      musicId: musicId,
      description: description,
    });
    if (banner) {
      return res.status(200).json({
        message: "Add banner successfully!",
      });
    }
    return res.status(404).json({ message: "Banner add error!" });
  } catch (error) {
    return res.status(500).json({ message: "Error add banner!", error });
  }
};

const getAllBanerActive = async (req, res) => {
  try {
    const banner = await Banner.findAll({
      where: { active: true },
      include: [
        {
          model: Music,
          include: [
            {
              model: User,
              attributes: ["id", "username", "avatar", "followersCount"],
            },
          ],
        },
      ],
    });
    const data = banner.map((banner) => ({
      id: banner.id,
      title: banner.title,
      musicId: banner.musicId,
      active: banner.active,
      image: banner.image,
      description: banner.description,
      Music: {
        id: banner.Music.id,
        name: banner.Music.name,
        file: banner.Music.file,
        description: banner.Music.description,
        view: banner.Music.view,
        favorite: banner.Music.favorite,
        repost: banner.Music.repost,
        image: banner.Music.image,
        status: banner.Music.status,
        genreId: banner.Music.genreId,
        userId: banner.Music.userId, // Giữ userId gốc trong Music
        albumId: banner.Music.albumId,
        createdAt: banner.Music.createdAt,
        updatedAt: banner.Music.updatedAt,
      },
      User: {
        id: banner.Music.User.id,
        username: banner.Music.User.username,
        avatar: banner.Music.User.avatar,
        followersCount: banner.Music.User.followersCount,
      },
    }));
    if (data) {
      return res.status(200).json({
        message: "Get banner successfully!",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error get banner!", error });
  }
};
const getAllBaner = async (req, res) => {
  try {
    const banner = await Banner.findAll({
      include: [
        {
          model: Music,
          include: [
            {
              model: User,
              attributes: ["id", "username", "avatar", "followersCount"],
            },
          ],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    const data = banner.map((banner) => ({
      id: banner.id,
      title: banner.title,
      musicId: banner.musicId,
      active: banner.active,
      image: banner.image,
      description: banner.description,
      Music: {
        id: banner.Music.id,
        name: banner.Music.name,
        file: banner.Music.file,
        description: banner.Music.description,
        view: banner.Music.view,
        favorite: banner.Music.favorite,
        repost: banner.Music.repost,
        image: banner.Music.image,
        status: banner.Music.status,
        genreId: banner.Music.genreId,
        userId: banner.Music.userId, // Giữ userId gốc trong Music
        albumId: banner.Music.albumId,
        createdAt: banner.Music.createdAt,
        updatedAt: banner.Music.updatedAt,
      },
      User: {
        id: banner.Music.User.id,
        username: banner.Music.User.username,
        avatar: banner.Music.User.avatar,
        followersCount: banner.Music.User.followersCount,
      },
    }));
    if (data) {
      return res.status(200).json({
        message: "Get banner successfully!",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error get banner!", error });
  }
};
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, musicId, title, active, description } = req.body;
    const banner = await Banner.update(
      { image, musicId, title, active, description },
      { where: { id } }
    );
    if (banner) {
      return res.status(200).json({
        message: "Banner updated successfully",
      });
    }
    return res.status(404).json({ message: "Banner not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error update banner!", error });
  }
};
module.exports = { addBanner, getAllBanerActive, getAllBaner,updateBanner };
