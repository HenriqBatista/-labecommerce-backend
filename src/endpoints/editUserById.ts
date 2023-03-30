import { Request, Response } from "express";
import { users } from "../database";




export const editUserById = (req: Request, res: Response) => {
    try {
    const id = req.params.id;
  
    const newId = req.body.id as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;
  
    const userToEdit = users.find((user) => user.id === id);
    if(!userToEdit){
      res.status(400)
      throw new Error("Usuario referente ao id informado não existe")
    }
  
      if(newId !== undefined){
        if(typeof newId !== "string"){
          res.status(400)
          throw new Error ("Id precisa ser do tipo String")
        }
        if(newId.length < 1){
          res.status(400)
          throw new Error ("Id precisa ter no minimo 1 caractere")
        }
      }
  
      if(newEmail !== undefined){
        if(!newEmail.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)){
          res.status(400)
          throw new Error("Email inserido de forma incorreta, verifique se possui @ e .com")
        }
      }
  
      if(newPassword !== undefined){
        if(typeof newPassword !== "string"){
          res.status(400)
          throw new Error("Password precisa ser do tipo String")
        }
        if(newPassword.length < 1){
          res.status(400)
          throw new Error("Password precisa ter no minimo 1 caractere")
        }
      }
  
  
    if(userToEdit){
      userToEdit.id = newId || userToEdit.id;
      userToEdit.email = newEmail || userToEdit.email
      userToEdit.password = newPassword || userToEdit.password
    }
  
    res.status(200).send("Cadastro atualizado com sucesso")
      
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
  