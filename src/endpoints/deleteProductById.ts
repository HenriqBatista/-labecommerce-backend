import { Request, Response } from "express";
import { db } from "../database/knex";


export const deleteProductById = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;

    const [existingProduct] = await db("products").where("id", id)
    if(!existingProduct){
      res.status(404)
      throw new Error("Produto não encontrado.")
    }

    await db("products").delete().where("id", id)
    res.status(200).send("Produto apagado com sucesso.");

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