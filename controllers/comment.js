const jwt = require("jsonwebtoken");
const Comment = require("../models/Comment");
const User = require("../models/User");
const AddComment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const { title, songid } = req.body;
    const comment = await Comment.create({
      content: title,
      songId: songid,
      userId: userId,
    });
    if (comment) {
      return res.status(200).json({
        message: "Comment successfully",
      });
    }
    return res.status(404).json({ message: "Comment not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error comment!", error });
  }
};

const GetCommentWithMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: { songId: id },
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });
    if (comments) {
      const data = comments.map((comment) => ({
        id: comment.id,
        songId: comment.songId,
        title: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,     
        User: comment.User
          ? {
              id: comment.User.id,
              username: comment.User.username,
              avatar: comment.User.avatar,
              followersCount: comment.User.followersCount
            } 
          : null,
      }));
      return res.status(200).json({
        message: "Get comment successfully",
        data: data,
      });
    }
    return res.status(404).json({ message: "Comment not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error comment!", error });
  }
};
module.exports = { AddComment, GetCommentWithMusic };
