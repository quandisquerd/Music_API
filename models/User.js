const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: true },
  lastname: { type: DataTypes.STRING, allowNull: true },
  firstname: { type: DataTypes.STRING, allowNull: true },
  middlename: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.INTEGER, defaultValue: "1" },
  phone: { type: DataTypes.STRING, allowNull: true },
  avatar: { type: DataTypes.STRING, allowNull: true },
  banner: { type: DataTypes.STRING, allowNull: true },
  cloudname: {type : DataTypes.STRING, allowNull: true},
  apikey: {type : DataTypes.STRING, allowNull: true},
  apisecret: {type : DataTypes.STRING, allowNull: true},
  upload_preset : {type:DataTypes.STRING , allowNull:true},
  description: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("active", "inactive", "banned"),
    defaultValue: "active",
  },
  followersCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
