import { Request, Response } from "express"
import { Product } from "../models/product";
import { loginUser } from "./user";
import connection from '../db/connection';

export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await Product.findAll();
  res.json(listProducts)
};

export const newProduct = (request: Request, response: Response) => {
  const { body, file } = request;
  //AHORA TRANSFORMAMOS LA IMAGEN QUE VIENE DE TIPO FILE DESDE EL FRONT (Con postman anda pero con el Front no ( consulta)) --> Lo que me da a entender que la API esta bien pero del Front mando mal la info
  if (file != undefined) {
    const url = `http://localhost:3001/Images/${file.filename}`;
    //MANDAMOS A LA BD TODO LISTO
    let query = "INSERT INTO products (model,brand,description,price,stock,date_register,date_updated,image,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?) "; //AGREGAR COMMIT EN LOS INSERT
    connection.query({
      query: query,
      values: [body.model, body.brand, body.description, body.price, body.stock, body.date_register, body.date_updated, url, null, null]
    }).then(() => {
      response.status(200).send({ msg: 'Producto cagargado Correctamente' })
    })
      .catch((err) => {
        response.status(400).send(err)
      })
  } else {
    response.status(404).send({ msg: 'El producto debe tener una imagen' })
  }
}

export const updateProduct = (request: Request, response: Response) => {
  let queryControl = "SELECT * FROM products WHERE  id = ?";
  connection.query({
    query: queryControl,
    values: [request.params.id]
  }).then((value) => {
    if (value[0].length === 1) {
      let queryForUpdate = "UPDATE products SET price = ?, stock = ?, description = ?, date_updated = ? WHERE id = ?";
      connection.query({
        query: queryForUpdate,
        values: [request.body.price, request.body.stock, request.body.description, request.body.date_updated, request.params.id]
      }).finally(() => {
        response.status(200).send({ msg: 'Producto actualizado' })
      })
    } else {
      response.status(404).send({ msg: 'Producto no encontrado' })
    }
  })
};


export const deleteProduct = (request: Request, response: Response) => {
  let querySearch = "DELETE FROM products WHERE id = ?";
  connection.query({
    query: querySearch,
    values: [request.params.id]
  }).then((resp) => {
    if (resp[1]) {
      response.status(200).send({ msg: 'Producto Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA SELECCIONA DE UN PRE-LISTADO
    }
  })
}

export const getOneProduct = (request: Request, response: Response) => {
  let querySearch = "SELECT * FROM products WHERE id = ?";
  connection.query({
    query: querySearch,
    values: [request.params.id]
  }).then((value) => {
    if (value[0].length === 1) {
      response.status(200).json(value[0][0]);
    } else {
      response.status(404).send({ msg: 'Producto no encontrado' });
    }
  });
}


