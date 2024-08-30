import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Domicile = sequelize.define('domicile', {
  id:{
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement:true
 },
  postalCode: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
  }},
  {
    indexes: [
      {
        unique: true,
        fields: ['postalCode', 'street','number'] // Aquí defines los campos que deben ser únicos en combinación
      }
    ]
  }
)
