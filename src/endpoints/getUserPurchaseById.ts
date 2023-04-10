import { Request, Response } from "express";
import { purchase, users } from "../database";
import { db } from "../database/knex";

export const getUserPurchasesByUserId = async (req: Request, res: Response) => {
    try {
    const id = req.params.id as string
    const result = await db.raw(`SELECT * FROM purchases WHERE userId = "${id}";`)
  
    const existingUser = users.find((user)=> user.id === id)
    if(!existingUser) {
      res.status(404)
      throw new Error("Não foi possivel encontrar nenhum usuário com esse id informado.")
    }
  
    const existingUserPurchase = purchase.filter((p)=> p.userId === id)
    if(!existingUserPurchase){
      res.status(400)
      throw new Error("Esse usuário ainda não possui nenhuma compra")
    }
  
    res.status(200).send(result);
      
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro Inesperado.");
      }
    }
  };
  