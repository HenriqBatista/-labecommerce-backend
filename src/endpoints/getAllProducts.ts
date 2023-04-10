import { Request, Response } from "express";
// import { result } from "../database";
import { db } from "../database/knex";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await db.raw(`SELECT * FROM products;`)
      if(!result){
        res.status(404)
        throw new Error("Lista de produtos não encontrada.")
      }
      res.status(200).send(result); 
  
    } catch (error) { 
      if(req.statusCode === 200){
        res.status(500)
      }
      res.send(error)
    }
  };
  