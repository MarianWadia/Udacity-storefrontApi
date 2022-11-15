CREATE TABLE users(user_id SERIAL PRIMARY KEY, 
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(255) 
);