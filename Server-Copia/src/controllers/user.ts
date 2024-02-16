import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { json } from 'sequelize';
import connection from '../db/connection'

export const newUser = async (req: Request, res: Response) => {
  console.log('new user entrando');
  const { password, email, name, surname, dni, isAdmin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  //Validacion de si el usuario ya existe en la bd
  let user = await User.findOne({ where: { email: email } })
  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el mail ${email}`
    })
  }

  user = await User.findOne({ where: { dni: dni } })
  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el dni ${dni}`
    })
  }

  try {
    await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      surname: surname,
      dni: dni,
      isAdmin: isAdmin
    });

    res.json({
      msg: ` usuario creado exitosamente`,
    })

  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un Error',
      error
    });
  }


}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, adminLogin } = req.body;

  //Validamos si el usuario existe en la bd
  const user: any = await User.findOne({ where: { email: email } })

  if (!user) {
    return res.status(400).json({
      msg: "No existe usuario"
    })
  }

  //Validamos password
  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) {
    return res.status(400).json({
      msg: "Password Incorrecto"
    })
  }

  if (user.isAdmin != adminLogin) {
    if (user.isAdmin) {
      return res.status(400).json({
        msg: "No es Cliente"
      })
    } else {
      return res.status(400).json({
        msg: "No es Admin"
      })
    }
  }

  // Generamos token
  const token = jwt.sign({
    email: email,
    isAdmin: adminLogin
  }, process.env.SECRET_KEY || 'pepito123',/* expiresIn: 't en ms' Para que el token expire en un tiempo t */);

  const obj = {
    tok: token,
    us: user,
  };

  res.json(obj);

}

// export const getAdmins = async (req: Request, res: Response) => {
//   connection.query('Select * from users where users.isAdmin is true')
//     .then((users) => {
//       if (users[0].length > 0) {
//         res.status(200).json(users[0])
//       }
//     }).catch(() => {
//       res.status(400).send({
//         msg: 'No hay Administradores Cargados'
//       })
//     })
// }

export const getCustomer = async (req: Request, res: Response) => {
  const { email } = req.params;
  const oneUser = await User.findOne({ where: { email: email } });
  res.json(oneUser);
}


