CREATE TABLE orders(order_id SERIAL PRIMARY KEY, 
    order_status VARCHAR(25),
    user_id INT REFERENCES users(user_id)
);