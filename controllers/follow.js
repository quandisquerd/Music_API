const Follow = require("../models/Folow");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sequelize = require("../database");
const { Op } = require("sequelize");
const AddFollow = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { id } = req.body;

    const follow = await Follow.create({ followingId: userId, followerId: id });
    if (follow) {
      await User.increment("followersCount", {
        by: 1,
        where: { id: id },
      });
      return res.status(200).json({ message: "Add Follow successfully" });
    }
    return res.status(404).json({ message: "Follow not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error add follow", error });
  }
};
const UnFollow = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { id } = req.body;

    const follow = await Follow.findOne({
      where: { followingId: userId, followerId: id },
    });
    if (follow) {
      await follow.destroy();
      await User.decrement("followersCount", {
        by: 1,
        where: { id: id },
      });
      return res.status(200).json({ message: "Un Follow successfully" });
    }
    return res.status(404).json({ message: "Follow not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error un follow", error });
  }
};
const getUserTopFollow = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;

    const topUsers = await User.findAll({
      attributes: ["id", "username", "avatar", "followersCount"], // Các trường cần trả về
      where: {
        id: { [Op.ne]: userId },
      },
      order: [["followersCount", "DESC"]], // Sắp xếp giảm dần theo số followers
      limit: 5, // Lấy 5 user
    });
    console.log(topUsers);
    if (topUsers) {
      return res
        .status(200)
        .json({ message: "Get Top Follow successfully", data: topUsers });
    }
    return res.status(404).json({ message: "Top Follow not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error get top follow", error });
  }
};
const checkFollowUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { id } = req.params;
    const follow = await Follow.findOne({
      where: { followingId: userId, followerId: id },
    });
    if (follow) {
      return res.status(200).json({ status: true });
    }
    return res.status(200).json({ status: false });
  } catch (error) {
    return res.status(500).json({ message: "Error check follow", error });
  }
};
module.exports = { AddFollow, UnFollow, getUserTopFollow, checkFollowUser };
