const { User, Bootcamp } = require("../app/models");
const sequelize = require("../app/config/db.config");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Eliminando y resincronizando la base de datos.");
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
})();
