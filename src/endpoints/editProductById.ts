import { Request, Response } from "express"
import { db } from "../database/knex"


export const editProductById = async (req: Request, res:Response)=>{
    try {
     const id = req.params.id
 
     const newId = req.body.id as string | undefined
     const newName = req.body.name as string | undefined
     const newPrice = req.body.price as number | undefined
     const newDescription = req.body.description as string | undefined
     const newImageUrl = req.body.imageUrl as string | undefined
 
    
     if(newId !== undefined){
       if(typeof newId !== "string"){
         res.status(400)
         throw new Error("Id precisa ser do tipo String")
       }
       if(newId.length < 1){
         res.status(400)
         throw new Error ("Id inserido precisa ter no minimo 1 caractere")
       }
     }
 
     if(newName !== undefined){
       if(typeof newName !== "string"){
         res.status(400)
         throw new Error("Name precisa ser do tipo String")
       }
       if(newName.length < 1){
         res.status(400)
         throw new Error ("Name inserido precisa ter no minimo 1 caractere")
       }
     }
     
     if(newPrice !== undefined){
       if(typeof newPrice !== "number"){
         res.status(400)
         throw new Error("Price precisa ser do tipo Number")
       }
       if(newPrice < 0){
         res.status(400)
         throw new Error ("Price precisa ter um valor de no minimo 1")
       }
     }
     
     if(newDescription !== undefined){
      if(typeof newDescription !== "string"){
        res.status(400)
        throw new Error("Description precisa ser do tipo String")
      }
      if(!newDescription.length){
        res.status(400)
        throw new Error("Description precisa ter no mínimo 1 caracter")
      }
     }

     const [product] = await db("products").where("id", id)
   
     const newProduct = {
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      imageUrl: newImageUrl || product.imageUrl
     }
 
     await db("products").update(newProduct).where("id", id)
     
     res.status(200).send("Produto atualizado com sucesso")
     
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
 }
 