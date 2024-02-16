import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Domicile = sequelize.define('domicile', {
  postalCode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  street: {
    type: DataTypes.STRING,

    primaryKey: true
  },
  number: {
    type: DataTypes.INTEGER,

    primaryKey: true
  }
})
