import { Request, Response } from "express";
import { users } from "../database";


export const getUsers =  (req: Request, res: Response) => {
    try {
      if(!users){
        res.status(404);
        throw new Error("Lista de usuarios não encontrada.")
      }
      res.status(200).send(users);
  
    } catch (error) {
      if (res.statusCode === 200){
        res.status(500)
      } 
      if (error instanceof Error){
        res.send(error.message)
      }else{
        res.send("Erro Inesperado.")
      }
    }
  };