import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Publication = sequelize.define('publication', {
  idAdministrator: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
})