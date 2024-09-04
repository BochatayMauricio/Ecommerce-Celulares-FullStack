import { Request, Response } from "express"
import { Product } from "../models/product";
import { Publication } from "../models/publication";
import { Sales } from "../models/sales";
import sequelize from "../db/connection";
import { QueryTypes } from "sequelize";
import { Brand } from "../models/brand";


export const getAllProducts = async (req: Request, res: Response) => { // Método encargado de traer los productos de la BD
  const page = parseInt(req.params.page);
  const size= 3
  let option = { 
    limit: +size,
    offset: (+page * (+size))
  }
  try{
    const querySQL = 
    `SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p 
    INNER JOIN brands b ON b.idBrand = p.idBrand 
    LIMIT ${option.limit} OFFSET ${option.offset};`;
    const rows = await sequelize.query(querySQL,{
      type:QueryTypes.SELECT
    });
    if(!rows) {
      return res.status(404).send({
        msg:'No hay mas productos'
      });
    }

    const count = await sequelize.query(`SELECT count(p.id) FROM products p WHERE p.stock > 0`)
    return res.status(200).json({
      total: count,
      products: rows
    })
  }catch(err){
    return res.status(400).send({
      msg:err
    })
  }

};

export const getProducts  = async (req:Request, res:Response) => {
  try{
    // const productList = await Product.findAll();
    const productList = await sequelize.query(
      "SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p INNER JOIN brands b ON b.idBrand = p.idBrand",
      {
        type: QueryTypes.SELECT 
        }
    );
    if(!productList) {
        return res.status(404).send({
        msg:'No hay productos cargados'
        })
    }
    return res.status(200).json(productList);
  }catch(error){
    return res.status(400).send({
      msg:error
    })
  }

}

export const newProduct = async (request: Request, response: Response) => {
  const { body, file } = request;
  const idAdmin = parseInt(request.params.idAdmin);
  
  if (file != undefined) {
    const url = file.filename;
    try {
      const brand = await Brand.findOne({where:{idBrand: Number(body.idBrand)}});
      if(!brand) {
        return response.status(400).send({
          msg:'La marca no es reconocida por el sistema'
        });
      }
      const product = await Product.create({
        model: body.model,
        idBrand: Number(body.idBrand),
        description: body.description,
        image: url,
        price: Number(body.price),
        stock: Number(body.stock)
      });
      const publication = await Publication.create({
        idProduct: product.dataValues.id,
        idAdministrator: idAdmin
      })
      return response.status(200).send({ msg: "Producto Creado Correctamente", body: product, publication })
    } catch (error) {
      return response.status(400).send({ msg:error });
    }
  }else{
    return response.status(400).send({msg:'Se debe cargar una imagen'})
  }
};



export const updateProduct = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { body } = request;
  try {
    const productUpd = await Product.update({ price: body.price, stock: body.stock, description: body.description }, { where: { id: id } });
    if (productUpd) {
      return response.status(200).send({ msg: 'Producto actualizado exitosamente' })
    } else {
      return response.status(400).send({ msg: 'Producto no encontrado' })
    }
  } catch (error) {
    return response.status(400).send({ msg:error })
  }
};

export const deleteProduct = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    try {
      await Sales.destroy({ where: { idProduct: id } })
    }
    finally {
      try {
        await Publication.destroy({ where: { idProduct: id } })
      } finally {
        try {
          await Product.destroy({ where: { id: id } })
          return response.status(200).send({ msg: 'Producto eliminado correctamente' })
        } catch (error) {
          return response.status(400).send({ msg:error})
        }
      }
    }
  } catch(error) {
    return response.status(400).send({ msg:error})
  }
}

export const getOneProduct = async (request: Request, response: Response) => {
  const { idProd } = request.params;
  try {
    const product = await Product.findOne({ where: { id: idProd } })
    if (product) {
      return response.status(200).json(product)
    } else {
      return response.status(400).send({ msg: 'Producto no encontrado' })
    }
  } catch (error) {
    return response.status(400).send({ msg:error });
  }
}

export const getProductsByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try{
    const productsByName = await sequelize.query(
      `SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p 
      INNER JOIN brands b ON b.idBrand = p.idBrand WHERE name like :search_brand`,
      {
        replacements: { search_brand: `%${name}%` },
        type:QueryTypes.SELECT
      }
      );
      if (productsByName) {
        return res.status(200).json(productsByName);
      } else {
        return res.status(404).send({ msg: 'No se encontró el producto' });
      }
  }catch(error){
    return res.status(400).send({msg:error})
  }

}
