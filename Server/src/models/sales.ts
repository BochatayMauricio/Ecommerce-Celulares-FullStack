import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";
import { Product } from "./product";
import { Domicile } from "./domicile";



export const Sales = sequelize.define('sales', {
  idSell:{
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDomicile: {
    type: DataTypes.INTEGER,
    allowNull: false
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

Sales.belongsTo(Domicile, { foreignKey: 'idDomicile' });
Product.hasOne(Sales, { foreignKey: 'idDomicile' });

