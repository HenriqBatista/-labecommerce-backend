import express, { Request, Response } from "express";
import cors from "cors";
// import endpoints get
import { getAllProducts } from "./endpoints/getAllProducts";
import { getAllPurchase } from "./endpoints/getAllPurchase";
import { getProductById } from "./endpoints/getProductById";
import { getProductByName } from "./endpoints/getProductByName";
import { getUsers } from "./endpoints/getUsers";
import { getUserPurchasesByUserId } from "./endpoints/getUserPurchaseById";
// import endpoints post
import { createUser } from "./endpoints/createUser";
import { createProduct } from "./endpoints/createProduct";
import { createPurchase } from "./endpoints/createPurchase";
// import endpoints delete
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById } from "./endpoints/deleteProductById";
// import endpoints put
import { editUserById } from "./endpoints/editUserById";
import { editProductById } from "./endpoints/editProductById";


/// APIs e Express
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003.");
});


// Endpoints metodo GET
app.get("/users", getUsers)
app.get("/products", getAllProducts)
app.get("/purchases", getAllPurchase)
app.get("/products/search", getProductByName)
app.get("/products/:id", getProductById)
app.get("/users/:id/purchase", getUserPurchasesByUserId)

// Endpoints metodo POST
app.post("/users", createUser)
app.post("/products", createProduct)
app.post("/purchase", createPurchase)

// Endpoints metodo DELETE
app.delete("/users/:id", deleteUserById)
app.delete("/product/:id", deleteProductById)

// Endpoints metodo PUT
app.put("/users/:id", editUserById)
app.put("/product/:id", editProductById)
