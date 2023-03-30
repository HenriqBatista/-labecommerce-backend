import { users, product, purchase } from "./database";
import {
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchaseFromUserId,
} from "./database";
import { CATEGORY } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";
import { TUser, TProduct, TPurchase } from "./types";

console.log("funcionou", users);
console.log("funcionou", product);
console.log("funcionou", purchase);

/// typescript II
console.log(`\n ----- typescript II ----- \n`);
console.log(createUser("usuario 3", "teste2@teste.com", "casa123"));
console.log(getAllUsers());
console.log(createProduct("produto 4", "name 4", 55, CATEGORY.ACCESSORIES));
console.log(getAllProducts());
console.log(getProductById(product, "produto 3"));
console.log(queryProductsByName("produto 2"));
console.log(createPurchase("usuario 1", "produto 1", 10, 1000));
console.log(`\n ------------------- \n`);
console.log(getAllPurchaseFromUserId("usuario 1"));

/// APIs e Express

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003.");
});

// app.get("/ping", (req: Request, res: Response) => {
//   res.send("Pong!");
// });

/// getAllUsers

app.get("/users", (req: Request, res: Response) => {
  try {
    if(!users){
      res.status(404);
      throw new Error("Lista de usuarios não encontrada.")
    }
    res.status(200).send(users);

  } catch (error) {
    if (res.statusCode === 200){
      res.status(500)
    } 
    if (error instanceof Error){
      res.send(error.message)
    }else{
      res.send("Erro Inesperado.")
    }
  }
});

/// getAllproducts

app.get("/products", (req: Request, res: Response) => {
  try {
    if(!product){
      res.status(404)
      throw new Error("Lista de produtos não encontrada.")
    }
    res.status(200).send(product); 

  } catch (error) { 
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error)
  }
});

/// getProductByName

app.get("/product/search", (req: Request, res: Response) => {
  
  try {
  const q = req.query.q as string;
  if(q.length < 1){
    res.status(400)
    throw new Error("Erro. Digite um nome válido.")
  }
  const result = product.filter((p) => {
    return p.name.toLowerCase().includes(q.toLowerCase());
  });

  res.status(200).send(result);

  } catch (error) {
    console.log(error)
    if(res.statusCode === 200){
      res.status(500)
    }
    if(error instanceof Error){
      res.send(error.message)
    }else{
      res.send("Erro inesperado.")
    }
  }
});

/// createUser

app.post("/users", (req: Request, res: Response) => {
  try {
  const id = req.body.id as string
  const email = req.body.email as string 
  const password = req.body.password as string 

  if(typeof id !== "string"){
    res.status(400)
    throw new Error ("Id invalido. Id deve ser do tipo String")
  }

  if(typeof email !== "string"){
    res.status(400)
    throw new Error("Email invalido. Email deve ser do tipo String");
    
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
});

/// createProduct

app.post("/products", (req: Request, res: Response) => {
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
});

/// createPurchase

app.post("/purchases", (req: Request, res: Response) => {
  try {
  const userId = req.body.userId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;
  const totalPrice = req.body.totalPrice as number;

  if(typeof userId !== "string"){
    res.status(400)
    throw new Error("'id' precisa ser uma string")
  }
  if(typeof productId !== "string"){
    res.status(400)
    throw new Error("'productId' precisa ser uma sting")
  }
  if(typeof quantity !== "number"){
    res.status(400)
    throw new Error("'quantity' precisa ser do tipo number")
  }
  if(typeof totalPrice !=="number"){
    res.status(400)
    throw new Error ("'totalPrice' precisa ser do tipo number")
  }

  const existingUser = users.find((user)=> user.id === userId)
  if(!existingUser){
    res.status(404)
    throw new Error("Usuario não encontrado")
  }

  const existingProductId = product.find((p)=> p.id === productId)
  if(!existingProductId){
    res.status(404)
    throw new Error("Produto não encontrado")
  }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };

  purchase.push(newPurchase);

  res.status(201).send("Compra realizada com sucesso.");
    
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
});

/// Aprofundamento Express ///

// getProductsById

app.get("/products/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;
  const result = product.find((p) => {
    return p.id === id;
  });
  if(!result){
    res.status(404)
    throw new Error("Produto não encontrado.")
  }

  res.status(200).send(result);
    
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
});

// getUserPurchasesByUserId

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
  const id = req.params.id as string
  const result = purchase.find((p) => {
  return p.userId === id;
  });

  const existingUser = users.find((user)=> user.id === id)
  if(!existingUser) {
    res.status(404)
    throw new Error("Não foi possivel encontrar nenhum usuário com esse id informado.")
  }

  const existingUserPurchase = purchase.filter((p)=> p.userId === id)
  if(!existingUserPurchase){
    res.status(400)
    throw new Error("Esse usuário ainda não possui nenhuma compra")
  }

  res.status(200).send(result);
    
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
});

// deleteUserById

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;
  const indexUserToDelete = users.findIndex((user) => user.id === id);

  if(indexUserToDelete === -1){
    res.status(404)
    throw new Error("Usuário Inexistente.")
  }
  if (indexUserToDelete > 0) {
    users.splice(indexUserToDelete, 1);
  }
  res.status(200).send("User apagado com sucesso.");

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
});

// deleteProductById

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;
  const indexProductToDelete = product.findIndex((p) => p.id === id);

  if(indexProductToDelete === -1){
    res.status(404)
    throw new Error ("Produto inexistente")
  }

  if (indexProductToDelete > 0) {
    product.splice(indexProductToDelete, 1);
  }
  res.status(200).send("Produto apagado com sucesso.");
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
});

// editUserById

app.put("/users/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const userToEdit = users.find((user) => user.id === id);
  if(!userToEdit){
    res.status(400)
    throw new Error("Usuario referente ao id informado não existe")
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

    if(newEmail !== undefined){
      if(!newEmail.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)){
        res.status(400)
        throw new Error("Email inserido de forma incorreta, verifique se possui @ e .com")
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


  if(userToEdit){
    userToEdit.id = newId || userToEdit.id;
    userToEdit.email = newEmail || userToEdit.email
    userToEdit.password = newPassword || userToEdit.password
  }

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
});


// editProductById

app.put("/products/:id", (req: Request, res:Response)=>{
   try {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY | undefined

    const productToEdit = product.find((p)=> p.id === id)
    if(!productToEdit){
      res.status(400)
      throw new Error("Produto referente ao id informado não existe")
    }

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

    if(newCategory !== undefined){
      if(newCategory !== CATEGORY.ACCESSORIES &&
        newCategory !== CATEGORY.CLOTHES_AND_SHOES &&
        newCategory !== CATEGORY.ELECTRONICS
        ){
        res.status(400)
        throw new Error("Category precisa ser de um tipos validos")
      }
    }
    if(productToEdit){
        productToEdit.id = newId || productToEdit.id
        productToEdit.name = newName || productToEdit.name
        productToEdit.price = newPrice || productToEdit.price
        productToEdit.category = newCategory || productToEdit.category
    }

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
})



