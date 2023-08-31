const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("user", {
  firstName: {
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Apellido requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un apellido",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
    validate: {
      notNull: {
        msg: "Email requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un email",
      },
      isEmail: {
        msg: "Debe ingresar un email valido",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: {
        args: [8],
        msg: "Se requiere un min de 8 caracteres",
      },
      notNull: {
        msg: "Password requerido",
      },
      notEmpty: {
        msg: "Debe ingresar un password",
      },
    },
  },
});

module.exports = User;
