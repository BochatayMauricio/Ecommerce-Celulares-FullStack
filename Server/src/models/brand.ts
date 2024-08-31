import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Brand = sequelize.define('brand',{
    idBrand:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    maker: {
        type: DataTypes.STRING,
        allowNull:false
    }
})