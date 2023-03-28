import { users, product, purchase,} from "./database"
import { createUser,getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchaseFromUserId} from "./database"
import { CATEGORY } from "./types"
import express, { Request, Response } from 'express'
import cors from "cors"
import { TUser, TProduct, TPurchase } from "./types"



console.log("funcionou", users)
console.log("funcionou", product)
console.log("funcionou", purchase)


/// typescript II
console.log(`\n ----- typescript II ----- \n`)
console.log(createUser("usuario 3","teste2@teste.com","casa123"))
console.log(getAllUsers())
console.log(createProduct("produto 4", "name 4", 55, CATEGORY.ACCESSORIES))
console.log(getAllProducts())
console.log(getProductById(product,"produto 3"))
console.log(queryProductsByName("produto 2"))
console.log(createPurchase("usuario 1","produto 1", 10, 1000))
console.log(`\n ------------------- \n`)
console.log(getAllPurchaseFromUserId("usuario 1"))

/// APIs e Express

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003.")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

/// getAllUsers

app.get("/users",(req: Request, res: Response) => {
    res.status(200).send(users)
})

/// getAllproducts

app.get("/products",(req: Request, res: Response) => {
    res.status(200).send(product)
})

/// getProductByName

app.get("/product/search", (req: Request, res: Response)=>{
    //pegando params
    const q = req.query.q as string

    const result = product.filter((p)=>{
        return p.name.toLowerCase().includes(q.toLowerCase())
        
    })


    res.status(200).send(result)
})

/// createUser

app.post("/users", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string
 
    const newUser: TUser = {
        id,
        email, 
        password
    }

    users.push(newUser)

    console.log("funcionou")

    res.status(201).send("Cadastro realizado com sucesso.")
})


/// createProduct

app.post("/products", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORY

    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
    }

    product.push(newProduct)

    console.log("funcionou")

    res.status(201).send("Produto cadastrado com sucesso.")
})


/// createPurchase

app.post("/purchase", (req:Request, res:Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }
     
    purchase.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso.")
})