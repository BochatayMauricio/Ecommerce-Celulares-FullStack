import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";
import { Product } from "./product";



export const Sales = sequelize.define('sales', {
  idCustomer: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idShipping: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

})

Sales.belongsTo(User, { foreignKey: 'idCustomer' });
User.hasOne(Sales, { foreignKey: 'idCustomer' });

Sales.belongsTo(Product, { foreignKey: 'idProduct' });
Product.hasOne(Sales, { foreignKey: 'idProduct' });