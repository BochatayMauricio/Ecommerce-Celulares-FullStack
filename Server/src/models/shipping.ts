import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Shipping = sequelize.define('shippings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  costForKm: {
    type: DataTypes.REAL,
    allowNull: false
  },
  costShipping: {
    type: DataTypes.REAL,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
})