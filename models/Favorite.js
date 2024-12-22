const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Music = require("./Music");

const Favorite = sequelize.define("Favorite", {
    userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    songId: { type: DataTypes.INTEGER, references: { model: Music, key: "id" } },
});
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });
Music.hasMany(Favorite, { foreignKey: "songId" });
Favorite.belongsTo(Music, { foreignKey: "songId" });
module.exports = Favorite;
