import { Request, Response } from "express";
import { db } from "../database/knex";


export const deleteUserById = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;

    const [existingUser] = await db("users").where("id", id)
    if(!existingUser){
      res.status(404)
      throw new Error("Usuário não encontrado.")
    }

    await db("users").delete().where("id", id)
    res.status(200).send("Usuário apagado com sucesso.");

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