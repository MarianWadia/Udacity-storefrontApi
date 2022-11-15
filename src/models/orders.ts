import Client from "../database";

export type Order = {
    order_id?: number, 
    user_id: number, 
    order_status: string,
}

export type Cart = {
    id?: number, 
    order_quantity: number,
    order_id: number,
    product_id: number
}

export class OrderStore{
    async index(): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT * FROM orders`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return orders. Error: ${error}`
              );
        }
    }

    async show(order_id:number): Promise<Order> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT * FROM orders WHERE order_id=($1)`;
            const result = await connection.query(sql, [order_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return order with id ${order_id}. Error: ${error}`
              );
        }
    }

    async create(o:Order): Promise<Order> {
        try {
            const connection = await Client.connect();
            const sql = `INSERT INTO orders(user_id, order_status) VALUES($1, $2) RETURNING *`;
            const result = await connection.query(sql, [o.user_id, o.order_status]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and create a new order with your id ${o.user_id}. Error: ${error}`
              );
        }
    }
    async addProduct(c:Cart): Promise<Cart> {
        try {
            const connection = await Client.connect();
            const orderSql = `SELECT * FROM orders WHERE order_id=($1)`;
            const orderFound = await connection.query(orderSql, [c.order_id]);
            const resultOrder = orderFound.rows[0];
            if(resultOrder.order_status !== "active"){
                throw new Error(`couldn't add a new product you should have an order firstly and it should be an active order`);
            }
            connection.release();
        } catch (error) {
            throw new Error(
                `Error: ${(error as Error).message}`
              );
        }
        try {
            const connection = await Client.connect();
            const sql = `INSERT INTO order_details(order_id, order_quantity, product_id) VALUES($1, $2, $3) RETURNING *`;
            const result = await connection.query(sql, [c.order_id, c.order_quantity, c.product_id]);
            connection.release;
            return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't connect to database and add new product. Error: ${error}`);
        }
    }
}



//  const sql2 = `INSERT INTO orders_details(order_quantity) VALUES($2) RETURNING *`;
// const result2 = await connection.query(sql2, [o.order_quantity]);