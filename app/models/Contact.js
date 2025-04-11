import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; // Assure-toi que ton client Sequelize est bien configuré

export class Contact extends Model {}

Contact.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: "contact",
  timestamps: true, // Assure que Sequelize gère les champs 'createdAt' et 'updatedAt' automatiquement

});

