import {Request, Response} from "express"
import { product } from "../database";
// import { CATEGORY, TProduct } from "../types";
import { db } from "../database/knex";


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
      // if(
      //   category !== CATEGORY.ACCESSORIES &&
      //   category !== CATEGORY.CLOTHES_AND_SHOES &&
      //   category !== CATEGORY.ELECTRONICS
      //   ){
      //     res.status(400)
      //     throw new Error (" A 'category' do produto precisa ser um dos tipos validos")
      //   }
    
        const unavailableProductId = product.find((p)=> p.id === id)
        if(unavailableProductId){
          res.status(400)
          throw new Error(" O Id informado já consta em algum produto anteriormente cadastrado, por favor escolha outro Id.")
        }
    
      await db.raw(`
        INSERT INTO products (id, name, price, description, imageUrl)
        VALUES ("${id}","${name}","${price}","${description}","${imageUrl}");
      `)
      res.status(201).send("Produto cadastrado com sucesso.");
    } catch (error) {
      console.log(error);
    
        if (req.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro Inesperado :c.");
        }
    }
    };