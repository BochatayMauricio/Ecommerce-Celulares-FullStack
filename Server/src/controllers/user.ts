import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

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
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.SECRET_KEY || 'pepito123',/* expiresIn: 't en ms' Para que el token expire en un tiempo t */);

  const obj = {
    tok: token,
    us: user,
  };

  res.json(obj);

}

export const getUser = async (request: Request, response: Response) => {
  const tokenBarer = request.headers['authorization'];
  let emailToken = '';
  const token = tokenBarer?.slice(7) //necesito el token, sin el Bearer que son los primeros 7 caracteres
  console.log(token);
 // const payload = jwt.decode(token!); //datos del usuario.
  jwt.verify(token as string,process.env.SECRET_KEY||'pepito123',async (error,payload)=>{
    if(error){
      return response.status(403).json({msg:'No autorizado'})
    }
    else{
      emailToken = (payload as any).email;
    }
  });
  console.log('payload: ',emailToken);
  const user = await User.findOne({ where: { email : emailToken} })
      try{
        return response.status(200).json(user)
      }
    catch{
      return response.status(404).json({msg:'Token incorrecto'})
      }
}


