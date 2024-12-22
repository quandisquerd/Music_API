const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Music = require("./Music");

const History = sequelize.define("History", {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  songId: { type: DataTypes.INTEGER, references: { model: Music, key: "id" } },
});
User.hasMany(History, { foreignKey: "userId" });
History.belongsTo(User, { foreignKey: "userId" });
Music.hasMany(History, { foreignKey: "songId" });
History.belongsTo(Music, { foreignKey: "songId" });
module.exports = History;
