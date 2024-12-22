require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
sequelize.authenticate()
  .then(() => {
    console.log('Connect to PostgreSQL successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
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
