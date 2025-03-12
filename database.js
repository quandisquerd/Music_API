require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require('pg');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres", // Chọn PostgreSQL làm database
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Nếu AWS yêu cầu SSL
    },
  },
  logging: false, // Tắt logging SQL trong console (tùy chọn)
});

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối PostgreSQL thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối PostgreSQL:", error.message);
  }
})();
// const sequelize = new Sequelize("MUSIC", "postgres", "admin", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connect to PostgreSQL successfully!");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = sequelize;
