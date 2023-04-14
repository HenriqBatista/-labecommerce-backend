import { Request, Response } from "express";
import { db } from "../database/knex";





export const editUserById = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
  
    const newId = req.body.id as string | undefined;
    const newPassword = req.body.password as string | undefined;
    const newName = req.body.name as string | undefined;
  
   const [userToEdit] = await db("users").where("id", id)
   if(!userToEdit){
    res.status(400)
    throw new Error("Usuário não encontrado")
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
  
      if(newName !== undefined){
        if(typeof newName !== "string"){
          res.status(400)
          throw new Error ("Name precisa ser do tipo String")
        }
        if(newName.length < 1){
          res.status(400)
          throw new Error ("Name precisa ter no minimo 1 caractere")
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
  
    await db("users").update({"name":newName, "password":newPassword}).where("id",id)
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
  