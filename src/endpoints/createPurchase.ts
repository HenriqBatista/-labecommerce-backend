import { Request, Response } from "express";
import { db } from "../database/knex";




export const createPurchase = async (req: Request, res: Response) => {
    try {
    const userId = req.body.buyer_id as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number
    const purchaseId = req.body.id as string;
    const deliveredAt = req.body.deliveredAt as string | undefined;
  
    if(typeof userId !== "string"){
      res.status(400)
      throw new Error("'id' precisa ser uma string")
    }
    if(typeof productId !== "string"){
      res.status(400)
      throw new Error("'productId' precisa ser uma string")
    }

    if(!quantity){
      res.status(400)
      throw new Error("'quantity' é obrigatório")
    }if(typeof quantity !== "number"){
      res.status(400)
      throw new Error("'quantity' precisa ser do tipo number")
    }

    if(!purchaseId){
      res.status(400)
      throw new Error("'purchaseId' é obrigatório.")
    }if(typeof purchaseId !== "string"){
      res.status(400)
      throw new Error("'purchaseId' pracisa ser do tipo string")
    }

    const [existingId] = await db.raw(`
      SELECT * FROM users
      WHERE id LIKE "${userId}"
    `)
    if(!existingId){
      res.status(400)
      throw new Error("Usuário não encontrado")
    }

    const [existingProductId] = await db.raw(`
      SELECT * FROM products
      WHERE id LIKE "${productId}"
    `)

    console.log(existingProductId)

    if(!existingProductId){
      res.status(400)
      throw new Error("Produto não encontrado")
    }

    const [product] = await db.raw(`
        SELECT price FROM products
        WHERE id = "${productId}"
    `)
    console.log(product)

    const totalPrice = product.price * quantity
    

    
    await db.raw(`
      INSERT INTO purchases (id, buyer_id, total_price)
      VALUES ("${purchaseId}","${userId}","${totalPrice}")
    `)

    res.status(201).send("Compra realizada com sucesso.");
      
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