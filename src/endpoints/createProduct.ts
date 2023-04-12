import {Request, Response} from "express"
import { db } from "../database/knex";
import { TProduct } from "../types";


export const createProduct =  async (req: Request, res: Response) => {
    try {
      const id = req.body.id as string;
      const name = req.body.name as string;
      const price = req.body.price as number;
      const description = req.body.description as string;
      const imageUrl = req.body.imageUrl as string;
    
      if(typeof id !== "string"){
        res.status(400)
        throw new Error("O 'id' do produto precisa ser do tipo string")
      }
      if(typeof name !== "string"){
        res.status(400)
        throw new Error ("O 'name' do produto precisa ser do tipo string")
      }
      if(typeof price !== "number"){
        res.status(400)
        throw new Error("O 'price' do produto precisa ser do tipo number")
      }
      
      if(typeof description !== "string"){
        res.status(400)
        throw new Error("O 'description' do produto precisa ser do tipo string")
      }
      if(typeof imageUrl !== "string"){
        res.status(400)
        throw new Error("O 'imageUrl' do produto precisa ser do tipo string")
      }

      const [existingProductId] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
        `)
      
      if(existingProductId){
        res.status(400);
        throw new Error("'id' já cadastrado no banco de dados")
      }

      const newProduct : TProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
      }


      await db("products").insert(newProduct)
      res.status(201).send("Produto cadastrado com sucesso.");
    } catch (error) {
      console.log(error);
    
        if (req.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro Inesperado.");
        }
    }
    };