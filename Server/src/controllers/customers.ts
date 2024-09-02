import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import sequelize from '../db/connection';




export const getCustomers = async (req: Request, res: Response) => {
  try{
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
  }catch(error){
    return res.status(400).send({msg:error})
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
      });
    } catch (error) {
      return res.status(400).json({
        msg: "No se encontro el usuario"
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
      return res.status(400).send({
        msg:`No se encontro el usuario`
      })
    }
  };
}


export const deleteCustomer = async (req: Request, res: Response) => {
  const { dni } = req.params;
  try{
    const customer = await User.destroy({
      where: {
        dni: dni,
        isAdmin: false
      }
    });
    if (customer) {
      return res.status(200).send({ msg: 'Cliente Eliminado' })
    }
    return res.status(402).send({
      msg:'No se encontró el cliente'
    })
  }catch(error){
    return res.status(400).send({msg:error})
  }
  
};

export const getCustomer = async (req: Request, res: Response) => {
  const { email } = req.params;
  try{
    const oneUser = await User.findOne({ where: { email: email } });
    if(!oneUser) {
      return res.status(402).send({
      msg:'No se encontro este usuario!'
      });
    }
    return res.status(200).json(oneUser);
  }catch(error){
    return res.status(400).send({msg:error})
  }

}

export const getSalesUser = async (request: Request, response: Response) => {
  // Extraemos el id de la ruta
  const id = request.params.id;
  // Extraemos metadatos Querytypes y definimos la Query con Querytypes.SELECT
  const { QueryTypes } = require('sequelize');
  try{
    const saleList = await sequelize.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, 
      { type: QueryTypes.SELECT });
    
      if (saleList.length > 0) {
        return response.status(200).json(saleList)
      } else {
        return response.status(404).send({ msg: 'No hay ventas registradas al cliente' })
      }
  }catch(error){
    return response.status(400).send({msg:error});
  }

}
