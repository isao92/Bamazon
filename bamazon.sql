DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(30) NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) default 0,
	price DECIMAL(50,2) default 0,
	stock_quantity INTEGER(10) default 0
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Super Soap", "Cleaning", 3.50, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Head & Shoulders", "Cleaning", 7.50, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Toothy Plus", "Cleaning", 2.50, 90);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "iPhone 8", "Electronics", 600, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "iMac", "Electronics", 1200, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "HTC plus", "Electronics", 350, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Salt Lamp", "Furniture", 15, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Foldable Chair", "Furniture", 30, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Desk", "Furniture", 75, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Banana", "Food", 2.50, 80);


SELECT * FROM products