import { Request, Response } from "express";
import { product } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const indexProductToDelete = product.findIndex((p) => p.id === id);
  
    if(indexProductToDelete === -1){
      res.status(404)
      throw new Error ("Produto inexistente")
    }
  
    if (indexProductToDelete > 0) {
      product.splice(indexProductToDelete, 1);
    }
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