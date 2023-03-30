import { Request, Response } from "express";
import { product } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
    try {
      if(!product){
        res.status(404)
        throw new Error("Lista de produtos não encontrada.")
      }
      res.status(200).send(product); 
  
    } catch (error) { 
      if(res.statusCode === 200){
        res.status(500)
      }
      res.send(error)
    }
  };
  