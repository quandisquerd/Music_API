require("dotenv").config();
const { Sequelize } = require("sequelize");

// Sử dụng connection string trực tiếp
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false, // Tắt logging SQL trong console
});

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối PostgreSQL thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối PostgreSQL:", error.message);
    
    // Log chi tiết lỗi để debug
    console.error("Chi tiết lỗi:", {
      code: error.original?.code,
      detail: error.original?.detail,
      hint: error.original?.hint
    });
  }
})();

module.exports = sequelize;