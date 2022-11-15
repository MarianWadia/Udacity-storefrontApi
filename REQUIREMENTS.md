# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ----->   '/products' [GET] 
- Show ----->    '/products/:id' (parameters: product_id) [GET] 
- Create -----> '/products' [POST] (body: product_name, price, category) [token required]
- [OPTIONAL] Top 5 most popular products -----> '/products/top-five-popular' [GET]
- [OPTIONAL] Products by category (args: product category) -----> '/products/products-by-category/:category' (parameters: category)[GET]

#### Users
- Index ----->   '/users' [GET] [token required]
- Show ----->   '/users/:id' [GET] (parameters: user_id) [token required]
- Create ----->   '/users/' [POST] (body: first_name, last_name, email, password)
- Authenticate ----->  '/users/authenticate' [POST] (body: email, password)

#### Orders
- Create ----->   '/orders/' [POST] (body: user_id, order_status)
- Show ----->   '/orders/:id' [GET] (parameters: order_id) [token required]
- AddProduct ----->   '/orders/newproducts' [POST] (body: order_id, user_id, order_status)
- Current Order by user (args: user id) -----> '/orders/showactive/:id' (parameters: user_id) [GET] [token required]
- [OPTIONAL] Completed Orders by user (args: user id) -----> '/orders/showcompleted/:id' (parameters: user_id) [GET] [token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category    

Table: products (product_id: int, product_name: varchar, price: int, category: varchar, publisher_id:string)

#### User
- id
- firstName
- lastName
- email
- password

Table: users (user_id: int, first_name: varchar, last_name: varchar, email: varchar, password: varchar)

#### Orders
- id
- user_id
- status of order (active or complete)

Table: orders (order_id: int, order_status: varchar, user_id [foreign key to users table])

#### OrdersDetails
- id
- id of each product in the order
- quantity of each product in the order
- order_id 

Table: order_details (id: int, order_id: int [foreign key to orders table], order_quantity: int, product_id [foreign key to product table])


## Data Schemas
#### Product

 table_schema | table_name | column_name  |     data_type
--------------+------------+--------------+-------------------
 public       | products   | product_id   | integer
 public       | products   | price        | integer
 public       | products   | product_name | character varying
 public       | products   | category     | character varying

#### User

 table_schema | table_name | column_name |     data_type
--------------+------------+-------------+-------------------
 public       | users      | user_id     | integer
 public       | users      | first_name  | character varying
 public       | users      | last_name   | character varying
 public       | users      | email       | character varying
 public       | users      | password    | character varying

#### Orders

 table_schema | table_name | column_name  |     data_type
--------------+------------+--------------+-------------------
 public       | orders     | order_id     | integer
 public       | orders     | user_id      | integer
 public       | orders     | order_status | character varying

#### OrdersDetails

 table_schema |  table_name   |  column_name   | data_type
--------------+---------------+----------------+-----------
 public       | order_details | id             | integer
 public       | order_details | order_quantity | integer
 public       | order_details | order_id       | integer
 public       | order_details | product_id     | integer
