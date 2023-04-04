-- Active: 1680622042587@@127.0.0.1@3306


-- criando tabela users

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users
VALUES("01", "henrique@gmail.com","henrique123"),
("02", "larissa@gmail.com","larissa123"),
("03", "erick@gmail.com","erick123");

SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products
VALUES ("01", "Mouse Gamer", 189.99, "Eletronicos"),
("02", "Monitor 32'", 849.99, "Eletronicos"),
("03", "Mesa para escritorio", 349.89, "Moveis"),
("04", "Cadeira Gamer", 574.99, "Acessorios"),
("05", "Celular Samsung", 1899.99, "Eletronicos");

SELECT * FROM products;


---- aprofundamento sql
-- exercicio 1

--getAllUsers
SELECT * FROM users;

--getAllProducts
SELECT * FROM products;

-- searchProductsByName
SELECT * FROM products
WHERE name = "Mouse Gamer";

-- createUser
INSERT INTO users
VALUES ("04", "vitoria@gmail.com","vitoria123");

-- createProduct
INSERT INTO products
VALUES("06", "Maquina de lavar 10Kg", 1799.99, "Eletronicos");

-- getProductById
SELECT * FROM products
WHERE id = "04";

-- deleteUserById
DELETE FROM users
WHERE id = "04";

-- deleteProductById
DELETE FROM products
WHERE id = "06";

-- editUserById
UPDATE users
SET password = "janela123"
WHERE id = "03";

-- editProductById
UPDATE products
SET name = "Monitor 38'"
WHERE id = "02";

-- getAllUsersInAscendingOrder
SELECT * FROM users
ORDER BY email ASC;

-- getAllProductsByPriceInAscendingOrder
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- getAllProductsBetweenTwoPrices
SELECT * FROM products
WHERE price >= 500 AND price <= 1000
ORDER BY price ASC