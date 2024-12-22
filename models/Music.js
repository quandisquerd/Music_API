const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Album = require("./Album");
const Renre = require("./Genre");

const Music = sequelize.define("Music", {
  name: { type: DataTypes.STRING, allowNull: true },
  file: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  view: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  favorite: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  repost: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  image: { type: DataTypes.STRING, allowNull: true },
  status : {type:DataTypes.STRING , allowNull:true},
  genreId: { type: DataTypes.INTEGER, references: { model: Renre, key: "id" } },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
  },
  albumId: {
    type: DataTypes.INTEGER,
    references: { model: Album, key: "id" },
  },
});
User.hasMany(Music, { foreignKey: "userId" });
Music.belongsTo(User, { foreignKey: "userId" });
Album.hasMany(Music, { foreignKey: "albumId" });
Music.belongsTo(Album, { foreignKey: "albumId" });
Renre.hasMany(Music, { foreignKey: "genreId" });
Music.belongsTo(Renre, { foreignKey: "genreId" });

module.exports = Music;
