import { Request, Response } from "express";
import { db } from "../database/knex";

export const getUserPurchasesByUserId = async (req: Request, res: Response) =>{
  try {
    const userId = req.params.id

    const existingUser = await db("users").where("id", userId)

    if(!existingUser){
      res.status(404)
      throw new Error("Id não encontrado")
    }

    const [userPurchase] = await db
    .select(
      "purchases.id",
      "purchases.total_price as totalPrice",
      db.raw(
        "case when purchases.paid = 0 then 'not paid' else 'paid' end as isPaid"
      ),
      "purchases.delivered_at as deliveredAt",
      "purchases.buyer_id as buyerId",
      "users.email",
      "users.name"
    )
    .from("purchases")
    .where("buyer_id", userId)
    .innerJoin("users","users.id","purchases.buyer_id")

    const listsOfProducts = await db
    .select("products.*","purchases_products.quantity")
    .from("purchases_products")
    .where("purchases_products.purchase_id", userPurchase.id)
    .innerJoin("products","products.id","purchases_products.product_id")

    console.log(listsOfProducts)
    res.status(200).send({...userPurchase, listsOfProducts})

    
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
}
  