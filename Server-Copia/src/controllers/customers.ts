import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { json } from 'sequelize';
import connection from '../db/connection'
import { Sales } from '../models/sales';


/*export const newUser = async (req: Request, res: Response) => {

  const { password, email, name, surname, dni, isAdmin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  //Validacion de si el usuario ya existe en la bd
  const user = await User.findOne({ where: { email: email } })

  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el mail ${email}`
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
      msg: `usuario creado exitosamente`,
    })

  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un Error',
      error
    });
  }


}*/

export const getCustomers = (request: Request, response: Response) => {
  let queryTable = "SELECT * FROM users WHERE isAdmin = false";
  let customerList: any[] = [];
  connection.query(queryTable).then((values) => {
    if (values[0].length > 0) {
      customerList = values[0];
      response.status(200).json(customerList);
    } else {
      response.status(404).send({ msg: 'No hay clientes cargados' })
    }
  })
}

export const updateCustomer = (request: Request, response: Response) => {
  let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = false";
  connection.query({
    query: queryControl,
    values: [request.params.dni]
  }).then((value) => {
    if (value[0].length === 1) {
      //ESTO SE EJECUTA SI EL cliente SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
      //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO cliente
      let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL cliente(YA QUE PUEDE NO ACTUALIZARLO)
      connection.query({
        query: queryEmail,
        values: [request.body.email, request.params.dni]
      }).then((resp) => {
        if (resp[0].length == 0) {
          let queryForUpdate = "UPDATE users SET email = ?, password = ? WHERE dni = ? and isAdmin = false";
          let hashedPassword = '';
          bcrypt.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
            connection.query({
              query: queryForUpdate,
              values: [request.body.email, hashedPassword, request.params.dni]
            }).then(() => {
              response.send({ msg: 'Cliente actiualizado' })
            })
          }) //hasheo 
        }
        else { response.status(404).send({ msg: 'Email duplicado' }) }
      })
    } else {
      response.status(404).send({ msg: 'Cliente no encontrado' })
    }
  })
}

export const updateCustomer2 = async (req: Request, res: Response) => {
  const dni = req.params.dni;
  const dataCustomer = req.body;
  const user = await User.findOne({
    where: {
      email: dataCustomer.email,
    }
  }
  )
  if (!user) {
    const updateCustomer = await User.update({

      email: dataCustomer.email,
      password: dataCustomer.password,

    }, {
      where: {
        dni: dni
      }
    });
    res.status(200).json({
      ok: true,
      message: 'Cliente Actualizado'
    })
  } else {
    res.status(400).json({
      message: 'Email Existente'
    })

  }
}

export const updateCustomer3 = async (req: Request, res: Response) => {
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


export const deleteCustomer = (request: Request, response: Response) => {
  let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((resp) => {
    if (resp[1]) {
      response.status(200).send({ msg: 'Cliente Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
  })
}

export const getSalesUsers = (req: Request, res: Response) => {
  const listOfSales = Sales.findAll();
  res.status(200).json({
    message: 'Todo Ok',
    body: listOfSales
  })
  return (listOfSales)
}
//   let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE dniCustomer = 43713017;";
//   connection.query({
//     query: querySearch,
//     values: [req.params.id]
//   }).then((value) => {
//     if (value[0].length === 1) {
//       res.status(200).json(value[0][0]);
//     } else {
//       res.status(404).send({ msg: 'No se encontraron ventas' });
//     }
//   });
// }

export const getSalesUser = (req: Request, res: Response) => {
  let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE idCustomer = ?;";
  let salesList: any;
  connection.query({
    query: querySearch,
    values: [req.params.id]
  }).then((values) => {
    if (values[0].length > 0) {
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      res.status(200).json(salesList)
    } else {
      res.status(404).send({ msg: 'No hay ventas registradas' })
    }
  })
}


// export const modifyUser = (req: Request, res: Response) => {
//   let query = "UPDATE INTO users(email,password) VALUES (?,?)"
//   let queryControl = "SELECT * FROM users where users.id=?"
//   let hashedPassword = '';

//   connection.query({
//     query: queryControl,
//     values: req.body.id
//   }).then((value) => {
//     if (value[0].length <= 0) {
//       bcrypt.hash(req.body.password, 10).then((value) => hashedPassword = value).finally(() => {
//         console.log(hashedPassword) //contraseña encriptada
//         connection.query({
//           query: query,
//           values: [req.body.email, bcrypt.hash(req.body.password, 10)],
//         }).then(() => {
//           res.status(200).send({ msg: 'Datos Actualizados Correctamente' })
//         })
//           .catch((err) => {
//             res.status(400).send({ msg: 'No se pudo registrar ' })
//           })
//       });
//     }
//     else {
//       res.status(404).send('email duplicado o Administrador ya resgistrado')
//     }
//   })
// };
// export const getOneSales = (request: Request, response: Response) => {
//   let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.dni = sales.dniCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.dni = ?';
//   let salesList: any[] = [];
//   connection.query({
//     query: queryTable,
//     values: [request.params.dniCustomer]
//   }).then((values) => {
//     if (values[0].length > 0) {
//       salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
//       response.status(200).json(salesList)
//     } else {
//       response.status(404).send({ msg: 'No hay ventas registradas' })
//     }
//   })
// }
// export const getSalesUser = (req: Request, res: Response) => {
//   let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE dniCustomer = ?;";
//   let salesList: any;
//   try {
//     connection.query({
//       query: querySearch,
//       values: [req.body.params]
//     }
//     ).then((values) => {
//       if (values[0].length > 0) {
//         salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
//         res.status(200).json(salesList)
//       } else {
//         res.status(404).send({ msg: 'No hay ventas registradas' })
//       }
//     })
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: 'Error al obtener las ventas' });
//   }
// }


// export const getSalesUser = async (req: Request, res: Response) => {
//   let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE dniCustomer = ?;";
//   let salesList: any;
//   connection.query(
// Query:querySearch,
// Values: [req.params.dni]).then((values) => {
//     if (values[0].length > 0) {
//       salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
//       res.status(200).json(salesList)
//     } else {
//       res.status(404).send({ msg: 'No hay ventas registradas' })
//     }
//   })
// }