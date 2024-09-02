import { Request, Response } from "express"
import { Brand } from "../models/brand";

export const getBrandById = async(req:Request,res:Response) =>{
    const {idBrand} = req.body;
    try {
        const brand = await Brand.findByPk(idBrand);
        if(!brand){
            return res.status(404).send({
                msg:'Marca no encontrada!'
            })
        }
        return res.status(200).send(brand);
    }catch (error) {
        return res.status(400).send({msg:error});
    }
    
}

export const newBrand = async(req:Request, res:Response) => {
    const {name,maker}=req.body;
     try{
         const searchBrand = await Brand.findOne({ where: { name: name } });
         if(searchBrand) {
             return res.status(406).send({msg: 'Marca existente'})
         }
         await Brand.create({
             name: name,
             maker: maker
         });
         return res.status(200).send({
            msg: 'Marca registrada correctamente!'
         });
     }catch(error){
         return res.status(400).send({msg:error})
     }
}

export const getAllBrands = async (req:Request,res:Response) => {
    try{
        const brands = await Brand.findAll();
        if(!brands){
            return res.status(404).send('No se encontro ninguna marca registrada!')
        }
        return res.status(200).json(brands)
    }catch(err){
        return res.status(400).send({msg:err});
    }
}
