import { TProduct, TPurchase, TUser } from "./types";

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
    category: "categoria 1",
  },
  {
    id: "produto 2",
    name: "name 2",
    price: 20,
    category: "categoria 2",
  },
  {
    id: "produto 3",
    name: "name 3",
    price: 30,
    category: "categoria 3",
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

/// adicionar em um gitignore
// build
// node_modules
// package-lock.json

// no database.ts, crie e exporte a constante purchases e tipe-a como um array do type respectivo criado no exercício 2
// lembre-se de referenciar o material assíncrono
// crie pelo menos 2 objetos nesse array
// garanta que o userId preenchido exista na constante users
// garanta que o productId preenchido exista na constante products
// garanta que o cálculo do totalPrice esteja de acordo com a quantity da compra

// function searchID(users: TUser[], id: string) {
//   if (id === undefined) {
//     return "informe um id valido";
//   }
//   return users.filter((user) => {
//     return user.id === id;
//   });
// }

// console.log(searchID(users, "usuario 1"));
