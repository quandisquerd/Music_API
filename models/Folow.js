const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Follow = sequelize.define("Follow", {
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  followingId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});
User.belongsToMany(User, {
  through: Follow,
  as: "Followers", // Người theo dõi
  foreignKey: "followingId",
});

User.belongsToMany(User, {
  through: Follow,
  as: "Following", // Người được theo dõi
  foreignKey: "followerId",
});

module.exports = Follow;
