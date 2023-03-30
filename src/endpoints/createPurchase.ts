import { Request, Response } from "express";
import {users, product, purchase } from "../database"
import { TPurchase } from "../types";




export const createPurchase = (req: Request, res: Response) => {
    try {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as number;
  
    if(typeof userId !== "string"){
      res.status(400)
      throw new Error("'id' precisa ser uma string")
    }
    if(typeof productId !== "string"){
      res.status(400)
      throw new Error("'productId' precisa ser uma sting")
    }
    if(typeof quantity !== "number"){
      res.status(400)
      throw new Error("'quantity' precisa ser do tipo number")
    }
    if(typeof totalPrice !=="number"){
      res.status(400)
      throw new Error ("'totalPrice' precisa ser do tipo number")
    }
  
    const existingUser = users.find((user)=> user.id === userId)
    if(!existingUser){
      res.status(404)
      throw new Error("Usuario não encontrado")
    }
  
    const existingProductId = product.find((p)=> p.id === productId)
    if(!existingProductId){
      res.status(404)
      throw new Error("Produto não encontrado")
    }
  
    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };
  
    purchase.push(newPurchase);
  
    res.status(201).send("Compra realizada com sucesso.");
      
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro Inesperado :c.");
      }
    }
  };