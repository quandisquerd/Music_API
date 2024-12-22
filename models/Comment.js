const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Music = require("./Music");

const Comment = sequelize.define("Comment", {
  content: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  songId: { type: DataTypes.INTEGER, references: { model: Music, key: "id" } },
});
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
Music.hasMany(Comment, { foreignKey: "songId" });
Comment.belongsTo(Music, { foreignKey: "songId" });
module.exports = Comment;
