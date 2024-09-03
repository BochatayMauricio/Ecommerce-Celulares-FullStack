import { Request, Response } from "express";
import { Sales } from "../models/sales";
import { Product } from "../models/product";
import sequelize from "../db/connection";



export const getSales = async (request: Request, response: Response) => {
  const { QueryTypes } = require('sequelize');
  const saleList = await sequelize.query("SELECT u.dni, u.name, p.model, s.quantity, d.id as idDomicile, d.street, d.number, s.createdAt FROM sales s INNER JOIN users u ON u.id = s.idCustomer INNER JOIN products p ON p.id = s.idProduct INNER JOIN domiciles d ON d.id = s.idDomicile;",
     { type: QueryTypes.SELECT });
  if (saleList.length > 0) {
    response.status(200).json(saleList)
  } else {
    response.status(404).send({ msg: 'No hay ventas registradas' })
  }

}

export const getOneSales = async (request: Request, response: Response) => {
  const id = request.params.idCustomer;
  const { QueryTypes } = require('sequelize');
  const saleList = await sequelize.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, 
  { type: QueryTypes.SELECT });
  if (saleList.length > 0) {
    response.status(200).json(saleList)
  } else {
    response.status(404).send({ msg: 'No hay ventas registradas al cliente' })
  }
}


export const postSell = async (request: Request, response: Response) => {
  const { body } = request;
  for (let j = 0; j < body.length; j++) {
    try {
      const produc = await Product.findOne({ where: { id: body[j].idProduct } }) 
      await Sales.create({
        idCustomer: body[j].idCustomer,
        idProduct: body[j].idProduct,
        idDomicile: body[j].idDomicile,
        quantity: body[j].quantity,
        idShipping: null
      })
      
      await Product.update({ stock: produc?.dataValues.stock - body[j].quantity }, { where: { id: body[j].idProduct } });
      return response.status(200).send({ msg: 'Correcto' })
    } catch (error) {
      return response.status(400).send({ msg: 'No se pudo cargar' })
    }
  }
  
}





