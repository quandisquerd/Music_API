const sequelize = require("../database");
const Music = require("../models/Music");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { where } = require("sequelize");
const musicController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await Music.getAll();
      console.log(rows);

      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  add: async (req, res) => {
    const { name, image, file, album_id } = req.body;
    try {
      const query = `
        INSERT INTO musics (name, image, file, album_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
      const values = [name, image, file, album_id];
      const result = await postgre.query(query, values);
      res.json({ msg: "Added new music", data: result.rows[0] });
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  remove: async (req, res) => {
    const { id } = req.params;
    try {
      const query = `DELETE FROM musics
WHERE id = ${id}`;
      const result = await postgre.query(query);
      return res.json({ message: "Xoa thanh cong!", data: result.rows[0] });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  search: async (req, res) => {
    const { name } = req.body;
    try {
      const query = "SELECT * FROM musics WHERE name LIKE $1";
      const values = [`%${name}%`];
      const result = await postgre.query(query, values);
      return res.json({ message: "Tìm Thấy Bài Hát!", data: result.rows });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const query = `SELECT * FROM musics
WHERE id = ${id}`;
      const result = await postgre.query(query);
      return res.json({ message: "Lấy 1 thanh cong!", data: result.rows[0] });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
};

const getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.findAll();
    return res.status(200).json(musicList);
  } catch (error) {
    res.status(500).send("Error fetching music list");
  }
};
const AddMusic = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(500).json({ message: "Token field cannot be empty!" });
    }
    const decoded = jwt.verify(token, "boquan");
    const userId = decoded.id;
    const data = req.body;
    if (!data) {
      return res.status(500).json({ message: "Data field cannot be empty!" });
    }
    const music = await Music.create({
      userId: userId,
      genreId: data?.genreId,
      status: data?.status,
      name: data?.name,
      file: data?.file,
      description: data?.description,
      image: data?.image,
    });
    if (music) {
      return res.status(200).json({ message: "Add Music success" });
    }
    return res.status(404).json({ message: "Music not found" });
  } catch (error) {
    res.status(500).send("Error added music");
  }
};
const GetMusicDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const music = await Music.findOne({
      where: { id },
      include: [
        {
          model: User,
        },
      ],
    });
    const musicdone = music;
    const user = music.User;
    if (music) {
      return res.status(200).json({
        message: "Get Music success",
        data: { Music: music, User: user },
      });
    }
    return res.status(404).json({ message: "Music not found" });
  } catch (error) {
    res.status(500).send("Error getone music");
  }
};
const GetMusicWithPlay = async (req, res) => {
  try {
    const songs = await Music.findAll({
      order: [["view", "DESC"]],
      limit: 8,
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });

    if (songs.length > 0) {
      const data = songs.map((song) => ({
        id: song.id,
        userId: song.User?.id,
        songId: song.id,
        createdAt: song.createdAt,
        updatedAt: song.updatedAt,
        Music: {
          id: song.id,
          name: song.name,
          file: song.file,
          description: song.description,
          view: song.view,
          favorite: song.favorite,
          repost: song.repost,
          image: song.image,
          status: song.status,
          genreId: song.genreId,
          userId: song.userId,
          albumId: song.albumId,
          createdAt: song.createdAt,
          updatedAt: song.updatedAt,
        },
        User: song.User
          ? {
              id: song.User.id,
              username: song.User.username,
              avatar: song.User.avatar,
              followersCount: song.User.followersCount
            }
          : null,
      }));

      return res.status(200).json({
        message: "Get Music success",
        data,
      });
    }

    return res.status(404).json({ message: "Music not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching music data" });
  }
};
const UpdateViewMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const [affectedRows] = await Music.increment("view", {
      by: 1,
      where: { id },
    });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Music not found" });
    }
    return res.status(200).json({ message: "Update view Music success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error update view music data" });
  }
};

module.exports = {
  musicController,
  getAllMusic,
  AddMusic,
  GetMusicDetail,
  GetMusicWithPlay,
  UpdateViewMusic,
};