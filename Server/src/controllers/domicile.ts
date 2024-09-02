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
    const domiciles = await Domicile.findAll();
    Res.json(domiciles);
}



export default asignDomicile;