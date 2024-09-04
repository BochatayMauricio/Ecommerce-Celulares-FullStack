import { Domicile } from "../models/domicile";
import { Request, Response } from "express"


export const asignDomicile = async(Req:Request, Res:Response) => {
    const {postalCode,street, number} = Req.body;
    try{
        var domicileExist = await Domicile.findOne({
            where:{
                postalCode:postalCode,
                street:street,
                number:number
            }
        });
        if(domicileExist){
            return Res.status(200).json(domicileExist);
        } else{
            try{
                domicileExist = await Domicile.create({
                    postalCode:postalCode,
                    street:street,
                    number:number
                })
                return Res.status(201).json(domicileExist)
            } catch (error) {
                return Res.status(400).send({ msg: 'No se pudo crear el domicilio'});
            }
        }
    }catch(error){
        return Res.status(400).send({
            msg:error
        })
    }
    
};

export const getDomiciles = async(Req:Request, Res:Response) => {
    try{
        const domiciles = await Domicile.findAll();
        Res.status(200).json(domiciles);
    }catch(err){
        Res.status(400).send({
            msg:err
        })
    }
}

export const getOneDomicile = async(Req:Request, Res:Response) => {
    const {id} = Req.params;
    try{
        const domicile = await Domicile.findByPk(id);
        if(domicile){
            Res.status(200).json(domicile);
        }else{
            Res.status(402).send({
                msg:'Domicilio no encontrado'
            })
        }
        
    }catch(err){
        Res.status(400).send({
            msg:err
        })
    }

}



export default asignDomicile;