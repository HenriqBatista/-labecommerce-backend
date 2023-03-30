import { TProduct, TPurchase, TUser, CATEGORY } from "./types";

export const users: TUser[] = [
  {
    id: "usuario 1",
    email: "teste@teste.com",
    password: "senha123",
  },
  {
    id: "usuario 2",
    email: "teste1@teste.com",
    password: "janela123",
  },
];

export const product: TProduct[] = [
  {
    id: "produto 1",
    name: "name 1",
    price: 10,
    category: CATEGORY.ACCESSORIES,
  },
  {
    id: "produto 2",
    name: "name 2",
    price: 20,
    category: CATEGORY.CLOTHES_AND_SHOES,
  },
  {
    id: "produto 3",
    name: "name 3",
    price: 30,
    category: CATEGORY.ELECTRONICS,
  },
];

export const purchase: TPurchase[] = [
  {
    userId: users[0].id,
    productId: product[0].id,
    quantity: 10,
    totalPrice: product[0].price * 10,
  },
  {
    userId: users[1].id,
    productId: product[1].id,
    quantity: 8,
    totalPrice: product[1].price * 8,
  },
  {
    userId: users[1].id,
    productId: product[2].id,
    quantity: 5,
    totalPrice: product[2].price * 5,
  },
];

// function searchID(users: TUser[], id: string) {
//   if (id === undefined) {
//     return "informe um id valido";
//   }
//   return users.filter((user) => {
//     return user.id === id;
//   });
// }

// console.log(searchID(users, "usuario 1"));

// export function createUser(
//   id: string,
//   email: string,
//   password: string
// ): string {
//   return "Cadastro realizado com sucesso.";
// }

// createUser("usuario 3", "teste2@teste.com", "casa123");

// export function getAllUsers() {
//   return users;
// }

// getAllUsers();

// /// funções product
// export function createProduct(
//   id: string,
//   name: string,
//   price: number,
//   category: string
// ) {
  
//   return "Produto criado com sucesso.";
// }

// createProduct("produto 4", "name 4", 55, CATEGORY.ACCESSORIES);

// export function getAllProducts(): TProduct[] {
//   return product;
// }
// getAllProducts();


// export function getProductById (product:TProduct[],id:string):TProduct[]{
//   if(id === undefined){
//     return product;
//   }
//   return product.filter((p)=>{
//     return p.id === id
//   })
// }

// getProductById(product,"produto 3")

// /// funções querys



// export function queryProductsByName (query:string){
//   const queryProduct = product.filter((p)=> p.name === query)
//   if(queryProduct.length != 0){
//     return queryProduct
//   }else{
//     return "Produto não encontrado."
//   }
// }
//  queryProductsByName("produto 1")

//  export function createPurchase (userId:string, productId:string, quantity:number, totalPrice:number):void {
//     const newPurchase = {
//       userId,
//       productId,
//       quantity,
//       totalPrice,
//     }
//     purchase.push(newPurchase)
//  }
// createPurchase("usuario 1","produto 1", 10, 1000)

// export function getAllPurchaseFromUserId (userId:string){
//   const purchaseFromId =  purchase.filter((p) => p.userId === userId)
//   return purchaseFromId
// }

// getAllPurchaseFromUserId("usuario 1")