import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  const { password, email, name, surname, dni, isAdmin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  //Validacion de si el usuario ya existe en la bd
  let user = await User.findOne({ where: { email: email } })
  if (user) {
    return res.status(400).send({
      msg: `Ya existe un usuario con el mail ${email}`
    })
  }

  user = await User.findOne({ where: { dni: dni } })
  if (user) {
    return res.status(400).send({
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
    res.status(400).send({
      msg: error
    });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, isAdmin } = req.body;
  try{
    const user: any = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).send({
        msg: "No existe usuario"
      })
    }

    //Validamos password
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(400).send({
        msg: "Password Incorrecto"
      })
    }

    if (user.isAdmin != isAdmin) {
      if (user.isAdmin) {
        return res.status(400).send({
          msg: "No es un Cliente"
        })
      } else {
        return res.status(400).send({
          msg: "No es Administrador"
        })
      }
    }
    try{
      // Generamos token
    const token = jwt.sign({
      email: user.email,
      isAdmin: user.isAdmin
    }, process.env.SECRET_KEY || 'pepito123',/* expiresIn: 't en ms' Para que el token expire en un tiempo t */);

    const obj = {
      tok: token,
      us: user,
    };
    return res.status(200).json(obj);
    }catch(error){
      return res.status(400).send({
        msg:'No se pudo generar el token'
      })
    }
    
  }catch(error){
    return res.status(400).send({
      msg:error
    })
  }
  
  

}

export const getUser = async (request: Request, response: Response) => {
  const tokenBarer = request.headers['authorization'];
  let emailToken = '';
  const token = tokenBarer?.slice(7) //necesito el token, sin el Bearer que son los primeros 7 caracteres
 // const payload = jwt.decode(token!); //datos del usuario.
  jwt.verify(token as string,process.env.SECRET_KEY||'pepito123',async (error,payload)=>{
    if(error){
      return response.status(403).send({msg:'No autorizado'})
    }
    else{
      emailToken = (payload as any).email;
    }
  });
  const user = await User.findOne({ where: { email : emailToken} })
      try{
        return response.status(200).json(user)
      }
    catch{
      return response.status(403).send({msg:'Token incorrecto'})
      }
}


