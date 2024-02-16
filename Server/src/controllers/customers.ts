import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import connection from '../db/connection'
import { Sales } from '../models/sales';
import sequelize from '../db/connection';




export const getCustomers = async (req: Request, res: Response) => {
  const customerList: any[] = await User.findAll({
    where: {
      isAdmin: false
    }
  })
  if (customerList.length > 0) {
    res.status(200).json(customerList);
  } else {
    res.status(404).send({ msg: 'No hay clientes cargados' })
  }
};



export const updateCustomer = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const dni = req.params.dni;
  if (email == "" || email == undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await User.update({
        password: hashedPassword
      }, {
        where: {
          dni: dni
        }
      })
      return res.status(200).json({
        msg: 'Password Actualizada',
        body: hashedPassword, password, User
      })
        ;
    } catch (error) {
      return res.status(400).json({
        msg: "No se pudo Actualizar"
      });
    }
  } else {
    const emailExist = await User.findOne({
      where: {
        email: email
      }
    })

    if (emailExist) {
      return res.status(400).json({
        msg: 'Email Ya Existente'
      })
    }

    try {
      await User.update({
        email: email
      }, {
        where: {
          dni: dni
        }
      });
      return res.status(200).json({
        msg: "Actualizado"
      });
    } catch (error) {
      return res.status(400)
    }
  };
}


export const deleteCustomer = async (req: Request, res: Response) => {
  const { dni } = req.params;
  const customer = await User.destroy({
    where: {
      dni: dni,
      isAdmin: false
    }
  })
  if (customer) {
    res.status(200).send({ msg: 'Cliente Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  const { email } = req.params;
  const oneUser = await User.findOne({ where: { email: email } });
  res.json(oneUser);
}

export const getSalesUser = async (request: Request, response: Response) => {
  // Extraemos el id de la ruta
  const id = request.params.id;
  // Extraemos metadatos Querytypes y definimos la Query con Querytypes.SELECT
  const { QueryTypes } = require('sequelize');
  const saleList = await sequelize.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, 
  { type: QueryTypes.SELECT });

  if (saleList.length > 0) {
    response.status(200).json(saleList)
  } else {
    response.status(404).send({ msg: 'No hay ventas registradas al cliente' })
  }
}
