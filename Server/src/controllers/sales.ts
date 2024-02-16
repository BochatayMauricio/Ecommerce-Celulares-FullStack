import { Request, Response } from "express";
import connection from '../db/connection';
import { Sales } from "../models/sales";

import { Product } from "../models/product";
import sequelize from "../db/connection";


export const getSales = async (request: Request, response: Response) => {
  const { QueryTypes } = require('sequelize');
  const saleList = await sequelize.query("SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct", { type: QueryTypes.SELECT });
  if (saleList.length > 0) {
    response.status(200).json(saleList)
  } else {
    response.status(404).send({ msg: 'No hay ventas registradas' })
  }

}

export const getOneSales = async (request: Request, response: Response) => {
  // Extraemos el id de la ruta
  const id = request.params.idCustomer;
  // Extraemos metadatos Querytypes y definimos la Query con Querytypes.SELECT
  const { QueryTypes } = require('sequelize');
  const saleList = await sequelize.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, 
  { type: QueryTypes.SELECT });
  //Validamos si saleList contiene valores
  if (saleList.length > 0) {
    response.status(200).json(saleList)
  } else {
    response.status(404).send({ msg: 'No hay ventas registradas al cliente' })
  }
}


export const postSell = async (request: Request, response: Response) => {
  // recibimos un arreglo de ventas, que hace referencia a una compra por cada producto del carrito
  const { body } = request;
  console.log(body);
  for (let j = 0; j < body.length; j++) {
    try {
      const produc = await Product.findOne({ where: { id: body[j].idProduct } })
      await Product.update({ stock: produc?.dataValues.stock - body[j].quantity }, { where: { id: body[j].idProduct } });
      await Sales.create({
        idCustomer: body[j].idCustomer,
        idProduct: body[j].idProduct,
        quantity: body[j].quantity
      })
    } catch (error) {
      return response.status(400).send({ msg: 'No se pudo cargar' })
    }
  }
  return response.status(200).send({ msg: 'Correcto' })
}





