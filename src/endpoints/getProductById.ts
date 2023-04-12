import { Request, Response } from "express";
import { db } from "../database/knex";


export const getProductById = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const result = await db.raw(`SELECT * FROM products
      WHERE id = "${id}";
      `)

    if(!result){
      res.status(404)
      throw new Error("Produto não encontrado.")
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
  