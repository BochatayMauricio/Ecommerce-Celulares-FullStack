import { Request, Response, request } from 'express';
import { Publication } from '../models/publication';
import sequelize from '../db/connection';




export const getPublications = async (request: Request, response: Response) => {
  const idAdmin = parseInt(request.params.id);
  try {

    const { QueryTypes } = require('sequelize');
    const publica = await sequelize.query(`SELECT publications.*, users.name, users.email, products.model, products.image FROM publications INNER JOIN users ON users.id = publications.idAdministrator INNER JOIN products ON products.id = publications.idProduct WHERE users.id = ${idAdmin}`, { type: QueryTypes.SELECT });

    if (publica.length > 0) {
      return response.status(200).json(publica)
    } else {
      return response.status(400).send({ msg: 'No hay publicaciones de este administrador' })
    }
  } catch (error) {
    return response.status(400).send(error)
  }
};

export const newPublication = async (request: Request, response: Response) => {
  const { idAdmin } = request.params; //recibimos la id del usuario por ruta(parametro)
  const { body } = request; //recibimos el producto



}