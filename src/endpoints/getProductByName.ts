import { Request,Response } from "express";

import { db } from "../database/knex";


export const getProductByName = async (req: Request, res: Response) => {
  
    try {
    const q = req.query.q as string;
    if(q.length < 1){
      res.status(400)
      throw new Error("Erro. Digite um nome válido.")
    }
    const result = await db("products").where("name","like",`%${q}%`)
  
    res.status(200).send(result);
  
    } catch (error) {
      console.log(error)
      if(req.statusCode === 200){
        res.status(500)
      }
      if(error instanceof Error){
        res.send(error.message)
      }else{
        res.send("Erro inesperado.")
      }
    }
  };