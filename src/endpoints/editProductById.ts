import { Request, Response } from "express"
// import { product } from "../database"
// import { CATEGORY } from "../types"



export const editProductById = (req: Request, res:Response)=>{
    try {
     const id = req.params.id
 
     const newId = req.body.id as string | undefined
     const newName = req.body.name as string | undefined
     const newPrice = req.body.price as number | undefined
     const newCategory = req.body.category as string | undefined
 
    //  const productToEdit = product.find((p)=> p.id === id)
    //  if(!productToEdit){
    //    res.status(400)
    //    throw new Error("Produto referente ao id informado não existe")
    //  }
 
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
 
    //  if(newCategory !== undefined){
    //    if(newCategory !== CATEGORY.ACCESSORIES &&
    //      newCategory !== CATEGORY.CLOTHES_AND_SHOES &&
    //      newCategory !== CATEGORY.ELECTRONICS
    //      ){
    //      res.status(400)
    //      throw new Error("Category precisa ser de um tipos validos")
    //    }
    //  }
    //  if(productToEdit){
    //      productToEdit.id = newId || productToEdit.id
    //      productToEdit.name = newName || productToEdit.name
    //      productToEdit.price = newPrice || productToEdit.price
    //      productToEdit.category = newCategory || productToEdit.category
    //  }
 
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
 