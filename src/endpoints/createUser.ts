import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";


export const createUser = (req: Request, res: Response) => {
    try {
    const id = req.body.id as string
    const email = req.body.email as string 
    const password = req.body.password as string 
  
    if(typeof id !== "string"){
      res.status(400)
      throw new Error ("Id invalido. Id deve ser do tipo String")
    }
  
    // if(typeof email !== "string"){
    //   res.status(400)
    //   throw new Error("Email invalido. Email deve ser do tipo String");
      
    // }

    if (email !== undefined) {
      if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i)) {
        res.status(400);
        throw new Error("email tem que o padrão exemplo@gmail.com");
      }
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("email tem que ser tipo string");
      }
      if (!email.length) {
        res.status(400);
        throw new Error("email precisa ter no mínimo 1 valor");
      }
    }

    if(typeof password !== "string"){
      res.status(400)
      throw new Error("Password invalido. Password deve ser do tipo String");
    }
  
    const unavailableId = users.find((user)=> user.id === id)
    if(unavailableId){
      res.status(400)
      throw new Error("Id já casdastrado.")
    }
  
    const unavaliableEmail = users.find((user)=> user.email === email)
    if(unavaliableEmail){
      res.status(400)
      throw new Error("Email já casdastrado.")
    }
  
    const newUser: TUser = {
      id,
      email,
      password,
    };
  
    users.push(newUser);
  
    res.status(201).send("Cadastro realizado com sucesso.");
      
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro Inesperado :c.");
      }
    }
  };