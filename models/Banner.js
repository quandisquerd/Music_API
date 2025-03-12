const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Music = require("./Music"); 

const Banner = sequelize.define("Banner", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  musicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Music,
      key: "id",
    },
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description:{
    type:DataTypes.TEXT,
    allowNull: false,
  }
});
Banner.belongsTo(Music, { foreignKey: "musicId" });
Music.hasMany(Banner, { foreignKey: "musicId" });

module.exports = Banner;
