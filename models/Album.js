const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Album = sequelize.define("Album", {
  name: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
});
User.hasMany(Album, { foreignKey: "userId" });
Album.belongsTo(User, { foreignKey: "userId" });
module.exports = Album;
