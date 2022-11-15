CREATE TABLE order_details(id SERIAL PRIMARY KEY, 
    order_quantity INT,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id)
);
