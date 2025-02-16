const History = require("../models/History");
const jwt = require("jsonwebtoken");
const Music = require("../models/Music");
const User = require("../models/User");

const AddHistory = async (req, res) => {
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
    const existingHistory = await History.findOne({
      where: { userId, songId },
    });

    if (existingHistory) {
      const history = await History.update(
        {
          createdAt: new Date(),
        },
        { where: { id: existingHistory.id } }
      );
      return res.status(200).json({ message: "History updated successfully" });
    }
    const history = await History.create({ userId: userId, songId: songId });
    if (history) {
      return res.status(200).json({ message: "Add History success" });
    }
    return res.status(404).json({ message: "History not found" });
  } catch (error) {
    res.status(500).send("Error added history");
  }
};
const GetHistoryWithUser = async (req, res) => {
  try {
    // Lấy token từ header và giải mã
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;

    // Truy vấn lịch sử của người dùng
    const histories = await History.findAll({
      where: { userId },
      include: [
        {
          model: Music, // Bao gồm thông tin bài hát
          include: [
            {
              model: User,}]
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Nếu có dữ liệu
    if (histories && histories.length > 0) {
      const data = histories.map((history) => ({
        id: history.id,
        userId: history.User?.id,
        songId: history.Music.id,
        createdAt: history.createdAt,
        updatedAt: history.updatedAt,
        Music: {
          id: history.Music.id,
          name: history.Music.name,
          file: history.Music.file,
          description: history.Music.description,
          view: history.Music.view,
          favorite: history.Music.favorite,
          repost: history.Music.repost,
          image: history.Music.image,
          status: history.Music.status,
          genreId: history.Music.genreId,
          userId: history.Music.userId,
          albumId: history.Music.albumId,
          createdAt: history.Music.createdAt,
          updatedAt: history.Music.updatedAt,
        },
        User: history.Music.User
          ? {
              id: history.Music.User.id,
              username: history.Music.User.username,
              avatar: history.Music.User.avatar,
              followersCount: history.Music.User.followersCount
            }
          : null,
      }));

      return res.status(200).json({
        message: "Get History success",
        data,
      });
    }

    // Nếu không có dữ liệu
    return res.status(404).json({ message: "History with user not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error get history with user");
  }
};

module.exports = { AddHistory, GetHistoryWithUser };
