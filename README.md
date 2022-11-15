# Storefront Backend Project

## Getting Started

This repo contains Storefront Backend API. To get started, clone this repo and run `yarn` or `npm i` in your terminal at the project root.

## Required Technologies
- You have to add a .env file in the repo, and it has to contain the following variables and its values:
DATABASE_NAME=store_db
USER_NAME=MARIAN
DB_PASSWORD=password123
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME_TEST=store_db_test
DB_PASSWORD_TEST=test123
USER_NAME_TEST=test_user
ENV=dev
SALT_ROUNDS=10
PEPPER=your-secret-password
SECRET_TOKEN= your-secret-token

- You should have two databases created with the names found in the values set in DATABASE_NAME, DB_NAME_TEST variables in the .env file, SQL command for creating database and user and connecting them, maybe like that: `
CREATE USER newuser WITH PASSWORD 'password123';    
CREATE DATABASE store_db;  
\c store_db
GRANT ALL PRIVILEGES ON DATABASE store_db TO newuser; ` 
And the one for testing database is mostly the same with changing the database name, username and password if needed like that: `CREATE USER test_user WITH PASSWORD 'test123';    
CREATE DATABASE store_db_test;  
\c store_db_test
GRANT ALL PRIVILEGES ON DATABASE store_db_test TO test_user; `

## Overview

### 1. DB Creation and Migrations
- To run migrations on dev enviroment database run `yarn  migration-dev-up` or `npm run migration-dev-up`to run migration down and reset dev database run `yarn migration-dev-reset` or `npm run migration-dev-reset`

- To run migrations on test enviroment database run `yarn  migration-testdb-up` or `npm run migration-testdb-up` to run migration down and reset test database run `yarn migration-testdb-reset` or `npm run migration-testdb-reset`

- To run migrations on test enviroment database along with jasmine run for windows `yarn migration-test:windows` or `npm run migration-test:windows` while for mac run `yarn migration-test:mac` or `npm run migration-test:mac`

### 2. Database.json
This is a json file needed for the db-migration proccess to run successfully, used for set up different databases information as dev and test in our case.

### 2. Localhost Port
- Server is running on port 5000
- While for database, it is running on the default port selected with postgres installation which is 5432