import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Brand } from "./brand";


export const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idBrand: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.REAL,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})


Brand.hasMany(Product, {foreignKey:'idBrand', });
Product.belongsTo(Brand, { foreignKey: 'idBrand'});