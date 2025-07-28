-- SQLBook: Code
CREATE TABLE products {
    product_name text,
    price int
};

INSERT INTO products (product_name, price)

VALUES

('Desktop Computer',800),
('Laptop',1200),
('Tablet',200),
('Monitor',350),
('Printer',150);

SELECT * FROM products;