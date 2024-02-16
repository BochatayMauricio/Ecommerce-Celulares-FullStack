import { Request,Response, request } from "express";
import Stripe from 'stripe';
import { Product } from "../models/product";
import { postSell } from "./sales";
import { User } from "../models/user";

const stripe = new Stripe('sk_test_51OHwGOBu8HuAflvRhuY8kZ6DuS25d2dZceAo2CItxjJU7FIlFJdGlOfxXlqX77Dek6L4vkZj22e9YzebC0WIJ5Ko009qDGb9KS');

export const checkout = async (req:Request,res:Response)=> { // la request tiene un body que seria un arreglo sales[]
  const tokenID = req.body.tokenID;
  const sales = req.body.sales; //arreglo
  let amount = 0;
  const idCustomer = sales[0].idCustomer;
  if(sales.length > 0){

  for(let i=0;i<sales.length;i++){
    const product = await Product.findOne({where:{id : sales[i].idProduct}});
    amount = amount + (Number(product?.dataValues.price) * Number(sales[i].quantity));
  }
  const customer = await User.findOne({where:{id:idCustomer}})
  const responseObject = await stripe.charges.create({
    amount: Number(amount),
    currency: "usd",
    source: tokenID,
    capture:false,
    description: `Celulares comprados por : ${customer?.dataValues.name} ${customer?.dataValues.surname}`,
    receipt_email: customer?.dataValues.email
  })
  try{
    await stripe.charges.capture(responseObject.id);
      return res.json(responseObject);
  }
  catch(err){
    await stripe.refunds.create({charge: responseObject.id })
      return res.status(400).json(responseObject);
    }
  }else{
      return res.status(400).json('No hay productos')
  }
}

