import Client from "../database";
import {Product} from "./products"

export class DashboardQueriesStore {
    async indexOfCategory(category: string): Promise<Product[]> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT * FROM products WHERE category=($1)`;
          const result = await connection.query(sql, [category]);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(
            `Couldn't connect to the database and return products with category ${category}. Error: ${err}`
          );
        }
      }

      async topFivePopular(): Promise<{product_name: string, order_quantity: number}[]> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT product_name, order_quantity FROM products JOIN order_details ON products.product_id = order_details.product_id ORDER BY order_quantity DESC LIMIT 5`;
          const result = await connection.query(sql);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(
            `Couldn't connect to the database and return products with category. Error: ${err}`
          );
        }
      }
      
      async showActive(id:number): Promise<{
        product_name:string,
        order_quantity:number,
        order_status:string, 
        first_name:string, 
        price: number, 
        category:string}[]> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT product_name, order_quantity, order_status,first_name,price,category FROM products JOIN order_details ON products.product_id = order_details.product_id JOIN orders ON order_details.order_id = orders.order_id JOIN users ON users.user_id=orders.user_id WHERE order_status='active' AND users.user_id=($1);`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return your active orders relatred to your ${id}. Error: ${error}`
              );
        }
    }

    async showCompleted(user_id:number): Promise<{
      product_name:string,
      order_quantity:number,
      order_status:string, 
      first_name:string, 
      price: number, 
      category:string}[]> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT product_name, order_quantity, order_status,first_name,price,category FROM products JOIN order_details ON products.product_id = order_details.product_id JOIN orders ON order_details.order_id = orders.order_id JOIN users ON users.user_id=orders.user_id WHERE order_status='completed' AND users.user_id=($1);`;
            const result = await connection.query(sql, [user_id as number]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return your completed orders relatred to your ${user_id}. Error: ${error}`
              );
        }
    }
}

