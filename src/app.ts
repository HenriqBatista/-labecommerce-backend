import express, { Request, Response } from "express";
import cors from "cors";
// import endpoints get
import { getAllProducts } from "./endpoints/getAllProducts";
import { getAllPurchase } from "./endpoints/getAllPurchase";
import { getProductById } from "./endpoints/getProductById";
import { getProductByName } from "./endpoints/getProductByName";
import { getUsers } from "./endpoints/getUsers";
import { getUserPurchasesByUserId } from "./endpoints/getUserPurchaseById";
import { getPurchaseById } from "./endpoints/getPurchaseById";
// import endpoints post
import { createUser } from "./endpoints/createUser";
import { createProduct } from "./endpoints/createProduct";
import { createPurchase } from "./endpoints/createPurchase";
// import endpoints delete
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById } from "./endpoints/deleteProductById";
import { deletePurchaseById } from "./endpoints/deletePurchaseById";
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
app.get("/users/:id/purchases", getUserPurchasesByUserId)
app.get("/purchases/:id", getPurchaseById)

// Endpoints metodo POST
app.post("/users", createUser)
app.post("/products", createProduct)
app.post("/purchases", createPurchase)

// Endpoints metodo DELETE
app.delete("/users/:id", deleteUserById)
app.delete("/products/:id", deleteProductById)
app.delete("/purchases/:id", deletePurchaseById)

// Endpoints metodo PUT
app.put("/users/:id", editUserById)
app.put("/products/:id", editProductById)
