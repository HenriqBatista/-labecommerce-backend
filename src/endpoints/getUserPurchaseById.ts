import { Request, Response } from "express";

import { db } from "../database/knex";

export const getUserPurchasesByUserId = async (req: Request, res: Response) => {
    try {
    const id = req.params.id as string
    const result = await db.raw(`SELECT * FROM purchases
    WHERE buyer_id = "${id}";`)
  
   const [existingUser] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}";
   `)
      if(!existingUser){
        res.status(404)
        throw new Error("Usuário não encontrado")
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
  