import { Request,Response } from "express";
import { product } from "../database";


export const getProductByName = (req: Request, res: Response) => {
  
    try {
    const q = req.query.q as string;
    if(q.length < 1){
      res.status(400)
      throw new Error("Erro. Digite um nome válido.")
    }
    const result = product.filter((p) => {
      return p.name.toLowerCase().includes(q.toLowerCase());
    });
  
    res.status(200).send(result);
  
    } catch (error) {
      console.log(error)
      if(res.statusCode === 200){
        res.status(500)
      }
      if(error instanceof Error){
        res.send(error.message)
      }else{
        res.send("Erro inesperado.")
      }
    }
  };
  