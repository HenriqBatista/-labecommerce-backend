import { Request, Response } from "express";
import { db } from "../database/knex";

export const getPurchaseById = async (req: Request, res: Response) =>{
    try {
        const purchaseId = req.params.id
        const result = await db("purchases").where({id: purchaseId})

        if(result){
            const [purchase] = await db("users")
            .select(
            "purchases.id as purchaseId",
            "total_price as totalPrice",
            "purchases.created_at as CreatedAt",
            "users.id as Buyer",
            "users.name as BuyerName",
            "users.email as BuyerEmail", 
            )
            .innerJoin("purchases","purchases.buyer_id","=","users.id")
            .where("purchases.id","=", purchaseId)


            const listsOfProducts = await db("purchases_products").select(
                "purchases_products.purchase_id as id",
                "products.name as name",
                "products.price",
                "products.description",
                "products.imageUrl",
                "purchases_products.quantity"
            )
            .innerJoin("products","purchases_products.product_id","=","products.id")
            .where("purchases_products.purchase_id","=", purchaseId)
            const result = {...purchase,listsOfProducts}
            res.status(200).send(result)
        }else{
            res.status(404)
            throw new Error("Compra não encontrada.")
        }
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
