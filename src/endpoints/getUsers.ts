import { Request, Response } from "express";
import { users } from "../database";
import { db } from "../database/knex";


export const getUsers = async (req: Request, res: Response) => {
    try {
      const result = await db.raw(`SELECT * FROM users;`)

      if(!result){
        res.status(404);
        throw new Error("Lista de usuarios não encontrada.")
      }
      res.status(200).send(result);
  
    } catch (error) {
      if (req.statusCode === 200){
        res.status(500)
      } 
      if (error instanceof Error){
        res.send(error.message)
      }else{
        res.send("Erro Inesperado.")
      }
    }
  };