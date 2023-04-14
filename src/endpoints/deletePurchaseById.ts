import { Request, Response } from "express";
import { db } from "../database/knex";


export const deletePurchaseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const [existingPurchase] = await db("purchases").where("id", id)
        if(!existingPurchase){
            res.status(400)
            throw new Error("Compra não encontrada.")
        }

        await db("purchases").delete().where("id", id)
        res.status(200).send("Pedido cancelado com sucesso.")


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
}