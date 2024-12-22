const sequelize = require('./database');
const User = require('./models/User');
const Album = require('./models/Album');
const Music = require('./models/Music');
const Genre = require('./models/Genre');
const History = require("./models/History")
const Favorite = require("./models/Favorite")
const Follow = require("./models/Folow")
const Comment = require("./models/Comment")


const syncDatabase = async () => {
  try {
    // Xác thực kết nối với cơ sở dữ liệu
    await sequelize.authenticate();
    console.log('Kết nối thành công với cơ sở dữ liệu.');

    // Đồng bộ hóa các model
    await sequelize.sync({ alter: true }); // `force: true` sẽ xóa và tạo lại bảng mỗi lần chạy lệnh này
    console.log('Các model đã được đồng bộ hóa thành công.');

  } catch (error) {
    console.error('Không thể kết nối với cơ sở dữ liệu:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
