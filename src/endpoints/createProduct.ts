import {Request, Response} from "express"
import { product } from "../database";
import { CATEGORY, TProduct } from "../types";


export const createProduct = (req: Request, res: Response) => {
    try {
      const id = req.body.id as string;
      const name = req.body.name as string;
      const price = req.body.price as number;
      const category = req.body.category as CATEGORY;
    
      if(typeof id !== id){
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
      if(
        category !== CATEGORY.ACCESSORIES &&
        category !== CATEGORY.CLOTHES_AND_SHOES &&
        category !== CATEGORY.ELECTRONICS
        ){
          res.status(400)
          throw new Error (" A 'category' do produto precisa ser um dos tipos validos")
        }
    
        const unavailableProductId = product.find((p)=> p.id === id)
        if(unavailableProductId){
          res.status(400)
          throw new Error(" O Id informado já consta em algum produto anteriormente cadastrado, por favor escolha outro Id.")
        }
    
      const newProduct: TProduct = {
        id,
        name,
        price,
        category,
      };
    
      product.push(newProduct);
    
      console.log("funcionou");
    
      res.status(201).send("Produto cadastrado com sucesso.");
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