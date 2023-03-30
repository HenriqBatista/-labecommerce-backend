import { Request, Response } from "express";
import { users } from "../database";


export const deleteUserById =  (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const indexUserToDelete = users.findIndex((user) => user.id === id);
  
    if(indexUserToDelete === -1){
      res.status(404)
      throw new Error("Usuário Inexistente.")
    }
    if (indexUserToDelete > 0) {
      users.splice(indexUserToDelete, 1);
    }
    res.status(200).send("User apagado com sucesso.");
  
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