const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Bootcamp = sequelize.define("bootcamp", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Nombre requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un nombre",
      },
    },
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CUE requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un CUE",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Description requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un description",
      },
    },
  },
});

module.exports = Bootcamp;
