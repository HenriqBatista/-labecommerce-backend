import { users, product, purchase,} from "./database"
import { createUser,getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchaseFromUserId} from "./database"
import { CATEGORY } from "./types"


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

