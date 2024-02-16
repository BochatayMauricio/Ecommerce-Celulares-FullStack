import { Request, Response, request } from "express";
import connection from '../db/connection';
import { Sales } from "../models/sales";
import sequelize from "sequelize/types/sequelize";

export const getSales = async (request: Request, response: Response) => {
  let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct';
  let salesList: any;
  connection.query(queryTable).then((values) => {
    if (values[0].length > 0) {
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      response.status(200).json(salesList)
    } else {
      response.status(404).send({ msg: 'No hay ventas registradas' })
    }
  })
}





