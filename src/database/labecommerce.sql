-- Active: 1681391095007@@127.0.0.1@3306


-- criando tabela users

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT (datetime('now', '-3 hours'))
);


INSERT INTO users (id,name,email,password)
VALUES("01","henrique", "henrique@gmail.com","henrique123"),
("02","larissa", "larissa@gmail.com","larissa123"),
("03","erick", "erick@gmail.com","erick123");

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

INSERT INTO products
VALUES ("01", "Mouse Gamer", 189.99, "Eletronicos","https://m.media-amazon.com/images/I/51WDqMptUDL._AC_SY450_.jpg"),
("02", "Monitor 32'", 849.99, "Eletronicos","https://m.media-amazon.com/images/I/71Bx4P3l2oL._AC_SY355_.jpg"),
("03", "Mesa para escritorio", 349.89, "Moveis","https://m.media-amazon.com/images/I/61SwLdyBdFL._AC_SY355_.jpg"),
("04", "Cadeira Gamer", 574.99, "Acessorios","https://m.media-amazon.com/images/I/51OfT2SdS+L._AC_SX425_.jpg"),
("05", "Celular Samsung", 1899.99, "Eletronicos","https://m.media-amazon.com/images/I/612WbrQv0kL._AC_SX569_.jpg");

SELECT * FROM products;

DROP TABLE products;

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
WHERE id = "01";

-- deleteProductById
DELETE FROM products
WHERE id = "06";

-- editUserById
UPDATE users
SET id = NULL
WHERE id = "01";

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
ORDER BY price ASC;


--- relacoes sql-I
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TIMESTAMP DEFAULT (datetime('now', '-3 hours')),
    paid INTEGER NOT NULL DEFAULT 0,
    delivered_at TEXT,
    FOREIGN KEY (buyer_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO purchases (id, total_price,buyer_id)
VALUES  ("pu001",189.99,"01"),
        ("pu002",849.99,"01"),
        ("pu003",1899.99,"02");


DROP TABLE purchases;

SELECT * FROM purchases
WHERE buyer_id = "01";




SELECT * FROM purchases;

UPDATE purchases
SET paid = 1
WHERE id = "pu001";

UPDATE purchases
SET delivered_at = DATETIME("now", "localtime")
WHERE id = "pu001";

SELECT
users.id AS userId,
users.email,
purchases.id AS purchaseId,
purchases.total_price AS totalPrice,
(CASE 
    WHEN purchases.paid = 0 THEN "not paid"  
    ELSE  "paid"
END) as paid,
purchases.delivered_at AS delivered,
purchases.buyer_id AS buyerId
FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id;




-- Relações SQL II -- relação da tabela de products e purchases

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

DROP TABLE purchases_products;

INSERT INTO purchases_products
VALUES
        ("pu001","01",2),
        ("pu002","03",4),
        ("pu003","04",3);

SELECT products.id FROM products;


SELECT * FROM purchases;
SELECT * FROM products;

SELECT  
        purchases_products.product_id as BuyId,
        purchases_products.product_id as ProductId,
        products.name as ProductName,
        products.price as productPrice,
        purchases_products.quantity as Quantity,
        purchases.total_price as TotalPrice,
        CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END AS "Payment Status",
        purchases.delivered_at as deliveryDate,
        users.id as userId,
        users.name as userName
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id
INNER JOIN users ON users.id = purchases.buyer_id;